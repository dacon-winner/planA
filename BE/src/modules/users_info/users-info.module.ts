import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInfoController } from './users-info.controller';
import { UsersInfoService } from './users-info.service';
import { UsersInfo } from '../../entities/users-info.entity';
import { User } from '../../entities/user.entity';
import { AiModule } from '../ai/ai.module';
import { PlansModule } from '../plans/plans.module';

/**
 * 사용자 상세 정보 모듈
 * - 결혼 계획 관련 상세 정보 관리
 * - AI 기반 스드메 추천 통합
 */
@Module({
  imports: [TypeOrmModule.forFeature([UsersInfo, User]), AiModule, PlansModule],
  controllers: [UsersInfoController],
  providers: [UsersInfoService],
  exports: [UsersInfoService],
})
export class UsersInfoModule {}
