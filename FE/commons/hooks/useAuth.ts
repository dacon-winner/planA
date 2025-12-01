/**
 * useAuth Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 독립적인 기능 구현
 */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { buildApiUrl } from "@/commons/config";
import { useAuth } from "@/commons/providers/auth/auth.provider";
import { useRouter } from "expo-router";
import { URL_PATHS } from "@/commons/enums/url";

// 회원가입 요청 데이터 타입
export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
  gender: string;
  phone: string;
}

// 서버 공통 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

// 회원가입 응답 데이터 타입
export interface AuthResponseData {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    gender: string;
    phone: string;
    [key: string]: any;
  };
}

/**
 * 회원가입 Hook
 */
export function useSignUp() {
  const { setAuthSession } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      const url = buildApiUrl("/api/v1/users/auth/register");
      const response = await axios.post<ApiResponse<AuthResponseData>>(
        url,
        payload
      );
      return response.data.data; // .data.data로 실제 데이터 추출
    },
    onSuccess: async (data) => {
      console.log("✅ [SignUp API 응답 원본]:", data);

      // 데이터 구조 안전하게 확인
      if (data && data.user && data.user.email) {
        console.log("✅ 회원가입 성공:", data.user.email);
      } else {
        console.warn("⚠️ [SignUp] 예상치 못한 응답 구조:", data);
      }

      // 자동 로그인 처리
      if (data && data.access_token && data.user) {
        await setAuthSession(data.access_token, data.user);
      }
    },
    onError: (error: any) => {
      console.error("❌ 회원가입 요청 실패:", error);
      if (error.response) {
        console.error("   - Status:", error.response.status);
        console.error("   - Data:", error.response.data);
      }
    },
  });
}

/**
 * 로그인 Hook (추후 사용)
 */
export function useLogin() {
  const { setAuthSession } = useAuth();

  return useMutation({
    mutationFn: async (payload: Pick<SignUpPayload, "email" | "password">) => {
      const url = buildApiUrl("/api/v1/users/auth/login");
      const response = await axios.post<ApiResponse<AuthResponseData>>(
        url,
        payload
      );
      return response.data.data; // .data.data로 실제 데이터 추출
    },
    onSuccess: async (data) => {
      console.log("✅ [Login API 응답 원본]:", data);

      if (data && data.user && data.user.email) {
        console.log("✅ 로그인 성공:", data.user.email);
      } else {
        console.warn("⚠️ [Login] 예상치 못한 응답 구조:", data);
      }

      if (data && data.access_token && data.user) {
        await setAuthSession(data.access_token, data.user);
      }
    },
    onError: (error: any) => {
      console.error("❌ 로그인 요청 실패:", error);
      if (error.response) {
        console.error("   - Status:", error.response.status);
        console.error("   - Data:", error.response.data);
      }
    },
  });
}

