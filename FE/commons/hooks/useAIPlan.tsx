import { useModal } from "@/commons/providers/modal/modal.provider";
import { EditModalContent } from "@/commons/components/modal";
import { useMe } from "./useUser";
import { formatWeddingDate, formatBudget, formatRegion } from "@/commons/utils";

export const useAIPlan = () => {
  const { openModal } = useModal();
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
          // TODO: AI 플랜 생성 로직 구현
        }}
        onEdit={() => {
          console.log("수정하기 - 폼 페이지로 이동");
          // TODO: 폼 페이지로 이동 로직 구현
        }}
      />
    );
  };

  return { openAIPlanGenerationModal };
};

