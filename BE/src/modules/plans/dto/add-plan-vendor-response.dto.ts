import { ApiProperty } from '@nestjs/swagger';

/**
 * 업체 정보 DTO
 */
class VendorInfoDto {
  @ApiProperty({
    description: '업체 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '업체 이름',
    example: '더 스튜디오',
  })
  name: string;

  @ApiProperty({
    description: '업체 카테고리 (한글)',
    example: '스튜디오',
  })
  category: string;
}

/**
 * 플랜 아이템 정보 DTO
 */
class PlanItemInfoDto {
  @ApiProperty({
    description: '플랜 아이템 ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  id: string;

  @ApiProperty({
    description: '업체 정보',
    type: VendorInfoDto,
  })
  vendor: VendorInfoDto;
}

/**
 * 플랜에 업체 추가/수정 응답 DTO
 */
export class AddPlanVendorResponseDto {
  @ApiProperty({
    description: '메시지',
    example: '플랜에 업체가 추가되었습니다.',
  })
  message: string;

  @ApiProperty({
    description: '작업 유형',
    example: 'added',
    enum: ['added', 'replaced'],
  })
  action: 'added' | 'replaced';

  @ApiProperty({
    description: '플랜 아이템 정보',
    type: PlanItemInfoDto,
  })
  planItem: PlanItemInfoDto;
}
