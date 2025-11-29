/**
 * Marker Component
 * 버전: v1.0.0
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
import { View, ViewStyle } from "react-native";
import { Shirt, Camera, Palette, Hotel } from "lucide-react-native";
import { styles, variantColors } from "./styles";

/**
 * Marker 타입 정의
 * 두 가지 종류로 분류:
 * - "category": 카테고리 마커 (shirt, camera, palette, hotel)
 * - "location": 위치 마커 (향후 확장 가능)
 */
export type MarkerType = "category" | "location";

/**
 * Marker Variant 정의
 * 카테고리 마커의 4가지 variant
 */
export type MarkerVariant = "shirt" | "camera" | "palette" | "hotel";

/**
 * Marker Props 타입 정의
 */
export interface MarkerProps {
  /** Marker 타입 (category 또는 location) */
  type?: MarkerType;
  /** Marker variant (shirt, camera, palette, hotel) */
  variant: MarkerVariant;
  /** 추가 스타일 (선택적) */
  style?: ViewStyle;
}

/**
 * Marker 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 마커 컴포넌트
 * 두 가지 종류(category, location)로 분류되며, 각각 다른 variant를 지원합니다.
 */
export const Marker: React.FC<MarkerProps> = ({
  type = "category",
  variant,
  style,
}) => {
  // 아이콘 색상 가져오기
  const getIconColor = () => {
    return variantColors[variant];
  };

  // 아이콘 컴포넌트 매핑
  const getIconComponent = () => {
    const iconColor = getIconColor();
    switch (variant) {
      case "shirt":
        return <Shirt size={12} color={iconColor} />;
      case "camera":
        return <Camera size={12} color={iconColor} />;
      case "palette":
        return <Palette size={12} color={iconColor} />;
      case "hotel":
        return <Hotel size={12} color={iconColor} />;
      default:
        return <Shirt size={12} color={iconColor} />;
    }
  };

  // 스타일 조합 계산
  const getContainerStyle = (): ViewStyle[] => {
    const baseStyle = styles.container;
    const variantStyle = styles[`container-${variant}`];
    return [baseStyle, variantStyle, style].filter((s): s is ViewStyle => s !== undefined);
  };

  return (
    <View
      style={getContainerStyle()}
      accessible={true}
      accessibilityLabel={`${variant} 마커`}
      accessibilityRole="image"
    >
      <View style={styles.iconContainer}>{getIconComponent()}</View>
    </View>
  );
};

export default Marker;

