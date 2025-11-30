import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { AiResource } from '../../entities/ai-resource.entity';
import { AiLog } from '../../entities/ai-log.entity';
import {
  RecommendationRequest,
  VendorCombinationRecommendation,
  AiRecommendationResponse,
} from './interfaces';

/**
 * AI 추천 서비스
 * - OpenAI API를 사용한 스드메 조합 추천
 * - RAG(Retrieval-Augmented Generation) 패턴 적용
 */
@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openai: OpenAI;

  constructor(
    @InjectRepository(AiResource)
    private readonly aiResourceRepository: Repository<AiResource>,
    @InjectRepository(AiLog)
    private readonly aiLogRepository: Repository<AiLog>,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY가 설정되지 않았습니다. AI 추천 기능이 제한됩니다.');
    }
    this.openai = new OpenAI({
      apiKey: apiKey || 'dummy-key', // 키가 없어도 서비스는 시작됨
    });
  }

  /**
   * 스드메(스튜디오, 드레스, 메이크업) 조합 추천
   * @param request - 추천 요청 파라미터 (결혼일, 지역, 예산)
   * @param userId - 요청 사용자 ID (로깅용)
   * @returns 추천된 업체 조합
   */
  async recommendVendorCombination(
    request: RecommendationRequest,
    userId: string,
  ): Promise<VendorCombinationRecommendation> {
    this.logger.log(`스드메 추천 시작: userId=${userId}`);

    try {
      // 1단계: DB에서 후보 업체 추출 (SQL 필터링)
      const candidates = await this.fetchCandidates(request);

      this.logger.log(
        `후보 업체 수: STUDIO=${candidates.studio.length}, DRESS=${candidates.dress.length}, MAKEUP=${candidates.makeup.length}`,
      );

      // 2단계: OpenAI API로 최적 조합 선택
      const recommendation = await this.selectBestCombination(candidates, request, userId);

      this.logger.log(`스드메 추천 완료: userId=${userId}`);
      return recommendation;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`스드메 추천 실패: ${errorMessage}`, errorStack);
      // 에러 발생 시 빈 추천 반환
      return {
        studio: null,
        dress: null,
        makeup: null,
        venue: null,
        overall_reason: '추천 시스템 오류로 인해 추천을 생성할 수 없습니다.',
      };
    }
  }

  /**
   * 1단계: DB에서 후보 업체 추출
   * - 지역, 예산 기반 필터링
   * - 각 카테고리별 최대 10개 추출
   */
  private async fetchCandidates(request: RecommendationRequest) {
    const categories = ['STUDIO', 'DRESS', 'MAKEUP'] as const;
    const maxCandidatesPerCategory = 10;

    const results: Record<string, AiResource[]> = {
      studio: [],
      dress: [],
      makeup: [],
    };

    for (const category of categories) {
      const queryBuilder = this.aiResourceRepository
        .createQueryBuilder('ai_resource')
        .where('ai_resource.category = :category', { category });

      // 지역 필터링
      if (request.preferred_region) {
        queryBuilder.andWhere(
          "ai_resource.metadata->>'region' = :region OR ai_resource.metadata->>'region' IS NULL",
          { region: request.preferred_region },
        );
      }

      // 예산 필터링 (metadata에 price_min, price_max가 있다고 가정)
      if (request.budget_limit) {
        queryBuilder.andWhere(
          "(ai_resource.metadata->>'price_min')::int <= :budget OR ai_resource.metadata->>'price_min' IS NULL",
          { budget: request.budget_limit },
        );
      }

      // 최대 개수 제한
      queryBuilder.limit(maxCandidatesPerCategory);

      const candidates = await queryBuilder.getMany();
      const key = category.toLowerCase();
      results[key] = candidates;
    }

    return results;
  }

  /**
   * 2단계: OpenAI API로 최적 조합 선택
   */
  private async selectBestCombination(
    candidates: Record<string, AiResource[]>,
    request: RecommendationRequest,
    userId: string,
  ): Promise<VendorCombinationRecommendation> {
    // 후보가 없으면 null 반환
    if (
      candidates.studio.length === 0 &&
      candidates.dress.length === 0 &&
      candidates.makeup.length === 0
    ) {
      this.logger.warn('추천 가능한 후보가 없습니다.');
      return {
        studio: null,
        dress: null,
        makeup: null,
        venue: null,
        overall_reason: '선호하시는 조건에 맞는 업체를 찾을 수 없습니다.',
      };
    }

    // 프롬프트 생성
    const prompt = this.buildPrompt(candidates, request);

    try {
      const startTime = Date.now();
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `당신은 결혼 준비를 돕는 웨딩 플래너 AI입니다. 
사용자의 조건에 맞는 스튜디오, 드레스, 메이크업 업체를 추천해주세요.
응답은 반드시 JSON 형식으로만 작성하세요.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const responseTime = Date.now() - startTime;
      const responseContent = completion.choices[0].message.content || '{}';
      const recommendation = JSON.parse(responseContent) as AiRecommendationResponse;

      // AI 로그 저장
      await this.saveAiLog({
        user_id: userId,
        request_prompt: prompt,
        response_result: recommendation,
        model_name: 'gpt-4o-mini',
        input_tokens: completion.usage?.prompt_tokens || 0,
        output_tokens: completion.usage?.completion_tokens || 0,
        total_tokens: completion.usage?.total_tokens || 0,
      });

      this.logger.log(`OpenAI API 호출 완료 (${responseTime}ms)`);

      // 응답 파싱 및 검증
      return this.parseRecommendation(recommendation, candidates);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      this.logger.error(`OpenAI API 호출 실패: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * 프롬프트 생성
   */
  private buildPrompt(
    candidates: Record<string, AiResource[]>,
    request: RecommendationRequest,
  ): string {
    const parts: string[] = [];

    parts.push('다음 조건에 맞는 웨딩 업체를 추천해주세요:\n');

    // 사용자 조건
    if (request.wedding_date) {
      parts.push(`- 결혼 예정일: ${request.wedding_date.toISOString().split('T')[0]}`);
    }
    if (request.preferred_region) {
      parts.push(`- 선호 지역: ${request.preferred_region}`);
    }
    if (request.budget_limit) {
      parts.push(`- 예산: ${request.budget_limit.toLocaleString()}원`);
    }
    parts.push('');

    // 후보 업체 정보
    for (const [category, items] of Object.entries(candidates)) {
      if (items.length === 0) continue;

      const categoryName = {
        studio: '스튜디오',
        dress: '드레스',
        makeup: '메이크업',
      }[category];

      parts.push(`[${categoryName} 후보]`);
      items.forEach((item, idx) => {
        parts.push(`${idx + 1}. ID: ${item.vendor_id}`);
        parts.push(`   이름: ${item.name}`);
        parts.push(`   설명: ${item.content}`);
        if (item.metadata) {
          parts.push(`   메타데이터: ${JSON.stringify(item.metadata)}`);
        }
        parts.push('');
      });
    }

    parts.push('각 카테고리에서 가장 적합한 업체를 1개씩 선택하고, 선택 이유를 설명해주세요.');
    parts.push('후보가 없는 카테고리는 null로 설정해주세요.');
    parts.push('\n응답 형식:');
    parts.push(
      JSON.stringify(
        {
          studio: {
            vendor_id: 'uuid',
            name: '업체명',
            selection_reason: '선택 이유',
          },
          dress: {
            vendor_id: 'uuid',
            name: '업체명',
            selection_reason: '선택 이유',
          },
          makeup: {
            vendor_id: 'uuid',
            name: '업체명',
            selection_reason: '선택 이유',
          },
          overall_reason: '전체 조합 추천 이유',
        },
        null,
        2,
      ),
    );

    return parts.join('\n');
  }

  /**
   * AI 응답 파싱 및 검증
   */
  private parseRecommendation(
    response: AiRecommendationResponse,
    candidates: Record<string, AiResource[]>,
  ): VendorCombinationRecommendation {
    const result: VendorCombinationRecommendation = {
      studio: null,
      dress: null,
      makeup: null,
      venue: null,
      overall_reason: response.overall_reason || '',
    };

    // 각 카테고리별로 추천 결과 검증
    for (const category of ['studio', 'dress', 'makeup'] as const) {
      const categoryResponse = response[category];

      if (categoryResponse && categoryResponse.vendor_id) {
        // vendor_id가 실제 후보 목록에 있는지 확인
        const candidate = candidates[category].find(
          (c) => c.vendor_id === categoryResponse.vendor_id,
        );

        if (candidate) {
          result[category] = {
            vendor_id: candidate.vendor_id,
            category: category.toUpperCase(),
            name: categoryResponse.name || candidate.name,
            selection_reason: categoryResponse.selection_reason || '추천 업체입니다.',
          };
        } else {
          this.logger.warn(
            `AI가 추천한 ${category} 업체(${categoryResponse.vendor_id})가 후보 목록에 없습니다.`,
          );
        }
      }
    }

    return result;
  }

  /**
   * AI 로그 저장
   */
  private async saveAiLog(logData: {
    user_id: string;
    request_prompt: string;
    response_result: AiRecommendationResponse;
    model_name: string;
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  }): Promise<void> {
    try {
      const log = this.aiLogRepository.create(logData);
      await this.aiLogRepository.save(log);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      this.logger.error(`AI 로그 저장 실패: ${errorMessage}`);
    }
  }
}
