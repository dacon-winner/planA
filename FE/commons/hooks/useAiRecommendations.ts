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

  // iOS에서도 확인 가능한 로깅
  console.log('🔍 [useAiRecommendations] vendorId:', vendorId, 'enabled:', enabled, 'isEnabled:', isEnabled);
  if (__DEV__) {
    console.warn('🔍 [useAiRecommendations] Debug - vendorId:', vendorId, 'isEnabled:', isEnabled);
  }

  // vendorId 변경 시 로깅
  useEffect(() => {
    console.log('🔄 [useAiRecommendations] vendorId changed:', vendorId, 'isEnabled:', isEnabled);
  }, [vendorId, isEnabled]);

  return useQuery({
    queryKey: ['ai-recommendations', vendorId],
    queryFn: async () => {
      if (!vendorId) {
        throw new Error('업체 ID가 필요합니다.');
      }

      console.log('🌐 [API] AI 추천 업체 목록 요청:', vendorId);

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

      console.log('✅ [API] AI 추천 업체 목록 응답:', {
        vendorId,
        rawResponse: response.data,
        recommendations: response.data.data.recommendations,
        overallReason: response.data.data.overall_reason,
        recommendationsType: typeof response.data.data.recommendations,
        recommendationsLength: Array.isArray(response.data.data.recommendations) ? response.data.data.recommendations.length : 'not array',
      });

      // aiRecommendationsData 자체 로깅
      console.log('🎯 [API] aiRecommendationsData:', response.data.data);

      // 데이터가 실제로 있는지 확인
      if (response.data.data.recommendations && Array.isArray(response.data.data.recommendations) && response.data.data.recommendations.length > 0) {
        console.log('✅ [API] AI 추천 데이터가 성공적으로 불러와졌습니다!', {
          vendorId,
          totalItems: response.data.data.recommendations.length,
          categories: [...new Set(response.data.data.recommendations.map(item => item.category))],
          overallReason: response.data.data.overall_reason
        });
      } else {
        console.log('⚠️ [API] AI 추천 데이터가 빈 값입니다.', { vendorId });
      }

      return response.data.data;
    },
    enabled: isEnabled,
    // 캐싱 문제 방지 - 항상 최신 데이터 가져오기
    staleTime: 0,
    gcTime: 0,
  });
}
