import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiResource } from '../../entities/ai-resource.entity';
import { AiLog } from '../../entities/ai-log.entity';

/**
 * AI 추천 모듈
 * - OpenAI API 연동
 * - 스드메 조합 추천
 * - SSE를 통한 실시간 스트리밍
 */
@Module({
  imports: [TypeOrmModule.forFeature([AiResource, AiLog]), ConfigModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
