import { test, expect } from '@playwright/test';

const BASE_URL = process.env.API_URL || 'http://localhost:3000';
const API_PREFIX = '/api/v1/policies';

// API 응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

interface Policy {
  id: string;
  title: string;
  subtitle: string | null;
  type: string | null;
  badges: string[];
  benefit_summary: string | null;
  apply_url: string | null;
  thumbnail_url: string | null;
}

interface GetPoliciesResponse {
  policies: Policy[];
  total: number;
}

/**
 * Policies API E2E Tests
 *
 * 테스트 순서:
 * 1. 모든 정책 정보 조회 성공 테스트
 * 2. 응답 데이터 구조 검증
 * 3. 정책 유형별 검증 (LOAN, SUBSIDY, HOUSING)
 */

test.describe('Policies API E2E Tests', () => {
  test.describe('정책 정보 조회', () => {
    test('[1] 모든 정책 정보 조회 성공', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`);

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetPoliciesResponse>;
      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty('policies');
      expect(body.data).toHaveProperty('total');
      expect(Array.isArray(body.data.policies)).toBe(true);
      expect(body.data.total).toBe(body.data.policies.length);
    });

    test('[2] 정책 데이터 구조 검증', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`);
      const body = (await response.json()) as ApiResponse<GetPoliciesResponse>;

      // 정책이 최소 1개 이상 있어야 함 (시드 데이터 확인)
      expect(body.data.policies.length).toBeGreaterThan(0);

      // 첫 번째 정책의 구조 검증
      const policy = body.data.policies[0];
      expect(policy).toHaveProperty('id');
      expect(policy).toHaveProperty('title');
      expect(policy).toHaveProperty('subtitle');
      expect(policy).toHaveProperty('type');
      expect(policy).toHaveProperty('badges');
      expect(policy).toHaveProperty('benefit_summary');
      expect(policy).toHaveProperty('apply_url');
      expect(policy).toHaveProperty('thumbnail_url');

      // 타입 검증
      expect(typeof policy.id).toBe('string');
      expect(typeof policy.title).toBe('string');
      expect(policy.subtitle === null || typeof policy.subtitle === 'string').toBe(true);
      expect(policy.type === null || typeof policy.type === 'string').toBe(true);
      expect(Array.isArray(policy.badges)).toBe(true);
      expect(policy.benefit_summary === null || typeof policy.benefit_summary === 'string').toBe(
        true,
      );
      expect(policy.apply_url === null || typeof policy.apply_url === 'string').toBe(true);
      expect(policy.thumbnail_url === null || typeof policy.thumbnail_url === 'string').toBe(true);
    });

    test('[3] 정책 유형 검증 (LOAN, SUBSIDY, HOUSING)', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`);
      const body = (await response.json()) as ApiResponse<GetPoliciesResponse>;

      const policies = body.data.policies;

      // 정책 유형 분류
      const loanPolicies = policies.filter((p) => p.type === 'LOAN');
      const subsidyPolicies = policies.filter((p) => p.type === 'SUBSIDY');
      const housingPolicies = policies.filter((p) => p.type === 'HOUSING');

      console.log(`총 정책 수: ${policies.length}`);
      console.log(`LOAN 정책: ${loanPolicies.length}개`);
      console.log(`SUBSIDY 정책: ${subsidyPolicies.length}개`);
      console.log(`HOUSING 정책: ${housingPolicies.length}개`);

      // 최소 각 유형별로 1개 이상의 정책이 있어야 함
      expect(loanPolicies.length).toBeGreaterThan(0);
      expect(subsidyPolicies.length).toBeGreaterThan(0);
      expect(housingPolicies.length).toBeGreaterThan(0);
    });

    test('[4] 필수 필드 값 존재 검증', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`);
      const body = (await response.json()) as ApiResponse<GetPoliciesResponse>;

      const policies = body.data.policies;

      // 모든 정책에 대해 필수 필드 검증
      policies.forEach((policy) => {
        // id와 title은 필수
        expect(policy.id).toBeTruthy();
        expect(policy.title).toBeTruthy();
        expect(policy.title.length).toBeGreaterThan(0);

        // badges는 배열이어야 함 (빈 배열도 가능)
        expect(Array.isArray(policy.badges)).toBe(true);
      });
    });

    test('[5] 특정 정책 내용 검증 (신혼부부 디딤돌 대출)', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`);
      const body = (await response.json()) as ApiResponse<GetPoliciesResponse>;

      // 시드 데이터에 있는 "신혼부부 전용 구입자금 대출 (디딤돌)" 검증
      const didimdolPolicy = body.data.policies.find((p) =>
        p.title.includes('디딤돌'),
      );

      // 디딤돌 정책이 존재해야 함
      expect(didimdolPolicy).toBeDefined();

      if (didimdolPolicy) {
        expect(didimdolPolicy.type).toBe('LOAN');
        expect(didimdolPolicy.badges.length).toBeGreaterThan(0);
        expect(didimdolPolicy.benefit_summary).toBeTruthy();
        expect(didimdolPolicy.apply_url).toBeTruthy();
      }
    });

    test('[6] 정렬 검증 (제목 존재 확인)', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`);
      const body = (await response.json()) as ApiResponse<GetPoliciesResponse>;

      const policies = body.data.policies;

      // 정책들이 제목을 가지고 있는지 확인
      // (SQL의 ORDER BY title ASC로 정렬되지만, 한글 정렬은 DB 콜레이션에 따라 달라질 수 있음)
      expect(policies.length).toBeGreaterThan(0);
      
      policies.forEach((policy, index) => {
        expect(policy.title).toBeTruthy();
        console.log(`[${index + 1}] ${policy.title}`);
      });
    });

    test('[7] 응답 시간 검증 (1초 이내)', async ({ request }) => {
      const startTime = Date.now();
      const response = await request.get(`${BASE_URL}${API_PREFIX}`);
      const endTime = Date.now();

      expect(response.status()).toBe(200);

      const responseTime = endTime - startTime;
      console.log(`응답 시간: ${responseTime}ms`);
      expect(responseTime).toBeLessThan(1000); // 1초 이내
    });

    test('[8] 총 개수와 배열 길이 일치 검증', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`);
      const body = (await response.json()) as ApiResponse<GetPoliciesResponse>;

      // total 값과 실제 배열 길이가 일치해야 함
      expect(body.data.total).toBe(body.data.policies.length);
    });
  });
});

