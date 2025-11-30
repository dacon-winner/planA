/**
 * PlannerCard Component
 * 버전: 1.0.0
 * 생성 시각: 2025-12-19
 * 피그마 노드ID: 4100:111
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Calendar, MapPin, Wallet } from 'lucide-react-native';
import { Badge } from '@/commons/components/badge';
import { Button } from '@/commons/components/button';
import { styles } from './styles';
import { colors } from '@/commons/enums/color';

/**
 * PlannerCard Props 타입 정의
 */
export interface PlannerCardProps {
  /** 플랜 이름 */
  planName: string;
  /** AI 플랜 여부 */
  isAi?: boolean;
  /** 대표 플랜 여부 */
  isRepresentative?: boolean;
  /** 날짜 */
  date: string;
  /** 위치 */
  location: string;
  /** 예산 */
  budget: string;
  /** 대표 플랜 설정 버튼 클릭 핸들러 */
  onSetRepresentative?: () => void;
  /** 자세히 보기 버튼 클릭 핸들러 */
  onViewDetails?: () => void;
  /** 카드 클릭 핸들러 (optional) */
  onPress?: () => void;
}

/**
 * PlannerCard 컴포넌트
 * 플랜 정보를 표시하는 카드 컴포넌트
 */
export const PlannerCard: React.FC<PlannerCardProps> = ({
  planName,
  isAi = false,
  isRepresentative = false,
  date,
  location,
  budget,
  onSetRepresentative,
  onViewDetails,
  onPress,
}) => {
  const CardContainer = onPress ? Pressable : View;

  return (
    <CardContainer
      style={styles['planner-card-container']}
      onPress={onPress}
      accessible={true}
      accessibilityRole={onPress ? 'button' : 'none'}
    >
      <View style={styles['planner-card-content']}>
        {/* 헤더: 플랜 이름 + 배지들 */}
        <View style={styles['planner-card-header']}>
          <View style={styles['planner-card-title-and-badges']}>
            <Text style={styles['planner-card-plan-name']}>{planName}</Text>
            <View style={styles['planner-card-badges']}>
              {isAi && <Badge variant="ai" />}
              {isRepresentative && <Badge variant="plan" />}
            </View>
          </View>
        </View>

        {/* 플랜 정보: 날짜, 위치, 예산 */}
        <View style={styles['planner-card-info']}>
          <View style={styles['planner-card-info-row']}>
            <Calendar size={14} color={colors.root.text} />
            <Text style={styles['planner-card-info-text']}>{date}</Text>
          </View>
          <View style={styles['planner-card-info-row']}>
            <MapPin size={14} color={colors.root.text} />
            <Text style={styles['planner-card-info-text']}>{location}</Text>
          </View>
          <View style={styles['planner-card-info-row']}>
            <Wallet size={14} color={colors.root.text} />
            <Text style={styles['planner-card-info-text']}>{budget}</Text>
          </View>
        </View>

        {/* 버튼들 */}
        <View style={styles['planner-card-buttons']}>
          <View style={styles['planner-card-button-wrapper']}>
            <Button
              variant="filled"
              size="small"
              onPress={onSetRepresentative}
            >
              대표 플랜 설정
            </Button>
          </View>
          <View style={styles['planner-card-button-wrapper']}>
            <Button
              variant="outlined"
              size="small"
              onPress={onViewDetails}
            >
              자세히 보기
            </Button>
          </View>
        </View>
      </View>
    </CardContainer>
  );
};

export default PlannerCard;

