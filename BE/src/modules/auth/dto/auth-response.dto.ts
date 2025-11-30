import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: '홍길동' })
  name!: string;

  @ApiProperty({ example: 'MALE', enum: ['MALE', 'FEMALE', 'OTHER'] })
  gender!: 'MALE' | 'FEMALE' | 'OTHER';

  @ApiProperty({ example: '010-1234-5678' })
  phone!: string;

  @ApiPropertyOptional({ example: '2026-05-15' })
  wedding_date!: Date | null;

  @ApiPropertyOptional({ example: '강남구' })
  preferred_region!: string | null;

  @ApiPropertyOptional({ example: 10000000 })
  budget_limit!: number | null;

  @ApiProperty({ example: 'EMAIL' })
  provider!: string;

  @ApiProperty({ example: true })
  is_push_on!: boolean;

  @ApiProperty({ example: '2025-11-26T00:00:00.000Z' })
  created_at!: Date;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token!: string;

  @ApiProperty({ type: UserResponseDto })
  user!: UserResponseDto;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token!: string;
}
