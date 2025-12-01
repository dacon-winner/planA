import { IsEnum, IsOptional, IsNumberString, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VendorCategory } from '../../../entities/vendor.entity';

/**
 * 지도용 업체 조회 Query DTO
 */
export class GetVendorsQueryDto {
  // 카테고리 파라미터 (선택, 기본값: ALL)
  @ApiPropertyOptional({
    description: '업체 카테고리 (기본값: ALL)',
    enum: VendorCategory,
    default: 'ALL',
    example: 'STUDIO',
  })
  @IsOptional()
  @IsEnum(VendorCategory)
  category?: VendorCategory = VendorCategory.ALL;

  // 업체 이름 검색 파라미터 (선택)
  @ApiPropertyOptional({
    description: '업체 이름 검색 (선택)',
    example: '스튜디오 A',
  })
  @IsOptional()
  @IsString()
  vendor?: string;

  // 필수 파라미터
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
}
