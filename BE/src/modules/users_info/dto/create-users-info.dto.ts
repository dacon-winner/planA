import { IsDateString, IsString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 사용자 상세 정보 생성 DTO
 * - 2단계 회원가입에서 사용
 * - 결혼 계획 관련 정보 입력
 */
export class CreateUsersInfoDto {
  @ApiPropertyOptional({
    description: '결혼 예정일 (YYYY-MM-DD)',
    example: '2026-05-15',
  })
  @IsOptional()
  @IsDateString()
  wedding_date?: string;

  @ApiPropertyOptional({
    description: '선호 지역',
    example: '강남구',
  })
  @IsOptional()
  @IsString()
  preferred_region?: string;

  @ApiPropertyOptional({
    description: '총 예산',
    example: 10000000,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  budget_limit?: number;
}

