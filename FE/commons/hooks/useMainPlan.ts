/**
 * useMainPlan Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/commons/api/client";

/**
 * 대표 플랜 설정 요청 타입
 */
export interface SetMainPlanRequest {
  planId: string;
}

/**
 * 대표 플랜 설정 응답 타입
 */
export interface SetMainPlanResponse {
  message: string;
  planId: string;
  usersInfoId: string;
}

/**
 * 대표 플랜 설정 Hook
 *
 * @returns 대표 플랜 설정 Mutation 객체
 *
 * @example
 * const { mutate: setMainPlan, isPending } = useSetMainPlan();
 * setMainPlan(
 *   { planId: 'plan-id' },
 *   {
 *     onSuccess: () => console.log('대표 플랜 설정 완료'),
 *     onError: (error) => console.error('설정 실패', error),
 *   }
 * );
 */
export function useSetMainPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SetMainPlanRequest) => {
      console.log("🌐 [API] 대표 플랜 설정 요청:", data);

      const response = await client.post<{
        success: boolean;
        data: SetMainPlanResponse;
      }>("/api/v1/plans/main", data);

      console.log("✅ [API] 대표 플랜 설정 응답:", response.data);

      // 백엔드 응답 구조: { success, data: SetMainPlanResponse }
      return response.data.data;
    },
    onSuccess: (data) => {
      // 대표 플랜 설정 성공 시 관련 캐시 무효화하여 최신 데이터 가져오기
      console.log("🔄 [Cache] 대표 플랜 설정 성공 - 캐시 무효화 시작");

      // 1. 플랜 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["plans"] });

      // 2. 사용자 정보 캐시 무효화 (대표 플랜 정보가 포함됨)
      queryClient.invalidateQueries({ queryKey: ["me"] });

      console.log("✅ [Cache] 플랜 목록 및 사용자 정보 캐시 무효화 완료");
    },
  });
}
