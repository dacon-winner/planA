/**
 * useCreateEmptyPlan Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { client } from "@/commons/api/client";

/**
 * 빈 플랜 생성 요청 타입
 */
export interface CreateEmptyPlanRequest {
  /** 결혼 예정일 (YYYY-MM-DD) */
  wedding_date?: string;
  /** 선호 지역 */
  preferred_region?: string;
  /** 예산 한도 */
  budget_limit?: number;
  /** 플랜 제목 */
  title?: string;
}

/**
 * 빈 플랜 생성 응답 타입
 */
export interface CreateEmptyPlanResponse {
  message: string;
}

/**
 * 빈 플랜 생성 Hook
 *
 * @returns 빈 플랜 생성 Mutation 객체
 *
 * @example
 * const { mutate: createEmptyPlan, isPending } = useCreateEmptyPlan();
 * createEmptyPlan(
 *   {
 *     wedding_date: '2025-06-15',
 *     preferred_region: '서울 강남구',
 *     budget_limit: 50000000,
 *     title: '나의 웨딩 플랜'
 *   },
 *   {
 *     onSuccess: () => console.log('빈 플랜 생성 완료'),
 *     onError: (error) => console.error('생성 실패', error),
 *   }
 * );
 */
export function useCreateEmptyPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateEmptyPlanRequest) => {
      console.log("🌐 [API] 빈 플랜 생성 요청:", data);

      const response = await client.post<{
        success: boolean;
        data: CreateEmptyPlanResponse;
      }>("/api/v1/plans", {
        wedding_date: data.wedding_date,
        preferred_region: data.preferred_region,
        budget_limit: data.budget_limit,
        title: data.title || "나의 웨딩 플랜",
      });

      console.log("✅ [API] 빈 플랜 생성 응답:", response.data);

      return response.data.data;
    },
    onSuccess: () => {
      // 빈 플랜 생성 성공 시 플랜 목록 캐시 무효화
      console.log("🔄 [Cache] 빈 플랜 생성 성공 - 플랜 목록 캐시 무효화");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      console.log("✅ [Cache] 플랜 목록 캐시 무효화 완료");
    },
    onError: (error) => {
      console.error("❌ [API] 빈 플랜 생성 실패:", error);
      Alert.alert("오류", "빈 플랜 생성에 실패했습니다.\n다시 시도해주세요.");
    },
  });
}
