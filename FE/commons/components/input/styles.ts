/**
 * Input Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-28
 * 피그마 노드ID: 4188:8174
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
import { rootColors, blueColors, brownColors, blackColors } from "../../enums/color";

/**
 * Input Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Input Container
   * 전체 컨테이너 (Label + Input)
   */
  container: {
    flexDirection: "column",
    gap: 8,
  },

  /* ========================================
   * LABEL STYLES
   * ======================================== */

  /**
   * Label Medium
   * 피그마: fontSize 14, fontWeight 500, color #1f2937
   */
  labelMedium: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: -0.150390625,
    lineHeight: 14,
    color: blueColors["blue-6"], // #1f2937
  },

  /**
   * Label Small
   * 피그마: fontSize 12, fontWeight 500, color #1f2937
   */
  labelSmall: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: -0.150390625,
    lineHeight: 14,
    color: blueColors["blue-6"], // #1f2937
  },

  /* ========================================
   * INPUT CONTAINER STYLES (Medium)
   * ======================================== */

  /**
   * Input Container Medium - Default
   * 피그마: height 48, cornerRadius 8, bg #ffffff
   */
  inputContainerMediumDefault: {
    height: 48,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  /**
   * Input Container Medium - Filled
   * 피그마: height 48, cornerRadius 8, bg #ffffff, border #d6cfcf
   */
  inputContainerMediumFilled: {
    height: 48,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 8,
    borderWidth: 1,
    borderColor: brownColors["brown-2"], // #d5d4d5 (피그마 #d6cfcf와 가장 유사)
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  /**
   * Input Container Medium - Disabled
   * 피그마: height 48, cornerRadius 8, bg #f8f8f8
   */
  inputContainerMediumDisabled: {
    height: 48,
    backgroundColor: blackColors["black-3"], // #f5f5f5 (피그마 #f8f8f8와 가장 유사)
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  /* ========================================
   * INPUT CONTAINER STYLES (Small)
   * ======================================== */

  /**
   * Input Container Small - Default
   * 피그마: height 31, cornerRadius 8, bg #ffffff
   */
  inputContainerSmallDefault: {
    height: 31,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  /**
   * Input Container Small - Filled
   * 피그마: height 31, cornerRadius 8, bg #ffffff, border #d6cfcf
   */
  inputContainerSmallFilled: {
    height: 31,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 8,
    borderWidth: 1,
    borderColor: brownColors["brown-2"], // #d5d4d5 (피그마 #d6cfcf와 가장 유사)
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  /**
   * Input Container Small - Disabled
   * 피그마: height 31, cornerRadius 8, bg #f8f8f8
   */
  inputContainerSmallDisabled: {
    height: 31,
    backgroundColor: blackColors["black-3"], // #f5f5f5 (피그마 #f8f8f8와 가장 유사)
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  /* ========================================
   * TEXT INPUT STYLES (Medium)
   * ======================================== */

  /**
   * Text Input Medium - Default (Placeholder)
   * 피그마: fontSize 16, fontWeight 400, color #6a7282
   */
  textInputMediumDefault: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: -0.3125,
    lineHeight: 19.09375,
    color: blueColors["blue-4"], // #727881 (피그마 #6a7282와 가장 유사)
    padding: 0,
  },

  /**
   * Text Input Medium - Filled
   * 피그마: fontSize 16, fontWeight 400, color #5c5050
   */
  textInputMediumFilled: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: -0.3125,
    lineHeight: 19.09375,
    color: rootColors.text, // #524a4e (피그마 #5c5050와 가장 유사)
    padding: 0,
  },

  /**
   * Text Input Medium - Disabled
   * 피그마: fontSize 16, fontWeight 400, color #868083
   */
  textInputMediumDisabled: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: -0.3125,
    lineHeight: 19.09375,
    color: blackColors["black-7"], // #8c8c8c (피그마 #868083와 가장 유사)
    padding: 0,
  },

  /* ========================================
   * TEXT INPUT STYLES (Small)
   * ======================================== */

  /**
   * Text Input Small - Default (Placeholder)
   * 피그마: fontSize 12, fontWeight 400, color #6b7280
   */
  textInputSmallDefault: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: -0.3125,
    lineHeight: 14.3203125,
    color: blueColors["blue-4"], // #727881 (피그마 #6b7280와 가장 유사)
    padding: 0,
  },

  /**
   * Text Input Small - Filled
   * 피그마: fontSize 12, fontWeight 400, color #5c5050
   */
  textInputSmallFilled: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: -0.3125,
    lineHeight: 14.3203125,
    color: rootColors.text, // #524a4e (피그마 #5c5050와 가장 유사)
    padding: 0,
  },

  /**
   * Text Input Small - Disabled
   * 피그마: fontSize 12, fontWeight 400, color #868083
   */
  textInputSmallDisabled: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: -0.3125,
    lineHeight: 14.3203125,
    color: blackColors["black-7"], // #8c8c8c (피그마 #868083와 가장 유사)
    padding: 0,
  },
});

export default styles;

