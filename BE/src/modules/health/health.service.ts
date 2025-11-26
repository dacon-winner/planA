import { Injectable } from '@nestjs/common';

/**
 * Health Check 서비스
 */
@Injectable()
export class HealthService {
  private startTime: number = Date.now();

  /**
   * 서버 상태 확인
   */
  check(): { status: string; timestamp: string; uptime: number; environment: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: (Date.now() - this.startTime) / 1000,
      environment: process.env.NODE_ENV || 'development',
    };
  }

  /**
   * 서버 상세 정보
   */
  getInfo(): {
    status: string;
    version: string;
    environment: string;
    uptime: number;
    memory: NodeJS.MemoryUsage;
  } {
    return {
      status: 'ok',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: (Date.now() - this.startTime) / 1000,
      memory: process.memoryUsage(),
    };
  }
}
