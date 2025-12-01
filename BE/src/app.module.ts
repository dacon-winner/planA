import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { HealthModule } from './modules/health';
import { AuthModule } from './modules/auth';
import { UsersInfoModule } from './modules/users_info';
import { AiModule } from './modules/ai';
import { PlansModule } from './modules/plans';
import { VendorsModule } from './modules/vendors';
import { ReservationsModule } from './modules/reservations';
import { PoliciesModule } from './modules/policies/policies.module';
import {
  User,
  UsersInfo,
  Vendor,
  VendorVenueDetail,
  VendorOperatingHour,
  VendorCostDetail,
  VendorImage,
  ServiceItem,
  Plan,
  PlanItem,
  Reservation,
  PersonalSchedule,
  PolicyInfo,
  UserPolicyScrap,
  Review,
  AiResource,
  AiLog,
} from './entities';

@Module({
  imports: [
    // 환경 변수 전역 설정
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // TypeORM 설정
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_DATABASE', 'plana'),
        entities: [
          User,
          UsersInfo,
          Vendor,
          VendorVenueDetail,
          VendorOperatingHour,
          VendorCostDetail,
          VendorImage,
          ServiceItem,
          Plan,
          PlanItem,
          Reservation,
          PersonalSchedule,
          PolicyInfo,
          UserPolicyScrap,
          Review,
          AiResource,
          AiLog,
        ],
        synchronize: false, // 프로덕션에서는 반드시 false
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    // 기능 모듈
    HealthModule,
    AuthModule,
    AiModule,
    PlansModule,
    UsersInfoModule,
    VendorsModule,
    ReservationsModule,
    PoliciesModule,
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
    // 전역 가드 설정 (JWT 인증)
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
