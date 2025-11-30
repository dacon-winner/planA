import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 예약 조회 Query DTO
 * @description 플랜 내 특정 업체의 예약을 조회할 때 사용하는 DTO
 */
export class GetReservationQueryDto {
  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  vendor_id: string;
}
