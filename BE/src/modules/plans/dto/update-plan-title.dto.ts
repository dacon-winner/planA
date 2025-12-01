import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

/**
 * 플랜 제목 수정 DTO
 */
export class UpdatePlanTitleDto {
  @ApiProperty({
    description: '플랜 제목',
    example: '우리의 꿈같은 웨딩',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  title: string;
}
