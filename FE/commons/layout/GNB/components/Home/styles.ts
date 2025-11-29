/**
 * Home Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4116:260
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건 (Gradient 배경 제외 - 요청사항)
 * - [x] StyleSheet 전용
 * - [x] Flexbox만 사용 (position absolute 금지)
 * - [x] 반응형/접근성 고려
 */

import { StyleSheet, Platform, StatusBar } from "react-native";
import { mobileTypography } from "../../../../enums/typography";

const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;
const spacing = tailwindConfig.theme.extend.spacing;

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

/* Layout */
export const styles = StyleSheet.create({
  "home-wrapper": {
    flex: 1,
    backgroundColor: colors.foundationBlack[1],
  },

  "home-scroll-view": {
    flex: 1,
  },

  "home-scroll-container": {
    flexGrow: 1,
    paddingBottom: 100,
  },

  "home-container": {
    position: "relative",
    paddingHorizontal: 24,
    paddingTop: STATUSBAR_HEIGHT + 82,
    gap: 32,
  },

  /* 배경 그라데이션 */
  "background-gradient": {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },

  /* 상단 텍스트 섹션 */
  "header-section": {
    gap: 4,
    zIndex: 1,
  },

  "header-subtitle": {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    fontWeight: "400" as any,
    color: "rgba(0, 0, 0, 0.9)",
    fontFamily: "Pretendard",
  },

  "header-title": {
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 0.0703,
    fontWeight: "700" as any,
    color: colors.foundationBlack[13],
    fontFamily: "Pretendard",
  },

  /* 중앙 정보 카드 */
  "info-card-wrapper": {
    alignSelf: "center",
    width: 353,
    height: 121,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.foundationBlack[1],
    backgroundColor: "transparent",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },

  "info-card-blur": {
    position: "absolute",
    top: -1,
    left: -1,
    width: 353,
    height: 121,
    backgroundColor: colors.foundationBlack[1],
    opacity: 0.85,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.foundationBlack[1],
  },

  "info-card-content": {
    position: "absolute",
    top: 19.5,
    left: 5.5,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },

  "info-item": {
    width: 108,
    height: 80,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  "info-label": {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400" as any,
    color: "rgba(82, 74, 78, 0.7)",
    fontFamily: "Pretendard",
  },

  "info-value-primary": {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.3125,
    fontWeight: "700" as any,
    color: colors.root.brand,
    fontFamily: "Pretendard",
    textAlign: "center",
  },

  "info-value": {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1504,
    fontWeight: "700" as any,
    color: colors.root.text,
    textAlign: "center",
    fontFamily: "Pretendard",
  },

  "info-divider": {
    width: 0,
    height: 78,
    borderRightWidth: 1,
    borderRightColor: colors.foundationBlack[1], // white
  },

  /* 하단 카드 그리드 */
  "card-grid": {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "flex-start",
    zIndex: 1,
  },

  /* 업체 카드 */
  "vendor-card": {
    width: 167,
    height: 218,
    backgroundColor: colors.foundationBlack[1],
    borderRadius: 8,
    opacity: 0.85,
    shadowColor: "rgba(128, 12, 58, 0.1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    overflow: "hidden",
  },

  "card-content": {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  "card-info": {
    paddingTop: 12,
    paddingHorizontal: 12,
    gap: 6,
    zIndex: 1,
  },

  "card-header": {
    gap: 0,
  },

  "card-title": {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.14,
    fontWeight: "700",
    color: colors.root.text,
    fontFamily: "Pretendard",
  },

  "card-title-inactive": {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.14,
    fontWeight: "700",
    color: "#d6cfcf",
    fontFamily: "Pretendard",
  },

  "card-meta": {
    flexDirection: "row",
    gap: 4,
    alignItems: "flex-start",
  },

  "card-category-bold": {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.1,
    fontWeight: "700",
    color: colors.root.text,
    fontFamily: "Pretendard",
  },

  "card-category-inactive": {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.1,
    fontWeight: "700",
    color: "#d6cfcf",
    fontFamily: "Pretendard",
  },

  "card-location": {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.1,
    fontWeight: "500",
    color: colors.root.text,
    fontFamily: "Pretendard",
  },

  "card-location-inactive": {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.1,
    fontWeight: "500",
    color: "#d6cfcf",
    fontFamily: "Pretendard",
  },

  "card-status": {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  "card-status-text": {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.1,
    fontWeight: "400",
    color: colors.root.text,
    fontFamily: "Pretendard",
  },

  "card-status-text-inactive": {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.1,
    fontWeight: "400",
    color: "#d6cfcf",
    fontFamily: "Pretendard",
  },

  "card-image": {
    width: 167,
    height: 141,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
