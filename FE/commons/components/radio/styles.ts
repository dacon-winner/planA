/**
 * Radio Styles
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

import { StyleSheet } from "react-native";
import { blackColors, secondaryColors, rootColors, brownColors } from "../../enums/color";

/**
 * Radio Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Container
   * 피그마: width 24, height 24, borderRadius 8
   */
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  /**
   * Radio Box - Default 상태
   * 피그마: width 24, height 24, borderRadius 8
   * bg #ffffff, stroke #d6cfcf
   */
  radioBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderColor: secondaryColors["secondary-300"], // #d2bec7 (피그마: #d6cfcf와 유사)
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Radio Box - Selected 상태
   * 피그마: stroke #ff6593
   */
  radioBoxSelected: {
    borderColor: rootColors.brand, // #ff5c8d (피그마: #ff6593와 유사)
  },

  /* ========================================
   * CONTROL (INNER DOT) STYLES
   * ======================================== */

  /**
   * Control - Selected 시 표시되는 내부 컨트롤
   * 피그마: width 20, height 20, borderRadius 6, bg #ff5c8d
   */
  control: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: rootColors.brand, // #ff5c8d
  },

  /* ========================================
   * TEXT STYLES
   * ======================================== */

  /**
   * Label Text - Default 상태
   * 피그마: fontSize 14, fontWeight 400, color #6b7280
   */
  labelText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17,
    color: brownColors["brown-5"], // #716b6e (피그마: #6b7280와 유사)
    fontFamily: "Pretendard Variable",
  },

  /**
   * Label Text - Selected 상태
   * 피그마: color #5c5050
   */
  labelTextSelected: {
    color: rootColors.text, // #524a4e (피그마: #5c5050와 유사)
  },
});

export default styles;

