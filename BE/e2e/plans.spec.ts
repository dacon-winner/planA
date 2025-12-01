import { test, expect } from '@playwright/test';

const BASE_URL = process.env.API_URL || 'http://localhost:3000';
const AUTH_PREFIX = '/api/v1/users/auth';
const USERS_INFO_PREFIX = '/api/v1/users-info';
const PLANS_PREFIX = '/api/v1/plans';

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

interface Plan {
  id: string;
  user_id: string;
  users_info_id: string;
  title: string;
  is_ai_generated: boolean;
}

/**
 * Plans E2E 테스트
 *
 * 테스트 시나리오:
 * 1. 플랜 목록 조회
 * 2. 플랜 상세 조회
 * 3. 대표 플랜 설정
 */
test.describe('Plans API Tests', () => {
  let accessToken: string;
  let userId: string;
  let usersInfoId1: string;
  let usersInfoId2: string;
  let planId1: string;
  let planId2: string;

  // 테스트 전 설정: 사용자 생성, 로그인, 기존 플랜 조회
  test.beforeAll(async ({ request }) => {
    // 1. 회원가입
    const testEmail = generateTestEmail();
    const signupResponse = await request.post(`${BASE_URL}${AUTH_PREFIX}/register`, {
      data: {
        email: testEmail,
        password: 'Test1234!@',
        name: '플랜테스트',
        gender: 'MALE',
        phone: '010-1234-5678',
      },
    });

    if (!signupResponse.ok()) {
      const errorData = await signupResponse.json();
      console.error('회원가입 실패:', JSON.stringify(errorData, null, 2));
      throw new Error(`회원가입 실패: ${signupResponse.status()} - ${JSON.stringify(errorData)}`);
    }

    const signupData = (await signupResponse.json()) as ApiResponse<AuthResponse>;
    accessToken = signupData.data.access_token;
    userId = signupData.data.user.id;

    // 2. 첫 번째 users-info 생성
    const usersInfo1Response = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        wedding_date: '2025-06-15',
        preferred_region: '강남구',
        budget_limit: 50000000,
      },
    });

    expect(usersInfo1Response.ok()).toBeTruthy();
    const usersInfo1Data = (await usersInfo1Response.json()) as ApiResponse<Plan>;

    // AI 리소스가 없어서 plan이 null이면 스킵
    if (!usersInfo1Data.data) {
      console.warn('⚠️  AI 리소스 데이터가 없어 플랜이 생성되지 않았습니다.');
      console.warn('   테스트를 스킵하려면 샘플 데이터를 먼저 삽입하세요:');
      console.warn('   psql -d plana < BE/docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql');
      test.skip();
      return;
    }

    usersInfoId1 = usersInfo1Data.data.users_info_id;
    planId1 = usersInfo1Data.data.id;

    // 3. 두 번째 users-info 생성
    const usersInfo2Response = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        wedding_date: '2025-08-20',
        preferred_region: '강남구',
        budget_limit: 60000000,
      },
    });

    expect(usersInfo2Response.ok()).toBeTruthy();
    const usersInfo2Data = (await usersInfo2Response.json()) as ApiResponse<Plan>;

    if (!usersInfo2Data.data) {
      console.warn('⚠️  두 번째 플랜 생성 실패');
      test.skip();
      return;
    }

    usersInfoId2 = usersInfo2Data.data.users_info_id;
    planId2 = usersInfo2Data.data.id;

    console.log('테스트 데이터 생성 완료:');
    console.log(`- userId: ${userId}`);
    console.log(`- usersInfoId1: ${usersInfoId1}, planId1: ${planId1}`);
    console.log(`- usersInfoId2: ${usersInfoId2}, planId2: ${planId2}`);
  });

  test('플랜 목록 조회', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${PLANS_PREFIX}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()) as ApiResponse<{
      items: Array<{
        users_info: {
          id: string;
          is_main_plan: boolean;
          wedding_date: string | null;
          preferred_region: string | null;
          budget_limit: number | null;
        };
        plan: {
          id: string;
          title: string;
          total_budget: number | null;
          is_ai_generated: boolean;
        } | null;
      }>;
    }>;

    console.log('플랜 목록 조회 응답:', JSON.stringify(responseData, null, 2));

    // 검증
    expect(responseData.success).toBe(true);
    expect(responseData.data.items).toHaveLength(2);

    // 첫 번째 플랜이 메인 플랜인지 확인 (첫 번째로 생성된 플랜이 메인 플랜)
    const mainPlan = responseData.data.items.find((item) => item.users_info.is_main_plan);
    expect(mainPlan).toBeDefined();
    expect(mainPlan?.users_info.id).toBe(usersInfoId1);
  });

  test('플랜 상세 조회', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${PLANS_PREFIX}/${planId1}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()) as ApiResponse<{
      users_info: {
        is_main_plan: boolean;
        wedding_date: string | null;
        preferred_region: string | null;
        budget_limit: number | null;
      };
      plan: {
        title: string;
        total_budget: number | null;
        is_ai_generated: boolean;
      };
      plan_items: Array<{
        is_confirmed: boolean;
        vendor: {
          id: string;
          name: string;
          category: string;
          region: string;
          thumbnail_url: string | null;
        };
        reservation: {
          reservation_date: string;
          reservation_time: string;
        } | null;
      }>;
    }>;

    console.log('플랜 상세 조회 응답:', JSON.stringify(responseData, null, 2));

    // 검증
    expect(responseData.success).toBe(true);
    expect(responseData.data.users_info).toBeDefined();
    expect(responseData.data.plan).toBeDefined();
    expect(responseData.data.plan_items).toBeDefined();
    expect(Array.isArray(responseData.data.plan_items)).toBe(true);
  });

  test('대표 플랜 설정 - 두 번째 플랜을 대표 플랜으로 변경', async ({ request }) => {
    // 1. 대표 플랜 설정 API 호출
    const setMainResponse = await request.post(`${BASE_URL}${PLANS_PREFIX}/main`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        planId: planId2,
      },
    });

    if (!setMainResponse.ok()) {
      const errorData = await setMainResponse.json();
      console.error('대표 플랜 설정 실패:', JSON.stringify(errorData, null, 2));
      throw new Error(
        `대표 플랜 설정 실패: ${setMainResponse.status()} - ${JSON.stringify(errorData)}`,
      );
    }

    const setMainData = (await setMainResponse.json()) as ApiResponse<{
      message: string;
      planId: string;
      usersInfoId: string;
    }>;

    console.log('대표 플랜 설정 응답:', JSON.stringify(setMainData, null, 2));

    // 검증: 응답 데이터 확인
    expect(setMainData.success).toBe(true);
    expect(setMainData.data.message).toBe('대표 플랜이 설정되었습니다.');
    expect(setMainData.data.planId).toBe(planId2);
    expect(setMainData.data.usersInfoId).toBe(usersInfoId2);

    // 2. 플랜 목록 조회로 변경 사항 확인
    const listResponse = await request.get(`${BASE_URL}${PLANS_PREFIX}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(listResponse.ok()).toBeTruthy();

    const listData = (await listResponse.json()) as ApiResponse<{
      items: Array<{
        users_info: {
          id: string;
          is_main_plan: boolean;
        };
        plan: {
          id: string;
        } | null;
      }>;
    }>;

    console.log('대표 플랜 변경 후 목록:', JSON.stringify(listData, null, 2));

    // 검증: 두 번째 플랜이 메인 플랜이고, 첫 번째 플랜은 메인 플랜이 아님
    const plan1Item = listData.data.items.find((item) => item.users_info.id === usersInfoId1);
    const plan2Item = listData.data.items.find((item) => item.users_info.id === usersInfoId2);

    expect(plan1Item?.users_info.is_main_plan).toBe(false);
    expect(plan2Item?.users_info.is_main_plan).toBe(true);
  });

  test('대표 플랜 설정 - 다시 첫 번째 플랜을 대표 플랜으로 변경', async ({ request }) => {
    // 1. 대표 플랜 설정 API 호출
    const setMainResponse = await request.post(`${BASE_URL}${PLANS_PREFIX}/main`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        planId: planId1,
      },
    });

    expect(setMainResponse.ok()).toBeTruthy();

    const setMainData = (await setMainResponse.json()) as ApiResponse<{
      message: string;
      planId: string;
      usersInfoId: string;
    }>;

    console.log('대표 플랜 재설정 응답:', JSON.stringify(setMainData, null, 2));

    // 검증: 응답 데이터 확인
    expect(setMainData.success).toBe(true);
    expect(setMainData.data.planId).toBe(planId1);
    expect(setMainData.data.usersInfoId).toBe(usersInfoId1);

    // 2. 플랜 목록 조회로 변경 사항 확인
    const listResponse = await request.get(`${BASE_URL}${PLANS_PREFIX}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(listResponse.ok()).toBeTruthy();

    const listData = (await listResponse.json()) as ApiResponse<{
      items: Array<{
        users_info: {
          id: string;
          is_main_plan: boolean;
        };
      }>;
    }>;

    // 검증: 첫 번째 플랜이 메인 플랜이고, 두 번째 플랜은 메인 플랜이 아님
    const plan1Item = listData.data.items.find((item) => item.users_info.id === usersInfoId1);
    const plan2Item = listData.data.items.find((item) => item.users_info.id === usersInfoId2);

    expect(plan1Item?.users_info.is_main_plan).toBe(true);
    expect(plan2Item?.users_info.is_main_plan).toBe(false);
  });

  test('대표 플랜 설정 - 존재하지 않는 플랜 ID로 요청 시 실패', async ({ request }) => {
    const invalidPlanId = '00000000-0000-0000-0000-000000000000';

    const response = await request.post(`${BASE_URL}${PLANS_PREFIX}/main`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        planId: invalidPlanId,
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);

    const errorData = await response.json();
    console.log('존재하지 않는 플랜 ID 오류 응답:', JSON.stringify(errorData, null, 2));
  });
});

