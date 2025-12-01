/**
 * PolicyCard Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 피그마 노드ID: 4174:1721
 */

import { StyleSheet } from "react-native";
import { colors } from "../../enums/color";

export const styles = StyleSheet.create({
  // 카드 컨테이너 (고정 높이로 UX 개선)
  cardContainer: {
    width: 345,
    height: 300, // 고정 높이로 스냅 스크롤 최적화
    backgroundColor: colors.black["black-1"], // white
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(82, 74, 78, 0.1)",
    padding: 16,
    gap: 8,
  },

  // 뱃지 컨테이너
  badgeContainer: {
    flexDirection: "row",
    gap: 6,
    height: 22,
  },

  // 뱃지 스타일 (채워진 배경)
  badgeFilled: {
    backgroundColor: "rgba(253, 239, 244, 0.8)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 11,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeFilledText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    lineHeight: 16,
    color: colors.root.brand,
    textAlign: "center",
  },

  // 뱃지 스타일 (테두리만)
  badgeOutline: {
    borderWidth: 1,
    borderColor: colors.root.brand,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 11,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeOutlineText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    lineHeight: 16,
    color: colors.root.brand,
    textAlign: "center",
  },

  // 제목
  titleContainer: {
    gap: 4,
    height: 24, // 1줄 고정
  },

  titleText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: colors.root.text,
    letterSpacing: -0.3,
  },

  // 부제목/설명
  subtitleContainer: {
    gap: 4,
    height: 20, // 1줄 고정
  },

  subtitleText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(82, 74, 78, 0.7)",
    letterSpacing: -0.28,
  },

  // 지원 혜택 박스
  benefitsBox: {
    backgroundColor: colors.secondary["secondary-100"], // #FFF0F6 (Figma: #FDEFF4와 유사)
    borderRadius: 10,
    padding: 12,
    gap: 4,
    height: 85, // 고정 높이
    justifyContent: "flex-start",
  },

  // 혜택 항목 컨테이너
  benefitsItemContainer: {
    width: "100%",
  },

  // 지원 혜택 헤더
  benefitsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 18,
  },

  benefitsHeaderText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "rgba(82, 74, 78, 0.6)",
  },

  // 혜택 텍스트 (일반)
  benefitsText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: colors.root.text,
    letterSpacing: -0.28,
  },

  // 혜택 금액 텍스트 (강조)
  benefitsAmountText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 15,
    lineHeight: 22,
    color: colors.root.brand,
    letterSpacing: -0.3,
    fontWeight: "500",
  },

  // 타입 정보 컨테이너
  typeInfoContainer: {
    gap: 4,
    height: 18,
    marginTop: 0,
  },

  typeInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 18,
  },

  typeInfoIconContainer: {
    width: 14,
    height: 18,
  },

  typeInfoIcon: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "rgba(82, 74, 78, 0.6)",
  },

  typeInfoTextContainer: {
    flex: 1,
  },

  typeInfoText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "rgba(82, 74, 78, 0.6)",
  },

  // 버튼 컨테이너
  buttonContainer: {
    width: "100%",
    marginTop: "auto", // 항상 하단에 고정
  },
});

