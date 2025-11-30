import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { Plan } from '../../entities/plan.entity';
import { PlanItem } from '../../entities/plan-item.entity';
import { UsersInfo } from '../../entities/users-info.entity';
import { Reservation } from '../../entities/reservation.entity';

/**
 * 플랜 모듈
 * - AI 추천 기반 플랜 생성
 * - 플랜 목록 조회
 * - 플랜 상세 조회
 */
@Module({
  imports: [TypeOrmModule.forFeature([Plan, PlanItem, UsersInfo, Reservation])],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
