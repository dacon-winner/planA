import { test, expect } from '@playwright/test';

const BASE_URL = process.env.API_URL || 'http://localhost:3000';
const API_PREFIX = '/api/v1/users/auth';

// 테스트용 고유한 이메일 생성
const generateTestEmail = () =>
  `test.${Date.now()}.${Math.random().toString(36).substr(2, 9)}@example.com`;

// API 응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  phone: string;
  wedding_date: string;
  preferred_region: string;
  budget_limit: number;
  provider: string;
  is_push_on: boolean;
  created_at: string;
}

interface AuthResponse {
  access_token: string;
  user: UserData;
}

interface RefreshResponse {
  access_token: string;
}

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
  path: string;
}

/**
 * Auth API E2E Tests
 *
 * 테스트 순서:
 * 1. 회원가입 테스트
 * 2. 로그인 테스트
 * 3. 인증된 API 테스트 (토큰 필요)
 * 4. 통합 테스트
 * 5. 보안 테스트
 */

test.describe('Auth API E2E Tests', () => {
  // 테스트 전체에서 사용할 사용자 정보
  const testUser = {
    email: generateTestEmail(),
    password: 'Password123!',
    name: '홍길동',
    phone: '010-1234-5678',
    wedding_date: '2026-05-15',
    preferred_region: '강남구',
    budget_limit: 10000000,
  };
  let accessToken: string;

  test.describe.serial('회원가입 및 로그인 흐름', () => {
    test('[1] 회원가입 성공', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/register`, {
        data: testUser,
      });

      expect(response.status()).toBe(201);

      const body = (await response.json()) as ApiResponse<AuthResponse>;
      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty('access_token');
      expect(body.data).toHaveProperty('user');
      expect(body.data.user.email).toBe(testUser.email);
      expect(body.data.user).not.toHaveProperty('password_hash');

      // 토큰 저장
      accessToken = body.data.access_token;
    });

    test('[2] 회원가입 실패 - 중복 이메일', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/register`, {
        data: testUser,
      });

      expect(response.status()).toBe(409);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
      expect(body.error.message).toContain('이미 사용 중인 이메일');
    });

    test('[3] 로그인 성공', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/login`, {
        data: {
          email: testUser.email,
          password: testUser.password,
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<AuthResponse>;
      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty('access_token');
      expect(body.data.user.email).toBe(testUser.email);

      // 새 토큰으로 업데이트
      accessToken = body.data.access_token;
    });

    test('[4] 사용자 정보 조회 성공', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<UserData>;
      expect(body.success).toBe(true);
      expect(body.data.email).toBe(testUser.email);
      expect(body.data.name).toBe(testUser.name);
      expect(body.data).not.toHaveProperty('password_hash');
    });

    test('[5] 토큰 재발급 성공', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/refresh`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<RefreshResponse>;
      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty('access_token');

      // 새 토큰 저장
      const newToken = body.data.access_token;

      // 새 토큰으로 사용자 정보 조회 가능한지 확인
      const meResponse = await request.get(`${BASE_URL}${API_PREFIX}/me`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });

      expect(meResponse.status()).toBe(200);
    });
  });

  test.describe('회원가입 검증 테스트', () => {
    test('잘못된 이메일 형식', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/register`, {
        data: {
          ...testUser,
          email: 'invalid-email',
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('약한 비밀번호', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/register`, {
        data: {
          ...testUser,
          email: generateTestEmail(),
          password: '1234',
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('잘못된 전화번호 형식', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/register`, {
        data: {
          ...testUser,
          email: generateTestEmail(),
          phone: '12345678',
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('필수 필드 누락', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/register`, {
        data: {
          email: generateTestEmail(),
          password: 'Password123!',
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });
  });

  test.describe('로그인 검증 테스트', () => {
    test('잘못된 비밀번호', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/login`, {
        data: {
          email: testUser.email,
          password: 'WrongPassword123!',
        },
      });

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
      expect(body.error.message).toContain('이메일 또는 비밀번호가 올바르지 않습니다');
    });

    test('존재하지 않는 사용자', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/login`, {
        data: {
          email: 'nonexistent@example.com',
          password: 'Password123!',
        },
      });

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('잘못된 이메일 형식', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/login`, {
        data: {
          email: 'invalid-email',
          password: 'Password123!',
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('필수 필드 누락', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/login`, {
        data: {
          email: testUser.email,
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });
  });

  test.describe('인증 검증 테스트', () => {
    test('토큰 없이 /me 접근', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}/me`);

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('잘못된 토큰으로 /me 접근', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}/me`, {
        headers: {
          Authorization: 'Bearer invalid-token',
        },
      });

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('Bearer 없이 토큰 전송', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}/me`, {
        headers: {
          Authorization: 'some-token',
        },
      });

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('토큰 없이 /refresh 접근', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/refresh`);

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('잘못된 토큰으로 /refresh 접근', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/refresh`, {
        headers: {
          Authorization: 'Bearer invalid-token',
        },
      });

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });
  });

  test.describe('통합 테스트', () => {
    test('완전한 인증 흐름', async ({ request }) => {
      const newUser = {
        email: generateTestEmail(),
        password: 'TestPassword123!',
        name: '통합테스트',
        phone: '010-9876-5432',
        wedding_date: '2026-06-20',
        preferred_region: '서초구',
        budget_limit: 15000000,
      };

      // 1. 회원가입
      const registerRes = await request.post(`${BASE_URL}${API_PREFIX}/register`, {
        data: newUser,
      });
      expect(registerRes.status()).toBe(201);

      // 2. 로그인
      const loginRes = await request.post(`${BASE_URL}${API_PREFIX}/login`, {
        data: { email: newUser.email, password: newUser.password },
      });
      expect(loginRes.status()).toBe(200);
      const loginBody = (await loginRes.json()) as ApiResponse<AuthResponse>;
      const token2 = loginBody.data.access_token;

      // 3. 정보 조회
      const meRes = await request.get(`${BASE_URL}${API_PREFIX}/me`, {
        headers: { Authorization: `Bearer ${token2}` },
      });
      expect(meRes.status()).toBe(200);
      const meBody = (await meRes.json()) as ApiResponse<UserData>;
      expect(meBody.data.email).toBe(newUser.email);

      // 4. 토큰 재발급
      const refreshRes = await request.post(`${BASE_URL}${API_PREFIX}/refresh`, {
        headers: { Authorization: `Bearer ${token2}` },
      });
      expect(refreshRes.status()).toBe(200);
      const refreshBody = (await refreshRes.json()) as ApiResponse<RefreshResponse>;
      const token3 = refreshBody.data.access_token;

      // 5. 새 토큰으로 정보 조회
      const me2Res = await request.get(`${BASE_URL}${API_PREFIX}/me`, {
        headers: { Authorization: `Bearer ${token3}` },
      });
      expect(me2Res.status()).toBe(200);
    });

    test('동시 다중 사용자 회원가입', async ({ request }) => {
      const users = Array.from({ length: 3 }, (_, i) => ({
        email: generateTestEmail(),
        password: `TestPass${i}123!`,
        name: `병렬테스트${i}`,
        phone: `010-1111-222${i}`,
        wedding_date: '2026-07-15',
        preferred_region: '강남구',
        budget_limit: 10000000,
      }));

      // 동시에 회원가입
      const registerPromises = users.map((user) =>
        request.post(`${BASE_URL}${API_PREFIX}/register`, { data: user }),
      );
      const responses = await Promise.all(registerPromises);

      // 모두 성공 확인
      responses.forEach((res) => expect(res.status()).toBe(201));
    });
  });

  test.describe('보안 테스트', () => {
    test('잘못된 JWT 토큰', async ({ request }) => {
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature';

      const response = await request.get(`${BASE_URL}${API_PREFIX}/me`, {
        headers: { Authorization: `Bearer ${fakeToken}` },
      });

      expect(response.status()).toBe(401);
    });

    test('SQL Injection 방어', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/login`, {
        data: {
          email: "admin' OR '1'='1",
          password: "' OR '1'='1",
        },
      });

      expect([400, 401]).toContain(response.status());
    });

    test('XSS 스크립트 입력', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${API_PREFIX}/register`, {
        data: {
          email: generateTestEmail(),
          password: 'Password123!',
          name: '<script>alert("XSS")</script>',
          phone: '010-3333-4444',
          wedding_date: '2026-08-01',
          preferred_region: '강남구',
          budget_limit: 10000000,
        },
      });

      if (response.status() === 201) {
        const body = (await response.json()) as ApiResponse<AuthResponse>;
        expect(body.data.user.name).toBeTruthy();
      }
    });
  });
});
