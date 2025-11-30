import { ApiProperty } from '@nestjs/swagger';

/**
 * 예약 생성 응답 DTO
 * @description 예약 생성 성공 시 반환하는 간소화된 응답
 */
export class CreateReservationResponseDto {
  @ApiProperty({
    description: '응답 메시지',
    example: 'Reservation completed successfully',
  })
  message: string;

  @ApiProperty({
    description: '예약 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  reservation_id: string;
}
