import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 업체 상세 조회 Query DTO
 */
export class GetVendorDetailQueryDto {
  @ApiPropertyOptional({
    description: '플랜 ID (선택사항, 제공 시 is_confirmed 값 포함)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  plan_id?: string;
}
