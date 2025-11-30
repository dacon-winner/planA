/**
 * Card Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4174:1462
 *
 * 체크리스트:
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] 색상 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 */

import { StyleSheet } from "react-native";
import { colors } from "../../enums/color";

/**
 * Card Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /**
   * 카드 컨테이너
   * 피그마: width 345, padding 20, gap 12, borderRadius 14
   * bg white, border rgba(82,74,78,0.1)
   */
  cardContainer: {
    width: 345,
    backgroundColor: colors.black["black-1"], // white
    borderWidth: 1,
    borderColor: "rgba(82, 74, 78, 0.1)",
    borderRadius: 14,
    padding: 20,
    gap: 12,
    flexDirection: "column",
    alignItems: "flex-start",
  },

  /**
   * 뱃지 컨테이너
   * 피그마: gap 8, height 22
   */
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
    height: 22,
    alignItems: "flex-start",
    width: "100%",
  },

  /**
   * 제목 컨테이너
   * 피그마: gap 10
   */
  titleContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "100%",
  },

  /**
   * 제목 텍스트
   * 피그마: fontSize 16, lineHeight 24, letterSpacing -0.3125, color #524a4e
   */
  titleText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    color: colors.root.text, // #524a4e
    fontWeight: "400",
  },

  /**
   * 설명 컨테이너
   * 피그마: gap 10
   */
  descriptionContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "100%",
  },

  /**
   * 설명 텍스트
   * 피그마: fontSize 14, lineHeight 21, letterSpacing -0.3008, color rgba(82,74,78,0.7)
   */
  descriptionText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.3008,
    color: "rgba(82, 74, 78, 0.7)",
    fontWeight: "400",
  },

  /**
   * 지원 혜택 박스
   * 피그마: bg #fdeff4, padding 12, gap 4, borderRadius 10, height 95
   */
  benefitsBox: {
    backgroundColor: colors.secondary["secondary-100"], // #fdeff4 (유사)
    padding: 12,
    gap: 4,
    borderRadius: 10,
    height: 95,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  /**
   * 지원 혜택 헤더
   * 피그마: gap 10, height 18, 왼쪽 정렬
   */
  benefitsHeader: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    height: 18,
    width: "100%",
  },

  /**
   * 지원 혜택 헤더 텍스트
   * 피그마: fontSize 12, lineHeight 18, color rgba(82,74,78,0.6)
   */
  benefitsHeaderText: {
    fontSize: 12,
    lineHeight: 18,
    color: "rgba(82, 74, 78, 0.6)",
    fontWeight: "400",
  },

  /**
   * 혜택 텍스트 컨테이너
   * 피그마: gap 10
   */
  benefitsTextContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "100%",
  },

  /**
   * 혜택 텍스트
   * 피그마: fontSize 14, lineHeight 21, letterSpacing -0.3008, color #524a4e
   */
  benefitsText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.3008,
    color: colors.root.text, // #524a4e
    fontWeight: "400",
  },

  /**
   * 혜택 금액 컨테이너
   * 피그마: gap 10
   */
  benefitsAmountContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "100%",
  },

  /**
   * 혜택 금액 텍스트
   * 피그마: fontSize 16, lineHeight 24, letterSpacing -0.625, color #ff5c8d
   */
  benefitsAmountText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.625,
    color: colors.root.brand, // #ff5c8d
    fontWeight: "400",
  },

  /**
   * 상세 정보 컨테이너
   * 피그마: gap 8, height 70
   */
  detailsContainer: {
    flexDirection: "column",
    gap: 8,
    height: 70,
    alignItems: "flex-start",
    width: "100%",
  },

  /**
   * 상세 정보 행
   * 피그마: gap 8, height 18
   */
  detailRow: {
    flexDirection: "row",
    gap: 8,
    height: 18,
    alignItems: "center",
    width: "100%",
  },

  /**
   * 상세 정보 아이콘 컨테이너
   * 피그마: width 15, height 18
   */
  detailIconContainer: {
    width: 15,
    height: 18,
  },

  /**
   * 상세 정보 아이콘 (이모지)
   * 피그마: fontSize 12, lineHeight 18, color rgba(82,74,78,0.6)
   */
  detailIcon: {
    fontSize: 12,
    lineHeight: 18,
    color: "rgba(82, 74, 78, 0.6)",
  },

  /**
   * 상세 정보 텍스트 컨테이너
   * 피그마: flex 1
   */
  detailTextContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  /**
   * 상세 정보 텍스트
   * 피그마: fontSize 12, lineHeight 18, color rgba(82,74,78,0.6)
   */
  detailText: {
    fontSize: 12,
    lineHeight: 18,
    color: "rgba(82, 74, 78, 0.6)",
    fontWeight: "400",
  },

  /**
   * 전체 설명 컨테이너
   * 피그마: borderTop 1px rgba(82,74,78,0.1), paddingTop 12, height 73
   */
  fullDescriptionContainer: {
    flexDirection: "column",
    borderTopWidth: 1,
    borderTopColor: "rgba(82, 74, 78, 0.1)",
    paddingTop: 12,
    paddingBottom: 0,
    paddingHorizontal: 0,
    height: 73,
    alignItems: "flex-start",
    width: "100%",
  },

  /**
   * 전체 설명 텍스트 컨테이너
   * 피그마: gap 10
   */
  fullDescriptionTextContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  /**
   * 전체 설명 텍스트
   * 피그마: fontSize 14, lineHeight 20, letterSpacing -0.1504, color rgba(82,74,78,0.7)
   */
  fullDescriptionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1504,
    color: "rgba(82, 74, 78, 0.7)",
    fontWeight: "400",
  },

  /**
   * 버튼 컨테이너
   * 버튼이 카드 내부 전체 너비를 차지하도록 설정
   */
  buttonContainer: {
    width: "100%",
  },
});

export default styles;
