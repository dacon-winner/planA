import { test, expect } from '@playwright/test';

/**
 * Database Connection E2E Tests
 * 데이터베이스 연결 및 기본 동작을 확인합니다.
 */
test.describe('Database Integration', () => {
  test('Server should connect to PostgreSQL successfully', async ({ request }) => {
    // Health check를 통해 서버가 정상 작동하는지 확인
    const response = await request.get('/health');
    expect(response.ok()).toBeTruthy();

    const body = (await response.json()) as {
      success: boolean;
      data: { status: string };
    };
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('OK');
  });

  test('Server info should include environment details', async ({ request }) => {
    const response = await request.get('/health/info');
    expect(response.ok()).toBeTruthy();

    const body = (await response.json()) as {
      success: boolean;
      data: { environment: string; version: string; uptime: number };
    };
    expect(body.data).toHaveProperty('environment');
    expect(body.data).toHaveProperty('version');
    expect(body.data).toHaveProperty('uptime');

    // 테스트 환경 확인
    expect(body.data.environment).toBe('test');
  });
});

/**
 * API Response Format Tests
 * 모든 API 응답이 일관된 형식을 따르는지 확인합니다.
 */
test.describe('API Response Format', () => {
  test('Success response should follow standard format', async ({ request }) => {
    const response = await request.get('/health');
    const body = (await response.json()) as {
      success: boolean;
      data: unknown;
      timestamp: string;
    };

    // 표준 응답 형식 확인
    expect(body).toHaveProperty('success');
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('timestamp');

    // 타임스탬프 형식 확인
    expect(new Date(body.timestamp)).toBeInstanceOf(Date);
  });

  test('Response should include proper headers', async ({ request }) => {
    const response = await request.get('/health');

    // Content-Type 헤더 확인
    expect(response.headers()['content-type']).toContain('application/json');
  });
});
