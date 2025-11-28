/**
 * Button Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-28
 * 피그마 노드ID: 4116:384
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
import { Pressable, Text, View, PressableProps } from "react-native";
import { styles } from "./styles";

/**
 * Button Props 타입 정의
 */
export interface ButtonProps extends Omit<PressableProps, "style"> {
  /** 버튼 텍스트 */
  children: string;
  /** 버튼 스타일 변형 */
  variant?: "filled" | "outlined";
  /** 버튼 크기 */
  size?: "small" | "medium" | "large";
  /** 아이콘 포함 여부 */
  icon?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 아이콘 컴포넌트 (optional) */
  iconComponent?: React.ReactNode;
}

/**
 * Button 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 버튼 컴포넌트
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  size = "medium",
  icon = false,
  disabled = false,
  iconComponent,
  ...pressableProps
}) => {
  // 스타일 조합 계산
  const getButtonStyle = () => {
    if (disabled) {
      return styles.buttonDisabled;
    }

    if (variant === "filled") {
      if (size === "small") return styles.buttonFilledSmall;
      if (size === "large") return styles.buttonFilledLarge;
      return styles.buttonFilledMedium;
    }

    if (variant === "outlined") {
      if (size === "small") return styles.buttonOutlinedSmall;
      if (size === "large") return styles.buttonOutlinedLarge;
      return styles.buttonOutlinedMedium;
    }

    return styles.buttonFilledMedium;
  };

  const getTextStyle = () => {
    if (disabled) {
      return styles.textDisabled;
    }

    if (variant === "filled") {
      if (size === "large") return styles.textFilledLarge;
      return styles.textFilled;
    }

    if (variant === "outlined") {
      if (size === "large") return styles.textOutlinedLarge;
      return styles.textOutlined;
    }

    return styles.textOutlined;
  };

  const getIconContainerStyle = () => {
    return styles.iconContainer;
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      style={getButtonStyle()}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {icon && iconComponent && (
        <View style={getIconContainerStyle()}>{iconComponent}</View>
      )}
      <Text style={getTextStyle()}>{children}</Text>
    </Pressable>
  );
};

export default Button;
