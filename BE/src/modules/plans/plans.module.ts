import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansService } from './plans.service';
import { Plan } from '../../entities/plan.entity';
import { PlanItem } from '../../entities/plan-item.entity';

/**
 * 플랜 모듈
 * - AI 추천 기반 플랜 생성
 */
@Module({
  imports: [TypeOrmModule.forFeature([Plan, PlanItem])],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}

