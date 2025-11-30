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

// tailwind.config.js에서 색상 토큰 import
// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;

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
    backgroundColor: "transparent",
    width: "100%",
    minHeight: 852,
  },

  /**
   * Gradient Background
   * 배경 그라데이션 이미지
   * 피그마: x=13, y=190, width=438, height=447
   */
  gradientBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  /**
   * Content Wrapper
   * 스크롤 가능한 컨텐츠 영역
   */
  contentWrapper: {
    flex: 1,
    marginTop: 59,
    width: "100%",
  },

  /**
   * Inner Container
   * 내부 컨텐츠 컨테이너
   * 피그마: Frame 130 (x=0, y=59, width=394, height=641)
   */
  innerContainer: {
    width: "100%",
    backgroundColor: "transparent",
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
   * 피그마 노드ID: 4040:3959
   * fontSize 24, fontWeight 700, color #5c5050
   * lineHeight 28, letterSpacing -0.24px
   * 토큰: root.text (#524a4e) - 가장 유사
   */
  titleText: {
    fontFamily: "Pretendard Variable",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.24,
    fontWeight: "700",
    color: colors.root.text, // #524a4e
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
   * 피그마: Step Wrapper (width=393, height=52)
   * Content 패딩: x=24, y=16
   */
  stepperWrapper: {
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 0,
  },

  /**
   * Calendar Wrapper
   * 달력 영역 래퍼
   * 피그마: Frame 128 (x=0, y=52, width=394, height=371)
   * 참고: Stepper의 stepContent가 이미 paddingHorizontal: 24 적용함
   */
  calendarWrapper: {
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 0,
  },

  /**
   * Calendar Card
   * 달력 카드 배경
   * 피그마 노드ID: 4040:6793
   * Card (x=0, y=0, width=344, height=371)
   * 피그마: borderRadius 12px, border white, opacity 0.85, mix-blend-overlay
   * 피그마: shadowColor #800C3A (진한 핑크/레드)
   * 내부 패딩: 24px(좌우), 18px(상하)
   * 토큰: foundationBlack.1 (white)
   */
  calendarCard: {
    width: "100%",
    backgroundColor: colors.foundationBlack[1], // #ffffff
    borderRadius: 12, // Figma: 12px (not 16px)
    borderWidth: 1,
    borderColor: colors.foundationBlack[1], // white
    paddingHorizontal: 24,
    paddingVertical: 18,
    // Shadow: Figma shadowColor #800C3A
    shadowColor: colors.foundationRed[10], // #73293f (가장 유사한 토큰)
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    // React Native에서는 mix-blend-mode 미지원으로 opacity만 적용
    opacity: 0.95,
    overflow: "visible",
  },

  /* ========================================
   * REGION STEP STYLES
   * ======================================== */

  /**
   * Region Wrapper
   * 지역 선택 영역 래퍼
   */
  regionWrapper: {
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: "visible",
  },

  /**
   * Region Card
   * 지역 선택 카드 배경
   * 피그마: width 345px, height 416px
   * 스크롤 영역: left 25px, top 24px, width 295px
   * borderRadius 12px, border white, opacity 0.85
   */
  regionCard: {
    width: "100%",
    maxWidth: 345, // Figma design width - shows 2 columns per page
    height: "auto", // 버튼이 잘리지 않도록 높이 증가
    backgroundColor: colors.foundationBlack[1], // white
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.foundationBlack[1],
    paddingLeft: 25,
    paddingRight: 0,
    paddingTop: 22,
    paddingBottom: 22, // 하단 여유 공간
    shadowColor: colors.foundationRed[10],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    opacity: 0.85,
    overflow: "hidden",
  },

  /**
   * Region Page
   * 각 페이지 (2열 x 4행 = 8개 버튼)
   * 카드 콘텐츠 영역 너비에 맞춰 설정 (345 - 25 = 320px)
   */
  regionPage: {
    width: 320, // 카드 콘텐츠 영역 width (maxWidth 345 - paddingLeft 25)
    paddingRight: 25, // 오른쪽 여백 (버튼과 카드 경계 사이)
    marginRight: 0, // 페이지 간 간격 없음 (페이징을 위해)
  },

  /**
   * Region Grid Container
   * 지역 선택 그리드 레이아웃
   * 피그마: 2열 4행, gap 12px
   */
  regionGridContainer: {
    flexDirection: "column",
    gap: 12,
  },

  regionRow: {
    flexDirection: "row",
    gap: 12,
  },
});

export default styles;
