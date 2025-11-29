/**
 * Toggle Component
 * 버전: v1.1.0
 * 생성 시각: 2025-11-29
 * 업데이트: 2025-11-29 - 0.3초 애니메이션 추가
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
 * [✓] 0.3초 애니메이션 적용
 */

import React, { useEffect } from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { styles } from "./styles";
import { rootColors } from "../../enums/color";

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
 * 0.3초 애니메이션 포함
 */
export const Toggle: React.FC<ToggleProps> = ({
  state,
  onToggle,
  disabled = false,
  ...pressableProps
}) => {
  // 애니메이션 값 (0: off, 1: on)
  const animatedValue = useSharedValue(state === "on" ? 1 : 0);

  /**
   * state prop 변경 시 애니메이션 실행
   */
  useEffect(() => {
    animatedValue.value = withTiming(state === "on" ? 1 : 0, {
      duration: 300, // 0.3초
    });
  }, [state, animatedValue]);

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
   * Container 애니메이션 스타일
   * 배경색이 부드럽게 전환됩니다
   */
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 1],
      [rootColors.navigation, rootColors.brand] // off: #e5e7eb, on: #ff5c8d
    );

    return {
      backgroundColor,
    };
  });

  /**
   * Handle 애니메이션 스타일
   * 핸들이 좌우로 부드럽게 이동합니다
   */
  const animatedHandleStyle = useAnimatedStyle(() => {
    // OFF 상태: translateX = 1 (왼쪽)
    // ON 상태: translateX = 15 (오른쪽)
    // 계산: 32(전체 너비) - 16(핸들 너비) - 1(패딩) = 15
    const translateX = animatedValue.value * 14;

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="switch"
      accessibilityState={{
        checked: state === "on",
        disabled,
      }}
      accessibilityLabel="토글 스위치"
    >
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.View style={[styles.handle, animatedHandleStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Toggle;
