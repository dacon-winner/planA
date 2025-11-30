import { ApiProperty } from '@nestjs/swagger';
import { ItemSource } from '../../../entities/plan-item.entity';
import { VendorInfoDto } from './vendor-info.dto';
import { ServiceItemInfoDto } from './service-item-info.dto';

/**
 * 플랜 아이템 정보 DTO
 * - Plan 반환 시 포함되는 플랜 아이템 정보
 */
export class PlanItemInfoDto {
  @ApiProperty({
    description: '플랜 아이템 ID',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  id: string;

  @ApiProperty({
    description: '플랜 ID',
    example: '123e4567-e89b-12d3-a456-426614174003',
  })
  plan_id: string;

  @ApiProperty({
    description: '업체 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  vendor_id: string;

  @ApiProperty({
    description: '서비스 아이템 ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
    nullable: true,
  })
  service_item_id: string | null;

  @ApiProperty({
    description: '출처 (AI 추천 또는 사용자 선택)',
    enum: ItemSource,
    example: ItemSource.AI_RECOMMEND,
  })
  source: ItemSource;

  @ApiProperty({
    description: '선택 이유 (AI 추천인 경우)',
    example: '강남 지역 최고 평점 스튜디오로 고객 만족도가 높습니다.',
    nullable: true,
  })
  selection_reason: string | null;

  @ApiProperty({
    description: '정렬 순서',
    example: 0,
  })
  order_index: number;

  @ApiProperty({
    description: '확정 여부',
    example: false,
  })
  is_confirmed: boolean;

  @ApiProperty({
    description: '생성일',
    example: '2024-01-01T00:00:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: '업체 정보',
    type: VendorInfoDto,
  })
  vendor: VendorInfoDto;

  @ApiProperty({
    description: '서비스 아이템 정보',
    type: ServiceItemInfoDto,
    nullable: true,
  })
  service_item: ServiceItemInfoDto | null;
}

