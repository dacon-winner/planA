import { ApiProperty } from '@nestjs/swagger';
import { VendorCategory } from '../../../entities/vendor.entity';

/**
 * AI 추천 업체 개별 DTO
 */
export class RecommendedVendorDto {
  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  vendor_id: string;

  @ApiProperty({
    description: '업체 카테고리',
    enum: VendorCategory,
    example: 'STUDIO',
  })
  category: VendorCategory;

  @ApiProperty({
    description: '업체명',
    example: '스튜디오 A',
  })
  name: string;

  @ApiProperty({
    description: '업체 썸네일 이미지 URL',
    example: 'https://example.com/thumbnail.jpg',
    nullable: true,
  })
  thumbnail_url: string | null;

  @ApiProperty({
    description: '주소',
    example: '서울시 강남구 테헤란로 123',
  })
  address: string;

  @ApiProperty({
    description: '네이버 평점',
    example: 4.8,
    nullable: true,
  })
  naver_rating: number | null;

  @ApiProperty({
    description: 'AI가 추천하는 이유',
    example: '고급스러운 스튜디오 분위기와 전문적인 촬영 기술로 유명합니다.',
  })
  reason: string;
}

/**
 * AI 추천 업체 목록 응답 DTO
 */
export class AiRecommendationResponseDto {
  @ApiProperty({
    description: 'AI 추천 업체 목록 (최대 5개)',
    type: [RecommendedVendorDto],
  })
  recommendations: RecommendedVendorDto[];

  @ApiProperty({
    description: '전체 추천 설명',
    example: '현재 보고 계신 업체와 유사한 스타일과 품질을 제공하는 업체들을 추천드립니다.',
  })
  overall_reason: string;
}
