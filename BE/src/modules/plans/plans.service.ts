import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../../entities/plan.entity';
import { PlanItem, ItemSource } from '../../entities/plan-item.entity';
import { UsersInfo } from '../../entities/users-info.entity';
import { Reservation } from '../../entities/reservation.entity';
import { Vendor, VendorCategory } from '../../entities/vendor.entity';
import { VendorCombinationRecommendation } from '../ai/interfaces';
import { AiService } from '../ai/ai.service';
import {
  PlanListResponseDto,
  PlanListItemDto,
  PlanDetailResponseDto,
  SetMainPlanResponseDto,
  UpdatePlanTitleResponseDto,
  CreatePlanResponseDto,
  AddPlanVendorResponseDto,
  DeletePlanResponseDto,
  MainPlanResponseDto,
  MainPlanItemDto,
} from './dto';

/**
 * 플랜 서비스
 * - AI 추천 기반 자동 플랜 생성
 */
@Injectable()
export class PlansService {
  private readonly logger = new Logger(PlansService.name);

  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @InjectRepository(PlanItem)
    private readonly planItemRepository: Repository<PlanItem>,
    @InjectRepository(UsersInfo)
    private readonly usersInfoRepository: Repository<UsersInfo>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly aiService: AiService,
  ) {}

  /**
   * AI 추천 기반 플랜 자동 생성
   * @param userId - 사용자 ID
   * @param usersInfoId - 사용자 상세 정보 ID
   * @param recommendations - AI 추천 결과
   * @returns 생성된 플랜
   */
  async createFromRecommendations(
    userId: string,
    usersInfoId: string,
    recommendations: VendorCombinationRecommendation,
  ): Promise<Plan> {
    this.logger.log(`AI 추천 플랜 생성 시작: userId=${userId}`);

    // 플랜 생성
    const plan = this.planRepository.create({
      user_id: userId,
      users_info_id: usersInfoId,
      title: 'AI 추천 플랜',
      is_ai_generated: true,
    });

    const savedPlan = await this.planRepository.save(plan);

    // 플랜 아이템 생성 (추천된 업체들)
    const planItems: PlanItem[] = [];
    let orderIndex = 0;

    // 1. 웨딩홀 (현재는 null, 향후 추가 가능)
    if (recommendations.venue) {
      planItems.push(
        this.planItemRepository.create({
          plan_id: savedPlan.id,
          vendor_id: recommendations.venue.vendor_id,
          source: ItemSource.AI_RECOMMEND,
          selection_reason: recommendations.venue.selection_reason,
          order_index: orderIndex++,
        }),
      );
    }

    // 2. 스튜디오
    if (recommendations.studio) {
      planItems.push(
        this.planItemRepository.create({
          plan_id: savedPlan.id,
          vendor_id: recommendations.studio.vendor_id,
          source: ItemSource.AI_RECOMMEND,
          selection_reason: recommendations.studio.selection_reason,
          order_index: orderIndex++,
        }),
      );
    }

    // 3. 드레스
    if (recommendations.dress) {
      planItems.push(
        this.planItemRepository.create({
          plan_id: savedPlan.id,
          vendor_id: recommendations.dress.vendor_id,
          source: ItemSource.AI_RECOMMEND,
          selection_reason: recommendations.dress.selection_reason,
          order_index: orderIndex++,
        }),
      );
    }

    // 4. 메이크업
    if (recommendations.makeup) {
      planItems.push(
        this.planItemRepository.create({
          plan_id: savedPlan.id,
          vendor_id: recommendations.makeup.vendor_id,
          source: ItemSource.AI_RECOMMEND,
          selection_reason: recommendations.makeup.selection_reason,
          order_index: orderIndex++,
        }),
      );
    }

    // 플랜 아이템 일괄 저장
    if (planItems.length > 0) {
      await this.planItemRepository.save(planItems);
      this.logger.log(`플랜 아이템 ${planItems.length}개 생성 완료`);
    }

    // 생성된 플랜 및 아이템 조회 (관계 포함)
    const planWithItems = await this.planRepository.findOne({
      where: { id: savedPlan.id },
      relations: [
        'plan_items',
        'plan_items.vendor',
        'plan_items.vendor.venue_detail',
        'plan_items.service_item',
      ],
    });

    this.logger.log(`AI 추천 플랜 생성 완료: planId=${savedPlan.id}`);
    return planWithItems!;
  }

  /**
   * 플랜 조회 (ID)
   */
  async findOne(id: string): Promise<Plan | null> {
    return await this.planRepository.findOne({
      where: { id },
      relations: [
        'plan_items',
        'plan_items.vendor',
        'plan_items.vendor.venue_detail',
        'users_info',
      ],
    });
  }

  /**
   * 사용자의 모든 플랜 조회
   */
  async findByUserId(userId: string): Promise<Plan[]> {
    return await this.planRepository.find({
      where: { user_id: userId },
      relations: ['plan_items', 'users_info'],
      order: { created_at: 'DESC' },
    });
  }

  /**
   * 사용자의 모든 플랜 목록 조회 (users_info 기반)
   * @param userId - 사용자 ID
   * @returns 플랜 목록 응답
   */
  async getPlanList(userId: string): Promise<PlanListResponseDto> {
    this.logger.log(`플랜 목록 조회 시작: userId=${userId}`);

    // 1. 사용자의 모든 users_info 조회
    const usersInfoList = await this.usersInfoRepository.find({
      where: { user_id: userId },
      relations: ['plan'],
      order: { created_at: 'DESC' },
    });

    // 2. 응답 데이터 포맷팅
    const items: PlanListItemDto[] = usersInfoList.map((usersInfo) => ({
      users_info: {
        id: usersInfo.id,
        is_main_plan: usersInfo.is_main_plan,
        wedding_date: this.formatDate(usersInfo.wedding_date),
        preferred_region: usersInfo.preferred_region,
        budget_limit: usersInfo.budget_limit,
      },
      plan: usersInfo.plan
        ? {
            id: usersInfo.plan.id,
            title: usersInfo.plan.title,
            total_budget: usersInfo.plan.total_budget,
            is_ai_generated: usersInfo.plan.is_ai_generated,
          }
        : null,
    }));

    this.logger.log(`플랜 목록 조회 완료: ${items.length}개`);

    return { items };
  }

  /**
   * Date 또는 문자열을 YYYY-MM-DD 형식으로 변환
   * @param date - Date 객체 또는 문자열
   * @returns YYYY-MM-DD 형식의 문자열 또는 null
   */
  private formatDate(date: Date | string | null): string | null {
    if (!date) return null;

    // 이미 문자열인 경우 (TypeORM이 date 타입을 문자열로 반환하는 경우)
    if (typeof date === 'string') {
      return date.split('T')[0];
    }

    // Date 객체인 경우
    return date.toISOString().split('T')[0];
  }

  /**
   * 카테고리를 한글로 변환
   */
  private getCategoryInKorean(category: VendorCategory): string {
    const categoryMap: Record<VendorCategory, string> = {
      [VendorCategory.ALL]: '전체',
      [VendorCategory.VENUE]: '웨딩홀',
      [VendorCategory.STUDIO]: '스튜디오',
      [VendorCategory.DRESS]: '드레스',
      [VendorCategory.MAKEUP]: '헤어/메이크업',
    };
    return categoryMap[category];
  }

  /**
   * 플랜 상세 조회
   * @param planId - 플랜 ID
   * @returns 플랜 상세 정보
   */
  async getPlanDetail(planId: string): Promise<PlanDetailResponseDto> {
    this.logger.log(`플랜 상세 조회 시작: planId=${planId}`);

    // 1. 플랜 조회 (users_info와 함께)
    const plan = await this.planRepository.findOne({
      where: { id: planId },
      relations: ['users_info'],
    });

    if (!plan) {
      throw new NotFoundException(`플랜을 찾을 수 없습니다. (planId: ${planId})`);
    }

    if (!plan.users_info) {
      throw new NotFoundException(`플랜의 사용자 정보를 찾을 수 없습니다. (planId: ${planId})`);
    }

    // 2. plan_items 조회 (vendor와 함께)
    const planItems = await this.planItemRepository.find({
      where: { plan_id: planId },
      relations: ['vendor', 'vendor.venue_detail'],
      order: { order_index: 'ASC' },
    });

    // 3. 확정된 plan_items의 예약 정보 조회
    const reservationMap = new Map<string, Reservation>();
    const confirmedItems = planItems.filter((item) => item.is_confirmed);

    if (confirmedItems.length > 0) {
      // 각 확정된 아이템의 vendor_id로 예약 조회
      for (const item of confirmedItems) {
        const reservation = await this.reservationRepository.findOne({
          where: {
            plan_id: planId,
            vendor_id: item.vendor_id,
          },
        });

        if (reservation) {
          reservationMap.set(item.vendor_id, reservation);
        }
      }
    }

    // 4. 응답 데이터 포맷팅
    const formattedPlanItems = planItems.map((item) => {
      const vendorInfo = {
        id: item.vendor.id,
        name: item.vendor.name,
        category: this.getCategoryInKorean(item.vendor.category),
        region: item.vendor.region,
        thumbnail_url: item.vendor.thumbnail_url,
      };

      let reservationInfo: { reservation_date: string; reservation_time: string } | null = null;
      if (item.is_confirmed) {
        const reservation = reservationMap.get(item.vendor_id);
        if (reservation) {
          reservationInfo = {
            reservation_date: this.formatDate(reservation.reservation_date)!,
            reservation_time: reservation.reservation_time,
          };
        }
      }

      return {
        is_confirmed: item.is_confirmed,
        vendor: vendorInfo,
        reservation: reservationInfo,
      };
    });

    const result: PlanDetailResponseDto = {
      users_info: {
        is_main_plan: plan.users_info.is_main_plan,
        wedding_date: this.formatDate(plan.users_info.wedding_date),
        preferred_region: plan.users_info.preferred_region,
        budget_limit: plan.users_info.budget_limit,
      },
      plan: {
        title: plan.title,
        total_budget: plan.total_budget,
        is_ai_generated: plan.is_ai_generated,
      },
      plan_items: formattedPlanItems,
    };

    this.logger.log(`플랜 상세 조회 완료: planId=${planId}`);
    return result;
  }

  /**
   * 대표 플랜 설정
   * @description 특정 플랜을 대표 플랜으로 설정합니다.
   * 기존 대표 플랜은 자동으로 해제됩니다.
   *
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param planId - 대표 플랜으로 설정할 플랜 ID
   * @returns 설정 완료 메시지
   *
   * 처리 과정:
   * 1. 바디에서 받은 plan ID로 plan 테이블을 조회하여 users_info_id를 추출
   * 2. 해당 플랜이 해당 사용자의 것인지 확인
   * 3. 해당 유저의 모든 users_info에서 is_main_plan을 false로 설정
   * 4. 해당 plan의 users_info_id의 is_main_plan을 true로 설정
   */
  async setMainPlan(userId: string, planId: string): Promise<SetMainPlanResponseDto> {
    this.logger.log(`대표 플랜 설정 시작: userId=${userId}, planId=${planId}`);

    // 1. 플랜 조회 및 users_info_id 추출
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException(`플랜을 찾을 수 없습니다. (planId: ${planId})`);
    }

    // 2. 플랜이 해당 사용자의 것인지 확인
    if (plan.user_id !== userId) {
      throw new NotFoundException(`해당 사용자의 플랜이 아닙니다. (planId: ${planId})`);
    }

    // 3. 해당 유저의 모든 users_info에서 is_main_plan을 false로 설정
    await this.usersInfoRepository.update(
      { user_id: userId, is_main_plan: true },
      { is_main_plan: false },
    );
    this.logger.log(`기존 대표 플랜 해제 완료: userId=${userId}`);

    // 4. 해당 plan의 users_info_id의 is_main_plan을 true로 설정
    await this.usersInfoRepository.update({ id: plan.users_info_id }, { is_main_plan: true });
    this.logger.log(`새 대표 플랜 설정 완료: usersInfoId=${plan.users_info_id}`);

    return {
      message: '대표 플랜이 설정되었습니다.',
      planId: plan.id,
      usersInfoId: plan.users_info_id,
    };
  }

  /**
   * 플랜 제목 수정
   * @description 플랜의 제목을 수정합니다.
   *
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param planId - 플랜 ID
   * @param title - 새로운 제목
   * @returns 수정 완료 메시지 및 수정된 제목
   *
   * @throws NotFoundException - 플랜을 찾을 수 없거나 다른 사용자의 것인 경우
   */
  async updatePlanTitle(
    userId: string,
    planId: string,
    title: string,
  ): Promise<UpdatePlanTitleResponseDto> {
    this.logger.log(`플랜 제목 수정 시작: userId=${userId}, planId=${planId}`);

    // 1. 플랜 조회
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException(`플랜을 찾을 수 없습니다. (planId: ${planId})`);
    }

    // 2. 플랜이 해당 사용자의 것인지 확인
    if (plan.user_id !== userId) {
      throw new NotFoundException(`해당 사용자의 플랜이 아닙니다. (planId: ${planId})`);
    }

    // 3. 제목 수정
    plan.title = title;
    await this.planRepository.save(plan);

    this.logger.log(`플랜 제목 수정 완료: planId=${planId}, title=${title}`);

    return {
      message: '플랜 제목이 수정되었습니다.',
      planId: plan.id,
      title: plan.title,
    };
  }

  /**
   * 빈 플랜 생성
   * @description users_info와 plan을 함께 생성합니다.
   *
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param dto - 플랜 생성 정보
   * @returns 생성 완료 메시지
   */
  async createEmptyPlan(
    userId: string,
    dto: {
      wedding_date?: string;
      preferred_region?: string;
      budget_limit?: number;
      title?: string;
    },
  ): Promise<CreatePlanResponseDto> {
    this.logger.log(`빈 플랜 생성 시작: userId=${userId}`);

    // 1. 해당 사용자의 기존 users_info 조회
    const existingUsersInfo = await this.usersInfoRepository.findOne({
      where: { user_id: userId },
    });

    // 기존 플랜이 없으면 is_main_plan=true, 있으면 false
    const isMainPlan = !existingUsersInfo;

    // 2. users_info 생성
    const weddingDate = dto.wedding_date ? new Date(dto.wedding_date) : null;
    const preferredRegion = dto.preferred_region || null;
    const budgetLimit = dto.budget_limit || null;

    const usersInfo = this.usersInfoRepository.create({
      user_id: userId,
      is_main_plan: isMainPlan,
      wedding_date: weddingDate,
      preferred_region: preferredRegion,
      budget_limit: budgetLimit,
    });

    const savedUsersInfo = await this.usersInfoRepository.save(usersInfo);
    this.logger.log(`사용자 상세 정보 생성 완료: usersInfoId=${savedUsersInfo.id}`);

    // 3. 빈 플랜 생성
    const planTitle = dto.title || '나의 웨딩';

    const plan = this.planRepository.create({
      user_id: userId,
      users_info_id: savedUsersInfo.id,
      title: planTitle,
      total_budget: null,
      is_ai_generated: false,
    });

    const savedPlan = await this.planRepository.save(plan);
    this.logger.log(`빈 플랜 생성 완료: planId=${savedPlan.id}`);

    return {
      message: '빈 플랜 생성 성공',
    };
  }

  /**
   * 플랜에 업체 추가 또는 교체
   * @description 같은 카테고리의 업체가 있으면 교체, 없으면 추가합니다.
   *
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param planId - 플랜 ID
   * @param vendorId - 추가/교체할 업체 ID
   * @returns 작업 결과 (추가/교체 여부 및 플랜 아이템 정보)
   *
   * @throws NotFoundException - 플랜, 업체를 찾을 수 없거나 권한이 없는 경우
   */
  async addOrUpdatePlanVendor(
    userId: string,
    planId: string,
    vendorId: string,
  ): Promise<AddPlanVendorResponseDto> {
    this.logger.log(
      `플랜 업체 추가/수정 시작: userId=${userId}, planId=${planId}, vendorId=${vendorId}`,
    );

    // 1. 플랜 조회 및 소유권 확인
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException(`플랜을 찾을 수 없습니다. (planId: ${planId})`);
    }

    if (plan.user_id !== userId) {
      throw new NotFoundException(`해당 사용자의 플랜이 아닙니다. (planId: ${planId})`);
    }

    // 2. 업체 조회 및 카테고리 확인
    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new NotFoundException(`업체를 찾을 수 없습니다. (vendorId: ${vendorId})`);
    }

    const vendorCategory = vendor.category;
    this.logger.log(`업체 카테고리: ${vendorCategory}`);

    // 3. 같은 카테고리의 기존 plan_item 조회
    const planItems = await this.planItemRepository.find({
      where: { plan_id: planId },
      relations: ['vendor'],
    });

    const existingItemWithSameCategory = planItems.find(
      (item) => item.vendor.category === vendorCategory,
    );

    let action: 'added' | 'replaced';
    let planItem: PlanItem;

    if (existingItemWithSameCategory) {
      // 4-A. 교체 (UPDATE)
      const oldVendorId = existingItemWithSameCategory.vendor_id;

      // 🔍 예약 여부 확인
      const hasReservation = await this.reservationRepository.findOne({
        where: {
          plan_id: planId,
          vendor_id: oldVendorId,
        },
      });

      if (hasReservation) {
        throw new BadRequestException(
          '예약이 있는 업체는 변경할 수 없습니다. 먼저 예약을 취소해주세요.',
        );
      }

      this.logger.log(`기존 ${vendorCategory} 업체를 교체합니다. (기존 ID: ${oldVendorId})`);

      existingItemWithSameCategory.vendor_id = vendorId;
      existingItemWithSameCategory.source = ItemSource.USER_SELECT;
      existingItemWithSameCategory.service_item_id = null; // 서비스 아이템 리셋

      planItem = await this.planItemRepository.save(existingItemWithSameCategory);
      action = 'replaced';
    } else {
      // 4-B. 추가 (INSERT)
      this.logger.log(`새로운 ${vendorCategory} 업체를 추가합니다.`);

      // order_index 계산 (기존 최대값 + 1)
      const maxOrderIndex =
        planItems.length > 0 ? Math.max(...planItems.map((item) => item.order_index)) : -1;

      const newItem = this.planItemRepository.create({
        plan_id: planId,
        vendor_id: vendorId,
        source: ItemSource.USER_SELECT,
        order_index: maxOrderIndex + 1,
        is_confirmed: false,
      });

      planItem = await this.planItemRepository.save(newItem);
      action = 'added';
    }

    // 5. 업체 정보와 함께 조회
    const planItemWithVendor = await this.planItemRepository.findOne({
      where: { id: planItem.id },
      relations: ['vendor'],
    });

    if (!planItemWithVendor || !planItemWithVendor.vendor) {
      throw new NotFoundException('플랜 아이템 정보를 찾을 수 없습니다.');
    }

    this.logger.log(
      `플랜 업체 ${action === 'added' ? '추가' : '교체'} 완료: planItemId=${planItem.id}`,
    );

    return {
      message:
        action === 'added' ? '플랜에 업체가 추가되었습니다.' : '플랜의 업체가 교체되었습니다.',
      action,
      planItem: {
        id: planItemWithVendor.id,
        vendor: {
          id: planItemWithVendor.vendor.id,
          name: planItemWithVendor.vendor.name,
          category: this.getCategoryInKorean(planItemWithVendor.vendor.category),
        },
      },
    };
  }

  /**
   * 플랜 삭제 (Soft Delete)
   * @description 플랜을 소프트 삭제합니다. deleted_at만 설정하여 데이터는 보존합니다.
   *
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param planId - 플랜 ID
   * @returns 삭제 완료 메시지
   *
   * @throws NotFoundException - 플랜을 찾을 수 없거나 권한이 없는 경우
   */
  async deletePlan(userId: string, planId: string): Promise<DeletePlanResponseDto> {
    this.logger.log(`플랜 삭제 시작: userId=${userId}, planId=${planId}`);

    // 1. 플랜 조회 및 소유권 확인
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException(`플랜을 찾을 수 없습니다. (planId: ${planId})`);
    }

    if (plan.user_id !== userId) {
      throw new NotFoundException(`해당 사용자의 플랜이 아닙니다. (planId: ${planId})`);
    }

    // 2. Soft Delete (deleted_at 설정)
    await this.planRepository.softDelete({ id: planId });

    this.logger.log(`플랜 삭제 완료: planId=${planId}`);

    return {
      message: '플랜이 삭제되었습니다.',
      planId,
    };
  }

  /**
   * 메인 플랜 조회
   * @description 사용자의 메인 플랜(is_main_plan=true)의 업체 정보를 조회합니다.
   *
   * @param userId - 사용자 ID (JWT에서 추출)
   * @returns 메인 플랜 정보 및 포함된 업체 목록
   *
   * @throws NotFoundException - 메인 플랜을 찾을 수 없는 경우
   *
   * 데이터 조회 흐름:
   * 1. users_info 테이블에서 user_id와 is_main_plan=true 조건으로 조회
   * 2. 해당 users_info_id로 plan 테이블 조회
   * 3. plan_id로 plan_item 테이블 조회
   * 4. plan_item의 vendor_id로 vendor 정보 조회
   * 5. 각 vendor와 plan에 대한 reservation 조회
   */
  async getMainPlan(userId: string): Promise<MainPlanResponseDto> {
    this.logger.log(`메인 플랜 조회 시작: userId=${userId}`);

    // 1. users_info에서 is_main_plan=true인 레코드 조회
    const mainUsersInfo = await this.usersInfoRepository.findOne({
      where: {
        user_id: userId,
        is_main_plan: true,
      },
    });

    if (!mainUsersInfo) {
      throw new NotFoundException('메인 플랜이 설정되지 않았습니다.');
    }

    this.logger.log(`메인 users_info 조회 완료: usersInfoId=${mainUsersInfo.id}`);

    // 2. 해당 users_info_id로 plan 조회
    const plan = await this.planRepository.findOne({
      where: {
        users_info_id: mainUsersInfo.id,
      },
    });

    if (!plan) {
      throw new NotFoundException('메인 플랜을 찾을 수 없습니다.');
    }

    this.logger.log(`메인 플랜 조회 완료: planId=${plan.id}`);

    // 3. plan_id로 plan_items 조회 (vendor 정보 포함)
    const planItems = await this.planItemRepository.find({
      where: {
        plan_id: plan.id,
      },
      relations: ['vendor'],
      order: { order_index: 'ASC' },
    });

    this.logger.log(`플랜 아이템 조회 완료: ${planItems.length}개`);

    // 4. 각 vendor에 대한 reservation 조회
    const items: MainPlanItemDto[] = [];

    for (const planItem of planItems) {
      // 해당 vendor와 plan에 대한 예약 조회
      const reservation = await this.reservationRepository.findOne({
        where: {
          vendor_id: planItem.vendor_id,
          plan_id: plan.id,
        },
      });

      items.push({
        plan_item_id: planItem.id,
        vendor_id: planItem.vendor.id,
        vendor_name: planItem.vendor.name,
        category: planItem.vendor.category,
        address: planItem.vendor.address,
        vendor_thumbnail_url: planItem.vendor.thumbnail_url ?? null,
        reservation_date: reservation ? this.formatDate(reservation.reservation_date) : null,
      });
    }

    this.logger.log(`메인 플랜 조회 완료: userId=${userId}, planId=${plan.id}`);

    // 5. 응답 데이터 구성
    return {
      plan_id: plan.id,
      plan_title: plan.title,
      wedding_date: this.formatDate(mainUsersInfo.wedding_date),
      items,
    };
  }

  /**
   * 플랜 업체 재생성 (AI 추천)
   * @description 플랜에 포함된 특정 업체를 AI 추천으로 교체합니다.
   *
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param planId - 플랜 ID
   * @param vendorId - 교체할 업체 ID
   * @returns 교체 결과 (기존 업체, 새 업체 정보)
   *
   * @throws NotFoundException - 플랜, 업체를 찾을 수 없거나 권한이 없는 경우
   * @throws BadRequestException - 예약이 있는 업체이거나 추천 불가능한 경우
   */
  async regenerateVendor(
    userId: string,
    planId: string,
    vendorId: string,
  ): Promise<{
    plan_item_id: string;
    old_vendor: {
      id: string;
      name: string;
      category: string;
    };
    new_vendor: {
      id: string;
      name: string;
      category: string;
      selection_reason: string;
    };
  }> {
    this.logger.log(
      `플랜 업체 재생성 시작: userId=${userId}, planId=${planId}, vendorId=${vendorId}`,
    );

    // 1. 플랜 조회 및 소유권 확인
    const plan = await this.planRepository.findOne({
      where: { id: planId },
      relations: ['users_info'],
    });

    if (!plan) {
      throw new NotFoundException(`플랜을 찾을 수 없습니다. (planId: ${planId})`);
    }

    if (plan.user_id !== userId) {
      throw new NotFoundException(`해당 사용자의 플랜이 아닙니다. (planId: ${planId})`);
    }

    if (!plan.users_info) {
      throw new NotFoundException(`플랜의 사용자 정보를 찾을 수 없습니다. (planId: ${planId})`);
    }

    // 2. 업체 조회 및 플랜 포함 여부 확인
    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new NotFoundException(`업체를 찾을 수 없습니다. (vendorId: ${vendorId})`);
    }

    // 3. 해당 업체가 플랜에 포함되어 있는지 확인
    const planItem = await this.planItemRepository.findOne({
      where: {
        plan_id: planId,
        vendor_id: vendorId,
      },
    });

    if (!planItem) {
      throw new BadRequestException('해당 업체는 플랜에 포함되어 있지 않습니다.');
    }

    // 4. 예약 여부 확인
    const hasReservation = await this.reservationRepository.findOne({
      where: {
        plan_id: planId,
        vendor_id: vendorId,
      },
    });

    if (hasReservation) {
      throw new BadRequestException(
        '예약이 있는 업체는 변경할 수 없습니다. 먼저 예약을 취소해주세요.',
      );
    }

    // 5. 현재 플랜의 모든 업체 조회 (교체 대상 제외)
    const allPlanItems = await this.planItemRepository.find({
      where: { plan_id: planId },
      relations: ['vendor'],
    });

    // 6. 현재 총 예산 계산 (교체 대상 제외)
    const currentBudgetUsed = await this.calculateCurrentBudget(allPlanItems, vendorId);

    this.logger.log(`현재 사용 중인 예산 (교체 대상 제외): ${currentBudgetUsed}원`);

    // 7. 제외할 업체 ID 목록 (현재 플랜에 포함된 모든 업체)
    const excludeVendorIds = allPlanItems.map((item) => item.vendor_id);

    // 8. AI 추천 요청
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const recommendation: {
      vendor_id: string;
      name: string;
      selection_reason: string;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    } | null = await this.aiService.recommendSingleVendor(
      vendor.category as 'STUDIO' | 'DRESS' | 'MAKEUP' | 'VENUE',
      {
        wedding_date: plan.users_info.wedding_date,
        preferred_region: plan.users_info.preferred_region,
        budget_limit: plan.users_info.budget_limit,
      },
      excludeVendorIds,
      currentBudgetUsed,
      userId,
    );

    if (!recommendation) {
      throw new BadRequestException('예산 내에서 추천 가능한 업체가 없습니다.');
    }

    // 9. 업체 교체
    const oldVendorInfo = {
      id: vendor.id,
      name: vendor.name,
      category: vendor.category,
    };

    // null이 아님을 확인한 후 안전하게 접근
    const newVendorId: string = recommendation.vendor_id;
    const newSelectionReason: string = recommendation.selection_reason;

    planItem.vendor_id = newVendorId;
    planItem.source = ItemSource.AI_RECOMMEND;
    planItem.selection_reason = newSelectionReason;
    planItem.service_item_id = null; // 서비스 아이템 리셋

    await this.planItemRepository.save(planItem);

    this.logger.log(`플랜 업체 재생성 완료: planItemId=${planItem.id}`);

    // 10. 새 업체 정보 조회
    const newVendor = await this.vendorRepository.findOne({
      where: { id: newVendorId },
    });

    if (!newVendor) {
      throw new NotFoundException('새 업체 정보를 찾을 수 없습니다.');
    }

    return {
      plan_item_id: planItem.id,
      old_vendor: {
        id: oldVendorInfo.id,
        name: oldVendorInfo.name,
        category: this.getCategoryInKorean(oldVendorInfo.category),
      },
      new_vendor: {
        id: newVendor.id,
        name: newVendor.name,
        category: this.getCategoryInKorean(newVendor.category),
        selection_reason: newSelectionReason,
      },
    };
  }

  /**
   * 현재 플랜의 총 예산 계산 (특정 업체 제외)
   * @param planItems - 플랜 아이템 목록
   * @param excludeVendorId - 제외할 업체 ID
   * @returns 현재 사용 중인 예산
   */
  private async calculateCurrentBudget(
    planItems: PlanItem[],
    excludeVendorId: string,
  ): Promise<number> {
    let totalBudget = 0;

    for (const item of planItems) {
      // 제외할 업체는 계산에서 제외
      if (item.vendor_id === excludeVendorId) {
        continue;
      }

      // service_item이 있으면 해당 가격 사용
      if (item.service_item_id) {
        const serviceItem = await this.planItemRepository
          .createQueryBuilder('plan_item')
          .leftJoinAndSelect('plan_item.service_item', 'service_item')
          .where('plan_item.id = :id', { id: item.id })
          .getOne();

        if (serviceItem?.service_item?.price) {
          totalBudget += serviceItem.service_item.price;
          continue;
        }
      }

      // service_item이 없으면 ai_resource의 metadata.price_min 사용
      const aiResource = await this.planItemRepository
        .createQueryBuilder('plan_item')
        .leftJoinAndSelect('plan_item.vendor', 'vendor')
        .leftJoinAndSelect('vendor.ai_resources', 'ai_resource')
        .where('plan_item.id = :id', { id: item.id })
        .getOne();

      if (aiResource?.vendor) {
        // ai_resources가 있고 metadata에 price_min이 있으면 사용
        const aiResources = aiResource.vendor.ai_resources;
        if (aiResources && aiResources.length > 0) {
          const priceMin = aiResources[0].metadata?.price_min as number | undefined;
          if (priceMin) {
            totalBudget += Number(priceMin);
          }
        }
      }
    }

    return totalBudget;
  }
}
