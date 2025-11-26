import { test, expect } from '@playwright/test';

/**
 * Health Check API E2E Tests
 */
test.describe('Health Check API', () => {
  test('GET /health - should return OK status', async ({ request }) => {
    const response = await request.get('/health');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = (await response.json()) as {
      success: boolean;
      data: { status: string };
    };
    expect(body).toHaveProperty('success', true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('status', 'OK');
  });

  test('GET /health/info - should return server information', async ({ request }) => {
    const response = await request.get('/health/info');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = (await response.json()) as {
      success: boolean;
      data: { environment: string; version: string; uptime: number };
    };
    expect(body).toHaveProperty('success', true);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('environment');
    expect(body.data).toHaveProperty('version');
    expect(body.data).toHaveProperty('uptime');
  });
});

/**
 * Root API E2E Tests
 */
test.describe('Root API', () => {
  test('GET / - should return welcome message', async ({ request }) => {
    const response = await request.get('/');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = (await response.json()) as { success: boolean; data: unknown };
    expect(body).toHaveProperty('success', true);
    expect(body).toHaveProperty('data');
  });
});
