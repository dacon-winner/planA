import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '../../../entities/reservation.entity';

/**
 * 예약 응답 DTO
 * @description 예약 정보를 반환할 때 사용하는 DTO
 */
export class ReservationResponseDto {
  @ApiProperty({
    description: '예약 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  user_id: string;

  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  vendor_id: string;

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
    description: '계약금 납부 여부',
    example: false,
  })
  is_deposit_paid: boolean;

  @ApiProperty({
    description: '계약금 금액',
    example: 0,
  })
  deposit_amount: number;

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

  @ApiProperty({
    description: '방문 인원',
    example: 2,
  })
  visitor_count: number;

  @ApiProperty({
    description: '메모',
    example: null,
    required: false,
  })
  memo: string | null;

  @ApiProperty({
    description: '예약 생성일',
    example: '2025-11-30T12:00:00.000Z',
  })
  created_at: Date;
}
