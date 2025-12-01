import { ApiProperty } from '@nestjs/swagger';

/**
 * 대표 플랜 설정 응답 DTO
 */
export class SetMainPlanResponseDto {
  @ApiProperty({
    description: '성공 메시지',
    example: '대표 플랜이 설정되었습니다.',
  })
  message: string;

  @ApiProperty({
    description: '설정된 대표 플랜 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  planId: string;

  @ApiProperty({
    description: '설정된 users_info ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  usersInfoId: string;
}
