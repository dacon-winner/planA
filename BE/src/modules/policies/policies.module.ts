import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';
import { PolicyInfo } from '../../entities';

/**
 * 정책 정보 모듈
 *
 * @description
 * 정부지원 정책 정보 조회 기능을 제공하는 모듈입니다.
 */
@Module({
  imports: [TypeOrmModule.forFeature([PolicyInfo])],
  controllers: [PoliciesController],
  providers: [PoliciesService],
  exports: [PoliciesService], // 다른 모듈에서 사용할 수 있도록 export
})
export class PoliciesModule {}

