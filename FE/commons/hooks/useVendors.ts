/**
 * useVendors Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * 
 * 지도 영역과 카테고리 기반으로 업체 목록을 조회하는 커스텀 훅
 * 
 * @description
 * - React Query를 사용한 서버 상태 관리
 * - 지도 영역(bounds) 기반 업체 필터링
 * - 카테고리별 필터링 지원
 * - 자동 캐싱 및 리페칭 처리
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useVendors({
 *   category: 'STUDIO',
 *   swLat: 37.5,
 *   swLng: 126.9,
 *   neLat: 37.6,
 *   neLng: 127.0,
 * }, true);
 * ```
 */

import { useQuery } from '@tanstack/react-query';
import { client } from '@/commons/api/client';

/**
 * 업체 정보 인터페이스
 */
export interface Vendor {
  id: string;
  category: 'ALL' | 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP';
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  thumbnail_url?: string;
  badges: string[];
  introduction?: string;
  service_items?: {
    id: string;
    name: string;
    price: number;
    description?: string;
    thumbnail_url?: string;
    is_package: boolean;
  }[];
}

/**
 * 업체 조회 파라미터 인터페이스
 */
export interface VendorsParams {
  /** 업체 카테고리 */
  category: 'ALL' | 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP';
  /** 남서쪽 위도 */
  swLat: number;
  /** 남서쪽 경도 */
  swLng: number;
  /** 북동쪽 위도 */
  neLat: number;
  /** 북동쪽 경도 */
  neLng: number;
}

/**
 * 업체 조회 응답 인터페이스
 */
export interface VendorsResponse {
  /** 업체 목록 */
  vendors: Vendor[];
  /** 전체 업체 수 */
  total: number;
  /** 현재 페이지 */
  page: number;
  /** 페이지당 항목 수 */
  limit: number;
}

/**
 * 업체 상세 조회 응답 인터페이스
 */
export interface VendorDetailResponse {
  id: string;
  category: 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP';
  name: string;
  address: string;
  phone: string;
  introduction: string;
  service_items: {
    id: string;
    name: string;
    price: number;
    is_package: boolean;
  }[];
  vendor_images: string[] | null;
  is_confirmed?: boolean;
}

/**
 * 업체 목록 조회 Hook
 * 
 * @param params 검색 파라미터 (category, 좌표 범위, 페이지네이션)
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 업체 목록 및 메타데이터
 * 
 * @example
 * const { data, isLoading, error } = useVendors({
 *   category: 'VENUE',
 *   swLat: 37.5,
 *   swLng: 126.9,
 *   neLat: 37.6,
 *   neLng: 127.0,
 * });
 */
export function useVendors(params: VendorsParams, enabled: boolean = true) {
  return useQuery({
    queryKey: ['vendors', params],
    queryFn: async () => {
      // 'ALL'일 때는 category 파라미터 제외
      const queryParams: Record<string, string> = {
        swLat: params.swLat.toString(),
        swLng: params.swLng.toString(),
        neLat: params.neLat.toString(),
        neLng: params.neLng.toString(),
      };

      // 'ALL'이 아닐 때만 category 추가
      if (params.category !== 'ALL') {
        queryParams.category = params.category;
      }

      console.log('🌐 [API] 요청:', queryParams);

      const response = await client.get<{ success: boolean; data: VendorsResponse }>('/api/v1/vendors', { params: queryParams });
      
      console.log('✅ [API] 응답:', {
        total: response.data.data.total,
        vendors: response.data.data.vendors?.length || 0,
      });

      // 백엔드 응답 구조: { success, data: { vendors, total } }
      return response.data.data;
    },
    enabled,
  });
}

/**
 * 업체 상세 조회 Hook
 * 
 * @param vendorId 업체 ID (UUID)
 * @param planId 플랜 ID (선택, is_confirmed 포함 여부 결정)
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 업체 상세 정보
 * 
 * @example
 * const { data, isLoading, error } = useVendorDetail('550e8400-e29b-41d4-a716-446655440000', '123e4567-e89b-12d3-a456-426614174000');
 */
export function useVendorDetail(vendorId: string | null | undefined, planId?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['vendor', vendorId, planId],
    queryFn: async () => {
      if (!vendorId) {
        throw new Error('업체 ID가 필요합니다.');
      }

      const queryParams: Record<string, string> = {};
      if (planId) {
        queryParams.plan_id = planId;
      }

      console.log('🌐 [API] 업체 상세 조회 요청:', { vendorId, planId });

      const response = await client.get<{ success: boolean; data: VendorDetailResponse; timestamp: string }>(`/api/v1/vendors/${vendorId}`, { params: queryParams });
      
      console.log('✅ [API] 업체 상세 조회 응답:', {
        id: response.data.data.id,
        name: response.data.data.name,
        category: response.data.data.category,
      });

      // 백엔드 응답 구조: { success, data: { vendor detail }, timestamp }
      return response.data.data;
    },
    enabled: enabled && !!vendorId,
  });
}

