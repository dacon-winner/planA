import { ApiProperty } from '@nestjs/swagger';

/**
 * 서비스 아이템 정보 DTO
 * - Plan 반환 시 포함되는 서비스 아이템 정보
 */
export class ServiceItemInfoDto {
  @ApiProperty({
    description: '서비스 아이템 ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @ApiProperty({
    description: '업체 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  vendor_id: string;

  @ApiProperty({
    description: '서비스 아이템명',
    example: '프리미엄 웨딩 패키지',
  })
  name: string;

  @ApiProperty({
    description: '서비스 아이템 설명',
    example: '본식 촬영 + 야외 촬영 + 앨범 제작 포함',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: '썸네일 이미지 URL',
    example: 'https://example.com/service-thumbnail.jpg',
    nullable: true,
  })
  thumbnail_url: string | null;

  @ApiProperty({
    description: '가격',
    example: 1500000,
  })
  price: number;

  @ApiProperty({
    description: '패키지 여부',
    example: true,
  })
  is_package: boolean;

  @ApiProperty({
    description: '생성일',
    example: '2024-01-01T00:00:00.000Z',
  })
  created_at: Date;
}
