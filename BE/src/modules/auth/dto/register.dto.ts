import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
  IsInt,
  Min,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '이메일 주소',
  })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수입니다.' })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: '비밀번호 (최소 8자, 영문/숫자/특수문자 포함)',
  })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
  })
  @IsString()
  @IsNotEmpty({ message: '이름은 필수입니다.' })
  name: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '전화번호',
  })
  @IsString()
  @IsNotEmpty({ message: '전화번호는 필수입니다.' })
  @Matches(/^01[0-9]-\d{4}-\d{4}$/, {
    message: '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)',
  })
  phone: string;

  @ApiProperty({
    example: '2026-05-15',
    description: '결혼 예정일 (YYYY-MM-DD)',
  })
  @IsDateString({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' })
  @IsNotEmpty({ message: '결혼 예정일은 필수입니다.' })
  wedding_date: string;

  @ApiProperty({
    example: '강남구',
    description: '선호 지역',
  })
  @IsString()
  @IsNotEmpty({ message: '선호 지역은 필수입니다.' })
  preferred_region: string;

  @ApiProperty({
    example: 10000000,
    description: '예산 한도 (원)',
  })
  @IsInt({ message: '예산은 정수여야 합니다.' })
  @Min(0, { message: '예산은 0 이상이어야 합니다.' })
  @IsNotEmpty({ message: '예산 한도는 필수입니다.' })
  budget_limit: number;
}
