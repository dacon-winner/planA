/**
 * useVendors Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { buildApiUrl } from '@/commons/config';

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

export interface VendorsParams {
  category: 'ALL' | 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP';
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

export interface VendorsResponse {
  vendors: Vendor[];
  total: number;
  page: number;
  limit: number;
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

      const url = buildApiUrl('/api/v1/vendors');
      console.log('🌐 [API] 요청:', queryParams);

      const response = await axios.get<{ success: boolean; data: VendorsResponse }>(url, { params: queryParams });
      
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

