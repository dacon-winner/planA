import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsDateString } from 'class-validator';

/**
 * 사용자 상세 정보 수정 DTO
 */
export class UpdateUsersInfoDto {
  @ApiProperty({
    description: '결혼 예정일 (YYYY-MM-DD)',
    example: '2025-06-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  wedding_date?: string;

  @ApiProperty({
    description: '선호 지역',
    example: '서울 강남구',
    required: false,
  })
  @IsOptional()
  @IsString()
  preferred_region?: string;

  @ApiProperty({
    description: '예산 한도',
    example: 50000000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  budget_limit?: number;
}
