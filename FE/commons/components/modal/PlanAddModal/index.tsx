/**
 * PlanAddModal Component
 * 피그마 노드ID: 4188:8189
 * 내 플랜에 추가하기 모달
 */

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar, MapPin, Wallet } from 'lucide-react-native';
import { Modal } from '../index';
import { Dropdown } from '@/commons/components/dropdown';
import { styles, iconColors } from '../styles';

export interface PlanAddModalProps {
  /** 서비스 이름 (예: 엘레강스 포토) */
  serviceName: string;
  /** 플랜 선택 옵션들 */
  planOptions: {
    value: string;
    label: string;
  }[];
  /** 선택된 플랜 값 */
  selectedPlan?: string;
  /** 플랜 선택 핸들러 */
  onPlanChange?: (value: string) => void;
  /** 확인 버튼 핸들러 */
  onConfirm?: () => void;
  /** 취소 버튼 핸들러 */
  onCancel?: () => void;
  /** 일정 정보 */
  scheduleInfo: {
    date?: string;
    location?: string;
    budget?: string;
  };
}

export const PlanAddModal: React.FC<PlanAddModalProps> = ({
  serviceName,
  planOptions,
  selectedPlan = '',
  onPlanChange,
  onConfirm,
  onCancel,
  scheduleInfo,
}) => {
  const [internalSelectedPlan, setInternalSelectedPlan] = useState(selectedPlan);

  const handlePlanChange = (value: string) => {
    setInternalSelectedPlan(value);
    onPlanChange?.(value);
  };

  return (
    <Modal
      title="내 플랜에 추가하기"
      description={`${serviceName}을(를) 저장할 플랜을 선택해주세요`}
      buttons={{
        left: {
          label: '취소',
          onPress: onCancel || (() => {}),
        },
        right: {
          label: '저장하기',
          onPress: onConfirm || (() => {}),
          disabled: !internalSelectedPlan,
        },
      }}
    >
      <Dropdown
        value={internalSelectedPlan}
        options={planOptions}
        onChange={handlePlanChange}
        placeholder="플랜을 선택하세요"
      />

      {/* 일정 정보 표시 */}
      <View style={styles['plan-info-section']}>
        <View style={styles['plan-info-row']}>
          <Calendar size={16} color={iconColors['plan-info-icon']} style={styles['plan-info-icon-component']} />
          <Text style={styles['plan-info-text']}>{scheduleInfo.date}</Text>
        </View>
        <View style={styles['plan-info-row']}>
          <MapPin size={16} color={iconColors['plan-info-icon']} style={styles['plan-info-icon-component']} />
          <Text style={styles['plan-info-text']}>{scheduleInfo.location}</Text>
        </View>
        <View style={styles['plan-info-row']}>
          <Wallet size={16} color={iconColors['plan-info-icon']} style={styles['plan-info-icon-component']} />
          <Text style={styles['plan-info-text']}>{scheduleInfo.budget}</Text>
        </View>
      </View>
    </Modal>
  );
};

