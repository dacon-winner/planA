import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation } from '../../entities/reservation.entity';
import { User } from '../../entities/user.entity';
import { Vendor } from '../../entities/vendor.entity';
import { Plan } from '../../entities/plan.entity';
import { PlanItem } from '../../entities/plan-item.entity';

/**
 * 예약 모듈
 * @description 예약 관련 기능을 제공하는 모듈입니다.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Vendor, Plan, PlanItem])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
