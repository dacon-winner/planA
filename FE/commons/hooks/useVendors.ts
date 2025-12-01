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
  category: 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP';
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  thumbnail_url?: string;
  badges: string[];
  introduction?: string;
  price?: number;
}

export interface VendorsParams {
  category: 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP';
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
  page?: number;
  limit?: number;
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
      const response = await axios.get<VendorsResponse>(
        buildApiUrl('/api/v1/vendors'),
        {
          params: {
            category: params.category,
            swLat: params.swLat.toString(),
            swLng: params.swLng.toString(),
            neLat: params.neLat.toString(),
            neLng: params.neLng.toString(),
            page: params.page?.toString() || '1',
            limit: params.limit?.toString() || '20',
          },
        }
      );
      return response.data;
    },
    enabled,
  });
}

