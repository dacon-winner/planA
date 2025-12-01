/**
 * API Client
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] 중앙화된 Axios 인스턴스
 * - [x] Request/Response Interceptor 적용
 * - [x] 토큰 자동 주입 및 재발급 처리
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildApiUrl } from "@/commons/config";

/**
 * AsyncStorage 키 상수
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
} as const;

/**
 * 중앙화된 Axios 인스턴스
 */
export const client = axios.create({
  baseURL: buildApiUrl(""),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10초 타임아웃
});

/**
 * Request Interceptor
 * 모든 요청에 자동으로 Access Token을 헤더에 추가합니다.
 */
client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `🌐 [API Request] ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ [API Request Error]", error);
    return Promise.reject(error);
  }
);

/**
 * 토큰 재발급 중복 방지를 위한 플래그
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

/**
 * 대기 중인 요청 처리
 */
const processQueue = (error: AxiosError | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

/**
 * Response Interceptor
 * 401 에러 발생 시 토큰 재발급을 시도합니다.
 */
client.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [API Response] ${response.config.url} - ${response.status}`
    );
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러가 아니거나, 이미 재시도한 요청이면 그냥 에러 반환
    if (error.response?.status !== 401 || originalRequest._retry) {
      console.error(
        `❌ [API Error] ${error.config?.url} - ${error.response?.status}`
      );
      return Promise.reject(error);
    }

    // 토큰 재발급이 진행 중이면 대기열에 추가
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return client(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // 재시도 플래그 설정
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      console.log("🔄 [Token Refresh] 토큰 재발급 시작...");

      // 주의: refresh API는 client가 아닌 기본 axios 사용 (무한루프 방지)
      const { data } = await axios.post(
        buildApiUrl("/api/v1/users/auth/refresh"),
        {},
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem(
              STORAGE_KEYS.ACCESS_TOKEN
            )}`,
          },
        }
      );

      // 백엔드 응답 구조: { access_token: "..." }
      const newAccessToken = data.access_token;

      // 새 토큰 저장
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);

      console.log("✅ [Token Refresh] 토큰 재발급 성공");

      // 대기 중인 요청들 처리
      processQueue(null);

      // 실패했던 요청 재시도
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      return client(originalRequest);
    } catch (refreshError) {
      console.error("❌ [Token Refresh] 토큰 재발급 실패:", refreshError);

      // 대기 중인 요청들 에러 처리
      processQueue(refreshError as AxiosError);

      // 로그아웃 처리
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.USER,
      ]);

      // 로그인 페이지로 리다이렉트는 AuthProvider에서 처리하도록 에러만 전파
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

/**
 * API Client Export
 */
export default client;
