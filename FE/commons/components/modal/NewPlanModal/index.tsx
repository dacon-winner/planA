/**
 * NewPlanModal Component
 * 피그마 노드ID: 4188:8191
 * 새 플랜 만들기 모달
 */

import React from "react";
import { View } from "react-native";
import { Modal } from "../Modal";
import { useModal } from "@/commons/providers/modal/modal.provider";

export interface NewPlanModalProps {
  /** 직접 업체 추가 버튼 핸들러 */
  onManualAdd?: () => void;
  /** AI 플랜 생성 버튼 핸들러 */
  onAIGenerate?: () => void;
}

export const NewPlanModalContent: React.FC<NewPlanModalProps> = ({
  onManualAdd,
  onAIGenerate,
}) => {
  const { closeModal } = useModal();

  return (
    <Modal
      title="새 플랜 만들기"
      description="새 플랜 생성 방법을 선택해주세요"
      buttons={{
        left: {
          label: "직접 업체 추가",
          onPress: () => {
            onManualAdd?.();
            // closeModal()을 호출하지 않음 - 모달 내용만 교체
          },
        },
        right: {
          label: "AI 플랜 생성",
          onPress: () => {
            onAIGenerate?.();
            // closeModal()을 호출하지 않음 - 모달 내용만 교체
          },
        },
      }}
    ></Modal>
  );
};

export const NewPlanModal: React.FC<NewPlanModalProps> = (props) => {
  const { openModal } = useModal();

  React.useEffect(() => {
    // 컴포넌트가 마운트되면 자동으로 모달 열기
    openModal(<NewPlanModalContent {...props} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이 컴포넌트는 보이지 않는 placeholder만 반환
  return <View />;
};
