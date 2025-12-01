/**
 * useUsersInfo Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { buildApiUrl } from "@/commons/config";
import { useAuth } from "@/commons/providers/auth/auth.provider";
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
  const { getAccessToken } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateUsersInfoRequest) => {
      const url = buildApiUrl("/api/v1/users-info");
      console.log("🌐 [API] 사용자 정보 생성 및 AI 플랜 요청:", data);

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Access token이 없습니다. 로그인이 필요합니다.");
      }

      const response = await axios.post<{
        success: boolean;
        data: UsersInfoResponse;
      }>(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("✅ [API] 사용자 정보 생성 응답:", response.data);

      // 백엔드 응답 구조: { success, data: UsersInfoResponse }
      return response.data.data;
    },
  });
}
