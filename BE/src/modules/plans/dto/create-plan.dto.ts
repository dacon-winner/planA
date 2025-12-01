import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsDateString, MaxLength } from 'class-validator';

/**
 * 빈 플랜 생성 DTO
 */
export class CreatePlanDto {
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

  @ApiProperty({
    description: '플랜 제목',
    example: '우리의 웨딩 플랜',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;
}
