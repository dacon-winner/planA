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
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_PATHS } from "../../enums/url";
import { User } from "@/commons/types/user";
import { resolveInitialPlanRoute } from "@/commons/services/plan-navigation";
import { AxiosError } from "axios";
import { env } from "@/commons/config";

/**
 * AsyncStorage 키 상수
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
  INIT_FLAG: "authInitialized", // 초기화 완료 플래그
} as const;

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
  const hasInitialized = useRef(false);

  /**
   * 로그인 상태 확인 함수
   */
  const checkAuth = useCallback(async (): Promise<boolean> => {
    const accessToken = await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    return accessToken !== null && accessToken !== "";
  }, []);

  /**
   * 사용자 정보 조회 함수
   */
  const getUser = useCallback(async (): Promise<User | null> => {
    const userStr = await getStorageItem(STORAGE_KEYS.USER);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  /**
   * Access Token 조회 함수
   */
  const getAccessToken = useCallback(async (): Promise<string | null> => {
    return await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  /**
   * 로그인 함수 (로그인 페이지로 이동)
   */
  const login = useCallback((): void => {
    router.push(URL_PATHS.AUTH_LOGIN);
  }, [router]);

  /**
   * 로그아웃 함수
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      // AsyncStorage에서 모든 인증 정보 제거
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.USER,
        STORAGE_KEYS.INIT_FLAG,
      ]);
      
      // 상태 업데이트
      setIsAuthenticated(false);
      setUser(null);
      
      // 로그인 페이지로 이동
      router.push(URL_PATHS.AUTH_LOGIN);
    } catch (error) {
      console.error("Logout error:", error);
      // 에러가 발생해도 로그인 페이지로 이동
      router.push(URL_PATHS.AUTH_LOGIN);
    }
  }, [router]);

  /**
   * 로그인 세션 설정 함수
   * 로그인 또는 회원가입 성공 시 호출하여 세션을 저장하고 상태를 업데이트합니다.
   */
  const setAuthSession = useCallback(async (
    token: string,
    userData: User
  ): Promise<void> => {
    try {
      // 1. AsyncStorage에 저장 (초기화 플래그도 함께 설정)
      await setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      await setStorageItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      await setStorageItem(STORAGE_KEYS.INIT_FLAG, "true");

      // 2. 상태 업데이트
      setIsAuthenticated(true);
      setUser(userData);

      // 3. 홈 화면으로 이동 (필요 시)
      // router.replace(URL_PATHS.HOME);
    } catch (error) {
      console.error("Session setup failed:", error);
      // 에러 처리 로직 추가 가능
    }
  }, []);

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
      // 이미 초기화되었으면 실행하지 않음
      if (hasInitialized.current) {
        return;
      }

      try {
        // AsyncStorage에서 초기화 플래그 확인
        const initFlag = await getStorageItem(STORAGE_KEYS.INIT_FLAG);
        if (initFlag === "true") {
          if (__DEV__ && env.debugMode) {
            console.log("⚠️ [AuthProvider] 이미 초기화됨, 상태만 복원");
          }
          const authStatus = await checkAuth();
          const userData = await getUser();
          setIsAuthenticated(authStatus);
          setUser(userData);
          setIsLoading(false);
          
          // 토큰이 없으면 로그인 화면으로 이동
          if (!authStatus) {
            if (__DEV__ && env.debugMode) {
              console.log("❌ [AuthProvider] 초기화 플래그는 있지만 토큰 없음 → 로그인 화면으로 이동");
            }
            await removeStorageItem(STORAGE_KEYS.INIT_FLAG);
            router.replace(URL_PATHS.AUTH_LOGIN);
          }
          hasInitialized.current = true;
          return;
        }

        if (__DEV__ && env.debugMode) {
          console.log("🔐 [AuthProvider] 초기 인증 상태 확인 시작...");
        }
        
        const accessToken = await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
        const userData = await getUser();

        // 토큰이 없으면 바로 로그인 화면으로 이동 (초기화 플래그 설정 안 함)
        if (!accessToken) {
          if (__DEV__ && env.debugMode) {
            console.log("❌ [AuthProvider] 토큰 없음 → 로그인 화면으로 이동");
          }
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          router.replace(URL_PATHS.AUTH_LOGIN);
          return;
        }

        // 토큰이 있을 때만 초기화 플래그 설정
        await setStorageItem(STORAGE_KEYS.INIT_FLAG, "true");

        if (__DEV__ && env.debugMode) {
          console.log("✅ [AuthProvider] 토큰 존재 → 플랜 확인 중...");
        }
        setIsAuthenticated(true);
        setUser(userData);

        try {
          const targetRoute = await resolveInitialPlanRoute();
          router.replace(targetRoute);
        } catch (planError) {
          const status = (planError as AxiosError).response?.status;

          if (status === 401) {
            if (__DEV__ && env.debugMode) {
              console.log("🔄 [AuthProvider] 토큰 만료 → 로그아웃 처리");
            }
            // 토큰 만료 시 모든 데이터 초기화
            await removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
            await removeStorageItem(STORAGE_KEYS.USER);
            await removeStorageItem(STORAGE_KEYS.INIT_FLAG);
            setIsAuthenticated(false);
            setUser(null);
            router.replace(URL_PATHS.AUTH_LOGIN);
          } else {
            if (__DEV__ && env.debugMode) {
              console.log("⚠️ [AuthProvider] 플랜 조회 에러 → Home으로 이동");
            }
            router.replace(URL_PATHS.HOME);
          }
        }
      } catch (error) {
        if (__DEV__ && env.debugMode) {
          console.error("❌ [AuthProvider] 초기화 에러:", error);
        }
        // 에러 발생 시 초기화 플래그도 제거
        await removeStorageItem(STORAGE_KEYS.INIT_FLAG);
        router.replace(URL_PATHS.AUTH_LOGIN);
      } finally {
        hasInitialized.current = true;
        setIsLoading(false);
      }
    };
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextType = useMemo(() => ({
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuth,
    getUser,
    setAuthSession,
    getAccessToken,
  }), [isAuthenticated, isLoading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
