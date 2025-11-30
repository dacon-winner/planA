import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, Not } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Vendor } from '../../entities/vendor.entity';
import { ServiceItem } from '../../entities/service-item.entity';
import { AiResource } from '../../entities/ai-resource.entity';
import { PlanItem } from '../../entities/plan-item.entity';
import { VendorImage } from '../../entities/vendor-image.entity';
import {
  GetVendorsQueryDto,
  GetVendorDetailQueryDto,
  GetVendorDetailResponseDto,
  AiRecommendationResponseDto,
  RecommendedVendorDto,
} from './dto';

@Injectable()
export class VendorsService {
  private readonly logger = new Logger(VendorsService.name);
  private readonly openai: OpenAI;

  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(ServiceItem)
    private readonly serviceItemRepository: Repository<ServiceItem>,
    @InjectRepository(AiResource)
    private readonly aiResourceRepository: Repository<AiResource>,
    @InjectRepository(PlanItem)
    private readonly planItemRepository: Repository<PlanItem>,
    @InjectRepository(VendorImage)
    private readonly vendorImageRepository: Repository<VendorImage>,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY가 설정되지 않았습니다. AI 추천 기능이 제한됩니다.');
    }
    this.openai = new OpenAI({
      apiKey: apiKey || 'dummy-key',
    });
  }

  /**
   * 지도용 업체 목록 조회
   * 지도 영역 내의 업체를 category로 필터링
   */
  async getVendors(queryDto: GetVendorsQueryDto) {
    const {
      category,
      swLat,
      swLng,
      neLat,
      neLng,
      page = '1',
      limit = '20',
      sort = 'rating',
    } = queryDto;

    // 페이지네이션 계산
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // 좌표 파싱
    const southWestLat = parseFloat(swLat);
    const southWestLng = parseFloat(swLng);
    const northEastLat = parseFloat(neLat);
    const northEastLng = parseFloat(neLng);

    // 좌표 유효성 검증
    if (isNaN(southWestLat) || isNaN(southWestLng) || isNaN(northEastLat) || isNaN(northEastLng)) {
      throw new BadRequestException('Invalid coordinates');
    }

    // vendor 조회 (지도 영역 내 + category 필터)
    const queryBuilder = this.vendorRepository
      .createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.service_items', 'service_item')
      .leftJoinAndSelect('vendor.ai_resources', 'ai_resource')
      .where('vendor.category = :category', { category })
      .andWhere('vendor.latitude BETWEEN :swLat AND :neLat', {
        swLat: southWestLat,
        neLat: northEastLat,
      })
      .andWhere('vendor.longitude BETWEEN :swLng AND :neLng', {
        swLng: southWestLng,
        neLng: northEastLng,
      });

    // 정렬 적용
    this.applySorting(queryBuilder, sort || 'rating');

    // 페이지네이션 적용
    queryBuilder.skip(skip).take(limitNum);

    const [vendors, total] = await queryBuilder.getManyAndCount();

    // 응답 데이터 포맷팅
    const formattedVendors = this.formatVendorResponse(vendors);

    return {
      vendors: formattedVendors,
      total,
      page: pageNum,
      limit: limitNum,
    };
  }

  /**
   * 정렬 로직 적용
   */
  private applySorting(queryBuilder: SelectQueryBuilder<Vendor>, sort: string) {
    switch (sort) {
      case 'rating':
        queryBuilder.orderBy('vendor.naver_rating', 'DESC');
        break;
      case 'review_count':
        queryBuilder.orderBy('vendor.review_count', 'DESC');
        break;
      case 'price':
        // service_item의 최소 가격 기준으로 정렬
        queryBuilder.orderBy('service_item.price', 'ASC');
        break;
      case 'name':
        queryBuilder.orderBy('vendor.name', 'ASC');
        break;
      default:
        queryBuilder.orderBy('vendor.naver_rating', 'DESC');
    }
  }

  /**
   * 업체 상세 조회
   * vendor_id로 업체 정보를 조회하고, plan_id가 제공된 경우 is_confirmed 값 포함
   */
  async getVendorDetail(
    vendorId: string,
    queryDto: GetVendorDetailQueryDto,
  ): Promise<GetVendorDetailResponseDto> {
    const { plan_id } = queryDto;

    // 업체 정보 조회 (service_items 포함)
    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorId },
      relations: ['service_items'],
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }

    // vendor_images 조회 (sort_order 오름차순 정렬)
    const vendorImages = await this.vendorImageRepository.find({
      where: { vendor_id: vendorId },
      order: { sort_order: 'ASC' },
    });

    // 기본 응답 객체 생성
    const response: GetVendorDetailResponseDto = {
      id: vendor.id,
      category: vendor.category,
      name: vendor.name,
      address: vendor.address,
      phone: vendor.phone,
      operating_hours: vendor.operating_hours,
      introduction: vendor.introduction,
      service_items:
        vendor.service_items?.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          is_package: item.is_package,
        })) || [],
      vendor_images: vendorImages.length > 0 ? vendorImages.map((img) => img.image_url) : null,
    };

    // plan_id가 제공된 경우 is_confirmed 값 조회
    if (plan_id) {
      const planItem = await this.planItemRepository.findOne({
        where: {
          plan_id: plan_id,
          vendor_id: vendorId,
        },
      });

      if (planItem) {
        response.is_confirmed = planItem.is_confirmed;
      }
    }

    return response;
  }

  /**
   * AI 기반 유사 업체 추천
   * 현재 업체와 유사하거나 함께 고려하면 좋을 업체를 AI로 추천
   */
  async getAiRecommendations(vendorId: string): Promise<AiRecommendationResponseDto> {
    this.logger.log(`AI 추천 시작: vendorId=${vendorId}`);

    try {
      // 1. 현재 업체의 AI 리소스 조회
      const currentAiResource = await this.aiResourceRepository.findOne({
        where: { vendor_id: vendorId },
      });

      if (!currentAiResource) {
        this.logger.warn(`AI 리소스가 없는 업체입니다: ${vendorId}`);
        return {
          recommendations: [],
          overall_reason: '현재 업체에 대한 AI 추천 정보가 없습니다.',
        };
      }

      // 2. 같은 카테고리의 다른 업체 후보 추출 (최대 15개)
      const candidates = await this.aiResourceRepository.find({
        where: {
          category: currentAiResource.category,
          vendor_id: Not(vendorId),
        },
        take: 15,
      });

      if (candidates.length === 0) {
        this.logger.warn(`추천 가능한 후보가 없습니다: ${vendorId}`);
        return {
          recommendations: [],
          overall_reason: '추천 가능한 유사 업체가 없습니다.',
        };
      }

      // 3. OpenAI API로 유사 업체 추천 요청
      const aiResponse = await this.requestAiRecommendations(currentAiResource, candidates);

      // 4. 추천된 업체의 실제 정보 조회
      const recommendations = await this.fetchRecommendedVendorDetails(aiResponse.recommendations);

      this.logger.log(`AI 추천 완료: vendorId=${vendorId}, 추천 수=${recommendations.length}`);

      return {
        recommendations,
        overall_reason: aiResponse.overall_reason,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      this.logger.error(`AI 추천 실패: ${errorMessage}`);
      throw new BadRequestException('AI 추천 생성 중 오류가 발생했습니다.');
    }
  }

  /**
   * OpenAI API로 유사 업체 추천 요청
   */
  private async requestAiRecommendations(
    currentVendor: AiResource,
    candidates: AiResource[],
  ): Promise<{
    recommendations: Array<{ vendor_id: string; reason: string }>;
    overall_reason: string;
  }> {
    const prompt = this.buildRecommendationPrompt(currentVendor, candidates);

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `당신은 결혼 준비를 돕는 웨딩 전문가입니다. 
사용자가 현재 보고 있는 업체와 유사하거나, 함께 고려하면 좋을 업체를 추천해주세요.
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

      const responseContent = completion.choices[0].message.content || '{}';
      const parsedResponse = JSON.parse(responseContent) as {
        recommendations?: Array<{ vendor_id: string; reason: string }>;
        overall_reason?: string;
      };

      return {
        recommendations: parsedResponse.recommendations || [],
        overall_reason: parsedResponse.overall_reason || 'AI가 선정한 추천 업체입니다.',
      };
    } catch (error) {
      this.logger.error('OpenAI API 호출 실패', error);
      throw error;
    }
  }

  /**
   * AI 추천 프롬프트 생성
   */
  private buildRecommendationPrompt(currentVendor: AiResource, candidates: AiResource[]): string {
    const parts: string[] = [];

    parts.push('사용자가 현재 보고 있는 업체:\n');
    parts.push(`이름: ${currentVendor.name}`);
    parts.push(`카테고리: ${currentVendor.category}`);
    parts.push(`특징: ${currentVendor.content}`);
    if (currentVendor.metadata && Object.keys(currentVendor.metadata).length > 0) {
      parts.push(`추가 정보: ${JSON.stringify(currentVendor.metadata)}`);
    }
    parts.push('\n---\n');

    parts.push('추천 후보 업체 목록:\n');
    candidates.forEach((candidate, idx) => {
      parts.push(`\n${idx + 1}. ID: ${candidate.vendor_id}`);
      parts.push(`   이름: ${candidate.name}`);
      parts.push(`   특징: ${candidate.content}`);
      if (candidate.metadata && Object.keys(candidate.metadata).length > 0) {
        parts.push(`   추가 정보: ${JSON.stringify(candidate.metadata)}`);
      }
    });

    parts.push('\n---\n');
    parts.push(
      '위 후보 중에서 현재 업체와 유사하거나 함께 고려하면 좋을 업체를 최대 5개 추천해주세요.',
    );
    parts.push('각 업체마다 왜 추천하는지 이유를 자세히 설명해주세요.\n');

    parts.push('응답 형식 (JSON):');
    parts.push(
      JSON.stringify(
        {
          recommendations: [
            {
              vendor_id: 'uuid',
              reason: '이 업체를 추천하는 상세한 이유 (2-3문장)',
            },
          ],
          overall_reason: '전체적인 추천 설명 (1-2문장)',
        },
        null,
        2,
      ),
    );

    return parts.join('\n');
  }

  /**
   * 추천된 업체의 실제 정보 조회
   */
  private async fetchRecommendedVendorDetails(
    aiRecommendations: Array<{ vendor_id: string; reason: string }>,
  ): Promise<RecommendedVendorDto[]> {
    const vendorIds = aiRecommendations.map((r) => r.vendor_id);

    if (vendorIds.length === 0) {
      return [];
    }

    // 업체 정보 조회
    const vendors = await this.vendorRepository
      .createQueryBuilder('vendor')
      .where('vendor.id IN (:...vendorIds)', { vendorIds })
      .getMany();

    // AI 추천 이유와 업체 정보 매핑
    const results: RecommendedVendorDto[] = [];
    for (const aiRec of aiRecommendations) {
      const vendor = vendors.find((v) => v.id === aiRec.vendor_id);
      if (vendor) {
        results.push({
          vendor_id: vendor.id,
          category: vendor.category,
          name: vendor.name,
          thumbnail_url: vendor.thumbnail_url,
          address: vendor.address,
          naver_rating: vendor.naver_rating,
          reason: aiRec.reason,
        });
      }
    }
    return results;
  }

  /**
   * 응답 데이터 포맷팅
   */
  private formatVendorResponse(vendors: Vendor[]) {
    return vendors.map((vendor) => ({
      id: vendor.id,
      category: vendor.category,
      name: vendor.name,
      address: vendor.address,
      phone: vendor.phone,
      operating_hours: vendor.operating_hours,
      latitude: vendor.latitude,
      longitude: vendor.longitude,
      thumbnail_url: vendor.thumbnail_url,
      naver_rating: vendor.naver_rating,
      review_count: vendor.review_count,
      total_score: vendor.total_score,
      badges: vendor.badges,
      // service_items 배열
      service_items:
        vendor.service_items?.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          thumbnail_url: item.thumbnail_url,
          is_package: item.is_package,
        })) || [],
      // ai_resources의 content만 추출
      ai_resources:
        vendor.ai_resources?.map((resource) => ({
          content: resource.content,
        })) || [],
    }));
  }
}
