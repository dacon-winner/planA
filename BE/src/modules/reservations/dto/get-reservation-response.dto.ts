import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '../../../entities/reservation.entity';

/**
 * 예약 조회 응답 DTO
 * @description 예약 조회 시 반환하는 간소화된 DTO
 */
export class GetReservationResponseDto {
  @ApiProperty({
    description: '플랜 ID',
    example: '550e8400-e29b-41d4-a716-446655440003',
  })
  plan_id: string;

  @ApiProperty({
    description: '예약 날짜',
    example: '2025-12-25',
  })
  reservation_date: Date;

  @ApiProperty({
    description: '예약 시간',
    example: '14:00',
  })
  reservation_time: string;

  @ApiProperty({
    description: '예약 상태',
    enum: ReservationStatus,
    example: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @ApiProperty({
    description: '방문자 이름',
    example: '홍길동',
  })
  visitor_name: string;

  @ApiProperty({
    description: '방문자 연락처',
    example: '010-1234-5678',
  })
  visitor_phone: string;
}
