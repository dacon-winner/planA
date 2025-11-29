/**
 * Toggle Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4180:2458
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] nativewind 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 */

import React from "react";
import { Pressable, View, PressableProps } from "react-native";
import { styles } from "./styles";

/**
 * Toggle Props 타입 정의
 */
export interface ToggleProps extends Omit<PressableProps, "style"> {
  /** 토글 상태 */
  state: "on" | "off";
  /** 상태 변경 핸들러 */
  onToggle?: (newState: "on" | "off") => void;
  /** 비활성화 상태 */
  disabled?: boolean;
}

/**
 * Toggle 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 토글 스위치 컴포넌트
 */
export const Toggle: React.FC<ToggleProps> = ({
  state,
  onToggle,
  disabled = false,
  ...pressableProps
}) => {
  /**
   * 토글 상태 변경 핸들러
   */
  const handlePress = () => {
    if (!disabled && onToggle) {
      const newState = state === "on" ? "off" : "on";
      onToggle(newState);
    }
  };

  /**
   * Container 스타일 결정
   */
  const getContainerStyle = () => {
    if (state === "on") {
      return styles.containerOn;
    }
    return styles.containerOff;
  };

  /**
   * Handle 스타일 결정
   */
  const getHandleStyle = () => {
    if (state === "on") {
      return styles.handleOn;
    }
    return styles.handleOff;
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      onPress={handlePress}
      style={getContainerStyle()}
      accessible={true}
      accessibilityRole="switch"
      accessibilityState={{
        checked: state === "on",
        disabled,
      }}
      accessibilityLabel="토글 스위치"
    >
      <View style={getHandleStyle()} />
    </Pressable>
  );
};

export default Toggle;
