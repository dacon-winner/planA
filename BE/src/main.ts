import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Static 파일 서빙 설정 (vendor 이미지용)
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/',
  });

  // HTTP 요청 로깅 미들웨어 (요청이 들어오면 터미널에 표시)
  app.use((req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      console.log(`[${method}] ${originalUrl} - ${statusCode} (${responseTime}ms)`);
    });

    next();
  });

  // CORS 설정
  app.enableCors({
    // origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    origin: '*',
    credentials: false,
  });

  // Global API Prefix 설정
  app.setGlobalPrefix('api/v1', {
    exclude: ['/health', '/'], // health check는 prefix 제외
  });

  // Global Validation Pipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('PlanA API')
    .setDescription('PlanA API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api-docs`);
}

void bootstrap();
