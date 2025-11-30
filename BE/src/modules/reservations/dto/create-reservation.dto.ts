import { IsUUID, IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 예약 생성 DTO
 * @description 플랜 내에서 예약을 생성할 때 사용하는 DTO
 */
export class CreateReservationDto {
  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  vendor_id: string;

  @ApiProperty({
    description: '예약 날짜 (yy-mm-dd 형식)',
    example: '25-12-25',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}-\d{2}-\d{2}$/, {
    message: 'reservation_date는 yy-mm-dd 형식이어야 합니다.',
  })
  reservation_date: string;

  @ApiProperty({
    description: '예약 시간 (hh:mm 형식)',
    example: '14:00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'reservation_time은 hh:mm 형식이어야 합니다.',
  })
  reservation_time: string;
}
