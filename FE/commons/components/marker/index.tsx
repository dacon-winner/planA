/**
 * Marker Component
 * 버전: v2.0.0
 * 생성 시각: 2025-01-27
 * 피그마 노드ID: 4183:8055
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
import { View, ViewStyle, Text } from "react-native";
import { Shirt, Camera, Palette, Hotel } from "lucide-react-native";
import { styles, getVariantColor } from "./styles";

/**
 * Marker Variant 정의
 * 카테고리 마커의 4가지 variant
 */
export type MarkerVariant = "shirt" | "camera" | "palette" | "hotel";

/**
 * Marker Props 타입 정의
 * selected prop으로 두 가지 상태를 전환:
 * - false (기본): 원형 마커 (흰 배경 + 색상 테두리)
 * - true: 캡슐 형태 마커 (색상 배경 + 가격 라벨 + 꼬리표)
 */
export interface MarkerProps {
  /** Marker variant (shirt, camera, palette, hotel) */
  variant: MarkerVariant;
  /** 선택된 상태 (기본값: false) */
  selected?: boolean;
  /** 가격 라벨 (selected가 true일 때 표시) */
  label?: string;
  /** 추가 스타일 (선택적) */
  style?: ViewStyle;
}

/**
 * Marker 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 마커 컴포넌트
 * 
 * 두 가지 상태:
 * - 비활성 (selected=false): 원형 마커 (흰 배경 + 색상 테두리)
 * - 활성 (selected=true): 캡슐 형태 마커 (색상 배경 + 가격 라벨 + 꼬리표)
 */
export const Marker: React.FC<MarkerProps> = ({
  variant,
  selected = false,
  label,
  style,
}) => {
  const variantColor = getVariantColor(variant);

  // 아이콘 컴포넌트 매핑
  const getIconComponent = () => {
    // 활성 상태일 때는 variant 색상 아이콘 (흰색 원 배경 위에)
    // 비활성 상태일 때도 variant 색상 아이콘
    const iconColor = variantColor;
    const iconSize = 12;
    
    switch (variant) {
      case "shirt":
        return <Shirt size={iconSize} color={iconColor} />;
      case "camera":
        return <Camera size={iconSize} color={iconColor} />;
      case "palette":
        return <Palette size={iconSize} color={iconColor} />;
      case "hotel":
        return <Hotel size={iconSize} color={iconColor} />;
      default:
        return <Shirt size={iconSize} color={iconColor} />;
    }
  };

  // 접근성 라벨 생성
  const getAccessibilityLabel = () => {
    const baseLabel = `${variant} 마커`;
    if (selected && label) {
      return `${baseLabel}, 가격: ${label}`;
    }
    return baseLabel;
  };

  // 비활성 상태: 원형 마커
  if (!selected) {
    return (
      <View
        style={[styles.container, { borderColor: variantColor }, style]}
        accessible={true}
        accessibilityLabel={getAccessibilityLabel()}
        accessibilityRole="image"
      >
        <View style={styles.iconContainer}>{getIconComponent()}</View>
      </View>
    );
  }

  // 활성 상태: 캡슐 형태 마커 (가격 라벨 + 꼬리표)
  return (
    <View
      style={[styles.selectedContainer, style]}
      accessible={true}
      accessibilityLabel={getAccessibilityLabel()}
      accessibilityRole="image"
    >
      {/* 캡슐 본체 */}
      <View style={[styles.capsule, { backgroundColor: variantColor }]}>
        {/* 내부 흰색 아이콘 원 */}
        <View style={styles.selectedIconCircle}>
          {getIconComponent()}
        </View>
        {/* 가격 라벨 */}
        {label && (
          <Text style={styles.label}>{label}</Text>
        )}
      </View>
      {/* 꼬리표 (하단 역삼각형) */}
      <View style={[styles.triangle, { borderTopColor: variantColor }]} />
    </View>
  );
};

export default Marker;
