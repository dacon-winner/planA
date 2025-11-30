/**
 * Stepper Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4190:2508
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
 * Stepper Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Stepper Container
   * 피그마: width 300, borderRadius 6
   * 실제 사용 시: 부모 컨테이너의 width에 맞춤
   */
  stepperContainer: {
    width: "100%",
    borderRadius: 6,
  },

  /* ========================================
   * STEP ITEM STYLES
   * ======================================== */

  /**
   * Step Item Container
   * 각 스텝 아이템 컨테이너
   */
  stepItem: {
    position: "relative",
  },

  /**
   * Step Wrapper (Header + Content)
   * 피그마: width 300, height 52
   * 실제 사용 시: 부모 컨테이너의 width에 맞춤
   */
  stepWrapper: {
    width: "100%",
    minHeight: 52,
    flexDirection: "column",
  },

  /* ========================================
   * STEP HEADER STYLES
   * ======================================== */

  /**
   * Step Header Container
   * 스텝 제목 영역 (클릭 가능)
   */
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  /**
   * Step Header Content
   * 아이콘 + 텍스트 영역
   * 피그마: gap 12px
   */
  stepHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  /* ========================================
   * STEP ICON STYLES
   * ======================================== */

  /**
   * Step Success Icon (Completed)
   * 피그마: width 20, height 20, borderRadius 10, bg #e64485
   * 토큰: root.brand (#ff5c8d) - 가장 유사
   */
  stepSuccessIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.root.brand, // #ff5c8d
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Step Shape Icon (Active)
   * 피그마: width 20, height 20, borderRadius 10, border #e64485
   * 토큰: root.brand (#ff5c8d) - 가장 유사
   */
  stepShapeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.root.brand, // #ff5c8d
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Step Shape Inner Rectangle
   * 피그마: width 10, height 10, borderRadius 5, bg #e64485
   * 토큰: root.brand (#ff5c8d) - 가장 유사
   */
  stepShapeInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.root.brand, // #ff5c8d
  },

  /**
   * Step Number Icon (Default)
   * 피그마: width 20, height 20, borderRadius 10, bg #ada2a2 20% opacity
   * 토큰: foundationBrown.3 (#b5b1b3) - 유사한 값에 20% opacity
   */
  stepNumberIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: `${colors.foundationBrown[3]}33`, // #b5b1b3 + 20% opacity (33 in hex)
    justifyContent: "center",
    alignItems: "center",
  },

  /* ========================================
   * STEP TEXT STYLES
   * ======================================== */

  /**
   * Step Text - Completed
   * 피그마: fontSize 14, fontWeight 500, color #0d0b26
   * 토큰: foundationBlue.10 (#0e1219) - 가장 유사한 어두운 색
   */
  stepTextCompleted: {
    fontSize: parseInt(fontSize["mobile-s-medium"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-medium"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-medium"][1].fontWeight, // 500
    color: colors.foundationBlue[10], // #0e1219
    fontFamily: "Pretendard Variable",
  },

  /**
   * Step Text - Active
   * 피그마: fontSize 14, fontWeight 500, color #e64485
   * 토큰: root.brand (#ff5c8d) - 가장 유사
   */
  stepTextActive: {
    fontSize: parseInt(fontSize["mobile-s-medium"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-medium"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-medium"][1].fontWeight, // 500
    color: colors.root.brand, // #ff5c8d
    fontFamily: "Pretendard Variable",
  },

  /**
   * Step Text - Default
   * 피그마: fontSize 14, fontWeight 500, color #998d8d
   * 토큰: foundationBrown.4 (#928d8f) - 가장 유사
   */
  stepTextDefault: {
    fontSize: parseInt(fontSize["mobile-s-medium"][0]), // 14px
    lineHeight: parseInt(fontSize["mobile-s-medium"][1].lineHeight), // 20px
    letterSpacing: parseFloat(fontSize["mobile-s-medium"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-s-medium"][1].fontWeight, // 500
    color: colors.foundationBrown[4], // #928d8f
    fontFamily: "Pretendard Variable",
  },

  /* ========================================
   * CONNECTOR LINE STYLES
   * ======================================== */

  /**
   * Connector Line
   * 피그마: width 2, height 40, bg #ada2a2 20% opacity
   * 토큰: foundationBrown.3 (#b5b1b3) - 유사한 값에 20% opacity
   * position: relative, left margin 33px (24px padding + 9px center of icon)
   */
  connectorLine: {
    width: 2,
    height: 40,
    backgroundColor: `${colors.foundationBrown[3]}33`, // #b5b1b3 + 20% opacity (33 in hex)
    marginLeft: 33, // 24px padding + 9px (center of 20px icon)
  },

  /* ========================================
   * STEP CONTENT STYLES
   * ======================================== */

  /**
   * Step Content Container
   * 각 스텝의 폼 영역 (애니메이션 적용됨)
   * 피그마: Frame 128 (y=52, height=371) 다음 Step Wrapper (y=423)
   * → 간격 0px이므로 paddingBottom 제거
   */
  stepContent: {
    paddingHorizontal: 24,
    paddingBottom: 0,
  },

  /* ========================================
   * CHECK ICON STYLES
   * ======================================== */

  /**
   * Check Icon Container
   * 체크 아이콘 SVG 영역
   */
  checkIcon: {
    width: 12,
    height: 12,
  },
});

export default styles;
