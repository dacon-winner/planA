import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { PlanListResponseDto, PlanDetailResponseDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

/**
 * 플랜 관련 API 컨트롤러
 * @description 플랜 목록 조회, 플랜 상세 조회 등의 API를 제공합니다.
 */
@ApiTags('플랜 (Plans)')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  /**
   * 플랜 목록 조회 API
   * @description 사용자의 모든 플랜 목록을 조회합니다.
   * 각 users_info와 연결된 plan 정보를 함께 반환합니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @returns 플랜 목록
   *
   * @example
   * GET /api/v1/plans
   *
   * // 응답 예시
   * {
   *   "items": [
   *     {
   *       "users_info": {
   *         "id": "uuid",
   *         "is_main_plan": true,
   *         "wedding_date": "2025-06-15",
   *         "preferred_region": "서울 강남구",
   *         "budget_limit": 50000000
   *       },
   *       "plan": {
   *         "id": "uuid",
   *         "title": "플랜 A",
   *         "total_budget": 45000000,
   *         "is_ai_generated": true
   *       }
   *     }
   *   ]
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   */
  @Get()
  @ApiOperation({
    summary: '플랜 목록 조회',
    description:
      '사용자의 모든 플랜 목록을 조회합니다.\n\n' +
      '- 사용자의 모든 users_info와 연결된 plan 정보를 반환합니다.\n' +
      '- users_info와 plan은 1:1 관계입니다.\n' +
      '- plan이 없는 users_info의 경우 plan 필드가 null로 반환됩니다.',
  })
  @ApiResponse({
    status: 200,
    description: '플랜 목록 조회 성공',
    type: PlanListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async getPlans(@CurrentUser('id') userId: string): Promise<PlanListResponseDto> {
    return this.plansService.getPlanList(userId);
  }

  /**
   * 플랜 상세 조회 API
   * @description 특정 플랜의 상세 정보를 조회합니다.
   * users_info, plan 정보와 함께 plan_items, 예약 정보를 반환합니다.
   *
   * @param planId - 플랜 ID (URL 파라미터)
   * @returns 플랜 상세 정보
   *
   * @example
   * GET /api/v1/plans/550e8400-e29b-41d4-a716-446655440000
   *
   * // 응답 예시
   * {
   *   "users_info": {
   *     "is_main_plan": true,
   *     "wedding_date": "2025-06-15",
   *     "preferred_region": "서울 강남구",
   *     "budget_limit": 50000000
   *   },
   *   "plan": {
   *     "title": "AI 추천 플랜",
   *     "total_budget": 45000000,
   *     "is_ai_generated": true
   *   },
   *   "plan_items": [
   *     {
   *       "is_confirmed": true,
   *       "vendor": {
   *         "id": "550e8400-e29b-41d4-a716-446655440002",
   *         "name": "더 스튜디오",
   *         "category": "스튜디오",
   *         "region": "서울 강남구",
   *         "thumbnail_url": "https://example.com/thumbnail.jpg"
   *       },
   *       "reservation": {
   *         "reservation_date": "2025-06-10",
   *         "reservation_time": "14:00"
   *       }
   *     }
   *   ]
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   * @throws 404 Not Found - 플랜을 찾을 수 없음
   */
  @Get(':id')
  @ApiOperation({
    summary: '플랜 상세 조회',
    description:
      '특정 플랜의 상세 정보를 조회합니다.\n\n' +
      '- users_info: 메인 플랜 여부, 결혼 예정일, 선호 지역, 예산 한도\n' +
      '- plan: 제목, 총 예산, AI 생성 여부\n' +
      '- plan_items: 플랜에 포함된 업체 목록\n' +
      '  - is_confirmed: 확정 여부\n' +
      '  - vendor: 업체 정보 (id, name, category, region, thumbnail_url)\n' +
      '  - reservation: 예약 정보 (확정된 경우만)\n' +
      '- 업체 카테고리는 한글로 변환됩니다\n' +
      '  - MAKEUP → 헤어/메이크업\n' +
      '  - DRESS → 드레스\n' +
      '  - STUDIO → 스튜디오\n' +
      '  - VENUE → 웨딩홀',
  })
  @ApiParam({
    name: 'id',
    description: '플랜 ID',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: '플랜 상세 조회 성공',
    type: PlanDetailResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 404,
    description: '플랜을 찾을 수 없음',
  })
  async getPlanDetail(@Param('id') planId: string): Promise<PlanDetailResponseDto> {
    return this.plansService.getPlanDetail(planId);
  }
}
