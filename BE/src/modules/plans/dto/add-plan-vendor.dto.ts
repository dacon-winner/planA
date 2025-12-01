import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

/**
 * 플랜에 업체 추가/수정 DTO
 */
export class AddPlanVendorDto {
  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  vendorId: string;
}
