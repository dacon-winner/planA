/**
 * Dropdown Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4183:5014, 4183:5013
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

import React, { useState, useRef } from "react";
import { Pressable, Text, View, ScrollView, PressableProps, Dimensions } from "react-native";
import { styles } from "./styles";

/**
 * Dropdown Props 타입 정의
 */
export interface DropdownProps extends Omit<PressableProps, "style"> {
  /** 선택된 값 */
  value: string;
  /** 드롭다운 옵션들 */
  options: {
    value: string;
    label: string;
  }[];
  /** 값 변경 핸들러 */
  onChange: (value: string) => void;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
}

/**
 * Dropdown 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 드롭다운 컴포넌트
 */
export const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = "선택하세요",
  disabled = false,
  ...pressableProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<View>(null);

  /**
   * 드롭다운 토글 핸들러
   */
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  /**
   * 옵션 선택 핸들러
   */
  const handleSelectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  /**
   * 선택된 옵션 찾기
   */
  const selectedOption = options.find(option => option.value === value);

  /**
   * 표시할 텍스트 결정
   */
  const displayText = selectedOption ? selectedOption.label : placeholder;

  /**
   * 트리거 버튼 스타일 결정
   */
  const getTriggerStyle = () => {
    return disabled ? styles.triggerDisabled : styles.triggerDefault;
  };

  /**
   * 트리거 텍스트 스타일 결정
   */
  const getTriggerTextStyle = () => {
    return disabled ? styles.triggerTextDisabled : styles.triggerTextDefault;
  };

  /**
   * 옵션 스타일 결정
   */
  const getOptionStyle = (isLast: boolean) => {
    return isLast ? styles.optionLast : styles.optionDefault;
  };

  /**
   * 옵션 텍스트 스타일 결정
   */
  const getOptionTextStyle = () => {
    return styles.optionTextDefault;
  };

  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      {/* 드롭다운 트리거 버튼 */}
      <Pressable
        {...pressableProps}
        ref={triggerRef}
        disabled={disabled}
        onPress={handleToggle}
        style={getTriggerStyle()}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{
          expanded: isOpen,
          disabled,
        }}
        accessibilityLabel={`${displayText}, ${isOpen ? "열림" : "닫힘"}`}
      >
        <Text style={getTriggerTextStyle()}>{displayText}</Text>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{isOpen ? "▲" : "▼"}</Text>
        </View>
      </Pressable>

      {/* 드롭다운 메뉴 - 트리거 버튼 바로 아래에 표시 */}
      {isOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {options.map((option, index) => (
              <Pressable
                key={option.value}
                style={getOptionStyle(index === options.length - 1)}
                onPress={() => handleSelectOption(option.value)}
                accessible={true}
                accessibilityRole="button"
                accessibilityState={{
                  selected: option.value === value,
                }}
                accessibilityLabel={option.label}
              >
                <Text style={getOptionTextStyle()}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
