/**
 * Expo 앱 설정
 *
 * .env 파일의 환경 변수를 Expo 앱에서 사용할 수 있도록 설정합니다.
 *
 * @see https://docs.expo.dev/guides/environment-variables/
 */

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      // 백엔드 API
      EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
      EXPO_PUBLIC_API_TIMEOUT: process.env.EXPO_PUBLIC_API_TIMEOUT,

      // 카카오 API
      EXPO_PUBLIC_KAKAO_MAP_API_KEY: process.env.EXPO_PUBLIC_KAKAO_MAP_API_KEY,

      // 앱 설정
      EXPO_PUBLIC_APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
      EXPO_PUBLIC_DEBUG_MODE: process.env.EXPO_PUBLIC_DEBUG_MODE,

      // 기타
      EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
      EXPO_PUBLIC_GA_ID: process.env.EXPO_PUBLIC_GA_ID,
    },
  };
};
