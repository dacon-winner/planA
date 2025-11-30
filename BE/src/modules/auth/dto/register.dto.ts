import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsEnum } from 'class-validator';

/**
 * 회원가입 DTO (1단계)
 * - 기본 정보만 입력받음
 * - users_info 테이블 관련 정보는 별도 API에서 처리
 */
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
    example: 'MALE',
    description: '성별 (MALE, FEMALE, OTHER)',
    enum: ['MALE', 'FEMALE', 'OTHER'],
  })
  @IsEnum(['MALE', 'FEMALE', 'OTHER'], {
    message: '성별은 MALE, FEMALE, OTHER 중 하나여야 합니다.',
  })
  @IsNotEmpty({ message: '성별은 필수입니다.' })
  gender: 'MALE' | 'FEMALE' | 'OTHER';

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
}
