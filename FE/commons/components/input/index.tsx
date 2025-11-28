/**
 * Input Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-28
 * 피그마 노드ID: 4188:8174
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

import React, { useState } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

/**
 * Input Props 타입 정의
 */
export interface InputProps extends Omit<TextInputProps, "style"> {
  /** 라벨 텍스트 */
  label: string;
  /** 입력 크기 */
  size?: "small" | "medium";
  /** 비활성화 상태 */
  disabled?: boolean;
  /** Placeholder 텍스트 */
  placeholder?: string;
  /** 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChangeText?: (text: string) => void;
}

/**
 * Input 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 입력 필드 컴포넌트
 */
export const Input: React.FC<InputProps> = ({
  label,
  size = "medium",
  disabled = false,
  placeholder = "",
  value = "",
  onChangeText,
  ...textInputProps
}) => {
  // 포커스 상태 관리
  const [isFocused, setIsFocused] = useState(false);

  // filled 상태: 값이 있거나 포커스된 경우
  const isFilled = value.length > 0 || isFocused;

  /**
   * Label 스타일 결정
   */
  const getLabelStyle = () => {
    if (size === "small") {
      return styles.labelSmall;
    }
    return styles.labelMedium;
  };

  /**
   * Input Container 스타일 결정
   */
  const getInputContainerStyle = () => {
    if (disabled) {
      return size === "small"
        ? styles.inputContainerSmallDisabled
        : styles.inputContainerMediumDisabled;
    }

    if (isFilled) {
      return size === "small"
        ? styles.inputContainerSmallFilled
        : styles.inputContainerMediumFilled;
    }

    return size === "small"
      ? styles.inputContainerSmallDefault
      : styles.inputContainerMediumDefault;
  };

  /**
   * Text Input 스타일 결정
   */
  const getTextInputStyle = () => {
    if (disabled) {
      return size === "small"
        ? styles.textInputSmallDisabled
        : styles.textInputMediumDisabled;
    }

    if (isFilled) {
      return size === "small"
        ? styles.textInputSmallFilled
        : styles.textInputMediumFilled;
    }

    return size === "small"
      ? styles.textInputSmallDefault
      : styles.textInputMediumDefault;
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={getLabelStyle()}>{label}</Text>

      {/* Input Container */}
      <View style={getInputContainerStyle()}>
        <TextInput
          {...textInputProps}
          style={getTextInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={
            size === "small"
              ? styles.textInputSmallDefault.color
              : styles.textInputMediumDefault.color
          }
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
          accessible={true}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
        />
      </View>
    </View>
  );
};

export default Input;
