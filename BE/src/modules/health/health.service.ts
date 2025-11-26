import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  constructor(private configService: ConfigService) {}

  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: this.configService.get('NODE_ENV') || 'development',
    };
  }

  getInfo() {
    return {
      name: 'PlanA API',
      version: '1.0.0',
      environment: this.configService.get('NODE_ENV') || 'development',
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memory: {
        total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
        used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      },
    };
  }
}
