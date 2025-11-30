/**
 * GradientBackground Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-30
 * 용도: 페이지 배경에 그라데이션 적용을 위한 공통 컴포넌트
 * 규칙 준수: 03-ui.mdc
 * - [x] 재사용 가능한 공통 컴포넌트
 * - [x] StyleSheet 전용
 * - [x] position absolute 사용 (배경 레이어 목적)
 */

import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { styles } from "./styles";

interface GradientBackgroundProps {
  /**
   * 배경 이미지 소스
   * @default require("@/assets/Gradient.png")
   */
  source?: ImageSourcePropType;
  /**
   * 상단 위치 조정
   * @default 0
   */
  top?: number;
  /**
   * 좌측 위치 조정
   * @default 0
   */
  left?: number;
  /**
   * z-index 값
   * @default 0
   */
  zIndex?: number;
}

/**
 * 페이지 배경에 그라데이션을 적용하는 컴포넌트
 *
 * @example
 * ```tsx
 * <View style={{ flex: 1, position: 'relative' }}>
 *   <GradientBackground />
 *   <ScrollView>
 *     // 페이지 컨텐츠
 *   </ScrollView>
 * </View>
 * ```
 */
export function GradientBackground({
  source = require("@/assets/Gradient.png"),
  top = 0,
  left = 0,
  zIndex = 0,
}: GradientBackgroundProps) {
  return (
    <Image
      source={source}
      style={[
        styles["gradient-background"],
        {
          top,
          left,
          zIndex,
        },
      ]}
      resizeMode="cover"
    />
  );
}

export default GradientBackground;

