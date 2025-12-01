/**
 * usePlans Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { buildApiUrl, env } from '@/commons/config';

/**
 * 플랜 정보 타입
 */
export interface PlanInfo {
  id: string;
  title: string;
  total_budget: number | null;
  is_ai_generated: boolean;
}

/**
 * 사용자 정보 타입
 */
export interface UsersInfo {
  id: string;
  is_main_plan: boolean;
  wedding_date: string | null;
  preferred_region: string | null;
  budget_limit: number | null;
}

/**
 * 플랜 목록 아이템 타입
 */
export interface PlanListItem {
  users_info: UsersInfo;
  plan: PlanInfo | null;
}

/**
 * 플랜 목록 응답 타입
 */
export interface PlanListResponse {
  items: PlanListItem[];
}

/**
 * 플랜 목록 조회 Hook
 *
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 플랜 목록 및 메타데이터
 *
 * @example
 * const { data, isLoading, error } = usePlans();
 */
export function usePlans(enabled: boolean = true) {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const url = buildApiUrl('/api/v1/plans');
      console.log('🌐 [API] 플랜 목록 요청');

      const response = await axios.get<{ success: boolean; data: PlanListResponse }>(url, {
        headers: {
          Authorization: `Bearer ${env.accessToken}`,
        },
      });

      console.log('✅ [API] 플랜 목록 응답:', {
        items: response.data.data.items?.length || 0,
      });

      // 백엔드 응답 구조: { success, data: { items } }
      return response.data.data;
    },
    enabled,
  });
}

/**
 * 플랜 상세 조회 Hook
 *
 * @param planId 플랜 ID
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 플랜 상세 정보 및 메타데이터
 *
 * @example
 * const { data, isLoading, error } = usePlanDetail('plan-id');
 */
export function usePlanDetail(planId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['plan', planId],
    queryFn: async () => {
      const url = buildApiUrl(`/api/v1/plans/${planId}`);
      console.log('🌐 [API] 플랜 상세 요청:', planId);

      const response = await axios.get<{ success: boolean; data: any }>(url, {
        headers: {
          Authorization: `Bearer ${env.accessToken}`,
        },
      });

      console.log('✅ [API] 플랜 상세 응답:', {
        planId,
        hasData: !!response.data.data,
      });

      // 백엔드 응답 구조: { success, data: { users_info, plan, plan_items } }
      return response.data.data;
    },
    enabled: enabled && !!planId,
  });
}
