import { ApiProperty } from '@nestjs/swagger';

/**
 * 사용자 상세 정보 수정 응답 DTO
 */
export class UpdateUsersInfoResponseDto {
  @ApiProperty({
    description: '메시지',
    example: '사용자 정보가 수정되었습니다.',
  })
  message: string;

  @ApiProperty({
    description: '사용자 정보 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  usersInfoId: string;

  @ApiProperty({
    description: '수정된 결혼 예정일',
    example: '2025-06-15',
    nullable: true,
  })
  wedding_date: string | null;

  @ApiProperty({
    description: '수정된 선호 지역',
    example: '서울 강남구',
    nullable: true,
  })
  preferred_region: string | null;

  @ApiProperty({
    description: '수정된 예산 한도',
    example: 50000000,
    nullable: true,
  })
  budget_limit: number | null;
}
