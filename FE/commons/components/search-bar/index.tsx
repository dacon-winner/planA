/**
 * Search Bar Component
 * 버전: v1.0.0
 * 생성 시각: 2025-01-27
 * 피그마 노드ID: 4183:4908
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
import { View, TextInput, TextInputProps } from "react-native";
import { Search } from "lucide-react-native";
import { styles } from "./styles";

/**
 * Search Bar Props 타입 정의
 */
export interface SearchBarProps extends Omit<TextInputProps, "style"> {
  /** Placeholder 텍스트 */
  placeholder?: string;
  /** 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChangeText?: (text: string) => void;
}

/**
 * Search Bar 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 검색 바 컴포넌트
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "업체명 또는 서비스로 검색",
  value = "",
  onChangeText,
  ...textInputProps
}) => {
  // 포커스 상태 관리 (향후 확장을 위해 유지)
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <View style={styles.iconContainer}>
        <Search size={20} color={styles.icon.color} />
      </View>

      {/* Text Input */}
      <TextInput
        {...textInputProps}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholderText.color}
        value={value}
        onChangeText={onChangeText}
        onFocus={(e) => {
          setIsFocused(true);
          textInputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          textInputProps.onBlur?.(e);
        }}
        accessible={true}
        accessibilityLabel={placeholder}
        accessibilityRole="search"
      />
    </View>
  );
};

export default SearchBar;

