/**
 * 환경 변수 설정
 *
 * Expo의 Constants를 통해 환경 변수에 접근합니다.
 *
 * @see https://docs.expo.dev/guides/environment-variables/
 */

import Constants from "expo-constants";

/**
 * 환경 변수 타입 정의
 */
interface EnvConfig {
  // 백엔드 API
  apiBaseUrl: string;
  apiTimeout: number;

  // 카카오 API
  kakaoMapApiKey: string;

  // 앱 설정
  appEnv: "development" | "staging" | "production";
  debugMode: boolean;

  // 기타
  sentryDsn?: string;
  gaId?: string;
}

/**
 * 환경 변수 값 가져오기
 */
const getEnvValue = (key: string): string | undefined => {
  return Constants.expoConfig?.extra?.[key] as string | undefined;
};

/**
 * 필수 환경 변수 검증
 */
const validateRequiredEnv = (
  key: string,
  value: string | undefined
): string => {
  if (
    !value ||
    value === "" ||
    value.includes("your_") ||
    value.includes("_here")
  ) {
    throw new Error(
      `❌ 필수 환경 변수가 설정되지 않았습니다: ${key}\n` +
        `\n` +
        `해결 방법:\n` +
        `1. /Users/kimdongeun/planA/FE/.env 파일을 확인하세요\n` +
        `2. ${key} 값을 실제 값으로 변경하세요\n` +
        `3. 개발 서버를 재시작하세요: npx expo start -c\n`
    );
  }
  return value;
};

/**
 * 환경 변수 설정 객체
 */
export const env: EnvConfig = {
  // 백엔드 API
  apiBaseUrl:
    getEnvValue("EXPO_PUBLIC_API_BASE_URL") || "http://10.50.1.33:3000",
  apiTimeout: parseInt(getEnvValue("EXPO_PUBLIC_API_TIMEOUT") || "30000", 10),

  // 카카오 API (필수)
  kakaoMapApiKey: validateRequiredEnv(
    "EXPO_PUBLIC_KAKAO_MAP_API_KEY",
    getEnvValue("EXPO_PUBLIC_KAKAO_MAP_API_KEY")
  ),

  // 앱 설정
  appEnv: (getEnvValue("EXPO_PUBLIC_APP_ENV") ||
    "development") as EnvConfig["appEnv"],
  debugMode: getEnvValue("EXPO_PUBLIC_DEBUG_MODE") === "true",

  // 기타 (선택)
  sentryDsn: getEnvValue("EXPO_PUBLIC_SENTRY_DSN"),
  gaId: getEnvValue("EXPO_PUBLIC_GA_ID"),
};

/**
 * 개발 모드에서 환경 변수 출력
 */
if (__DEV__ && env.debugMode) {
  console.log("🔧 환경 변수 설정:");
  console.log(`  - API Base URL: ${env.apiBaseUrl}`);
  console.log(`  - API Timeout: ${env.apiTimeout}ms`);
  console.log(
    `  - Kakao Map API Key: ${env.kakaoMapApiKey ? "✅ 설정됨" : "❌ 미설정"}`
  );
  console.log(`  - App Environment: ${env.appEnv}`);
  console.log(`  - Debug Mode: ${env.debugMode}`);
}

/**
 * 환경별 설정 헬퍼
 */
export const isDevelopment = env.appEnv === "development";
export const isStaging = env.appEnv === "staging";
export const isProduction = env.appEnv === "production";

/**
 * API URL 빌더
 */
export const buildApiUrl = (path: string): string => {
  // 이미 전체 URL인 경우
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Base URL의 끝 슬래시 제거
  const baseUrl = env.apiBaseUrl.endsWith("/")
    ? env.apiBaseUrl.slice(0, -1)
    : env.apiBaseUrl;

  // Path의 시작 슬래시 보장
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
};

/**
 * 환경 변수 내보내기
 */
export default env;
