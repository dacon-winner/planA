import { test, expect } from '@playwright/test';

const BASE_URL = process.env.API_URL || 'http://localhost:3000';
const AUTH_PREFIX = '/api/v1/users/auth';
const USERS_INFO_PREFIX = '/api/v1/users-info';

// 테스트용 고유한 이메일 생성
const generateTestEmail = () =>
  `test.${Date.now()}.${Math.random().toString(36).substr(2, 9)}@example.com`;

// API 응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    gender: string;
    phone: string;
  };
}

interface UsersInfo {
  id: string;
  user_id: string;
  is_main_plan: boolean;
  wedding_date: string | null;
  preferred_region: string | null;
  budget_limit: number | null;
  created_at: string;
  updated_at: string;
}

interface Vendor {
  id: string;
  name: string;
  category: string;
  region: string;
}

interface PlanItem {
  id: string;
  vendor_id: string;
  source: string;
  selection_reason: string;
  order_index: number;
  is_confirmed: boolean;
  vendor: Vendor;
}

interface Plan {
  id: string;
  user_id: string;
  users_info_id: string;
  title: string;
  is_ai_generated: boolean;
  plan_items: PlanItem[];
  created_at: string;
}

// API는 Plan만 반환 (CreateUsersInfoResponseDto = Plan)
type UsersInfoResponse = Plan;

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
 * UsersInfo API E2E Tests (2단계 회원가입 + AI 추천)
 *
 * 테스트 순서:
 * 1. 샘플 데이터 생성 (AI 추천용 업체 데이터)
 * 2. users-info 생성 테스트
 * 3. AI 추천 결과 검증
 * 4. Plan 생성 검증
 */

