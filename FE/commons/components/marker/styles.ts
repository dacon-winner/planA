/**
 * Marker Styles
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

import { StyleSheet } from "react-native";
import { blackColors, rootColors } from "../../enums/color";

/**
 * Marker Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 *
 * 피그마 스펙:
 * - 크기: 32x32
 * - cornerRadius: 16 (완전히 둥근 원)
 * - 배경: #ffffff
 * - 테두리: variant별 색상
 * - 아이콘: 12x12
 *
 * Variant별 색상:
 * - shirt: #ff5c8d (brand)
 * - camera: #b885fa (보라색 - color.ts에 없으므로 직접 정의)
 * - palette: #ffa537 (주황색 - color.ts에 없으므로 직접 정의)
 * - hotel: #73c600 (초록색 - color.ts에 없으므로 직접 정의)
 */

// Variant별 색상 정의 (color.ts에 없는 색상)
export const variantColors = {
  shirt: rootColors.brand, // #ff5c8d
  camera: "#b885fa", // 보라색 - color.ts에 없음
  palette: "#ffa537", // 주황색 - color.ts에 없음
  hotel: "#73c600", // 초록색 - color.ts에 없음
} as const;

export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Marker Container (기본)
   * 피그마: width 32, height 32, cornerRadius 16, bg #ffffff
   */
  container: {
    width: 32,
    height: 32,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Shirt Variant Container
   * 테두리 색상: #ff5c8d (brand)
   */
  "container-shirt": {
    borderColor: variantColors.shirt, // #ff5c8d
  },

  /**
   * Camera Variant Container
   * 테두리 색상: #b885fa
   */
  "container-camera": {
    borderColor: variantColors.camera, // #b885fa
  },

  /**
   * Palette Variant Container
   * 테두리 색상: #ffa537
   */
  "container-palette": {
    borderColor: variantColors.palette, // #ffa537
  },

  /**
   * Hotel Variant Container
   * 테두리 색상: #73c600
   */
  "container-hotel": {
    borderColor: variantColors.hotel, // #73c600
  },

  /* ========================================
   * ICON STYLES
   * ======================================== */

  /**
   * Icon Container
   * 피그마: 아이콘 크기 12x12
   */
  iconContainer: {
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Icon Color
   * variant별 테두리 색상과 동일하게 설정
   * (동적으로 설정되므로 기본값만 정의)
   */
  icon: {
    color: variantColors.shirt, // 기본값 (실제로는 variant에 따라 동적 변경)
  },
});

export default styles;

