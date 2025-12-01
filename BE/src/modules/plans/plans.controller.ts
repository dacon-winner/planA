import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import {
  PlanListResponseDto,
  PlanDetailResponseDto,
  SetMainPlanResponseDto,
  UpdatePlanTitleDto,
  UpdatePlanTitleResponseDto,
  CreatePlanDto,
  CreatePlanResponseDto,
  AddPlanVendorDto,
  AddPlanVendorResponseDto,
  DeletePlanResponseDto,
  MainPlanResponseDto,
} from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators';

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
   * 빈 플랜 생성 API
   * @description users_info와 plan을 함께 생성하여 빈 플랜을 만듭니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @param createPlanDto - 플랜 생성 정보
   * @returns 생성 완료 메시지
   *
   * @example
   * POST /api/v1/plans
   * Body: {
   *   "wedding_date": "2025-06-15",
   *   "preferred_region": "서울 강남구",
   *   "budget_limit": 50000000,
   *   "title": "우리의 웨딩 플랜"
   * }
   *
   * // 응답 예시
   * {
   *   "message": "빈 플랜 생성 성공"
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   */
  @Post()
  @ApiOperation({
    summary: '빈 플랜 생성',
    description:
      '새로운 빈 플랜을 생성합니다.\n\n' +
      '- users_info 테이블을 먼저 생성합니다 (wedding_date, preferred_region, budget_limit).\n' +
      '- 그 다음 plan 테이블을 생성합니다 (title 사용).\n' +
      '- total_budget은 null, is_ai_generated는 false로 설정됩니다.\n' +
      '- plan_items는 생성되지 않으며, 이후 수동으로 추가 가능합니다.\n' +
      '- 모든 필드는 선택사항입니다.',
  })
  @ApiResponse({
    status: 200,
    description: '빈 플랜 생성 성공',
    type: CreatePlanResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async createPlan(
    @CurrentUser('id') userId: string,
    @Body() createPlanDto: CreatePlanDto,
  ): Promise<CreatePlanResponseDto> {
    return this.plansService.createEmptyPlan(userId, createPlanDto);
  }

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
   * 메인 플랜 조회 API
   * @description 사용자의 메인 플랜(is_main_plan=true)의 업체 정보를 조회합니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @returns 메인 플랜 정보 및 포함된 업체 목록
   *
   * @example
   * GET /api/v1/plans/main
   *
   * // 응답 예시
   * {
   *   "success": true,
   *   "data": {
   *     "plan_id": "550e8400-e29b-41d4-a716-446655440000",
   *     "plan_title": "나의 웨딩",
   *     "wedding_date": "2025-06-15",
   *     "items": [
   *       {
   *         "plan_item_id": "uuid",
   *         "vendor_id": "uuid",
   *         "vendor_name": "○○웨딩홀",
   *         "category": "VENUE",
   *         "address": "서울시 강남구 ...",
   *         "reservation_date": "2025-03-15"
   *       },
   *       {
   *         "plan_item_id": "uuid",
   *         "vendor_id": "uuid",
   *         "vendor_name": "××스튜디오",
   *         "category": "STUDIO",
   *         "address": "서울시 서초구 ...",
   *         "reservation_date": null
   *       }
   *     ]
   *   }
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   * @throws 404 Not Found - 메인 플랜을 찾을 수 없음
   */
  @Get('main')
  @ApiOperation({
    summary: '메인 플랜 조회',
    description:
      '사용자의 메인 플랜 정보를 조회합니다.\n\n' +
      '**데이터 조회 흐름:**\n' +
      '1. JWT 토큰에서 user_id 추출\n' +
      '2. users_info 테이블에서 is_main_plan=true인 레코드 조회\n' +
      '3. plan 테이블에서 해당 users_info_id로 플랜 조회\n' +
      '4. plan_item 테이블에서 plan_id로 모든 아이템 조회\n' +
      '5. 각 아이템의 vendor 정보 조회 (name, category, address)\n' +
      '6. 각 vendor에 대한 reservation 조회 (있는 경우만)\n\n' +
      '**반환 필드:**\n' +
      '- plan_id: 플랜 UUID\n' +
      '- plan_title: 플랜 제목\n' +
      '- wedding_date: 결혼 예정일\n' +
      '- items: 플랜에 포함된 업체 목록\n' +
      '  - plan_item_id: 플랜 아이템 UUID\n' +
      '  - vendor_id: 업체 UUID\n' +
      '  - vendor_name: 업체명\n' +
      '  - category: 업체 카테고리 (VENUE, STUDIO, DRESS, MAKEUP)\n' +
      '  - address: 업체 주소\n' +
      '  - reservation_date: 예약일 (nullable)',
  })
  @ApiResponse({
    status: 200,
    description: '메인 플랜 조회 성공',
    type: MainPlanResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 404,
    description: '메인 플랜을 찾을 수 없음',
  })
  async getMainPlan(@CurrentUser('id') userId: string): Promise<MainPlanResponseDto> {
    return this.plansService.getMainPlan(userId);
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
  @Public()
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

  /**
   * 대표 플랜 설정 API
   * @description 특정 플랜을 대표 플랜으로 설정합니다.
   * 기존 대표 플랜은 자동으로 해제됩니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @param planId - 대표 플랜으로 설정할 플랜 ID
   * @returns 설정 완료 메시지
   *
   * @example
   * POST /api/v1/plans/main
   * Body: { "planId": "550e8400-e29b-41d4-a716-446655440000" }
   *
   * // 응답 예시
   * {
   *   "message": "대표 플랜이 설정되었습니다.",
   *   "planId": "550e8400-e29b-41d4-a716-446655440000",
   *   "usersInfoId": "550e8400-e29b-41d4-a716-446655440001"
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   * @throws 404 Not Found - 플랜을 찾을 수 없음
   */
  @Post('main')
  @ApiOperation({
    summary: '대표 플랜 설정',
    description:
      '특정 플랜을 대표 플랜으로 설정합니다.\n\n' +
      '- 기존에 대표 플랜으로 설정된 플랜이 있다면 자동으로 해제됩니다.\n' +
      '- 헤더의 JWT 토큰에서 사용자 ID를 추출합니다.\n' +
      '- 바디에서 받은 plan ID로 해당 플랜을 조회합니다.\n' +
      '- 해당 플랜의 users_info를 대표 플랜으로 설정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '대표 플랜 설정 성공',
    type: SetMainPlanResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 404,
    description: '플랜을 찾을 수 없음',
  })
  async setMainPlan(
    @CurrentUser('id') userId: string,
    @Body('planId') planId: string,
  ): Promise<SetMainPlanResponseDto> {
    return this.plansService.setMainPlan(userId, planId);
  }

  /**
   * 플랜 제목 수정 API
   * @description 플랜의 제목을 수정합니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @param planId - 플랜 ID
   * @param updatePlanTitleDto - 새로운 제목
   * @returns 수정 완료 메시지
   *
   * @example
   * POST /api/v1/plans/550e8400-e29b-41d4-a716-446655440000/update-title
   * Body: { "title": "우리의 꿈같은 웨딩" }
   *
   * // 응답 예시
   * {
   *   "message": "플랜 제목이 수정되었습니다.",
   *   "planId": "550e8400-e29b-41d4-a716-446655440000",
   *   "title": "우리의 꿈같은 웨딩"
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   * @throws 404 Not Found - 플랜을 찾을 수 없음
   */
  @Post(':id/update-title')
  @ApiOperation({
    summary: '플랜 제목 수정',
    description:
      '플랜의 제목을 수정합니다.\n\n' +
      '- JWT 토큰의 사용자 ID와 플랜의 소유자가 일치해야 합니다.\n' +
      '- 제목은 최대 100자까지 입력 가능합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '플랜 ID',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: '플랜 제목 수정 성공',
    type: UpdatePlanTitleResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 404,
    description: '플랜을 찾을 수 없거나 권한이 없음',
  })
  async updatePlanTitle(
    @CurrentUser('id') userId: string,
    @Param('id') planId: string,
    @Body() updatePlanTitleDto: UpdatePlanTitleDto,
  ): Promise<UpdatePlanTitleResponseDto> {
    return this.plansService.updatePlanTitle(userId, planId, updatePlanTitleDto.title);
  }

  /**
   * 플랜에 업체 추가/교체 API
   * @description 플랜에 업체를 추가하거나 같은 카테고리의 업체를 교체합니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @param planId - 플랜 ID
   * @param addPlanVendorDto - 추가/교체할 업체 ID
   * @returns 작업 결과 (추가/교체 여부 및 플랜 아이템 정보)
   *
   * @example
   * POST /api/v1/plans/550e8400-e29b-41d4-a716-446655440000/vendors
   * Body: { "vendorId": "550e8400-e29b-41d4-a716-446655440002" }
   *
   * // 응답 예시 (추가)
   * {
   *   "message": "플랜에 업체가 추가되었습니다.",
   *   "action": "added",
   *   "planItem": {
   *     "id": "plan-item-uuid",
   *     "vendor": {
   *       "id": "vendor-uuid",
   *       "name": "더 스튜디오",
   *       "category": "스튜디오"
   *     }
   *   }
   * }
   *
   * // 응답 예시 (교체)
   * {
   *   "message": "플랜의 업체가 교체되었습니다.",
   *   "action": "replaced",
   *   "planItem": {
   *     "id": "plan-item-uuid",
   *     "vendor": {
   *       "id": "vendor-uuid",
   *       "name": "새로운 스튜디오",
   *       "category": "스튜디오"
   *     }
   *   }
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   * @throws 404 Not Found - 플랜 또는 업체를 찾을 수 없음
   */
  @Post(':id/vendors')
  @ApiOperation({
    summary: '플랜에 업체 추가/교체',
    description:
      '플랜에 업체를 추가하거나 같은 카테고리의 업체를 교체합니다.\n\n' +
      '**동작 방식:**\n' +
      '- 플랜에 같은 카테고리의 업체가 **없으면** → 새로 추가 (action: "added")\n' +
      '- 플랜에 같은 카테고리의 업체가 **있으면** → 기존 업체를 교체 (action: "replaced")\n\n' +
      '**카테고리:**\n' +
      '- STUDIO: 스튜디오\n' +
      '- DRESS: 드레스\n' +
      '- MAKEUP: 헤어/메이크업\n' +
      '- VENUE: 웨딩홀\n\n' +
      '**예시:**\n' +
      '- 플랜에 스튜디오 A가 있는 상태에서 스튜디오 B를 추가 → A를 B로 교체\n' +
      '- 플랜에 스튜디오가 없는 상태에서 스튜디오 A를 추가 → A 추가\n' +
      '- 플랜에 스튜디오 A가 있는 상태에서 드레스 B를 추가 → B 추가 (카테고리가 다름)\n\n' +
      '**주의사항:**\n' +
      '- 예약이 있는 업체는 변경할 수 없습니다.\n' +
      '- 업체를 변경하려면 먼저 해당 업체의 예약을 취소해야 합니다.\n' +
      '- 이는 데이터 일관성과 사용자 경험을 보호하기 위함입니다.',
  })
  @ApiParam({
    name: 'id',
    description: '플랜 ID',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: '업체 추가/교체 성공',
    type: AddPlanVendorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 400,
    description: '예약이 있는 업체는 변경할 수 없음',
  })
  @ApiResponse({
    status: 404,
    description: '플랜 또는 업체를 찾을 수 없거나 권한이 없음',
  })
  async addVendor(
    @CurrentUser('id') userId: string,
    @Param('id') planId: string,
    @Body() addPlanVendorDto: AddPlanVendorDto,
  ): Promise<AddPlanVendorResponseDto> {
    return this.plansService.addOrUpdatePlanVendor(userId, planId, addPlanVendorDto.vendorId);
  }

  /**
   * 플랜 삭제 API (Soft Delete)
   * @description 플랜을 소프트 삭제합니다. 실제 데이터는 삭제되지 않고 deleted_at이 설정됩니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @param planId - 플랜 ID
   * @returns 삭제 완료 메시지
   *
   * @example
   * POST /api/v1/plans/550e8400-e29b-41d4-a716-446655440000/delete
   *
   * // 응답 예시
   * {
   *   "message": "플랜이 삭제되었습니다.",
   *   "planId": "550e8400-e29b-41d4-a716-446655440000"
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   * @throws 404 Not Found - 플랜을 찾을 수 없거나 권한이 없음
   */
  @Post(':id/delete')
  @ApiOperation({
    summary: '플랜 삭제 (Soft Delete)',
    description:
      '플랜을 소프트 삭제합니다.\n\n' +
      '**Soft Delete 방식:**\n' +
      '- 실제 데이터는 삭제되지 않습니다.\n' +
      '- deleted_at 컬럼에 현재 시각이 설정됩니다.\n' +
      '- 이후 플랜 조회 시 자동으로 제외됩니다.\n\n' +
      '**보존되는 데이터:**\n' +
      '- plan 테이블: deleted_at만 설정됨\n' +
      '- plan_items: 그대로 유지\n' +
      '- reservations: plan_id 그대로 유지\n' +
      '- users_info: 그대로 유지\n\n' +
      '**장점:**\n' +
      '- 데이터 복구 가능\n' +
      '- 예약 정보와 플랜의 연결 관계 유지\n' +
      '- 통계 및 분석 가능',
  })
  @ApiParam({
    name: 'id',
    description: '플랜 ID',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: '플랜 삭제 성공',
    type: DeletePlanResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 404,
    description: '플랜을 찾을 수 없거나 권한이 없음',
  })
  async deletePlan(
    @CurrentUser('id') userId: string,
    @Param('id') planId: string,
  ): Promise<DeletePlanResponseDto> {
    return this.plansService.deletePlan(userId, planId);
  }
}
