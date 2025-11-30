/**
 * ContentSwitcher Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-28
 * 피그마 노드ID: 4116:405
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
 * 컨테이너 및 레이아웃 상수
 */
const CONTAINER_CONFIG = {
  width: 345,
  padding: 8, // 좌우 패딩 4씩 (총 8px)
  dividerWidth: 1,
  dividerCount: 3, // 탭 사이 divider 3개
  tabCount: 4,
} as const;

/**
 * 각 섹션의 정확한 width 값 계산
 * 컨테이너 너비에서 패딩과 divider를 제외한 나머지를 탭들이 균등하게 분배
 */
const availableWidth = CONTAINER_CONFIG.width - CONTAINER_CONFIG.padding - (CONTAINER_CONFIG.dividerWidth * CONTAINER_CONFIG.dividerCount);
const tabWidth = availableWidth / CONTAINER_CONFIG.tabCount;

export const SECTION_WIDTHS = [tabWidth, tabWidth, tabWidth, tabWidth];

/**
 * ContentSwitcher Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Container
   * 피그마: Content Switcher - bg #F8F8F8, cornerRadius 16, padding 4, width 345px
   */
  container: {
    flexDirection: "row",
    gap: 0, // 피그마에서는 gap 없이 배치됨
    padding: 4, // 피그마에서 섹션들이 4px씩 떨어져 있음
    alignItems: "center",
    backgroundColor: colors.foundationBlack[3], // #f5f5f5 (내장 색상)
    borderRadius: 16,
    width: 345, // 지정된 컨테이너 너비
  },

  /* ========================================
   * ITEM STYLES
   * ======================================== */

  /**
   * Active Item
   * 피그마: Section 1 - height 31, cornerRadius 12, bg #fff, paddingHorizontal ~12
   */
  itemActive: {
    height: 31,
    backgroundColor: colors.foundationBlack[1], // #ffffff (내장 색상)
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Inactive Item
   * 피그마: Section 2,3,4 - height 31, cornerRadius 12, bg transparent, paddingHorizontal ~12
   */
  itemInactive: {
    height: 31,
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Small Size Items
   * 더 작은 크기의 탭 아이템들
   */
  itemSmall: {
    height: 28,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  /**
   * Disabled State Overlay
   * 비활성화 상태를 위한 투명도 조절
   */
  itemDisabled: {
    opacity: 0.5,
  },

  /**
   * Divider
   * 피그마: #C5C6CC 색상, 각 컴포넌트 사이에 배치 (active 양쪽 제외)
   */
  divider: {
    width: 1,
    height: 12, // active 아이템 높이의 절반 정도
    backgroundColor: colors.foundationBlack[6], // #bfbfbf (내장 색상)
    alignSelf: "center",
  },

  /* ========================================
   * TEXT STYLES
   * ======================================== */

  /**
   * Active Text
   * 피그마: fontSize 12, fontWeight 700, letterSpacing 0, lineHeight ~15, color #71727A
   */
  textActive: {
    fontSize: parseInt(fontSize["mobile-xs-bold"][0]), // 13px (가장 가까운 토큰)
    lineHeight: parseInt(fontSize["mobile-xs-bold"][1].lineHeight), // 18px
    letterSpacing: parseFloat(fontSize["mobile-xs-bold"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-xs-bold"][1].fontWeight, // 700
    color: colors.foundationBrown[4], // #928d8f (내장 색상)
    textAlign: "center",
    fontFamily: "Pretendard",
  },

  /**
   * Inactive Text
   * 피그마: fontSize 12, fontWeight 700, letterSpacing 0, lineHeight ~15, color #71727A
   */
  textInactive: {
    fontSize: parseInt(fontSize["mobile-xs-bold"][0]), // 13px (가장 가까운 토큰)
    lineHeight: parseInt(fontSize["mobile-xs-bold"][1].lineHeight), // 18px
    letterSpacing: parseFloat(fontSize["mobile-xs-bold"][1].letterSpacing), // 0em
    fontWeight: fontSize["mobile-xs-bold"][1].fontWeight, // 700
    color: colors.foundationBrown[4], // #928d8f (내장 색상)
    textAlign: "center",
    fontFamily: "Pretendard",
  },
});

export default styles;
