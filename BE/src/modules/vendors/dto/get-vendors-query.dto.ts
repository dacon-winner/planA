import { IsEnum, IsOptional, IsNumberString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VendorCategory } from '../../../entities/vendor.entity';

/**
 * 지도용 업체 조회 Query DTO
 */
export class GetVendorsQueryDto {
  // 필수 파라미터
  @ApiProperty({
    description: '업체 카테고리',
    enum: VendorCategory,
    example: 'STUDIO',
  })
  @IsEnum(VendorCategory)
  category: VendorCategory;

  @ApiProperty({
    description: '지도 좌하단 위도',
    example: '37.5',
  })
  @IsNumberString()
  swLat: string; // 좌하단 위도

  @ApiProperty({
    description: '지도 좌하단 경도',
    example: '126.9',
  })
  @IsNumberString()
  swLng: string; // 좌하단 경도

  @ApiProperty({
    description: '지도 우상단 위도',
    example: '37.6',
  })
  @IsNumberString()
  neLat: string; // 우상단 위도

  @ApiProperty({
    description: '지도 우상단 경도',
    example: '127.0',
  })
  @IsNumberString()
  neLng: string; // 우상단 경도

  // 페이지네이션 (선택)
  @ApiPropertyOptional({
    description: '페이지 번호',
    default: '1',
    example: '1',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    description: '페이지당 개수',
    default: '20',
    example: '20',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  // 정렬 옵션 (선택)
  @ApiPropertyOptional({
    description: '정렬 옵션',
    enum: ['rating', 'price', 'review_count', 'name'],
    default: 'rating',
    example: 'rating',
  })
  @IsOptional()
  @IsEnum(['rating', 'price', 'review_count', 'name'])
  sort?: 'rating' | 'price' | 'review_count' | 'name';
}
