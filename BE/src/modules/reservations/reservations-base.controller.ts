import {
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { UpcomingReservationsResponseDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiCommonResponse } from '../../common/decorators/api-common-response.decorator';

/**
 * 예약 기본 API 컨트롤러
 * @description 플랜에 종속되지 않은 예약 관련 API를 제공합니다.
 */
@ApiTags('예약 (Reservations)')
@Controller('reservations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReservationsBaseController {
  constructor(private readonly reservationsService: ReservationsService) {}

  /**
   * 다가오는 일정 조회 API
   * @description 사용자의 모든 예약 중 예약 날짜 기준으로 가장 빠른 4개의 예약을 반환합니다.
   *              반환되는 정보에는 예약 날짜/시간과 업체 정보(ID, 이름, 주소)가 포함됩니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @returns 다가오는 예약 목록 (최대 4개)
   *
   * @example
   * GET /reservations/upcoming
   * 
   * Response:
   * {
   *   "reservations": [
   *     {
   *       "reservation_date": "2025-12-25",
   *       "reservation_time": "14:00",
   *       "vendor": {
   *         "id": "550e8400-e29b-41d4-a716-446655440001",
   *         "name": "강남웨딩홀",
   *         "address": "서울특별시 강남구 테헤란로 123"
   *       }
   *     }
   *   ]
   * }
   *
   * @throws 401 Unauthorized - 인증 실패
   */
  @Get('upcoming')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '다가오는 일정 조회',
    description: '사용자의 모든 예약 중 예약 날짜 기준으로 가장 빠른 4개의 예약을 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '다가오는 일정 조회 성공',
    type: UpcomingReservationsResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiCommonResponse(UpcomingReservationsResponseDto)
  async getUpcomingReservations(
    @CurrentUser('id') userId: string,
  ): Promise<UpcomingReservationsResponseDto> {
    return this.reservationsService.getUpcomingReservations(userId);
  }
}

