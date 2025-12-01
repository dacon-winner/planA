/**
 * AuthProvider Component
 * 버전: 2.0.0
 * 수정 시각: 2025-12-01
 * 규칙 준수: 01-common.mdc
 * - [x] 독립적인 부품 형태로 구현
 * - [x] Context API를 통한 인증 상태 관리
 * - [x] AsyncStorage 기반 인증 상태 관리 (React Native)
 * - [x] 앱 최초 실행 시 자동 라우팅 로직 추가
 */

import { useRouter } from "expo-router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_PATHS } from "../../enums/url";
import { client } from "../../api/client";

/**
 * AsyncStorage 키 상수
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
  INIT_FLAG: "authInitialized", // 초기화 완료 플래그
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
  /** 초기 로딩 상태 (토큰 확인 중) */
  isLoading: boolean;
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
  /** Access Token 조회 함수 */
  getAccessToken: () => Promise<string | null>;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const hasInitialized = useRef(false); // 초기화 완료 플래그

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
   * Access Token 조회 함수
   */
  const getAccessToken = async (): Promise<string | null> => {
    return await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
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
    // AsyncStorage에서 모든 인증 정보 제거
    await removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    await removeStorageItem(STORAGE_KEYS.USER);
    await removeStorageItem(STORAGE_KEYS.INIT_FLAG); // 초기화 플래그도 제거
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
   * 초기 인증 상태 로드 및 자동 라우팅
   */
  useEffect(() => {
    /**
     * 초기 진입 로직
     * 1. accessToken 확인
     * 2. 있으면 → 플랜 조회 → 플랜 > 0: Home, 플랜 = 0: Form
     * 3. 없으면 → Login
     */
    const initializeAuth = async (): Promise<void> => {
      try {
        // AsyncStorage에서 초기화 플래그 확인
        const initFlag = await getStorageItem(STORAGE_KEYS.INIT_FLAG);
        if (initFlag === "true") {
          console.log("⚠️ [AuthProvider] 이미 초기화됨, 상태만 복원");
          const authStatus = await checkAuth();
          const userData = await getUser();
          setIsAuthenticated(authStatus);
          setUser(userData);
          setIsLoading(false);
          return;
        }

        console.log("🔐 [AuthProvider] 초기 인증 상태 확인 시작...");
        
        // 초기화 플래그 설정
        await setStorageItem(STORAGE_KEYS.INIT_FLAG, "true");
        
        const accessToken = await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
        const userData = await getUser();

        if (!accessToken) {
          console.log("❌ [AuthProvider] 토큰 없음 → 로그인 화면으로 이동");
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          router.replace(URL_PATHS.AUTH_LOGIN);
          return;
        }

        console.log("✅ [AuthProvider] 토큰 존재 → 플랜 확인 중...");
        setIsAuthenticated(true);
        setUser(userData);

        try {
          // 플랜 목록 조회
          const response = await client.get<{
            success: boolean;
            data: { items: Array<{ plan: { id: string } | null }> };
          }>("/api/v1/plans");

          const plans = response.data.data.items.filter(
            (item) => item.plan !== null
          );

          console.log(`📊 [AuthProvider] 플랜 개수: ${plans.length}`);

          if (plans.length > 0) {
            console.log("✅ [AuthProvider] 플랜 있음 → Home으로 이동");
            router.replace(URL_PATHS.HOME);
          } else {
            console.log("📝 [AuthProvider] 플랜 없음 → Form으로 이동");
            router.replace(URL_PATHS.FORM);
          }
        } catch (planError: any) {
          console.error("❌ [AuthProvider] 플랜 조회 실패:", planError);
          
          // 401 에러면 토큰이 만료된 것 (재발급도 실패)
          if (planError.response?.status === 401) {
            console.log("🔄 [AuthProvider] 토큰 만료 → 로그아웃 처리");
            await removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
            await removeStorageItem(STORAGE_KEYS.USER);
            await removeStorageItem(STORAGE_KEYS.INIT_FLAG);
            setIsAuthenticated(false);
            setUser(null);
            router.replace(URL_PATHS.AUTH_LOGIN);
          } else {
            // 기타 에러는 일단 Home으로 보냄
            console.log("⚠️ [AuthProvider] 플랜 조회 에러 → Home으로 이동");
            router.replace(URL_PATHS.HOME);
          }
        }
      } catch (error) {
        console.error("❌ [AuthProvider] 초기화 에러:", error);
        router.replace(URL_PATHS.AUTH_LOGIN);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuth,
    getUser,
    setAuthSession,
    getAccessToken,
  };

  // 초기 로딩 중에는 빈 화면 표시 (또는 스플래시)
  if (isLoading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
