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

interface Plan {
  id: string;
  user_id: string;
  users_info_id: string;
  title: string;
  is_ai_generated: boolean;
  plan_items: Array<{
    id: string;
    vendor_id: string;
    vendor: {
      id: string;
      name: string;
      category: string;
    };
  }>;
}

interface UsersInfoResponse {
  usersInfo: UsersInfo;
  plan: Plan | null;
}

interface ReservationResponse {
  id: string;
  user_id: string;
  vendor_id: string;
  plan_id: string;
  reservation_date: string;
  reservation_time: string;
  status: string;
  is_deposit_paid: boolean;
  deposit_amount: number;
  visitor_name: string;
  visitor_phone: string;
  visitor_count: number;
  memo: string | null;
  created_at: string;
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
 * Reservations API E2E Tests
 *
 * 테스트 시나리오:
 * 1. 예약 생성 성공 케이스
 * 2. 예약 생성 실패 케이스 (검증 오류)
 * 3. 권한 검증 (다른 사용자의 플랜)
 * 4. 인증 검증
 */

test.describe('Reservations API E2E Tests', () => {
  let accessToken: string;
  let userId: string;
  let planId: string;
  let vendorId: string;

  // 테스트 전: 사용자 및 플랜 생성
  test.beforeAll(async ({ request }) => {
    console.log('📦 테스트 환경 구성 중...');

    // 1. 사용자 생성 (회원가입)
    const testUser = {
      email: generateTestEmail(),
      password: 'Password123!',
      name: '예약테스트',
      gender: 'MALE',
      phone: '010-1234-5678',
    };

    const registerRes = await request.post(`${BASE_URL}${AUTH_PREFIX}/register`, {
      data: testUser,
    });

    expect(registerRes.status()).toBe(201);
    const registerBody = (await registerRes.json()) as ApiResponse<AuthResponse>;
    accessToken = registerBody.data.access_token;
    userId = registerBody.data.user.id;

    console.log(`✅ 사용자 생성 완료: ${userId}`);

    // 2. UsersInfo 생성 (자동으로 플랜 생성됨)
    const usersInfoRes = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        wedding_date: '2026-05-15',
        preferred_region: '강남구',
        budget_limit: 10000000,
      },
    });

    expect(usersInfoRes.status()).toBe(201);
    const usersInfoBody = (await usersInfoRes.json()) as ApiResponse<UsersInfoResponse>;

    if (usersInfoBody.data.plan) {
      planId = usersInfoBody.data.plan.id;
      console.log(`✅ 플랜 생성 완료: ${planId}`);

      // 첫 번째 업체 ID 추출 (예약에 사용)
      if (usersInfoBody.data.plan.plan_items.length > 0) {
        vendorId = usersInfoBody.data.plan.plan_items[0].vendor_id;
        console.log(`✅ 테스트용 업체 ID: ${vendorId}`);
      } else {
        // AI 추천 결과가 없는 경우 샘플 데이터의 업체 ID 사용
        vendorId = '11111111-1111-1111-1111-111111111111'; // A 스튜디오
        console.log(`⚠️  AI 추천 결과 없음. 샘플 업체 ID 사용: ${vendorId}`);
      }
    } else {
      throw new Error('플랜 생성 실패. 테스트를 진행할 수 없습니다.');
    }

    console.log('✅ 테스트 환경 구성 완료\n');
  });

  test.describe.serial('예약 생성 성공 케이스', () => {
    let reservationId: string;

    test('[1] 예약 생성 성공', async ({ request }) => {
      const reservationData = {
        vendor_id: vendorId,
        reservation_date: '25-12-25', // yy-mm-dd 형식
        reservation_time: '14:00', // hh:mm 형식
      };

      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: reservationData,
      });

      console.log(`Response status: ${response.status()}`);
      const body = (await response.json()) as ApiResponse<ReservationResponse>;
      console.log('Response body:', JSON.stringify(body, null, 2));

      expect(response.status()).toBe(201);

      const result = body;
      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('id');
      expect(result.data.user_id).toBe(userId);
      expect(result.data.vendor_id).toBe(vendorId);
      expect(result.data.plan_id).toBe(planId);
      expect(result.data.reservation_time).toBe('14:00');
      expect(result.data.status).toBe('PENDING'); // 기본값
      expect(result.data.is_deposit_paid).toBe(false); // 기본값
      expect(result.data.deposit_amount).toBe(0); // 기본값
      expect(result.data.visitor_count).toBe(2); // 기본값
      expect(result.data.visitor_name).toBe('예약테스트'); // users 테이블에서 가져옴
      expect(result.data.visitor_phone).toBe('010-1234-5678'); // users 테이블에서 가져옴

      reservationId = result.data.id;
      console.log(`✅ 예약 생성 성공: ${reservationId}`);
    });

    test('[2] 다른 날짜로 예약 생성', async ({ request }) => {
      const reservationData = {
        vendor_id: vendorId,
        reservation_date: '26-01-15',
        reservation_time: '10:30',
      };

      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: reservationData,
      });

      expect(response.status()).toBe(201);
      const result = (await response.json()) as ApiResponse<ReservationResponse>;
      expect(result.data.reservation_time).toBe('10:30');

      console.log(`✅ 다른 날짜 예약 성공: ${result.data.id}`);
    });
  });

  test.describe('예약 생성 실패 - 검증 오류', () => {
    test('[1] 잘못된 날짜 형식 (yyyy-mm-dd)', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: vendorId,
          reservation_date: '2025-12-25', // 잘못된 형식 (yy-mm-dd여야 함)
          reservation_time: '14:00',
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
      expect(body.error.message).toContain('yy-mm-dd');
    });

    test('[2] 잘못된 시간 형식', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: vendorId,
          reservation_date: '25-12-25',
          reservation_time: '14:00:00', // 잘못된 형식 (hh:mm여야 함)
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
      expect(body.error.message).toContain('hh:mm');
    });

    test('[3] vendor_id 누락', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          reservation_date: '25-12-25',
          reservation_time: '14:00',
          // vendor_id 누락
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('[4] reservation_date 누락', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: vendorId,
          reservation_time: '14:00',
          // reservation_date 누락
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('[5] reservation_time 누락', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: vendorId,
          reservation_date: '25-12-25',
          // reservation_time 누락
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('[6] 잘못된 UUID 형식 (vendor_id)', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: 'invalid-uuid',
          reservation_date: '25-12-25',
          reservation_time: '14:00',
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('[7] 존재하지 않는 vendor_id', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: '00000000-0000-0000-0000-000000000000', // 존재하지 않는 UUID
          reservation_date: '25-12-25',
          reservation_time: '14:00',
        },
      });

      expect(response.status()).toBe(404);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
      expect(body.error.message).toContain('업체를 찾을 수 없습니다');
    });

    test('[8] 존재하지 않는 plan_id', async ({ request }) => {
      const fakePlanId = '00000000-0000-0000-0000-000000000000';

      const response = await request.post(`${BASE_URL}/api/v1/plans/${fakePlanId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: vendorId,
          reservation_date: '25-12-25',
          reservation_time: '14:00',
        },
      });

      expect(response.status()).toBe(404);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
      expect(body.error.message).toContain('플랜을 찾을 수 없습니다');
    });

    test('[9] 유효하지 않은 날짜 (존재하지 않는 날짜)', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: vendorId,
          reservation_date: '25-13-35', // 13월 35일은 존재하지 않음
          reservation_time: '14:00',
        },
      });

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
      expect(body.error.message).toContain('유효하지 않은 날짜');
    });
  });

  test.describe('권한 검증', () => {
    let otherUserToken: string;
    let otherUserPlanId: string;

    test.beforeAll(async ({ request }) => {
      // 다른 사용자 생성
      const otherUser = {
        email: generateTestEmail(),
        password: 'Password123!',
        name: '다른사용자',
        gender: 'FEMALE',
        phone: '010-9999-9999',
      };

      const registerRes = await request.post(`${BASE_URL}${AUTH_PREFIX}/register`, {
        data: otherUser,
      });
      const registerBody = (await registerRes.json()) as ApiResponse<AuthResponse>;
      otherUserToken = registerBody.data.access_token;

      // 다른 사용자의 플랜 생성
      const usersInfoRes = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
        headers: {
          Authorization: `Bearer ${otherUserToken}`,
        },
        data: {
          wedding_date: '2026-06-20',
          preferred_region: '강남구',
          budget_limit: 8000000,
        },
      });

      const usersInfoBody = (await usersInfoRes.json()) as ApiResponse<UsersInfoResponse>;
      if (usersInfoBody.data.plan) {
        otherUserPlanId = usersInfoBody.data.plan.id;
      }
    });

    test('[1] 다른 사용자의 플랜에 예약 시도', async ({ request }) => {
      const response = await request.post(
        `${BASE_URL}/api/v1/plans/${otherUserPlanId}/reservations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 첫 번째 사용자의 토큰
          },
          data: {
            vendor_id: vendorId,
            reservation_date: '25-12-25',
            reservation_time: '14:00',
          },
        },
      );

      expect(response.status()).toBe(400);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
      expect(body.error.message).toContain('접근할 권한이 없습니다');
    });

    test('[2] 자신의 플랜에는 예약 가능', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          vendor_id: vendorId,
          reservation_date: '26-02-14',
          reservation_time: '15:00',
        },
      });

      expect(response.status()).toBe(201);
      const result = (await response.json()) as ApiResponse<ReservationResponse>;
      expect(result.data.user_id).toBe(userId);
    });
  });

  test.describe('인증 검증', () => {
    test('[1] 토큰 없이 예약 시도', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        data: {
          vendor_id: vendorId,
          reservation_date: '25-12-25',
          reservation_time: '14:00',
        },
      });

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });

    test('[2] 잘못된 토큰으로 예약 시도', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/v1/plans/${planId}/reservations`, {
        headers: {
          Authorization: 'Bearer invalid-token',
        },
        data: {
          vendor_id: vendorId,
          reservation_date: '25-12-25',
          reservation_time: '14:00',
        },
      });

      expect(response.status()).toBe(401);
      const body = (await response.json()) as ErrorResponse;
      expect(body.success).toBe(false);
    });
  });

  test.describe('통합 테스트', () => {
    test('[1] 완전한 예약 생성 플로우', async ({ request }) => {
      console.log('\n🎯 완전한 예약 생성 플로우 테스트');

      // 1. 새 사용자 생성
      const newUser = {
        email: generateTestEmail(),
        password: 'FlowTest123!',
        name: '통합테스트사용자',
        gender: 'MALE',
        phone: '010-7777-7777',
      };

      const registerRes = await request.post(`${BASE_URL}${AUTH_PREFIX}/register`, {
        data: newUser,
      });
      const registerBody = (await registerRes.json()) as ApiResponse<AuthResponse>;
      const token = registerBody.data.access_token;
      console.log('   ✅ 1단계: 사용자 생성');

      // 2. UsersInfo 생성 (플랜 자동 생성)
      const usersInfoRes = await request.post(`${BASE_URL}${USERS_INFO_PREFIX}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          wedding_date: '2026-07-10',
          preferred_region: '강남구',
          budget_limit: 12000000,
        },
      });

      const usersInfoBody = (await usersInfoRes.json()) as ApiResponse<UsersInfoResponse>;
      expect(usersInfoBody.data.plan).toBeTruthy();
      const newPlanId = usersInfoBody.data.plan!.id;
      console.log('   ✅ 2단계: 플랜 생성');

      // 3. 예약 생성
      const reservationRes = await request.post(
        `${BASE_URL}/api/v1/plans/${newPlanId}/reservations`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            vendor_id: vendorId,
            reservation_date: '26-03-20',
            reservation_time: '11:00',
          },
        },
      );

      expect(reservationRes.status()).toBe(201);
      const reservationBody = (await reservationRes.json()) as ApiResponse<ReservationResponse>;
      expect(reservationBody.data.visitor_name).toBe(newUser.name);
      expect(reservationBody.data.visitor_phone).toBe(newUser.phone);

      console.log('   ✅ 3단계: 예약 생성');
      console.log(`   예약 ID: ${reservationBody.data.id}`);
      console.log(`   방문자: ${reservationBody.data.visitor_name}`);
      console.log(`   연락처: ${reservationBody.data.visitor_phone}`);
      console.log('   ✅ 완전한 예약 플로우 성공!\n');
    });
  });
});
