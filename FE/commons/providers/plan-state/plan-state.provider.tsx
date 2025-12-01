/**
 * PlanStateProvider Component
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 01-common.mdc
 * - [x] 독립적인 부품 형태로 구현
 * - [x] Context API를 통한 플랜 상태 관리
 * - [x] AsyncStorage 기반 상태 영구 저장
 */

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

// 플랜 상태 관리 타입들 (중복 정의로 안전하게)
export type VendorStatus = '업체 저장전' | '업체 저장됨' | '예약됨';
export type VendorCategory = '스튜디오' | '드레스' | '메이크업' | '웨딩홀';

export interface PlanVendorState {
  vendorId: string | null;
  status: VendorStatus;
}

export interface PlanState {
  스튜디오: PlanVendorState;
  드레스: PlanVendorState;
  메이크업: PlanVendorState;
  웨딩홀: PlanVendorState;
}

/**
 * AsyncStorage 키 상수
 */
const STORAGE_KEYS = {
  PLAN_STATES: "planStates",
} as const;

/**
 * 플랜 상태 맵 타입 (플랜 ID를 키로 하는 상태 맵)
 */
export interface PlanStatesMap {
  [planId: string]: PlanState;
}

/**
 * PlanStateContext 타입
 */
interface PlanStateContextType {
  /** 플랜 상태 맵 */
  planStates: PlanStatesMap;
  /** 특정 플랜의 상태 조회 */
  getPlanState: (planId: string) => PlanState;
  /** 특정 플랜의 카테고리 상태 업데이트 */
  updateVendorState: (
    planId: string,
    category: VendorCategory,
    vendorId: string | null,
    status: VendorStatus
  ) => Promise<void>;
  /** 특정 플랜의 카테고리 상태 초기화 (업체 저장전) */
  resetVendorState: (planId: string, category: VendorCategory) => Promise<void>;
  /** 플랜 상태 초기화 */
  resetPlanState: (planId: string) => Promise<void>;
  /** 모든 플랜 상태 초기화 */
  resetAllPlanStates: () => Promise<void>;
}

/**
 * PlanStateContext 생성
 */
const PlanStateContext = createContext<PlanStateContextType | undefined>(
  undefined
);

/**
 * usePlanState Hook
 * PlanStateContext를 사용하기 위한 커스텀 훅
 */
export function usePlanState(): PlanStateContextType {
  const context = useContext(PlanStateContext);
  if (!context) {
    throw new Error("usePlanState must be used within a PlanStateProvider");
  }
  return context;
}

/**
 * PlanStateProvider Props
 */
interface PlanStateProviderProps {
  children: ReactNode;
}

/**
 * 기본 플랜 상태 생성 함수
 */
const createDefaultPlanState = (): PlanState => ({
  스튜디오: { vendorId: null, status: '업체 저장전' },
  드레스: { vendorId: null, status: '업체 저장전' },
  메이크업: { vendorId: null, status: '업체 저장전' },
  웨딩홀: { vendorId: null, status: '업체 저장전' },
});

/**
 * AsyncStorage에서 플랜 상태 가져오기
 */
const getStoredPlanStates = async (): Promise<PlanStatesMap> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.PLAN_STATES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("플랜 상태 로드 실패:", error);
  }
  return {};
};

/**
 * AsyncStorage에 플랜 상태 저장하기
 */
const setStoredPlanStates = async (planStates: PlanStatesMap): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PLAN_STATES, JSON.stringify(planStates));
  } catch (error) {
    console.error("플랜 상태 저장 실패:", error);
  }
};

/**
 * PlanStateProvider 컴포넌트
 */
export function PlanStateProvider({ children }: PlanStateProviderProps) {
  const [planStates, setPlanStates] = useState<PlanStatesMap>({});
  const hasInitialized = useRef(false);

  /**
   * 특정 플랜의 상태 조회
   */
  const getPlanState = useCallback((planId: string): PlanState => {
    return planStates[planId] || createDefaultPlanState();
  }, [planStates]);

  /**
   * 특정 플랜의 카테고리 상태 업데이트
   */
  const updateVendorState = useCallback(async (
    planId: string,
    category: VendorCategory,
    vendorId: string | null,
    status: VendorStatus
  ): Promise<void> => {
    console.log(`🔄 [PlanState] ${planId}의 ${category} 상태 업데이트:`, {
      vendorId,
      status
    });

    setPlanStates(prevStates => {
      const newPlanStates = { ...prevStates };
      if (!newPlanStates[planId]) {
        newPlanStates[planId] = createDefaultPlanState();
      }

      newPlanStates[planId][category] = { vendorId, status };
      setStoredPlanStates(newPlanStates);
      return newPlanStates;
    });
  }, []);

  /**
   * 특정 플랜의 카테고리 상태 초기화 (업체 저장전)
   */
  const resetVendorState = useCallback(async (
    planId: string,
    category: VendorCategory
  ): Promise<void> => {
    console.log(`🔄 [PlanState] ${planId}의 ${category} 상태 초기화`);
    await updateVendorState(planId, category, null, '업체 저장전');
  }, [updateVendorState]);

  /**
   * 플랜 상태 초기화
   */
  const resetPlanState = useCallback(async (planId: string): Promise<void> => {
    console.log(`🔄 [PlanState] ${planId} 플랜 상태 초기화`);
    setPlanStates(prevStates => {
      const newPlanStates = { ...prevStates };
      newPlanStates[planId] = createDefaultPlanState();
      setStoredPlanStates(newPlanStates);
      return newPlanStates;
    });
  }, []);

  /**
   * 모든 플랜 상태 초기화
   */
  const resetAllPlanStates = useCallback(async (): Promise<void> => {
    console.log(`🔄 [PlanState] 모든 플랜 상태 초기화`);
    setPlanStates({});
    await setStoredPlanStates({});
  }, []);

  /**
   * 초기 플랜 상태 로드
   */
  useEffect(() => {
    const initializePlanStates = async (): Promise<void> => {
      if (hasInitialized.current) return;

      try {
        if (__DEV__) {
          console.log("📦 [PlanState] 플랜 상태 초기화 시작...");
        }
        const storedStates = await getStoredPlanStates();
        setPlanStates(storedStates);
        if (__DEV__) {
          console.log("✅ [PlanState] 플랜 상태 로드 완료:", storedStates);
        }
      } catch (error) {
        console.error("❌ [PlanState] 플랜 상태 초기화 실패:", error);
      } finally {
        hasInitialized.current = true;
      }
    };

    initializePlanStates();
  }, []);

  const value: PlanStateContextType = useMemo(() => ({
    planStates,
    getPlanState,
    updateVendorState,
    resetVendorState,
    resetPlanState,
    resetAllPlanStates,
  }), [planStates, getPlanState, updateVendorState, resetVendorState, resetPlanState, resetAllPlanStates]);

  return (
    <PlanStateContext.Provider value={value}>
      {children}
    </PlanStateContext.Provider>
  );
}
