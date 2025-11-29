import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../../entities/plan.entity';
import { PlanItem, ItemSource } from '../../entities/plan-item.entity';
import { VendorCombinationRecommendation } from '../ai/interfaces';

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
      relations: ['plan_items', 'plan_items.vendor', 'plan_items.service_item'],
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
      relations: ['plan_items', 'plan_items.vendor', 'users_info'],
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
}

