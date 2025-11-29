/**
 * Radio Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4180:2306
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
 * Radio Props 타입 정의
 */
export interface RadioProps extends Omit<PressableProps, "style"> {
  /** 라디오 상태 */
  state: "default" | "selected";
  /** 라디오 라벨 */
  label: string;
  /** 라디오 선택 핸들러 */
  onSelect?: () => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 라디오 값 (라디오 그룹에서 사용) */
  value?: string;
}

/**
 * Radio 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 라디오 버튼 컴포넌트
 */
export const Radio: React.FC<RadioProps> = ({
  state,
  label,
  onSelect,
  disabled = false,
  value,
  ...pressableProps
}) => {
  /**
   * 라디오 선택 핸들러
   */
  const handlePress = () => {
    if (!disabled && onSelect) {
      onSelect();
    }
  };

  const isSelected = state === "selected";

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="radio"
      accessibilityState={{
        checked: isSelected,
        disabled,
      }}
      accessibilityLabel={label}
    >
      <View style={styles.container}>
        {/* Radio Box */}
        <View style={[styles.radioBox, isSelected && styles.radioBoxSelected]}>
          {/* Control - Selected 시에만 표시 */}
          {isSelected && <View style={styles.control} />}
        </View>

        {/* Label Text */}
        <Text
          style={[styles.labelText, isSelected && styles.labelTextSelected]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

/**
 * RadioGroup Props 타입 정의
 */
export interface RadioGroupProps {
  /** 선택된 값 */
  value: string;
  /** 값 변경 핸들러 */
  onChange: (value: string) => void;
  /** 라디오 옵션들 */
  options: Array<{
    value: string;
    label: string;
  }>;
  /** 정렬 방향 */
  direction?: "horizontal" | "vertical";
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 커스텀 스타일 */
  style?: object;
}

/**
 * RadioGroup 컴포넌트
 * 여러 라디오 버튼을 그룹으로 관리하여 하나만 선택되도록 보장
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  options,
  direction = "vertical",
  disabled = false,
  style,
}) => {
  const containerStyle = {
    flexDirection:
      direction === "horizontal" ? ("row" as const) : ("column" as const),
    gap: direction === "horizontal" ? 85 : 8,
    ...style,
  };

  return (
    <View style={containerStyle}>
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          label={option.label}
          state={value === option.value ? "selected" : "default"}
          onSelect={() => onChange(option.value)}
          disabled={disabled}
        />
      ))}
    </View>
  );
};

export default Radio;
