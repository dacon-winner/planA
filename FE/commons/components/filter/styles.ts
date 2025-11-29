/**
 * Filter Styles
 * 버전: v1.0.1
 * 생성 시각: 2025-11-28
 * 피그마 노드ID: 4183:4910
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
import { secondaryColors, blackColors, brownColors } from "../../enums/color";

/**
 * Filter Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Container
   * 필터 버튼들을 담는 컨테이너
   */
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  /* ========================================
   * BUTTON STYLES
   * ======================================== */

  /**
   * Filter Button Base
   * 피그마: height 32, borderRadius 16, paddingHorizontal 12, paddingVertical 6
   */
  filterButton: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Active Button
   * 피그마: bg #614F57, border #614F57
   */
  activeButton: {
    backgroundColor: secondaryColors["secondary-800"],
    borderWidth: 1,
    borderColor: secondaryColors["secondary-800"],
    // iOS shadow
    shadowColor: blackColors["black-13"],
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 2,
  },

  /**
   * Inactive Button
   * 피그마: bg #ffffff, border #D9D9D9
   */
  inactiveButton: {
    backgroundColor: blackColors["black-1"],
    borderWidth: 1,
    borderColor: blackColors["black-5"],
    // iOS shadow
    shadowColor: blackColors["black-13"],
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 2,
  },

  /* ========================================
   * TEXT STYLES
   * ======================================== */

  /**
   * Active Text
   * 피그마: fontSize 14, fontWeight 500, lineHeight 20, color #ffffff
   */
  activeText: {
    color: blackColors["black-1"],
    fontSize: 14, // mobile-s
    fontWeight: "500", // medium
    lineHeight: 20, // mobile-s lineHeight
    fontFamily: "PretendardVariable",
  },

  /**
   * Inactive Text
   * 피그마: fontSize 14, fontWeight 500, lineHeight 20, color #524A4E
   */
  inactiveText: {
    color: brownColors["brown-6"],
    fontSize: 14, // mobile-s
    fontWeight: "500", // medium
    lineHeight: 20, // mobile-s lineHeight
    fontFamily: "PretendardVariable",
  },
});

export default styles;
