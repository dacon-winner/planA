import { ApiProperty } from '@nestjs/swagger';

/**
 * 다가오는 일정 업체 정보 DTO
 */
export class UpcomingReservationVendorDto {
  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  id: string;

  @ApiProperty({
    description: '업체 이름',
    example: '강남웨딩홀',
  })
  name: string;

  @ApiProperty({
    description: '업체 주소',
    example: '서울특별시 강남구 테헤란로 123',
  })
  address: string;
}

/**
 * 다가오는 일정 단일 항목 DTO
 */
export class UpcomingReservationItemDto {
  @ApiProperty({
    description: '예약 날짜',
    type: String,
    example: '2025-12-25',
  })
  reservation_date: Date;

  @ApiProperty({
    description: '예약 시간',
    example: '14:00',
  })
  reservation_time: string;

  @ApiProperty({
    description: '업체 정보',
    type: UpcomingReservationVendorDto,
  })
  vendor: UpcomingReservationVendorDto;
}

/**
 * 다가오는 일정 응답 DTO
 */
export class UpcomingReservationsResponseDto {
  @ApiProperty({
    description: '다가오는 예약 목록 (최대 4개)',
    type: [UpcomingReservationItemDto],
  })
  reservations: UpcomingReservationItemDto[];
}

