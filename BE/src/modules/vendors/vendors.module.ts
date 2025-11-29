import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { Vendor } from '../../entities/vendor.entity';
import { ServiceItem } from '../../entities/service-item.entity';
import { AiResource } from '../../entities/ai-resource.entity';
import { PlanItem } from '../../entities/plan-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, ServiceItem, AiResource, PlanItem])],
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService],
})
export class VendorsModule {}
