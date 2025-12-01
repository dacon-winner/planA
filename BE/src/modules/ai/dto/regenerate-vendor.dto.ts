import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 업체 재생성 요청 DTO
 */
export class RegenerateVendorRequestDto {
  @ApiProperty({
    description: '플랜 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({
    description: '교체할 업체 ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  @IsNotEmpty()
  vendorId: string;
}

/**
 * 업체 재생성 응답 DTO
 */
export class RegenerateVendorResponseDto {
  @ApiProperty({
    description: '응답 메시지',
    example: '업체가 성공적으로 교체되었습니다.',
  })
  message: string;

  @ApiProperty({
    description: '교체된 업체 정보',
    example: {
      plan_item_id: '123e4567-e89b-12d3-a456-426614174002',
      old_vendor: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: '기존 스튜디오',
        category: 'STUDIO',
      },
      new_vendor: {
        id: '123e4567-e89b-12d3-a456-426614174003',
        name: '새로운 스튜디오',
        category: 'STUDIO',
        selection_reason: 'AI 추천 이유...',
      },
    },
  })
  data: {
    plan_item_id: string;
    old_vendor: {
      id: string;
      name: string;
      category: string;
    };
    new_vendor: {
      id: string;
      name: string;
      category: string;
      selection_reason: string;
    };
  };
}