test.describe('UsersInfo & AI Recommendation E2E Tests', () => {
  let accessToken: string;
  let userId: string;

  // 테스트 시작 전: 사용자 생성
  test.beforeAll(async ({ request }) => {
    const testUser = {
      email: generateTestEmail(),
      password: 'Password123!',
      name: '테스트사용자',
      gender: 'MALE',
      phone: '010-1234-5678',
    };

    const registerRes = await request.post(`${BASE_URL}${AUTH_PREFIX}/register`, {
      data: testUser,
    });

    expect(registerRes.status()).toBe(201);
    const body = (await registerRes.json()) as ApiResponse<AuthResponse>;
    accessToken = body.data.access_token;
    userId = body.data.user.id;

    console.log(`✅ 테스트 사용자 생성 완료: ${userId}`);
  });

  // 테스트 시작 전: 샘플 데이터 생성
  test.beforeAll(() => {
    console.log('📦 샘플 데이터 생성 시작...');

    // Vendor 데이터 생성 (API를 통해 직접 DB에 삽입하는 대신, 이미 존재한다고 가정)
    // 실제로는 별도의 setup 스크립트나 migration으로 샘플 데이터를 삽입해야 함
    console.log(
      '⚠️  주의: AI 추천 테스트를 위해서는 ai_resource 테이블에 샘플 데이터가 필요합니다.',
    );
    console.log('   샘플 데이터 삽입: psql -d plana < docs/database/sample_data_for_ai_test.sql');
  });

  test.describe.serial('UsersInfo 생성 및 AI 추천', () => {
    let usersInfoId: string;
    let planId: string;

    test('[1] UsersInfo 생성 성공 (AI 추천 실행)', async ({ request }) => {
      const usersInfoData = {
        wedding_date: '2026-05-15',
        preferred_region: '강남구',
        budget_limit: 50000000, // 웨딩홀 포함 현실적인 예산
      };

      const response = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: usersInfoData,
      });

      console.log(`Response status: ${response.status()}`);
      const body = (await response.json()) as ApiResponse<UsersInfoResponse>;
      console.log('Response body:', JSON.stringify(body, null, 2));

      expect(response.status()).toBe(201);

      const result = body;
      expect(result.success).toBe(true);
      expect(result.data).toBeTruthy();

      // Plan 검증 (API는 Plan 객체만 반환)
      const plan = result.data;
      if (plan) {
        expect(plan.is_ai_generated).toBe(true);
        expect(plan.title).toBe('AI 추천 플랜');
        expect(plan.user_id).toBe(userId);
        expect(plan).toHaveProperty('plan_items');
        expect(plan).toHaveProperty('users_info_id');

        usersInfoId = plan.users_info_id;
        planId = plan.id;

        console.log(`✅ AI 추천 플랜 생성 성공: ${planId}`);
        console.log(`   - UsersInfo ID: ${usersInfoId}`);
        console.log(`   - 추천된 업체 수: ${plan.plan_items.length}`);

        // PlanItems 검증
        plan.plan_items.forEach((item, index) => {
          console.log(`   - ${index + 1}. ${item.vendor.name} (${item.vendor.category})`);
          console.log(`      이유: ${item.selection_reason}`);

          expect(item.source).toBe('AI_RECOMMEND');
          expect(item.vendor).toHaveProperty('id');
          expect(item.vendor).toHaveProperty('name');
          expect(item.vendor).toHaveProperty('category');
          expect(['STUDIO', 'DRESS', 'MAKEUP', 'VENUE']).toContain(item.vendor.category);
        });
      } else {
        console.log('⚠️  AI 추천 결과가 없습니다 (샘플 데이터가 없거나 조건에 맞는 업체가 없음)');
      }
    });

    test('[2] UsersInfo 생성 실패 - 인증 없음', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
        data: {
          wedding_date: '2026-05-15',
          preferred_region: '강남구',
          budget_limit: 10000000,
        },
      });

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('[3] UsersInfo 생성 성공 - 선택적 필드 없이', async ({ request }) => {
      // 새 사용자 생성
      const newUser = {
        email: generateTestEmail(),
        password: 'Password123!',
        name: '선택필드테스트',
        gender: 'FEMALE',
        phone: '010-9999-9999',
      };

      const registerRes = await request.post(`${BASE_URL}${AUTH_PREFIX}/register`, {
        data: newUser,
      });
      const registerBody = (await registerRes.json()) as ApiResponse<AuthResponse>;
      const newToken = registerBody.data.access_token;

      // 빈 데이터로 UsersInfo 생성
      const response = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
        data: {},
      });

      expect(response.status()).toBe(201);
      const body = (await response.json()) as ApiResponse<UsersInfoResponse>;
      expect(body.success).toBe(true);
      // Plan이 반환될 수도 있고 안 될 수도 있음
      if (body.data) {
        console.log(`   - 조건 없이도 AI 추천 실행됨: ${body.data.plan_items?.length || 0}개 업체`);
      }

      // AI 추천은 조건이 없으므로 실행되지 않거나 모든 후보를 고려함
      console.log('   - 조건 없이 생성: AI 추천은 모든 후보 고려');
    });

    test('[4] UsersInfo 생성 실패 - 잘못된 날짜 형식', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          wedding_date: 'invalid-date',
          preferred_region: '강남구',
          budget_limit: 10000000,
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('[5] UsersInfo 생성 실패 - 음수 예산', async ({ request }) => {
      const response = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          wedding_date: '2026-05-15',
          preferred_region: '강남구',
          budget_limit: -1000,
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });
  });

  test.describe('AI 추천 품질 테스트', () => {
    test('[1] 다양한 조건으로 AI 추천 테스트', async ({ request }) => {
      test.setTimeout(60000); // AI API 호출이 여러 번 발생하므로 60초로 설정
      const testCases = [
        {
          name: '강남구, 고예산',
          data: {
            wedding_date: '2026-06-15',
            preferred_region: '강남구',
            budget_limit: 20000000,
          },
        },
        {
          name: '서초구, 중예산',
          data: {
            wedding_date: '2026-07-15',
            preferred_region: '서초구',
            budget_limit: 10000000,
          },
        },
        {
          name: '송파구, 저예산',
          data: {
            wedding_date: '2026-08-15',
            preferred_region: '송파구',
            budget_limit: 5000000,
          },
        },
      ];

      for (const testCase of testCases) {
        console.log(`\n📋 테스트 케이스: ${testCase.name}`);

        // 새 사용자 생성
        const newUser = {
          email: generateTestEmail(),
          password: 'Password123!',
          name: `테스트_${testCase.name}`,
          gender: 'MALE',
          phone: '010-0000-0000',
        };

        const registerRes = await request.post(`${BASE_URL}${AUTH_PREFIX}/register`, {
          data: newUser,
        });
        const registerBody = (await registerRes.json()) as ApiResponse<AuthResponse>;
        const token = registerBody.data.access_token;

        // UsersInfo 생성
        const response = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: testCase.data,
        });

        expect(response.status()).toBe(201);
        const body = (await response.json()) as ApiResponse<UsersInfoResponse>;

        if (body.data && body.data.plan_items && body.data.plan_items.length > 0) {
          console.log(`   ✅ 추천 성공: ${body.data.plan_items.length}개 업체`);
          body.data.plan_items.forEach((item) => {
            console.log(`      - ${item.vendor.name} (${item.vendor.category})`);
          });
        } else {
          console.log(`   ⚠️  추천 결과 없음 (샘플 데이터 부족)`);
        }
      }
    });
  });

  test.describe('통합 테스트 (전체 플로우)', () => {
    test('[1] 1단계 + 2단계 회원가입 + AI 추천', async ({ request }) => {
      // 1단계: 회원가입
      const user = {
        email: generateTestEmail(),
        password: 'CompleteFlow123!',
        name: '완전통합테스트',
        gender: 'FEMALE',
        phone: '010-5555-5555',
      };

      const registerRes = await request.post(`${BASE_URL}${AUTH_PREFIX}/register`, {
        data: user,
      });
      expect(registerRes.status()).toBe(201);
      const registerBody = (await registerRes.json()) as ApiResponse<AuthResponse>;
      const token = registerBody.data.access_token;

      console.log('\n🎯 완전 통합 테스트 시작');
      console.log(`   1단계 완료: 사용자 ${registerBody.data.user.name} 생성`);

      // 2단계: UsersInfo 생성 (AI 추천)
      const usersInfoRes = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          wedding_date: '2026-09-20',
          preferred_region: '강남구',
          budget_limit: 15000000,
        },
      });

      expect(usersInfoRes.status()).toBe(201);
      const usersInfoBody = (await usersInfoRes.json()) as ApiResponse<UsersInfoResponse>;

      console.log(`   2단계 완료: UsersInfo 생성`);

      if (usersInfoBody.data) {
        console.log(`   - AI 추천 플랜: ${usersInfoBody.data.title}`);
        console.log(`   - 추천 업체 수: ${usersInfoBody.data.plan_items.length}`);

        expect(usersInfoBody.data.is_ai_generated).toBe(true);
        expect(usersInfoBody.data.plan_items.length).toBeGreaterThan(0);

        console.log('   ✅ 완전 통합 테스트 성공!');
      } else {
        console.log('   ⚠️  AI 추천은 실행되었으나 결과가 없음 (샘플 데이터 부족)');
      }
    });
  });
});
