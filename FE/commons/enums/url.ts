/**
 * URL 경로 관리
 * 모든 URL 경로를 한 곳에서 관리하며, 다이나믹 라우팅을 지원합니다.
 */

/**
 * 접근 가능 상태 타입
 */
export type AccessType = 'PUBLIC' | 'MEMBER_ONLY';

/**
 * URL 경로 정보
 */
export interface UrlInfo {
  /** 경로 패턴 (다이나믹 라우팅 포함) */
  pattern: string;
  /** 접근 가능 상태 */
  accessType: AccessType;
  /** 네비게이션 노출 여부 */
  showInNavigation: boolean;
}

/**
 * URL 경로 상수 정의
 */
export const URL_PATHS = {
  /** 로그인 */
  AUTH_LOGIN: '/auth/login',
  /** 회원가입 */
  AUTH_SIGNUP: '/auth/signup',
  /** 폼 페이지 */
  FORM: '/form',
  /** 폼 로딩 페이지 */
  FORM_LOADING: '/form/loading',
  /** 홈 페이지 */
  HOME: '/home',
  /** 상세페이지 (다이나믹 라우팅) */
  PLANS_DETAIL: '/plans/[id]',
  /** 검색페이지 */
  SEARCH: '/search',
  /** 플랜페이지 */
  MY_PLAN: '/my-plan',
  /** 마이페이지 */
  MY_PAGE: '/my-page',
} as const;

/**
 * URL 경로별 상세 정보
 */
export const URL_INFO: Record<keyof typeof URL_PATHS, UrlInfo> = {
  AUTH_LOGIN: {
    pattern: URL_PATHS.AUTH_LOGIN,
    accessType: 'PUBLIC',
    showInNavigation: false,
  },
  AUTH_SIGNUP: {
    pattern: URL_PATHS.AUTH_SIGNUP,
    accessType: 'PUBLIC',
    showInNavigation: false,
  },
  FORM: {
    pattern: URL_PATHS.FORM,
    accessType: 'MEMBER_ONLY',
    showInNavigation: false,
  },
  FORM_LOADING: {
    pattern: URL_PATHS.FORM_LOADING,
    accessType: 'MEMBER_ONLY',
    showInNavigation: false,
  },
  HOME: {
    pattern: URL_PATHS.HOME,
    accessType: 'MEMBER_ONLY',
    showInNavigation: true,
  },
  PLANS_DETAIL: {
    pattern: URL_PATHS.PLANS_DETAIL,
    accessType: 'MEMBER_ONLY',
    showInNavigation: true,
  },
  SEARCH: {
    pattern: URL_PATHS.SEARCH,
    accessType: 'MEMBER_ONLY',
    showInNavigation: true,
  },
  MY_PLAN: {
    pattern: URL_PATHS.MY_PLAN,
    accessType: 'MEMBER_ONLY',
    showInNavigation: true,
  },
  MY_PAGE: {
    pattern: URL_PATHS.MY_PAGE,
    accessType: 'MEMBER_ONLY',
    showInNavigation: true,
  },
} as const;

/**
 * 네비게이션에 노출되는 URL 목록
 */
export const NAVIGATION_URLS = Object.entries(URL_INFO)
  .filter(([, info]) => info.showInNavigation)
  .map(([key]) => URL_PATHS[key as keyof typeof URL_PATHS]);

/**
 * 회원 전용 URL 목록
 */
export const MEMBER_ONLY_URLS = Object.entries(URL_INFO)
  .filter(([, info]) => info.accessType === 'MEMBER_ONLY')
  .map(([key]) => URL_PATHS[key as keyof typeof URL_PATHS]);

/**
 * 공개 URL 목록
 */
export const PUBLIC_URLS = Object.entries(URL_INFO)
  .filter(([, info]) => info.accessType === 'PUBLIC')
  .map(([key]) => URL_PATHS[key as keyof typeof URL_PATHS]);

/**
 * 다이나믹 라우팅 파라미터를 실제 값으로 치환하는 헬퍼 함수
 * @param pattern - URL 패턴 (예: '/plans/[id]')
 * @param params - 파라미터 객체 (예: { id: '123' })
 * @returns 실제 URL 경로 (예: '/plans/123')
 */
export function buildUrl(
  pattern: string,
  params?: Record<string, string | number>
): string {
  if (!params) {
    return pattern;
  }

  let url = pattern;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`[${key}]`, String(value));
  });

  return url;
}

/**
 * 플랜 상세 페이지 URL 생성
 * @param id - 플랜 ID
 * @returns 플랜 상세 페이지 URL
 */
export function getPlanDetailUrl(id: string | number): string {
  return buildUrl(URL_PATHS.PLANS_DETAIL, { id });
}

/**
 * URL이 회원 전용인지 확인
 * @param url - 확인할 URL
 * @returns 회원 전용 여부
 */
export function isMemberOnlyUrl(url: string): boolean {
  return MEMBER_ONLY_URLS.some((memberUrl) => {
    // 다이나믹 라우팅 패턴 매칭
    if (memberUrl.includes('[')) {
      const pattern = memberUrl.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(url);
    }
    return memberUrl === url;
  });
}

/**
 * URL이 공개 URL인지 확인
 * @param url - 확인할 URL
 * @returns 공개 URL 여부
 */
export function isPublicUrl(url: string): boolean {
  return PUBLIC_URLS.includes(url as (typeof PUBLIC_URLS)[number]);
}


