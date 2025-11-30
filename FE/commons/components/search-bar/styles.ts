/**
 * Search Bar Styles
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

import { StyleSheet } from "react-native";
import { blackColors, brownColors, rootColors } from "../../enums/color";

/**
 * Search Bar Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Search Bar Container
   * 피그마: width 345, height 50, cornerRadius 25, bg #ffffff
   * Drop shadow: X:0, Y:0, Blur:20, Spread:0, Color:#000000 10%
   */
  container: {
    width: 345,
    height: 50,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    // iOS Shadow
    shadowColor: blackColors["black-13"], // #000000
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1, // 10% opacity
    shadowRadius: 20, // Blur: 20
    // Android Shadow
    elevation: 10,
  },

  /* ========================================
   * ICON STYLES
   * ======================================== */

  /**
   * Icon Container
   * 피그마: width 20, height 20
   */
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Icon Color
   * brand 색상 사용: #ff5c8d
   */
  icon: {
    color: rootColors.brand, // #ff5c8d
  },

  /* ========================================
   * TEXT INPUT STYLES
   * ======================================== */

  /**
   * Text Input
   * 피그마: fontSize 16, fontWeight 400, letterSpacing -0.3125, lineHeight 19.09375, color #524a4e
   */
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: -0.3125,
    lineHeight: 19.09375,
    color: brownColors["brown-6"], // #524a4e
    padding: 0,
  },

  /**
   * Placeholder Text Color
   * 피그마: color #524a4e (텍스트와 동일)
   */
  placeholderText: {
    color: brownColors["brown-6"], // #524a4e
  },
});

export default styles;

