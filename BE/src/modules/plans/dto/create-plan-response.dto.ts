import { ApiProperty } from '@nestjs/swagger';

/**
 * 빈 플랜 생성 응답 DTO
 */
export class CreatePlanResponseDto {
  @ApiProperty({
    description: '메시지',
    example: '빈 플랜 생성 성공',
  })
  message: string;
}
