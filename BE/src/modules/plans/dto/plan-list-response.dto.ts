import { ApiProperty } from '@nestjs/swagger';

/**
 * 플랜 정보 DTO
 */
export class PlanInfoDto {
  @ApiProperty({
    description: '플랜 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '플랜 제목',
    example: 'AI 추천 플랜',
  })
  title: string;

  @ApiProperty({
    description: '총 예산',
    example: 45000000,
    nullable: true,
  })
  total_budget: number | null;

  @ApiProperty({
    description: 'AI 생성 여부',
    example: true,
  })
  is_ai_generated: boolean;
}

/**
 * 사용자 정보 DTO
 */
export class UsersInfoDto {
  @ApiProperty({
    description: '사용자 정보 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  id: string;

  @ApiProperty({
    description: '메인 플랜 여부',
    example: true,
  })
  is_main_plan: boolean;

  @ApiProperty({
    description: '결혼 예정일',
    example: '2025-06-15',
    nullable: true,
  })
  wedding_date: string | null;

  @ApiProperty({
    description: '선호 지역',
    example: '서울 강남구',
    nullable: true,
  })
  preferred_region: string | null;

  @ApiProperty({
    description: '예산 한도',
    example: 50000000,
    nullable: true,
  })
  budget_limit: number | null;
}

/**
 * 플랜 목록 아이템 DTO
 */
export class PlanListItemDto {
  @ApiProperty({
    description: '사용자 상세 정보',
    type: UsersInfoDto,
  })
  users_info: UsersInfoDto;

  @ApiProperty({
    description: '플랜 정보',
    type: PlanInfoDto,
    nullable: true,
  })
  plan: PlanInfoDto | null;
}

/**
 * 플랜 목록 응답 DTO
 */
export class PlanListResponseDto {
  @ApiProperty({
    description: '플랜 목록',
    type: [PlanListItemDto],
  })
  items: PlanListItemDto[];
}
