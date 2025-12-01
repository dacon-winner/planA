import { ApiProperty } from '@nestjs/swagger';

/**
 * 플랜 삭제 응답 DTO
 */
export class DeletePlanResponseDto {
  @ApiProperty({
    description: '메시지',
    example: '플랜이 삭제되었습니다.',
  })
  message: string;

  @ApiProperty({
    description: '삭제된 플랜 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  planId: string;
}
