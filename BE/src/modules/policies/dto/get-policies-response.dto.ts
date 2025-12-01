import { ApiProperty } from '@nestjs/swagger';

/**
 * 정책 정보 응답 DTO
 *
 * @description
 * 정부지원 정책 정보를 프론트엔드로 반환할 때 사용하는 DTO입니다.
 */
export class PolicyDto {
  @ApiProperty({
    description: '정책 ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: '정책 제목',
    example: '신혼부부 전용 구입자금 대출 (디딤돌)',
  })
  title: string;

  @ApiProperty({
    description: '정책 부제목',
    example: '생애 최초 내 집 마련을 꿈꾸는 신혼부부를 위한 저금리 대출',
    nullable: true,
  })
  subtitle: string | null;

  @ApiProperty({
    description: '정책 유형',
    example: 'LOAN',
    enum: ['LOAN', 'SUBSIDY', 'HOUSING'],
    nullable: true,
  })
  type: string | null;

  @ApiProperty({
    description: '정책 뱃지 목록',
    example: ['저금리', '최대4억', 'LTV80%'],
    type: [String],
  })
  badges: string[];

  @ApiProperty({
    description: '혜택 요약',
    example: '최저 연 2.15% ~ 3.25% 금리 적용, 최대 4억원 한도 (생애최초 주택구입 시 LTV 80% 적용)',
    nullable: true,
  })
  benefit_summary: string | null;

  @ApiProperty({
    description: '신청 URL',
    example: 'https://nhuf.molit.go.kr/',
    nullable: true,
  })
  apply_url: string | null;

  @ApiProperty({
    description: '썸네일 이미지 URL',
    example: 'https://cdn.plana.com/policy/didimdol.png',
    nullable: true,
  })
  thumbnail_url: string | null;
}

/**
 * 정책 목록 조회 응답 DTO
 */
export class GetPoliciesResponseDto {
  @ApiProperty({
    description: '정책 목록',
    type: [PolicyDto],
  })
  policies: PolicyDto[];

  @ApiProperty({
    description: '총 정책 개수',
    example: 8,
  })
  total: number;
}

