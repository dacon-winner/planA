/**
 * useAiRecommendations Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';
import { buildApiUrl } from '@/commons/config';
import { useAuth } from '@/commons/providers/auth/auth.provider';

/**
 * AI 추천 업체 정보 타입
 */
export interface AiRecommendedVendor {
  vendor_id: string;
  category: string;
  name: string;
  thumbnail_url: string;
  address: string;
  reason: string;
}

/**
 * AI 추천 API 응답 데이터 타입
 */
export interface AiRecommendationsResponse {
  recommendations: AiRecommendedVendor[];
  overall_reason: string;
}

/**
 * AI 추천 업체 조회 Hook
 * 현재 보고 있는 업체를 기반으로 AI가 추천하는 다른 업체 목록을 조회합니다.
 *
 * @param vendorId 업체 ID
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns AI 추천 업체 목록 및 메타데이터
 *
 * @example
 * const { data, isLoading, error } = useAiRecommendations('vendor-id');
 */
export function useAiRecommendations(vendorId: string | null, enabled: boolean = true) {
  const { getAccessToken } = useAuth();

  const isEnabled = enabled && !!vendorId;

  return useQuery({
    queryKey: ['ai-recommendations', vendorId],
    queryFn: async () => {
      if (!vendorId) {
        throw new Error('업체 ID가 필요합니다.');
      }

      if (__DEV__) {
        console.log('🌐 [API] AI 추천 업체 목록 요청:', vendorId);
      }

      // 실제 API 연동 (현재 업체 기반 AI 추천)
      const url = buildApiUrl(`/api/v1/vendors/${vendorId}/ai-recommendations`);
      const accessToken = await getAccessToken();

      const response = await axios.get<{
        success: boolean;
        data: AiRecommendationsResponse;
        timestamp: string;
      }>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (__DEV__) {
        console.log('✅ [API] AI 추천 업체 목록 응답:', {
          vendorId,
          count: response.data.data.recommendations?.length || 0,
        });
      }

      return response.data.data;
    },
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    refetchOnMount: false, // 마운트 시 재요청 방지
  });
}