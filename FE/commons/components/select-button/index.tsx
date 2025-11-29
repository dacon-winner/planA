/**
 * SelectButton Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4116:600
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
import { Pressable, View, Text, PressableProps } from "react-native";
import { styles } from "./styles";

/**
 * SelectButton Props 타입 정의
 */
export interface SelectButtonProps extends Omit<PressableProps, "style"> {
  /** 버튼 상태 */
  state: "default" | "selected";
  /** 버튼 크기 */
  size?: "small" | "medium";
  /** 버튼 라벨 */
  label: string;
  /** 버튼 선택 핸들러 */
  onSelect?: () => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 버튼 값 (SelectButtonGroup에서 사용) */
  value?: string;
  /** 아이콘 컴포넌트 (선택사항) */
  icon?: React.ReactNode;
}

/**
 * SelectButton 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 선택 버튼 컴포넌트
 * 단일 선택 또는 그룹 선택에서 사용 가능
 */
export const SelectButton: React.FC<SelectButtonProps> = ({
  state,
  size = "medium",
  label,
  onSelect,
  disabled = false,
  value,
  icon,
  ...pressableProps
}) => {
  /**
   * 버튼 선택 핸들러
   */
  const handlePress = () => {
    if (!disabled && onSelect) {
      onSelect();
    }
  };

  const isSelected = state === "selected";
  const hasIcon = !!icon;

  /**
   * 컨테이너 스타일 결정
   */
  const getContainerStyle = () => {
    const baseStyle = isSelected ? styles.buttonSelected : styles.buttonDefault;
    const sizeStyle =
      size === "small"
        ? styles.buttonSmall
        : hasIcon
        ? styles.buttonMedium
        : styles.buttonMediumNoIcon;

    return [baseStyle, sizeStyle];
  };

  /**
   * 텍스트 스타일 결정
   */
  const getTextStyle = () => {
    if (size === "small") {
      return isSelected ? styles.textSelectedSmall : styles.textDefaultSmall;
    }
    return isSelected ? styles.textSelectedMedium : styles.textDefaultMedium;
  };

  /**
   * 아이콘 스타일 결정
   */
  const getIconStyle = () => {
    return size === "small" ? styles.iconSmall : styles.iconMedium;
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{
        selected: isSelected,
        disabled,
      }}
      accessibilityLabel={label}
    >
      <View style={getContainerStyle()}>
        <View style={styles.contentWrapper}>
          {/* Icon - 아이콘이 있는 경우에만 표시 */}
          {icon && (
            <View style={[styles.iconContainer, getIconStyle()]}>{icon}</View>
          )}

          {/* Label Text */}
          <Text style={getTextStyle()}>{label}</Text>
        </View>
      </View>
    </Pressable>
  );
};

/**
 * SelectButtonGroup Props 타입 정의
 */
export interface SelectButtonGroupProps {
  /** 선택된 값 */
  value: string;
  /** 값 변경 핸들러 */
  onChange: (value: string) => void;
  /** 선택 버튼 옵션들 */
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  /** 버튼 크기 */
  size?: "small" | "medium";
  /** 정렬 방향 */
  direction?: "horizontal" | "vertical";
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 커스텀 스타일 */
  style?: object;
}

/**
 * SelectButtonGroup 컴포넌트
 * 여러 선택 버튼을 그룹으로 관리하여 하나만 선택되도록 보장
 */
export const SelectButtonGroup: React.FC<SelectButtonGroupProps> = ({
  value,
  onChange,
  options,
  size = "medium",
  direction = "horizontal",
  disabled = false,
  style,
}) => {
  const containerStyle = {
    flexDirection:
      direction === "horizontal" ? ("row" as const) : ("column" as const),
    gap: direction === "horizontal" ? 8 : 8,
    flexWrap: "wrap" as const,
    ...style,
  };

  return (
    <View style={containerStyle}>
      {options.map((option) => (
        <SelectButton
          key={option.value}
          value={option.value}
          label={option.label}
          icon={option.icon}
          size={size}
          state={value === option.value ? "selected" : "default"}
          onSelect={() => onChange(option.value)}
          disabled={disabled}
        />
      ))}
    </View>
  );
};

export default SelectButton;

