import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../../common/guards';
import { CreateReservationDto, UpdateReservationDto, GetReservationsQueryDto } from './dto';

/**
 * 예약 관련 API 컨트롤러
 *
 * 주요 기능:
 * 1. 예약 생성 - 날짜/시간 선택하여 업체 방문 예약
 * 2. 예약 조회 - 내 예약 목록 확인
 * 3. 예약 수정 - 예약 날짜/시간 변경
 * 4. 예약 취소 - 예약 취소 처리
 * 5. 예약 가능 시간 조회 - 특정 업체의 예약 가능한 시간대 확인
 */
@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  /**
   * 예약 생성
   *
   * @description
   * 업체 방문 예약을 생성합니다.
   * - 날짜와 시간을 선택하여 예약
   * - 과거 날짜/시간 예약 불가
   * - 중복 예약 방지
   *
   * @param req 사용자 정보 (JWT 토큰에서 추출)
   * @param createDto 예약 생성 데이터
   * @returns 생성된 예약 정보
   *
   * @example
   * POST /api/v1/reservations
   * {
   *   "vendor_id": "uuid",
   *   "reservation_date": "2026-01-24",
   *   "reservation_time": "09:00",
   *   "visitor_name": "홍길동",
   *   "visitor_phone": "010-1234-5678",
   *   "visitor_count": 2,
   *   "memo": "창가 자리 부탁드립니다"
   * }
   */
  @Post()
  async createReservation(@Req() req: any, @Body() createDto: CreateReservationDto) {
    const userId = req.user.sub;
    return this.reservationsService.createReservation(userId, createDto);
  }

  /**
   * 내 예약 목록 조회
   *
   * @description
   * 로그인한 사용자의 예약 목록을 조회합니다.
   * - 상태별 필터링 가능
   * - 업체별 필터링 가능
   * - 날짜 범위 필터링 가능
   *
   * @param req 사용자 정보
   * @param queryDto 필터링 옵션
   * @returns 예약 목록
   *
   * @example
   * GET /api/v1/reservations?status=CONFIRMED&from_date=2026-01-01&to_date=2026-12-31
   */
  @Get()
  async getMyReservations(@Req() req: any, @Query() queryDto: GetReservationsQueryDto) {
    const userId = req.user.sub;
    return this.reservationsService.getMyReservations(userId, queryDto);
  }

  /**
   * 예약 상세 조회
   *
   * @description
   * 특정 예약의 상세 정보를 조회합니다.
   *
   * @param req 사용자 정보
   * @param id 예약 ID
   * @returns 예약 상세 정보
   *
   * @example
   * GET /api/v1/reservations/:id
   */
  @Get(':id')
  async getReservationById(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.reservationsService.getReservationById(userId, id);
  }

  /**
   * 예약 수정
   *
   * @description
   * 예약 정보를 수정합니다.
   * - 날짜/시간 변경 가능
   * - 방문자 정보 변경 가능
   * - 취소된 예약은 수정 불가
   *
   * @param req 사용자 정보
   * @param id 예약 ID
   * @param updateDto 수정할 데이터
   * @returns 수정된 예약 정보
   *
   * @example
   * PATCH /api/v1/reservations/:id
   * {
   *   "reservation_date": "2026-01-25",
   *   "reservation_time": "14:00"
   * }
   */
  @Patch(':id')
  async updateReservation(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateDto: UpdateReservationDto,
  ) {
    const userId = req.user.sub;
    return this.reservationsService.updateReservation(userId, id, updateDto);
  }

  /**
   * 예약 취소
   *
   * @description
   * 예약을 취소 처리합니다.
   * - 상태를 CANCELLED로 변경
   * - 이미 취소된 예약은 재취소 불가
   *
   * @param req 사용자 정보
   * @param id 예약 ID
   * @returns 취소 성공 메시지
   *
   * @example
   * DELETE /api/v1/reservations/:id
   */
  @Delete(':id')
  async cancelReservation(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.reservationsService.cancelReservation(userId, id);
  }

  /**
   * 업체의 예약 가능 시간 조회
   *
   * @description
   * 특정 업체의 특정 날짜에 예약 가능한 시간대를 조회합니다.
   * - 09:00 ~ 20:00까지 1시간 단위
   * - 이미 예약된 시간은 available: false로 표시
   *
   * @param vendorId 업체 ID
   * @param date 조회할 날짜 (YYYY-MM-DD)
   * @returns 시간대별 예약 가능 여부
   *
   * @example
   * GET /api/v1/reservations/vendors/:vendorId/available-times?date=2026-01-24
   *
   * Response:
   * {
   *   "vendor_id": "uuid",
   *   "date": "2026-01-24",
   *   "time_slots": [
   *     { "time": "09:00", "available": true },
   *     { "time": "10:00", "available": false },
   *     ...
   *   ]
   * }
   */
  @Get('vendors/:vendorId/available-times')
  async getAvailableTimeSlots(@Param('vendorId') vendorId: string, @Query('date') date: string) {
    if (!date) {
      throw new Error('date query parameter is required');
    }
    return this.reservationsService.getAvailableTimeSlots(vendorId, date);
  }
}

