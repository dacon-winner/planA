import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 사용자 정보 DTO (플랜 상세용)
 */
export class UsersInfoDetailDto {
  @ApiProperty({
    description: '메인 플랜 여부',
    example: true,
  })
  is_main_plan: boolean;

  @ApiPropertyOptional({
    description: '결혼 예정일',
    example: '2025-06-15',
    nullable: true,
  })
  wedding_date: string | null;

  @ApiPropertyOptional({
    description: '선호 지역',
    example: '서울 강남구',
    nullable: true,
  })
  preferred_region: string | null;

  @ApiPropertyOptional({
    description: '예산 한도',
    example: 50000000,
    nullable: true,
  })
  budget_limit: number | null;
}

/**
 * 플랜 정보 DTO (플랜 상세용)
 */
export class PlanDetailDto {
  @ApiProperty({
    description: '플랜 제목',
    example: 'AI 추천 플랜',
  })
  title: string;

  @ApiPropertyOptional({
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
 * 업체 정보 DTO
 */
export class VendorInfoDto {
  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  id: string;

  @ApiProperty({
    description: '업체명',
    example: '더 스튜디오',
  })
  name: string;

  @ApiProperty({
    description: '업체 카테고리 (한글)',
    example: '스튜디오',
  })
  category: string;

  @ApiProperty({
    description: '지역',
    example: '서울 강남구',
  })
  region: string;

  @ApiPropertyOptional({
    description: '썸네일 이미지 URL',
    example: 'https://example.com/thumbnail.jpg',
    nullable: true,
  })
  thumbnail_url: string | null;
}

/**
 * 예약 정보 DTO
 */
export class ReservationInfoDto {
  @ApiProperty({
    description: '예약 날짜',
    example: '2025-06-10',
  })
  reservation_date: string;

  @ApiProperty({
    description: '예약 시간',
    example: '14:00',
  })
  reservation_time: string;
}

/**
 * 플랜 아이템 DTO
 */
export class PlanItemDetailDto {
  @ApiProperty({
    description: '확정 여부',
    example: true,
  })
  is_confirmed: boolean;

  @ApiProperty({
    description: '업체 정보',
    type: VendorInfoDto,
  })
  vendor: VendorInfoDto;

  @ApiPropertyOptional({
    description: '예약 정보 (확정된 경우만)',
    type: ReservationInfoDto,
    nullable: true,
  })
  reservation: ReservationInfoDto | null;
}

/**
 * 플랜 상세 응답 DTO
 */
export class PlanDetailResponseDto {
  @ApiProperty({
    description: '사용자 정보',
    type: UsersInfoDetailDto,
  })
  users_info: UsersInfoDetailDto;

  @ApiProperty({
    description: '플랜 정보',
    type: PlanDetailDto,
  })
  plan: PlanDetailDto;

  @ApiProperty({
    description: '플랜 아이템 목록',
    type: [PlanItemDetailDto],
  })
  plan_items: PlanItemDetailDto[];
}
