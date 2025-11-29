import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation } from '../../entities/reservation.entity';
import { Vendor } from '../../entities/vendor.entity';
import { Plan } from '../../entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Vendor, Plan])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}

