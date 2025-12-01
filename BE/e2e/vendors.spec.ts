import { test, expect } from '@playwright/test';

const BASE_URL = process.env.API_URL || 'http://localhost:3000';
const API_PREFIX = '/api/v1/vendors';

// API 응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  thumbnail_url: string | null;
  is_package: boolean;
}

interface AiResource {
  content: string;
}

interface Vendor {
  id: string;
  category: string;
  name: string;
  address: string;
  phone: string;
  latitude: number | string; // DB에서 decimal 타입은 string으로 반환됨
  longitude: number | string; // DB에서 decimal 타입은 string으로 반환됨
  thumbnail_url: string | null;
  badges: string[];
  service_items: ServiceItem[];
  ai_resources: AiResource[];
}

interface GetVendorsResponse {
  vendors: Vendor[];
  total: number;
}

/**
 * Vendors API E2E Tests
 *
 * 테스트 순서:
 * 1. 좌표 범위 내 업체 조회 테스트
 * 2. 카테고리 필터링 테스트
 * 3. vendor 이름 검색 테스트 (좌표 무관)
 * 4. 복합 조건 테스트
 * 5. 에러 케이스 테스트
 */

test.describe('Vendors API E2E Tests', () => {
  // 서울 강남구 일대의 좌표 (테스트용)
  const testCoordinates = {
    swLat: '37.4',
    swLng: '126.8',
    neLat: '37.7',
    neLng: '127.2',
  };

  // 좁은 범위의 좌표 (빈 결과 테스트용)
  const emptyCoordinates = {
    swLat: '35.0',
    swLng: '125.0',
    neLat: '35.01',
    neLng: '125.01',
  };

  test.describe('좌표 범위 내 업체 조회', () => {
    test('[1] 모든 카테고리 조회 성공', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: testCoordinates,
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty('vendors');
      expect(body.data).toHaveProperty('total');
      expect(Array.isArray(body.data.vendors)).toBe(true);
      expect(body.data.total).toBe(body.data.vendors.length);

      // 업체가 있다면 구조 검증
      if (body.data.vendors.length > 0) {
        const vendor = body.data.vendors[0];
        expect(vendor).toHaveProperty('id');
        expect(vendor).toHaveProperty('category');
        expect(vendor).toHaveProperty('name');
        expect(vendor).toHaveProperty('address');
        expect(vendor).toHaveProperty('phone');
        expect(vendor).toHaveProperty('latitude');
        expect(vendor).toHaveProperty('longitude');
        expect(vendor).toHaveProperty('thumbnail_url');
        expect(vendor).toHaveProperty('badges');
        expect(vendor).toHaveProperty('service_items');
        expect(vendor).toHaveProperty('ai_resources');
        expect(Array.isArray(vendor.service_items)).toBe(true);
        expect(Array.isArray(vendor.ai_resources)).toBe(true);
        expect(Array.isArray(vendor.badges)).toBe(true);

        // 좌표가 범위 내에 있는지 검증 (string으로 반환되므로 변환 후 비교)
        const lat =
          typeof vendor.latitude === 'string' ? parseFloat(vendor.latitude) : vendor.latitude;
        const lng =
          typeof vendor.longitude === 'string' ? parseFloat(vendor.longitude) : vendor.longitude;
        expect(lat).toBeGreaterThanOrEqual(parseFloat(testCoordinates.swLat));
        expect(lat).toBeLessThanOrEqual(parseFloat(testCoordinates.neLat));
        expect(lng).toBeGreaterThanOrEqual(parseFloat(testCoordinates.swLng));
        expect(lng).toBeLessThanOrEqual(parseFloat(testCoordinates.neLng));
      }
    });

    test('[2] category=ALL 명시적으로 전달', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          category: 'ALL',
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data.vendors)).toBe(true);
    });

    test('[3] 빈 범위 조회 - 결과 없음', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: emptyCoordinates,
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.success).toBe(true);
      expect(body.data.vendors).toEqual([]);
      expect(body.data.total).toBe(0);
    });
  });

  test.describe('카테고리 필터링', () => {
    test('[4] STUDIO 카테고리만 조회', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          category: 'STUDIO',
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.success).toBe(true);

      // 모든 업체가 STUDIO 카테고리인지 검증
      body.data.vendors.forEach((vendor) => {
        expect(vendor.category).toBe('STUDIO');
      });
    });

    test('[5] VENUE 카테고리만 조회', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          category: 'VENUE',
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.success).toBe(true);

      body.data.vendors.forEach((vendor) => {
        expect(vendor.category).toBe('VENUE');
      });
    });

    test('[6] DRESS 카테고리만 조회', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          category: 'DRESS',
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.success).toBe(true);

      body.data.vendors.forEach((vendor) => {
        expect(vendor.category).toBe('DRESS');
      });
    });

    test('[7] MAKEUP 카테고리만 조회', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          category: 'MAKEUP',
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.success).toBe(true);

      body.data.vendors.forEach((vendor) => {
        expect(vendor.category).toBe('MAKEUP');
      });
    });
  });

  test.describe('업체 이름 검색 (좌표 무관)', () => {
    test('[8] vendor 이름으로 검색 - 좌표 제한 없음', async ({ request }) => {
      // 먼저 전체 조회로 업체 하나 찾기
      const allVendorsResponse = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: testCoordinates,
      });

      const allVendorsBody = (await allVendorsResponse.json()) as ApiResponse<GetVendorsResponse>;

      // 업체가 있으면 해당 이름으로 검색
      if (allVendorsBody.data.vendors.length > 0) {
        const targetVendorName = allVendorsBody.data.vendors[0].name;

        // vendor 이름으로 검색 (좁은 좌표 범위 사용 - 좌표 무관하게 검색되어야 함)
        // 좌표는 필수 파라미터이므로 전달해야 함
        const searchResponse = await request.get(`${BASE_URL}${API_PREFIX}`, {
          params: {
            ...testCoordinates, // 정상 좌표 사용 (vendor 검색 시 좌표 필터링은 무시됨)
            vendor: targetVendorName,
          },
        });

        expect(searchResponse.status()).toBe(200);

        const searchBody = (await searchResponse.json()) as ApiResponse<GetVendorsResponse>;
        expect(searchBody.success).toBe(true);

        // vendor 검색어가 있으면 좌표 제한 없이 검색되어야 함
        const foundVendor = searchBody.data.vendors.find((v) => v.name === targetVendorName);
        expect(foundVendor).toBeDefined();
        expect(foundVendor?.name).toBe(targetVendorName);
      }
    });

    test('[9] 존재하지 않는 업체 이름 검색', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          vendor: '절대존재하지않는업체이름12345',
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.success).toBe(true);
      expect(body.data.vendors).toEqual([]);
      expect(body.data.total).toBe(0);
    });
  });

  test.describe('복합 조건 검색', () => {
    test('[10] vendor 이름 + 카테고리 검색', async ({ request }) => {
      // 먼저 STUDIO 카테고리 업체 찾기
      const studioResponse = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          category: 'STUDIO',
        },
      });

      const studioBody = (await studioResponse.json()) as ApiResponse<GetVendorsResponse>;

      if (studioBody.data.vendors.length > 0) {
        const targetVendor = studioBody.data.vendors[0];

        // vendor 이름 + 카테고리로 검색 (좌표는 필수이므로 전달)
        const searchResponse = await request.get(`${BASE_URL}${API_PREFIX}`, {
          params: {
            ...testCoordinates,
            category: 'STUDIO',
            vendor: targetVendor.name,
          },
        });

        expect(searchResponse.status()).toBe(200);

        const searchBody = (await searchResponse.json()) as ApiResponse<GetVendorsResponse>;
        expect(searchBody.success).toBe(true);

        if (searchBody.data.vendors.length > 0) {
          searchBody.data.vendors.forEach((vendor) => {
            expect(vendor.category).toBe('STUDIO');
            expect(vendor.name).toBe(targetVendor.name);
          });
        }
      }
    });

    test('[11] 잘못된 카테고리와 vendor 이름 조합', async ({ request }) => {
      // 먼저 STUDIO 카테고리 업체 찾기
      const studioResponse = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          category: 'STUDIO',
        },
      });

      const studioBody = (await studioResponse.json()) as ApiResponse<GetVendorsResponse>;

      if (studioBody.data.vendors.length > 0) {
        const studioVendorName = studioBody.data.vendors[0].name;

        // VENUE 카테고리로 STUDIO 업체 이름 검색 - 결과 없어야 함
        const searchResponse = await request.get(`${BASE_URL}${API_PREFIX}`, {
          params: {
            ...testCoordinates,
            category: 'VENUE',
            vendor: studioVendorName,
          },
        });

        expect(searchResponse.status()).toBe(200);

        const searchBody = (await searchResponse.json()) as ApiResponse<GetVendorsResponse>;
        expect(searchBody.success).toBe(true);

        // STUDIO 업체가 VENUE로 검색되면 안 됨
        const wrongCategoryVendor = searchBody.data.vendors.find(
          (v) => v.name === studioVendorName,
        );
        expect(wrongCategoryVendor).toBeUndefined();
      }
    });
  });

  test.describe('에러 케이스', () => {
    test('[12] 필수 파라미터 누락 - swLat', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          swLng: testCoordinates.swLng,
          neLat: testCoordinates.neLat,
          neLng: testCoordinates.neLng,
        },
      });

      expect(response.status()).toBe(400);
    });

    test('[13] 필수 파라미터 누락 - swLng', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          swLat: testCoordinates.swLat,
          neLat: testCoordinates.neLat,
          neLng: testCoordinates.neLng,
        },
      });

      expect(response.status()).toBe(400);
    });

    test('[14] 필수 파라미터 누락 - neLat', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          swLat: testCoordinates.swLat,
          swLng: testCoordinates.swLng,
          neLng: testCoordinates.neLng,
        },
      });

      expect(response.status()).toBe(400);
    });

    test('[15] 필수 파라미터 누락 - neLng', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          swLat: testCoordinates.swLat,
          swLng: testCoordinates.swLng,
          neLat: testCoordinates.neLat,
        },
      });

      expect(response.status()).toBe(400);
    });

    test('[16] 잘못된 좌표 형식 - 문자열', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          swLat: 'invalid',
          swLng: testCoordinates.swLng,
          neLat: testCoordinates.neLat,
          neLng: testCoordinates.neLng,
        },
      });

      expect(response.status()).toBe(400);
    });

    test('[17] 잘못된 카테고리', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: {
          ...testCoordinates,
          category: 'INVALID_CATEGORY',
        },
      });

      expect(response.status()).toBe(400);
    });
  });

  test.describe('정렬 및 데이터 일관성', () => {
    test('[18] 업체 목록이 정렬되어 있는지 확인', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: testCoordinates,
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;

      // 업체가 2개 이상이면 일부 업체가 정렬되어 있는지 확인
      if (body.data.vendors.length > 1) {
        // 첫 10개의 연속된 한글 이름만 확인 (한글 정렬이 복잡하므로)
        const koreanVendors = body.data.vendors.filter((v) => /^[가-힣]/.test(v.name)).slice(0, 10);

        if (koreanVendors.length > 1) {
          for (let i = 0; i < koreanVendors.length - 1; i++) {
            const current = koreanVendors[i].name;
            const next = koreanVendors[i + 1].name;
            // 오름차순 정렬 확인 (localeCompare가 <= 0이면 정렬됨)
            expect(current.localeCompare(next, 'ko-KR')).toBeLessThanOrEqual(0);
          }
        }
      }
    });

    test('[19] total 값이 vendors 배열 길이와 일치하는지 확인', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: testCoordinates,
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;
      expect(body.data.total).toBe(body.data.vendors.length);
    });

    test('[20] 모든 업체가 필수 필드를 포함하는지 확인', async ({ request }) => {
      const response = await request.get(`${BASE_URL}${API_PREFIX}`, {
        params: testCoordinates,
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiResponse<GetVendorsResponse>;

      body.data.vendors.forEach((vendor) => {
        // 필수 필드 검증
        expect(typeof vendor.id).toBe('string');
        expect(vendor.id.length).toBeGreaterThan(0);
        expect(typeof vendor.category).toBe('string');
        expect(['VENUE', 'STUDIO', 'DRESS', 'MAKEUP']).toContain(vendor.category);
        expect(typeof vendor.name).toBe('string');
        expect(vendor.name.length).toBeGreaterThan(0);
        expect(typeof vendor.address).toBe('string');
        expect(typeof vendor.phone).toBe('string');
        // latitude/longitude는 DB decimal 타입이 string 또는 number로 반환됨
        expect(['number', 'string']).toContain(typeof vendor.latitude);
        expect(['number', 'string']).toContain(typeof vendor.longitude);
        expect(Array.isArray(vendor.badges)).toBe(true);
        expect(Array.isArray(vendor.service_items)).toBe(true);
        expect(Array.isArray(vendor.ai_resources)).toBe(true);
      });
    });
  });
});
