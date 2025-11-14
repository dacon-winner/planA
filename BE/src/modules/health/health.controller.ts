import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { Public } from '../../common/decorators';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: '서버 상태 확인' })
  @ApiResponse({ status: 200, description: '서버 정상 작동' })
  check() {
    return this.healthService.check();
  }

  @Public()
  @Get('info')
  @ApiOperation({ summary: '서버 정보 확인' })
  @ApiResponse({ status: 200, description: '서버 정보 반환' })
  getInfo() {
    return this.healthService.getInfo();
  }
}

