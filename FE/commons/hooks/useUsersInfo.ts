/**
 * useUsersInfo Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/commons/api/client";
import {
  CreateUsersInfoRequest,
  UsersInfoResponse,
} from "@/commons/types/users-info";

/**
 * 사용자 정보 및 AI 플랜 생성 Hook
 *
 * @returns 생성 Mutation 객체
 *
 * @example
 * const { mutate, data, isSuccess } = useCreateUsersInfo();
 * mutate({
 *   wedding_date: '2026-05-15',
 *   preferred_region: '강남구',
 *   budget_limit: 10000000
 * });
 */
export function useCreateUsersInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUsersInfoRequest) => {
      console.log("🌐 [API] 사용자 정보 생성 및 AI 플랜 요청:", data);

      const response = await client.post<{
        success: boolean;
        data: UsersInfoResponse;
      }>("/api/v1/users-info", data);

      console.log("✅ [API] 사용자 정보 생성 응답:", response.data);

      // 백엔드 응답 구조: { success, data: UsersInfoResponse }
      return response.data.data;
    },
    onSuccess: () => {
      // 플랜 생성 성공 시 플랜 목록 캐시 무효화하여 최신 데이터 가져오기
      console.log("🔄 [Cache] 플랜 목록 캐시 무효화");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
}
