import { ApiProperty } from '@nestjs/swagger';

/**
 * 메인 플랜 아이템 DTO
 * @description 메인 플랜에 포함된 각 업체(플랜 아이템) 정보
 */
export class MainPlanItemDto {
  @ApiProperty({
    description: '플랜 아이템 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  plan_item_id!: string;

  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  vendor_id!: string;

  @ApiProperty({
    description: '업체명',
    example: '○○웨딩홀',
  })
  vendor_name!: string;

  @ApiProperty({
    description: '업체 카테고리',
    example: 'VENUE',
    enum: ['VENUE', 'STUDIO', 'DRESS', 'MAKEUP'],
  })
  category!: string;

  @ApiProperty({
    description: '업체 주소',
    example: '서울시 강남구 테헤란로 123',
  })
  address!: string;

  @ApiProperty({
    description: '업체 썸네일 URL',
    example: 'https://example.com/vendor-thumbnail.jpg',
    nullable: true,
  })
  vendor_thumbnail_url!: string | null;

  @ApiProperty({
    description: '예약일 (예약이 없으면 null)',
    example: '2025-03-15',
    nullable: true,
  })
  reservation_date!: string | null;
}

/**
 * 메인 플랜 조회 Response DTO
 * @description GET /api/v1/plans/main 응답 형식
 */
export class MainPlanResponseDto {
  @ApiProperty({
    description: '플랜 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  plan_id!: string;

  @ApiProperty({
    description: '플랜 제목',
    example: '나의 웨딩',
  })
  plan_title!: string;

  @ApiProperty({
    description: '결혼 예정일',
    example: '2025-06-15',
    nullable: true,
  })
  wedding_date!: string | null;

  @ApiProperty({
    description: '플랜 아이템 목록',
    type: [MainPlanItemDto],
  })
  items!: MainPlanItemDto[];
}
