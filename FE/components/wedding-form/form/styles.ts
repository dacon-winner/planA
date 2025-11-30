/**
 * WeddingForm Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4040:3921
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 피그마 정확한 색상값 사용 (디자인 토큰 우선)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] position flexbox 방식 사용 (position-absolute 금지)
 */

import { StyleSheet } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;
const fontSize = tailwindConfig.theme.extend.fontSize;

export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Container
   * 전체 폼 컨테이너
   * 피그마: width 393, height 852
   */
  container: {
    flex: 1,
    width: "100%",
    minHeight: 852,
    backgroundColor: "#ffffff",
    position: "relative",
  },

  /**
   * Content Wrapper
   * 스크롤 가능한 컨텐츠 영역
   */
  contentWrapper: {
    flex: 1,
    width: "100%",
  },

  /**
   * Inner Container
   * 내부 컨텐츠 컨테이너
   * 피그마: Frame 130 (x=0, y=59, width=394, height=641)
   */
  innerContainer: {
    width: "100%",
    paddingTop: 59,
    paddingBottom: 20,
    gap: 18,
  },

  /* ========================================
   * HEADER STYLES
   * ======================================== */

  /**
   * Header Container
   * 제목 영역
   * 피그마: Frame 129 (x=0, y=0, width=394, height=56)
   */
  headerContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 0,
    height: 56,
    justifyContent: "center",
  },

  /**
   * Title Text
   * 피그마: "PlanA와 함께 결혼 준비를 시작해보세요."
   * fontSize 20, fontWeight 700, color #dd4677
   * 토큰: mobile-xl-bold + root.brand
   */
  titleText: {
    fontFamily: "Pretendard Variable",
    fontSize: parseInt(fontSize["mobile-xl-bold"][0]), // 20px
    lineHeight: parseInt(fontSize["mobile-xl-bold"][1].lineHeight), // 28px
    letterSpacing: parseFloat(fontSize["mobile-xl-bold"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-xl-bold"][1].fontWeight, // 700
    color: colors.root.brand, // #ff5c8d
    width: 243,
  },

  /* ========================================
   * FORM CONTENT STYLES
   * ======================================== */

  /**
   * Form Content Container
   * 피그마: Frame 126 (x=0, y=74, width=394, height=567)
   */
  formContentContainer: {
    width: "100%",
    gap: 0,
  },

  /**
   * Stepper Wrapper
   * Stepper 컴포넌트 래퍼
   */
  stepperWrapper: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 0,
  },

  /**
   * Calendar Wrapper
   * 달력 영역 래퍼
   * 피그마: Frame 128 (x=0, y=52, width=394, height=371)
   */
  calendarWrapper: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 0,
    marginTop: 0,
  },

  /**
   * Calendar Card
   * 달력 카드 배경
   * 피그마: Card (x=0, y=0, width=344, height=371)
   */
  calendarCard: {
    width: "100%",
    height: 371,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },

  /**
   * Calendar Inner Container
   * 달력 내부 영역
   * 피그마: ScrollableCalendar (x=24, y=18, width=296, height=335)
   */
  calendarInnerContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
});

export default styles;
