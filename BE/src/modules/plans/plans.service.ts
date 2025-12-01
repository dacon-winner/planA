import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../../entities/plan.entity';
import { PlanItem, ItemSource } from '../../entities/plan-item.entity';
import { UsersInfo } from '../../entities/users-info.entity';
import { Reservation } from '../../entities/reservation.entity';
import { VendorCategory } from '../../entities/vendor.entity';
import { VendorCombinationRecommendation } from '../ai/interfaces';
import {
  PlanListResponseDto,
  PlanListItemDto,
  PlanDetailResponseDto,
  SetMainPlanResponseDto,
  UpdatePlanTitleResponseDto,
  CreatePlanResponseDto,
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
            reservation_date: reservation.reservation_date.toISOString().split('T')[0],
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
}
