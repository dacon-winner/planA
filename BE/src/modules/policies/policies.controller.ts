import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PoliciesService } from './policies.service';
import { GetPoliciesResponseDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { Public } from '../../common/decorators';

/**
 * 정책 정보 API 컨트롤러
 *
 * @description
 * 정부지원 정책 정보를 조회하는 API 엔드포인트를 제공합니다.
 *
 * 주요 기능:
 * - 모든 정책 정보 조회 (대출, 보조금, 주택 지원 등)
 */
@ApiTags('정책 정보 (Policies)')
@Controller('policies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  /**
   * 모든 정책 정보 조회 API
   *
   * @description
   * policy_info 테이블의 모든 정책 정보를 조회합니다.
   * - 신혼부부 대출 정보
   * - 정부 보조금 정보
   * - 주택 지원 정책 정보
   *
   * @returns {Promise<GetPoliciesResponseDto>} 정책 목록과 총 개수
   *
   * @example
   * // 요청
   * GET /policies
   *
   * // 응답 예시
   * {
   *   "policies": [
   *     {
   *       "id": "550e8400-e29b-41d4-a716-446655440000",
   *       "title": "신혼부부 전용 구입자금 대출 (디딤돌)",
   *       "subtitle": "생애 최초 내 집 마련을 꿈꾸는 신혼부부를 위한 저금리 대출",
   *       "type": "LOAN",
   *       "badges": ["저금리", "최대4억", "LTV80%"],
   *       "benefit_summary": "최저 연 2.15% ~ 3.25% 금리 적용, 최대 4억원 한도 (생애최초 주택구입 시 LTV 80% 적용)",
   *       "apply_url": "https://nhuf.molit.go.kr/",
   *       "thumbnail_url": "https://cdn.plana.com/policy/didimdol.png"
   *     },
   *     {
   *       "id": "660e8400-e29b-41d4-a716-446655440001",
   *       "title": "신혼부부 전용 전세자금 대출 (버팀목)",
   *       "subtitle": "높은 전세금이 부담되는 신혼부부를 위한 전세 보증금 대출",
   *       "type": "LOAN",
   *       "badges": ["전세자금", "수도권3억", "저금리"],
   *       "benefit_summary": "연 1.5% ~ 2.7% 저금리, 수도권 최대 3억원(지방 2억원) 대출 한도 지원",
   *       "apply_url": "https://nhuf.molit.go.kr/",
   *       "thumbnail_url": "https://cdn.plana.com/policy/beotimmok.png"
   *     }
   *   ],
   *   "total": 8
   * }
   */
  @Get()
  @Public()
  @ApiOperation({
    summary: '모든 정책 정보 조회',
    description:
      'policy_info 테이블의 모든 정책 정보를 조회합니다.\n\n' +
      '**포함되는 정책 유형**:\n' +
      '- LOAN: 신혼부부 대출 (디딤돌, 버팀목, 신생아 특례 등)\n' +
      '- SUBSIDY: 정부 보조금 (첫만남이용권, 임신출산진료비, 난임지원 등)\n' +
      '- HOUSING: 주택 지원 (신혼희망타운 등)\n\n' +
      '**반환 정보**:\n' +
      '- id: 정책 고유 ID\n' +
      '- title: 정책 제목\n' +
      '- subtitle: 정책 부제목 (간단한 설명)\n' +
      '- type: 정책 유형 (LOAN/SUBSIDY/HOUSING)\n' +
      '- badges: 정책 특징을 나타내는 뱃지 배열\n' +
      '- benefit_summary: 혜택 요약\n' +
      '- apply_url: 신청 URL\n' +
      '- thumbnail_url: 썸네일 이미지 URL\n\n' +
      '**정렬**: 제목 오름차순',
  })
  @ApiResponse({
    status: 200,
    description: '정책 목록 조회 성공',
    type: GetPoliciesResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류',
  })
  async getPolicies(): Promise<GetPoliciesResponseDto> {
    return this.policiesService.getPolicies();
  }
}

