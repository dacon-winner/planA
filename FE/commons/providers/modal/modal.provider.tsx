/**
 * ModalProvider Component
 * 버전: 1.0.0
 * 생성 시각: 2025-01-27
 * 규칙 준수: 01-common.mdc, 02-wireframe.mdc, 03-ui.mdc
 * - [x] 독립적인 부품 형태로 구현
 * - [x] modal-portal을 사용한 기본적인 modal 셋팅
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 */

import { Modal, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ReactNode, createContext, useContext, useState, useCallback } from "react";
import { colors } from "@/commons/enums/color";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = useCallback((modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  const handleBackdropPress = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                {content}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.modal.backdrop, // 반투명 검은색 배경 (밑에 내용이 비치지 않게)
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "transparent",
  },
});

