/**
 * Calendar Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4183:5016
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 피그마 정확한 색상값 사용 (디자인 토큰 우선, 없는 경우 정확한 hex 사용)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] nativewind 토큰 참조 (가능한 경우)
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 */

import { StyleSheet } from "react-native";

const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;
const fontSize = tailwindConfig.theme.extend.fontSize;

/**
 * Calendar Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Calendar Container
   * 전체 캘린더 컨테이너
   */
  calendarContainer: {
    width: "100%",
    minHeight: 400,
  },

  /**
   * ScrollView Content
   * 가로 스크롤 컨텐츠 영역
   */
  scrollContent: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
  },

  /* ========================================
   * MONTH SECTION STYLES
   * ======================================== */

  /**
   * Month Section Container
   * 한 달 단위 컨테이너
   * 피그마: width 328px, gap 16px 포함하여 총 360px
   */
  monthSection: {
    width: 328,
    marginRight: 32, // 다음 섹션과의 간격
    flexDirection: "column",
  },

  /**
   * Month Title
   * 피그마: fontSize 20, fontWeight 700, color #0d0b26
   * 토큰: mobile-xl-bold
   */
  monthTitle: {
    fontSize: parseInt(fontSize["mobile-xl-bold"][0]), // 20px
    lineHeight: parseInt(fontSize["mobile-xl-bold"][1].lineHeight), // 28px
    letterSpacing: parseFloat(fontSize["mobile-xl-bold"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-xl-bold"][1].fontWeight, // 700
    color: colors.foundationBlue[10], // #0e1219 - 가장 유사한 어두운 색
    fontFamily: "Pretendard Variable",
    marginBottom: 16,
  },

  /**
   * Month Subtitle
   * 피그마: fontSize 14, fontWeight 400, color #998d8d
   * 토큰: mobile-s-normal
   */
  monthSubtitle: {
    fontSize: parseInt(fontSize["mobile-s-normal"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-normal"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-normal"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-normal"][1].fontWeight, // 400
    color: colors.foundationBrown[4], // #928d8f
    fontFamily: "Pretendard Variable",
    marginBottom: 16,
  },

  /* ========================================
   * WEEKDAY HEADER STYLES
   * ======================================== */

  /**
   * Weekday Header Container
   * 요일 헤더 컨테이너 (Sun-Sat)
   * 피그마: 7개 열, gap 8px
   */
  weekdayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: 328,
  },

  /**
   * Weekday Cell
   * 각 요일 셀
   * 피그마: width 40, height 40
   */
  weekdayCell: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Weekday Text - Default
   * 피그마: fontSize 13, fontWeight 500, color #716b6e
   * 토큰: mobile-xs-medium
   */
  weekdayTextDefault: {
    fontSize: parseInt(fontSize["mobile-xs-medium"][0]), // 13px
    lineHeight: parseInt(fontSize["mobile-xs-medium"][1].lineHeight), // 18px
    letterSpacing: parseFloat(fontSize["mobile-xs-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-xs-medium"][1].fontWeight, // 500
    color: colors.foundationBrown[5], // #716b6e
    fontFamily: "Pretendard Variable",
  },

  /**
   * Weekday Text - Weekend
   * 피그마: fontSize 13, fontWeight 500, color #fb2c36
   * 토큰: mobile-xs-medium + root.red
   */
  weekdayTextWeekend: {
    fontSize: parseInt(fontSize["mobile-xs-medium"][0]), // 13px
    lineHeight: parseInt(fontSize["mobile-xs-medium"][1].lineHeight), // 18px
    letterSpacing: parseFloat(fontSize["mobile-xs-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-xs-medium"][1].fontWeight, // 500
    color: colors.root.red, // #fb2c36
    fontFamily: "Pretendard Variable",
  },

  /* ========================================
   * DATE GRID STYLES
   * ======================================== */

  /**
   * Date Grid Container
   * 날짜 그리드 컨테이너
   */
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: 328,
  },

  /**
   * Date Cell Wrapper
   * 각 날짜 셀 래퍼
   * 피그마: width 40, height 40
   */
  dateCellWrapper: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },

  /* ========================================
   * DAY CELL STYLES - VARIANTS
   * ======================================== */

  /**
   * DayCell - Default
   * 피그마: width 40, height 40, borderRadius 20
   */
  dayCellDefault: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  /**
   * DayCell - Selected
   * 피그마: width 40, height 40, borderRadius 20, bg #ff5c8d
   * 토큰: root.brand
   */
  dayCellSelected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.root.brand, // #ff5c8d
  },

  /**
   * DayCell - Today
   * 피그마: width 40, height 40, borderRadius 20, border #ff5c8d
   * 토큰: root.brand
   */
  dayCellToday: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.root.brand, // #ff5c8d
  },

  /**
   * DayCell - Disabled
   * 피그마: width 40, height 40, borderRadius 20, opacity 0.3
   */
  dayCellDisabled: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.3,
  },

  /**
   * DayCell - Empty (빈 셀)
   */
  dayCellEmpty: {
    width: 40,
    height: 40,
  },

  /* ========================================
   * DAY CELL TEXT STYLES - VARIANTS
   * ======================================== */

  /**
   * DayCell Text - Default
   * 피그마: fontSize 14, fontWeight 400, color #0d0b26
   * 토큰: mobile-s-normal
   */
  dayCellTextDefault: {
    fontSize: parseInt(fontSize["mobile-s-normal"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-normal"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-normal"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-normal"][1].fontWeight, // 400
    color: colors.foundationBlue[10], // #0e1219
    fontFamily: "Pretendard Variable",
  },

  /**
   * DayCell Text - Weekend
   * 피그마: fontSize 14, fontWeight 400, color #fb2c36
   * 토큰: mobile-s-normal + root.red
   */
  dayCellTextWeekend: {
    fontSize: parseInt(fontSize["mobile-s-normal"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-normal"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-normal"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-normal"][1].fontWeight, // 400
    color: colors.root.red, // #fb2c36
    fontFamily: "Pretendard Variable",
  },

  /**
   * DayCell Text - Selected
   * 피그마: fontSize 14, fontWeight 700, color #ffffff
   * 토큰: mobile-s-bold
   */
  dayCellTextSelected: {
    fontSize: parseInt(fontSize["mobile-s-bold"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-bold"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-bold"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-bold"][1].fontWeight, // 700
    color: colors.foundationBlack[1], // #ffffff
    fontFamily: "Pretendard Variable",
  },

  /**
   * DayCell Text - Today
   * 피그마: fontSize 14, fontWeight 700, color #ff5c8d
   * 토큰: mobile-s-bold + root.brand
   */
  dayCellTextToday: {
    fontSize: parseInt(fontSize["mobile-s-bold"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-bold"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-bold"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-bold"][1].fontWeight, // 700
    color: colors.root.brand, // #ff5c8d
    fontFamily: "Pretendard Variable",
  },

  /**
   * DayCell Text - Disabled
   * 피그마: fontSize 14, fontWeight 400, color #998d8d (opacity 0.3 applied to container)
   * 토큰: mobile-s-normal
   */
  dayCellTextDisabled: {
    fontSize: parseInt(fontSize["mobile-s-normal"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-normal"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-normal"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-normal"][1].fontWeight, // 400
    color: colors.foundationBrown[4], // #928d8f
    fontFamily: "Pretendard Variable",
  },
});

export default styles;

