/**
 * User 타입 정의
 * 백엔드 인증/회원 API 응답 구조를 기반으로 함
 */

export interface User {
  id: string;
  email: string;
  name: string;
  gender: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}


