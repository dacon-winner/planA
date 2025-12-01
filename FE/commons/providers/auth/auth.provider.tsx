/**
 * AuthProvider Component
 * 버전: 1.0.0
 * 생성 시각: 2025-01-27
 * 규칙 준수: 01-common.mdc
 * - [x] 독립적인 부품 형태로 구현
 * - [x] Context API를 통한 인증 상태 관리
 * - [x] AsyncStorage 기반 인증 상태 관리 (React Native)
 */

import { useRouter } from "expo-router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_PATHS } from "../../enums/url";

/**
 * AsyncStorage 키 상수
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
  checkAuth: () => Promise<boolean>;
  /** 사용자 정보 조회 함수 */
  getUser: () => Promise<User | null>;
  /** 로그인 세션 설정 함수 */
  setAuthSession: (token: string, user: User) => Promise<void>;
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
 * AsyncStorage에서 값 가져오기
 */
const getStorageItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`AsyncStorage getItem error: ${key}`, error);
    return null;
  }
};

/**
 * AsyncStorage에 값 저장하기
 */
const setStorageItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`AsyncStorage setItem error: ${key}`, error);
  }
};

/**
 * AsyncStorage에서 값 제거하기
 */
const removeStorageItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`AsyncStorage removeItem error: ${key}`, error);
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
  const checkAuth = async (): Promise<boolean> => {
    const accessToken = await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    return accessToken !== null && accessToken !== "";
  };

  /**
   * 사용자 정보 조회 함수
   */
  const getUser = async (): Promise<User | null> => {
    const userStr = await getStorageItem(STORAGE_KEYS.USER);
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
  const logout = async (): Promise<void> => {
    // AsyncStorage에서 accessToken 제거
    await removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    // AsyncStorage에서 user 제거
    await removeStorageItem(STORAGE_KEYS.USER);
    // 상태 업데이트
    setIsAuthenticated(false);
    setUser(null);
    // 로그인 페이지로 이동
    router.push(URL_PATHS.AUTH_LOGIN);
  };

  /**
   * 로그인 세션 설정 함수
   * 로그인 또는 회원가입 성공 시 호출하여 세션을 저장하고 상태를 업데이트합니다.
   */
  const setAuthSession = async (
    token: string,
    userData: User
  ): Promise<void> => {
    try {
      // 1. AsyncStorage에 저장
      await setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      await setStorageItem(STORAGE_KEYS.USER, JSON.stringify(userData));

      // 2. 상태 업데이트
      setIsAuthenticated(true);
      setUser(userData);

      // 3. 홈 화면으로 이동 (필요 시)
      // router.replace(URL_PATHS.HOME);
    } catch (error) {
      console.error("Session setup failed:", error);
      // 에러 처리 로직 추가 가능
    }
  };

  /**
   * 초기 인증 상태 로드
   */
  useEffect(() => {
    /**
     * 상태 업데이트 함수 (비동기)
     */
    const loadAuthState = async (): Promise<void> => {
      const authStatus = await checkAuth();
      const userData = await getUser();
      setIsAuthenticated(authStatus);
      setUser(userData);
    };

    // 초기 마운트 시 한 번만 상태 로드
    // logout/login 등에서 이미 상태를 직접 업데이트하므로 주기적 체크 불필요
    loadAuthState();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
    getUser,
    setAuthSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
