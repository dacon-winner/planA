/**
 * AuthProvider Component
 * 버전: 1.0.0
 * 생성 시각: 2025-01-27
 * 규칙 준수: 01-common.mdc
 * - [x] 독립적인 부품 형태로 구현
 * - [x] Context API를 통한 인증 상태 관리
 * - [x] 로컬스토리지 기반 인증 상태 관리
 */

import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { URL_PATHS } from "../../enums/url";

/**
 * 로컬스토리지 키 상수
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
} as const;

/**
 * 사용자 정보 타입
 */
export interface User {
  [key: string]: unknown;
}

/**
 * AuthContext 타입
 */
interface AuthContextType {
  /** 로그인 상태 */
  isAuthenticated: boolean;
  /** 로그인된 사용자 정보 */
  user: User | null;
  /** 로그인 함수 (로그인 페이지로 이동) */
  login: () => void;
  /** 로그아웃 함수 */
  logout: () => void;
  /** 로그인 상태 확인 함수 */
  checkAuth: () => boolean;
  /** 사용자 정보 조회 함수 */
  getUser: () => User | null;
}

/**
 * AuthContext 생성
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * useAuth Hook
 * AuthContext를 사용하기 위한 커스텀 훅
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * AuthProvider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 로컬스토리지에서 값 가져오기
 */
const getStorageItem = (key: string): string | null => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(key);
  }
  return null;
};

/**
 * 로컬스토리지에서 값 제거하기
 */
const removeStorageItem = (key: string): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem(key);
  }
};

/**
 * AuthProvider 컴포넌트
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * 로그인 상태 확인 함수
   */
  const checkAuth = (): boolean => {
    const accessToken = getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    return accessToken !== null && accessToken !== "";
  };

  /**
   * 사용자 정보 조회 함수
   */
  const getUser = (): User | null => {
    const userStr = getStorageItem(STORAGE_KEYS.USER);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  };

  /**
   * 로그인 함수 (로그인 페이지로 이동)
   */
  const login = (): void => {
    router.push(URL_PATHS.AUTH_LOGIN);
  };

  /**
   * 로그아웃 함수
   */
  const logout = (): void => {
    // 로컬스토리지에서 accessToken 제거
    removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    // 로컬스토리지에서 user 제거
    removeStorageItem(STORAGE_KEYS.USER);
    // 상태 업데이트
    setIsAuthenticated(false);
    setUser(null);
    // 로그인 페이지로 이동
    router.push(URL_PATHS.AUTH_LOGIN);
  };

  /**
   * 로컬스토리지 변경 감지 및 상태 업데이트
   */
  useEffect(() => {
    /**
     * 상태 업데이트 함수
     */
    const updateAuthState = (): void => {
      const authStatus = checkAuth();
      const userData = getUser();
      setIsAuthenticated(authStatus);
      setUser(userData);
    };

    // 초기 상태 설정
    updateAuthState();

    /**
     * 로컬스토리지 변경 이벤트 리스너
     */
    const handleStorageChange = (e: StorageEvent): void => {
      if (
        e.key === STORAGE_KEYS.ACCESS_TOKEN ||
        e.key === STORAGE_KEYS.USER ||
        e.key === null
      ) {
        updateAuthState();
      }
    };

    // Storage 이벤트 리스너 등록 (다른 탭/윈도우에서의 변경 감지)
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
    }

    // 주기적으로 상태 확인 (같은 탭에서의 변경 감지)
    const intervalId = setInterval(updateAuthState, 1000);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange);
      }
      clearInterval(intervalId);
    };
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

