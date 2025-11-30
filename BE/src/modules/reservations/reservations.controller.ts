import { Controller, Post, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto, ReservationResponseDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiCommonResponse } from '../../common/decorators/api-common-response.decorator';

/**
 * 예약 관련 API 컨트롤러
 * @description 예약 생성, 조회, 수정, 취소 등의 API를 제공합니다.
 */
@ApiTags('예약 (Reservations)')
@Controller('plans/:planId/reservations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  /**
   * 예약 생성 API
   * @description 플랜 내에서 특정 업체에 대한 예약을 생성합니다.
   *
   * @param planId - 플랜 ID (URL 파라미터)
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @param createReservationDto - 예약 생성 데이터 (vendor_id, reservation_date, reservation_time)
   * @returns 생성된 예약 정보
   *
   * @example
   * POST /plans/550e8400-e29b-41d4-a716-446655440000/reservations
   * {
   *   "vendor_id": "550e8400-e29b-41d4-a716-446655440001",
   *   "reservation_date": "25-12-25",
   *   "reservation_time": "14:00"
   * }
   *
   * @throws 404 Not Found - 사용자, 플랜, 또는 업체를 찾을 수 없는 경우
   * @throws 400 Bad Request - 잘못된 날짜 형식 또는 플랜 접근 권한 없음
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '예약 생성',
    description: '플랜 내에서 특정 업체에 대한 예약을 생성합니다.',
  })
  @ApiParam({
    name: 'planId',
    description: '플랜 ID',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 201,
    description: '예약 생성 성공',
    type: ReservationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (날짜 형식 오류, 권한 없음 등)',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 404,
    description: '사용자, 플랜, 또는 업체를 찾을 수 없음',
  })
  @ApiCommonResponse(ReservationResponseDto)
  async createReservation(
    @Param('planId') planId: string,
    @CurrentUser('id') userId: string,
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.createReservation(userId, planId, createReservationDto);
  }
}
