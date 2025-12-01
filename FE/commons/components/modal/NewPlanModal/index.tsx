/**
 * NewPlanModal Component
 * 피그마 노드ID: 4188:8191
 * 새 플랜 만들기 모달
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal } from '../Modal';
import { Input } from '@/commons/components/input';
import { useModal } from '@/commons/providers/modal/modal.provider';

export interface NewPlanModalProps {
  /** 플랜 이름 초기값 */
  initialPlanName?: string;
  /** 직접 업체 추가 버튼 핸들러 */
  onManualAdd?: () => void;
  /** AI 플랜 생성 버튼 핸들러 */
  onAIGenerate?: (planName: string) => void;
}

export const NewPlanModalContent: React.FC<NewPlanModalProps> = ({
  initialPlanName = '',
  onManualAdd,
  onAIGenerate,
}) => {
  const { closeModal } = useModal();
  const [planName, setPlanName] = useState(initialPlanName);

  return (
    <Modal
      title="새 플랜 만들기"
      description="새 플랜 이름과 생성 방법을 선택해주세요"
      buttons={{
        left: {
          label: '직접 업체 추가',
          onPress: () => {
            onManualAdd?.();
            closeModal();
          },
        },
        right: {
          label: 'AI 플랜 생성',
          onPress: () => {
            onAIGenerate?.(planName);
            closeModal();
          },
          disabled: !planName.trim(),
        },
      }}
    >
      <Input
        label="플랜 이름"
        size="small"
        value={planName}
        onChangeText={setPlanName}
        placeholder="플랜 A"
      />
    </Modal>
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

