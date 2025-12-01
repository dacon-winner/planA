/**
 * usePlanCreation Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 업데이트: useAIPlan에서 확장
 * 규칙 준수: 04-func.mdc
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 * - [x] AI 플랜 생성과 직접 업체 추가 통합 관리
 */

import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { EditModalContent } from "@/commons/components/modal";
import { useMe } from "./useUser";
import { useCreateEmptyPlan } from "./useCreateEmptyPlan";
import { formatWeddingDate, formatBudget, formatRegion } from "@/commons/utils";
import { URL_PATHS } from "@/commons/enums/url";

/**
 * 플랜 생성 모드
 */
type PlanCreationMode = "ai" | "manual";

/**
 * 플랜 생성 관련 Hook
 * AI 플랜 생성과 직접 업체 추가 모두 지원
 *
 * @returns AI 플랜 모달, 직접 추가 모달 오픈 함수
 *
 * @example
 * const { openAIPlanModal, openManualPlanModal } = usePlanCreation();
 *
 * // AI 플랜 생성
 * openAIPlanModal();
 *
 * // 직접 업체 추가
 * openManualPlanModal();
 */
export const usePlanCreation = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { data: userData } = useMe();
  const { mutate: createEmptyPlan, isPending: isCreatingPlan } = useCreateEmptyPlan();

  /**
   * 정보 수정 확인 모달 열기 (공통 로직)
   * @param mode - 플랜 생성 모드 ('ai' | 'manual')
   */
  const openEditInfoModal = (mode: PlanCreationMode) => {
    // 사용자 정보를 포맷하여 scheduleInfo 생성
    const scheduleInfo = {
      date: formatWeddingDate(userData?.wedding_date?.toString() || null),
      location: formatRegion(userData?.preferred_region || null),
      budget: formatBudget(userData?.budget_limit || null),
    };

    // EditModalContent를 직접 openModal에 전달하여 모달 내용을 표시
    openModal(
      <EditModalContent
        scheduleInfo={scheduleInfo}
        onKeep={() => {
          console.log(`[${mode}] 정보 유지하기 선택`);
          // EditModalContent 내부에서 closeModal() 호출하므로 여기서는 불필요

          if (mode === "ai") {
            // AI 플랜 생성: 로딩 화면으로 이동
            console.log("AI 플랜 생성 - 로딩 화면으로 이동");
            router.push({
              pathname: URL_PATHS.FORM_LOADING,
              params: {
                wedding_date: userData?.wedding_date?.toString() || "",
                preferred_region: userData?.preferred_region || "",
                budget_limit: userData?.budget_limit?.toString() || "",
              },
            } as any);
          } else {
            // 직접 업체 추가: 빈 플랜 생성 후 Search로 이동
            console.log("직접 업체 추가 - 빈 플랜 생성 시작");
            createEmptyPlan(
              {
                wedding_date: userData?.wedding_date?.toString() || undefined,
                preferred_region: userData?.preferred_region || undefined,
                budget_limit: userData?.budget_limit || undefined,
                title: "나의 웨딩 플랜",
              },
              {
                onSuccess: () => {
                  console.log("✅ 빈 플랜 생성 성공 - Search 페이지로 이동");
                  router.push({
                    pathname: URL_PATHS.SEARCH,
                    params: { showNewPlanToast: "true" },
                  } as any);
                },
                onError: (error) => {
                  console.error("❌ 빈 플랜 생성 실패:", error);
                  Alert.alert("오류", "빈 플랜 생성에 실패했습니다.\n다시 시도해주세요.");
                },
              }
            );
          }
        }}
        onEdit={() => {
          console.log(`[${mode}] 정보 수정하기 선택`);
          // EditModalContent 내부에서 closeModal() 호출하므로 여기서는 불필요

          // 폼 페이지로 이동하면서 기존 사용자 데이터 전달
          router.push({
            pathname: URL_PATHS.FORM,
            params: {
              wedding_date: userData?.wedding_date?.toString() || "",
              preferred_region: userData?.preferred_region || "",
              budget_limit: userData?.budget_limit?.toString() || "",
              ...(mode === "ai" ? { isEdit: "true" } : { isManualAdd: "true" }),
            },
          } as any);
        }}
      />
    );
  };

  /**
   * AI 플랜 생성 모달 열기
   */
  const openAIPlanModal = () => {
    console.log("📱 AI 플랜 생성 모달 오픈");
    openEditInfoModal("ai");
  };

  /**
   * 직접 업체 추가 모달 열기
   */
  const openManualPlanModal = () => {
    console.log("📱 직접 업체 추가 모달 오픈");
    openEditInfoModal("manual");
  };

  return {
    openAIPlanModal,
    openManualPlanModal,
    isCreatingPlan,
  };
};

