/**
 * usePolicies Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useQuery } from "@tanstack/react-query";
import { client } from "@/commons/api/client";

/**
 * 정책 타입
 */
export type PolicyType = "LOAN" | "SUBSIDY" | "GRANT" | "TAX_BENEFIT";

/**
 * 정책 정보 타입
 */
export interface PolicyInfo {
  id: string;
  title: string;
  subtitle: string;
  type: PolicyType;
  badges: string[];
  benefit_summary: string;
  apply_url: string;
  thumbnail_url: string;
}

/**
 * 정책 목록 응답 타입
 */
export interface PolicyListResponse {
  policies: PolicyInfo[];
  total: number;
}

/**
 * 정책 목록 조회 Hook
 *
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 정책 목록 및 메타데이터
 *
 * @example
 * const { data, isLoading, error } = usePolicies();
 */
export function usePolicies(enabled: boolean = true) {
  return useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      console.log("🌐 [API] 정책 목록 요청");

      const response = await client.get<{
        success: boolean;
        data: PolicyListResponse;
      }>("/api/v1/policies");

      console.log("✅ [API] 정책 목록 응답:", {
        total: response.data.data.total,
        count: response.data.data.policies.length,
      });

      // 백엔드 응답 구조: { success, data: { policies, total } }
      return response.data.data;
    },
    enabled,
    staleTime: 10 * 60 * 1000, // 10분간 캐시 유지 (정책 데이터는 자주 변경되지 않음)
    gcTime: 30 * 60 * 1000, // 30분간 가비지 컬렉션 방지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    refetchOnMount: false, // 마운트 시 재요청 방지
  });
}

