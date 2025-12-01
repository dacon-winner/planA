import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolicyInfo } from '../../entities';
import { GetPoliciesResponseDto, PolicyDto } from './dto';

/**
 * 정책 정보 서비스
 *
 * @description
 * 정부지원 정책 정보를 조회하는 비즈니스 로직을 담당합니다.
 */
@Injectable()
export class PoliciesService {
  private readonly logger = new Logger(PoliciesService.name);

  constructor(
    @InjectRepository(PolicyInfo)
    private readonly policyInfoRepository: Repository<PolicyInfo>,
  ) {}

  /**
   * 모든 정책 정보 조회
   *
   * @description
   * policy_info 테이블의 모든 정책 정보를 조회하여 반환합니다.
   *
   * @returns {Promise<GetPoliciesResponseDto>} 정책 목록과 총 개수
   *
   * @example
   * const result = await this.policiesService.getPolicies();
   * // {
   * //   policies: [
   * //     {
   * //       id: "uuid",
   * //       title: "신혼부부 전용 구입자금 대출 (디딤돌)",
   * //       subtitle: "생애 최초 내 집 마련을 꿈꾸는 신혼부부를 위한 저금리 대출",
   * //       type: "LOAN",
   * //       badges: ["저금리", "최대4억", "LTV80%"],
   * //       benefit_summary: "최저 연 2.15% ~ 3.25% 금리 적용...",
   * //       apply_url: "https://nhuf.molit.go.kr/",
   * //       thumbnail_url: "https://cdn.plana.com/policy/didimdol.png"
   * //     },
   * //     ...
   * //   ],
   * //   total: 8
   * // }
   */
  async getPolicies(): Promise<GetPoliciesResponseDto> {
    this.logger.log('모든 정책 정보 조회 시작');

    try {
      // policy_info 테이블의 모든 데이터 조회
      const [policies, total] = await this.policyInfoRepository.findAndCount({
        order: {
          title: 'ASC', // 제목 오름차순 정렬
        },
      });

      this.logger.log(`정책 정보 조회 완료: 총 ${total}건`);

      // DTO로 변환
      const policyDtos: PolicyDto[] = policies.map((policy) => ({
        id: policy.id,
        title: policy.title,
        subtitle: policy.subtitle || null,
        type: policy.type || null,
        badges: Array.isArray(policy.badges) ? policy.badges : [],
        benefit_summary: policy.benefit_summary || null,
        apply_url: policy.apply_url || null,
        thumbnail_url: policy.thumbnail_url || null,
      }));

      return {
        policies: policyDtos,
        total,
      };
    } catch (error) {
      this.logger.error('정책 정보 조회 중 오류 발생', error);
      throw error;
    }
  }
}

