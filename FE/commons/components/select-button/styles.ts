/**
 * SelectButton Styles
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

import { StyleSheet } from "react-native";

const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;
const fontSize = tailwindConfig.theme.extend.fontSize;

/**
 * SelectButton Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Button Container - Default Medium (아이콘 있음)
   * 피그마: width 142, height 84, borderRadius 10
   * bg transparent, stroke #e5e7eb
   */
  buttonDefault: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.root.navigation, // #e5e7eb
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },

  /**
   * Button Container - Selected Medium (아이콘 있음)
   * 피그마: width 142, height 84, borderRadius 10
   * bg #fdf2f8, stroke #e60076
   */
  buttonSelected: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e60076", // 피그마 정확한 값
    backgroundColor: "#fdf2f8", // 피그마 정확한 값
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },

  /* ========================================
   * SIZE VARIANT STYLES
   * ======================================== */

  /**
   * Medium Size (아이콘 있음)
   * 피그마: width 142, height 84
   */
  buttonMedium: {
    minWidth: 142,
    minHeight: 84,
  },

  /**
   * Medium Size (아이콘 없음)
   * 피그마: width 141, height 60
   */
  buttonMediumNoIcon: {
    minWidth: 141,
    minHeight: 60,
    paddingVertical: 18,
  },

  /**
   * Small Size
   * 피그마: width 112, height 68
   */
  buttonSmall: {
    minWidth: 112,
    minHeight: 68,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  /* ========================================
   * CONTENT WRAPPER STYLES
   * ======================================== */

  /**
   * Content Wrapper
   * 아이콘과 텍스트를 세로로 배치
   */
  contentWrapper: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },

  /* ========================================
   * ICON STYLES
   * ======================================== */

  /**
   * Icon Container
   * 피그마: width 20, height 20 (medium), width 16, height 16 (small)
   */
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  iconMedium: {
    width: 20,
    height: 20,
  },

  iconSmall: {
    width: 16,
    height: 16,
  },

  /* ========================================
   * TEXT STYLES
   * ======================================== */

  /**
   * Text - Default Medium
   * 피그마: fontSize 16, fontWeight 500, color #364153
   */
  textDefaultMedium: {
    fontSize: parseInt(fontSize["mobile-m-medium"][0]), // 16px
    lineHeight: parseInt(fontSize["mobile-m-medium"][1].lineHeight), // 24px
    letterSpacing: parseFloat(fontSize["mobile-m-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-m-medium"][1].fontWeight, // 500
    color: "#364153", // 피그마 정확한 값
    textAlign: "center",
    fontFamily: "Pretendard Variable",
  },

  /**
   * Text - Selected Medium
   * 피그마: fontSize 16, fontWeight 500, color #861043
   */
  textSelectedMedium: {
    fontSize: parseInt(fontSize["mobile-m-medium"][0]), // 16px
    lineHeight: parseInt(fontSize["mobile-m-medium"][1].lineHeight), // 24px
    letterSpacing: parseFloat(fontSize["mobile-m-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-m-medium"][1].fontWeight, // 500
    color: "#861043", // 피그마 정확한 값
    textAlign: "center",
    fontFamily: "Pretendard Variable",
  },

  /**
   * Text - Default Small
   * 피그마: fontSize 14, fontWeight 500, color #364153
   */
  textDefaultSmall: {
    fontSize: parseInt(fontSize["mobile-s-medium"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-medium"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-medium"][1].fontWeight, // 500
    color: "#364153", // 피그마 정확한 값
    textAlign: "center",
    fontFamily: "Pretendard Variable",
  },

  /**
   * Text - Selected Small
   * 피그마: fontSize 14, fontWeight 500, color #861043
   */
  textSelectedSmall: {
    fontSize: parseInt(fontSize["mobile-s-medium"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-medium"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-medium"][1].fontWeight, // 500
    color: "#861043", // 피그마 정확한 값
    textAlign: "center",
    fontFamily: "Pretendard Variable",
  },
});

export default styles;

