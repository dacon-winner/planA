import { useRouter } from "expo-router";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { EditModalContent } from "@/commons/components/modal";
import { useMe } from "./useUser";
import { formatWeddingDate, formatBudget, formatRegion } from "@/commons/utils";
import { URL_PATHS } from "@/commons/enums/url";

export const useAIPlan = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { data: userData } = useMe();

  const openAIPlanGenerationModal = () => {
    // 사용자 정보를 포맷하여 scheduleInfo 생성
    const scheduleInfo = {
      date: formatWeddingDate(userData?.wedding_date?.toString() || null),
      location: formatRegion(userData?.preferred_region || null),
      budget: formatBudget(userData?.budget_limit || null),
    };

    // EditModalContent를 직접 openModal에 전달하여 모달 내용을 교체합니다.
    openModal(
      <EditModalContent
        scheduleInfo={scheduleInfo}
        onKeep={() => {
          console.log("유지하기 - 현재 정보로 AI 플랜 생성");
          
          // 모달 닫기
          closeModal();

          // 로딩 화면으로 이동하면서 사용자 데이터 전달
          router.push({
            pathname: URL_PATHS.FORM_LOADING,
            params: {
              wedding_date: userData?.wedding_date?.toString() || "",
              preferred_region: userData?.preferred_region || "",
              budget_limit: userData?.budget_limit?.toString() || "",
            },
          } as any);
        }}
        onEdit={() => {
          console.log("수정하기 - 폼 페이지로 이동");
          
          // 모달 닫기
          closeModal();

          // 폼 페이지로 이동하면서 기존 사용자 데이터 전달 (수정 모드)
          router.push({
            pathname: URL_PATHS.FORM,
            params: {
              wedding_date: userData?.wedding_date?.toString() || "",
              preferred_region: userData?.preferred_region || "",
              budget_limit: userData?.budget_limit?.toString() || "",
              isEdit: "true", // 수정 모드 플래그
            },
          } as any);
        }}
      />
    );
  };

  return { openAIPlanGenerationModal };
};

