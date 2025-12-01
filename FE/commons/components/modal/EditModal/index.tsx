/**
 * EditModal Component
 * 피그마 노드ID: 4188:8192
 * 정보 수정 모달
 */

import React from "react";
import { View, Text } from "react-native";
import { Calendar, MapPin, Wallet } from "lucide-react-native";
import { Modal } from "../Modal";
import { styles, iconColors } from "../styles";
import { useModal } from "@/commons/providers/modal/modal.provider";

export interface EditModalProps {
  /** 일정 정보 */
  scheduleInfo: {
    date: string;
    location: string;
    budget: string;
  };
  /** 유지하기 버튼 핸들러 */
  onKeep?: () => void;
  /** 수정하기 버튼 핸들러 */
  onEdit?: () => void;
}

export const EditModalContent: React.FC<EditModalProps> = ({
  scheduleInfo,
  onKeep,
  onEdit,
}) => {
  const { closeModal } = useModal();

  return (
    <Modal
      title="정보 수정"
      description="처음 입력한 정보를 확인해 주세요. 수정하시겠습니까?"
      buttons={{
        left: {
          label: "유지하기",
          onPress: () => {
            onKeep?.();
            closeModal();
          },
        },
        right: {
          label: "수정하기",
          onPress: () => {
            onEdit?.();
            closeModal();
          },
        },
      }}
    >
      {/* 일정 정보 표시 */}
      <View style={styles["plan-info-section"]}>
        <View style={styles["plan-info-row"]}>
          <Calendar
            size={16}
            color={iconColors["plan-info-icon"]}
            style={styles["plan-info-icon-component"]}
          />
          <Text style={styles["plan-info-text"]}>{scheduleInfo.date}</Text>
        </View>
        <View style={styles["plan-info-row"]}>
          <MapPin
            size={16}
            color={iconColors["plan-info-icon"]}
            style={styles["plan-info-icon-component"]}
          />
          <Text style={styles["plan-info-text"]}>{scheduleInfo.location}</Text>
        </View>
        <View style={styles["plan-info-row"]}>
          <Wallet
            size={16}
            color={iconColors["plan-info-icon"]}
            style={styles["plan-info-icon-component"]}
          />
          <Text style={styles["plan-info-text"]}>{scheduleInfo.budget}</Text>
        </View>
      </View>
    </Modal>
  );
};

export const EditModal: React.FC<EditModalProps> = (props) => {
  const { openModal } = useModal();

  React.useEffect(() => {
    // 컴포넌트가 마운트되면 자동으로 모달 열기
    openModal(<EditModalContent {...props} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이 컴포넌트는 보이지 않는 placeholder만 반환
  return <View />;
};
