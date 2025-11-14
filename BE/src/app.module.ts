import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HealthModule } from './modules/health';

@Module({
  imports: [
    // 환경 변수 전역 설정
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Health Check 모듈
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 전역 필터 설정
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // 전역 인터셉터 설정
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // 전역 가드 설정 (선택사항 - 필요시 주석 해제)
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
