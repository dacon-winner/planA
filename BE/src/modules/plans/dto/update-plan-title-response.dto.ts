import { ApiProperty } from '@nestjs/swagger';

/**
 * 플랜 제목 수정 응답 DTO
 */
export class UpdatePlanTitleResponseDto {
  @ApiProperty({
    description: '메시지',
    example: '플랜 제목이 수정되었습니다.',
  })
  message: string;

  @ApiProperty({
    description: '플랜 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  planId: string;

  @ApiProperty({
    description: '수정된 제목',
    example: '우리의 꿈같은 웨딩',
  })
  title: string;
}
