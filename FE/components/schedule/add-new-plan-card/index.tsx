/**
 * AddNewPlanCard Component
 * 버전: 1.0.0
 * 생성 시각: 2025-12-19
 * 피그마 노드ID: 4159:711
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { HeartPlus } from 'lucide-react-native';
import { styles } from './styles';
import { colors } from '@/commons/enums/color';

/**
 * AddNewPlanCard Props 타입 정의
 */
export interface AddNewPlanCardProps {
  /** 카드 클릭 핸들러 */
  onPress?: () => void;
}

/**
 * AddNewPlanCard 컴포넌트
 * 새 플랜을 추가하는 카드 컴포넌트
 */
export const AddNewPlanCard: React.FC<AddNewPlanCardProps> = ({ onPress }) => {
  return (
    <Pressable
      style={styles['add-new-plan-card-container']}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="새 플랜 추가하기"
    >
      <View style={styles['add-new-plan-card-content']}>
        <HeartPlus size={24} color={colors.brown['brown-3']} />
        <Text style={styles['add-new-plan-card-text']}>새 플랜 추가하기</Text>
      </View>
    </Pressable>
  );
};

export default AddNewPlanCard;

