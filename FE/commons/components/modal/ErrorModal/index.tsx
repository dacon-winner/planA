/**
 * ErrorModal Component
 * 피그마 노드ID: 4188:8190
 * 에러 메시지 모달
 */

import React from 'react';
import { View, Text } from 'react-native';
import { ShieldAlert } from 'lucide-react-native';
import { Modal } from '../index';
import { styles, iconColors } from '../styles';
import { useModal } from '@/commons/providers/modal/modal.provider';

export interface ErrorModalProps {
  /** 플랜 A 이름 */
  planAName?: string;
  /** 스튜디오 이름 */
  studioName?: string;
  /** 에러 메시지 */
  message?: string;
  /** 확인 버튼 핸들러 */
  onConfirm?: () => void;
  /** 취소 버튼 핸들러 */
  onCancel?: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  planAName = '플랜 A',
  studioName = '에이비 스튜디오',
  message,
  onConfirm,
  onCancel,
}) => {
  const { openModal, closeModal } = useModal();

  // 브랜드 컬러가 적용된 텍스트 렌더링 헬퍼
  const renderTextWithBrandColor = React.useCallback((text: string) => {
    const parts = text.split(new RegExp(`(${planAName}|${studioName})`, 'g'));
    return parts.map((part, index) => {
      if (part === planAName || part === studioName) {
        return (
          <Text key={`brand-${index}`} style={[styles['error-description'], styles['error-description-brand']]}>
            {part}
          </Text>
        );
      }
      return part;
    });
  }, [planAName, studioName]);

  React.useEffect(() => {
    // 컴포넌트가 마운트되면 자동으로 모달 열기
    openModal(
      <Modal
        buttons={{
          left: {
            label: '취소',
            onPress: () => {
              onCancel?.();
              closeModal();
            },
          },
          right: {
            label: '확인',
            onPress: () => {
              onConfirm?.();
              closeModal();
            },
          },
        }}
      >
        <View style={styles['error-modal-content']}>
          <ShieldAlert
            color={iconColors['error-icon']}
            style={[styles['error-icon'], styles['error-icon-size']]}
          />
          <View style={styles['error-description-container']}>
            <Text style={styles['error-description']}>
              {renderTextWithBrandColor(`${planAName}에 스튜디오가 존재합니다.`)}
            </Text>
            <Text style={styles['error-description']}>
              {renderTextWithBrandColor(`${studioName}로 변경하시겠습니까?`)}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }, [onConfirm, onCancel, openModal, closeModal, renderTextWithBrandColor]);

  // 이 컴포넌트는 보이지 않는 placeholder만 반환
  return <View />;
};

