import { ApiProperty } from '@nestjs/swagger';
import { VendorCategory } from '../../../entities/vendor.entity';

/**
 * 업체 정보 DTO
 * - Plan 반환 시 포함되는 업체 정보
 */
export class VendorInfoDto {
  @ApiProperty({
    description: '업체 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '업체 카테고리',
    enum: VendorCategory,
    example: VendorCategory.STUDIO,
  })
  category: VendorCategory;

  @ApiProperty({
    description: '업체명',
    example: '아름다운 스튜디오',
  })
  name: string;

  @ApiProperty({
    description: '업체 주소',
    example: '서울시 강남구 테헤란로 123',
  })
  address: string;

  @ApiProperty({
    description: '업체 지역',
    example: '강남구',
  })
  region: string;

  @ApiProperty({
    description: '전화번호',
    example: '02-1234-5678',
  })
  phone: string;

  @ApiProperty({
    description: '업체 소개',
    example: '20년 경력의 웨딩 스튜디오입니다.',
    nullable: true,
  })
  introduction: string | null;

  @ApiProperty({
    description: '운영 시간',
    example: '평일 10:00-19:00',
    nullable: true,
  })
  operating_hours: string | null;

  @ApiProperty({
    description: '위도',
    example: 37.5012345,
    nullable: true,
  })
  latitude: number | null;

  @ApiProperty({
    description: '경도',
    example: 127.0398765,
    nullable: true,
  })
  longitude: number | null;

  @ApiProperty({
    description: '네이버 평점',
    example: 4.5,
  })
  naver_rating: number;

  @ApiProperty({
    description: '리뷰 개수',
    example: 150,
  })
  review_count: number;

  @ApiProperty({
    description: '종합 점수',
    example: 85.5,
  })
  total_score: number;

  @ApiProperty({
    description: '네이버 플레이스 URL',
    example: 'https://naver.me/example',
    nullable: true,
  })
  naver_place_url: string | null;

  @ApiProperty({
    description: '썸네일 이미지 URL',
    example: 'https://example.com/thumbnail.jpg',
    nullable: true,
  })
  thumbnail_url: string | null;

  @ApiProperty({
    description: '배지 목록',
    type: [String],
    example: ['프리미엄', '인기'],
  })
  badges: string[];

  @ApiProperty({
    description: '생성일',
    example: '2024-01-01T00:00:00.000Z',
  })
  created_at: Date;
}
