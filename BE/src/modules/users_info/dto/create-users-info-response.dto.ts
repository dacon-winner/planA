import { ApiProperty } from '@nestjs/swagger';
import { PlanItemInfoDto } from './plan-item-info.dto';

/**
 * 사용자 상세 정보 생성 응답 DTO
 * - AI 추천 플랜 정보 반환
 * - plan_items에 vendor와 service_item 정보 포함
 */
export class CreateUsersInfoResponseDto {
  @ApiProperty({
    description: '플랜 ID',
    example: '123e4567-e89b-12d3-a456-426614174003',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: '123e4567-e89b-12d3-a456-426614174004',
  })
  user_id: string;

  @ApiProperty({
    description: '사용자 상세 정보 ID',
    example: '123e4567-e89b-12d3-a456-426614174005',
  })
  users_info_id: string;

  @ApiProperty({
    description: '플랜 제목',
    example: 'AI 추천 플랜',
  })
  title: string;

  @ApiProperty({
    description: '총 예산',
    example: 10000000,
    nullable: true,
  })
  total_budget: number | null;

  @ApiProperty({
    description: 'AI 생성 여부',
    example: true,
  })
  is_ai_generated: boolean;

  @ApiProperty({
    description: '생성일',
    example: '2024-01-01T00:00:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: '플랜 아이템 목록 (vendor, service_item 정보 포함)',
    type: [PlanItemInfoDto],
  })
  plan_items: PlanItemInfoDto[];
}
