import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VendorCategory } from '../../../entities/vendor.entity';

/**
 * 서비스 아이템 DTO
 */
export class ServiceItemDto {
  @ApiProperty({ description: '서비스 아이템 ID', example: 'uuid' })
  id: string;

  @ApiProperty({ description: '서비스 이름', example: '기본 패키지' })
  name: string;

  @ApiProperty({ description: '가격', example: 500000 })
  price: number;

  @ApiProperty({ description: '패키지 여부', example: true })
  is_package: boolean;
}

/**
 * 업체 상세 조회 응답 DTO
 */
export class GetVendorDetailResponseDto {
  @ApiProperty({ description: '업체 ID', example: 'uuid' })
  id: string;

  @ApiProperty({
    description: '업체 카테고리',
    enum: VendorCategory,
    example: 'STUDIO',
  })
  category: VendorCategory;

  @ApiProperty({ description: '업체 이름', example: '스튜디오 A' })
  name: string;

  @ApiProperty({ description: '주소', example: '서울시 강남구 테헤란로 123' })
  address: string;

  @ApiProperty({ description: '전화번호', example: '02-1234-5678' })
  phone: string;

  @ApiProperty({
    description: '업체 소개',
    example: '최고의 스튜디오입니다.',
  })
  introduction: string;

  @ApiProperty({
    description: '서비스 아이템 목록',
    type: [ServiceItemDto],
  })
  service_items: ServiceItemDto[];

  @ApiProperty({
    description: '업체 이미지 URL 목록 (sort_order 오름차순 정렬)',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    nullable: true,
    type: [String],
  })
  vendor_images: string[] | null;

  @ApiPropertyOptional({
    description: '확정 여부 (plan_id 제공 시에만 반환)',
    example: true,
  })
  is_confirmed?: boolean;
}
