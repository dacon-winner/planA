/**
 * Search Styles
 * 버전: 1.4.0
 * 최종 수정: 2025-12-01
 * 규칙 준수: 03-ui.mdc
 *
 * 스타일 구조:
 * - Layout: 전체 레이아웃 및 컨테이너
 * - Components: 검색바, 카테고리, 버튼 등
 * - VendorDetail: Bottom Sheet 업체 상세 정보
 *
 * 스타일 규칙:
 * - [x] tailwind.config.js의 토큰 사용
 * - [x] 하드코딩 색상 최소화 (Figma 디자인 반영)
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려
 */

import { StyleSheet, Platform, StatusBar } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

/* Layout */
export const styles = StyleSheet.create({
  "search-wrapper": {
    flex: 1,
    backgroundColor: colors.foundationBlack[1],
  },

  "search-safe-area": {
    flex: 1,
  },

  "search-container": {
    flex: 1,
    backgroundColor: colors.secondary[50],
  },

  "search-header": {
    padding: parseInt(spacing.lg),
    paddingTop: 60,
    backgroundColor: colors.primary[400],
  },

  "search-content": {
    flex: 1,
    padding: parseInt(spacing.lg),
  },

  /* Components */
  "search-header-title": {
    fontSize: parseInt(fontSize["mobile-3xl-bold"][0]),
    lineHeight: parseInt(fontSize["mobile-3xl-bold"][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize["mobile-3xl-bold"][1].letterSpacing) *
      parseInt(fontSize["mobile-3xl-bold"][0]),
    fontWeight: fontSize["mobile-3xl-bold"][1].fontWeight,
    color: colors.secondary[50],
    fontFamily: "Pretendard",
  },

  "search-section": {
    marginBottom: parseInt(spacing.lg),
  },

  "search-section-title": {
    fontSize: parseInt(fontSize["mobile-xl-bold"][0]),
    lineHeight: parseInt(fontSize["mobile-xl-bold"][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize["mobile-xl-bold"][1].letterSpacing) *
      parseInt(fontSize["mobile-xl-bold"][0]),
    fontWeight: fontSize["mobile-xl-bold"][1].fontWeight,
    color: colors.secondary[900],
    marginBottom: parseInt(spacing.sm) * 1.5,
    fontFamily: "Pretendard",
  },

  /* Utilities */
  "search-placeholder": {
    fontSize: parseInt(fontSize["mobile-m"][0]),
    lineHeight: parseInt(fontSize["mobile-m"][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize["mobile-m"][1].letterSpacing) *
      parseInt(fontSize["mobile-m"][0]),
    fontWeight: fontSize["mobile-m"][1].fontWeight,
    color: colors.secondary[600],
    textAlign: "center",
    padding: 40,
    fontFamily: "Pretendard",
  },

  /* Search Bar */
  "search-bar-container": {
    position: "absolute",
    top: STATUSBAR_HEIGHT + 16,
    left: 24,
    right: 24,
    zIndex: 20,
  },

  "search-bar": {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },

  "search-input": {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#524a4e",
    fontFamily: "Pretendard",
  },

  /* Category Filter */
  "category-filter-container": {
    position: "absolute",
    top: STATUSBAR_HEIGHT + 82,
    left: 24,
    right: 24,
    zIndex: 10,
  },

  "category-filter-scroll": {
    gap: 8,
  },

  "category-button": {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#d1d5dc",
  },

  "category-button-selected": {
    backgroundColor: "#655d61",
    borderColor: "#655d61",
  },

  "category-button-text": {
    fontSize: 14,
    fontWeight: "500",
    color: "#524a4e",
    fontFamily: "Pretendard",
    lineHeight: 20,
    letterSpacing: -0.1504,
  },

  "category-button-text-selected": {
    color: "#FFFFFF",
  },

  /* Current Location Button */
  "location-button": {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#800c3a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },

  /* Initial Loading Overlay */
  "initial-loading-overlay": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  "loading-text": {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#524a4e",
    fontFamily: "Pretendard",
  },
});

/* Vendor Detail Styles */
export const vendorDetailStyles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#800c3a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  handleIndicator: {
    backgroundColor: "#d1d5dc",
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  headerLocation: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Pretendard",
    letterSpacing: -0.3125,
  },

  saveButton: {
    backgroundColor: "#ff5c8d",
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 4,
    height: 32,
    justifyContent: "center",
  },

  saveButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Pretendard",
    letterSpacing: -0.1504,
  },

  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },

  categoryBadge: {
    backgroundColor: "#fdeff4",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },

  categoryBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#ff5c8d",
    fontFamily: "Pretendard",
  },

  description: {
    fontSize: 12,
    color: "#524a4e",
    fontFamily: "Pretendard",
  },

  vendorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
    fontFamily: "Pretendard",
  },

  imageGalleryContainer: {
    marginBottom: 16,
  },

  imageGalleryContent: {
    gap: 9,
  },

  galleryImage: {
    width: 168,
    height: 168,
    borderRadius: 8,
  },

  galleryImagePlaceholder: {
    width: 168,
    height: 168,
    backgroundColor: "#d9d9d9",
    borderRadius: 8,
  },

  infoSection: {
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },

  infoText: {
    fontSize: 12,
    color: "#524a4e",
    fontFamily: "Pretendard",
  },

  priceSection: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  priceLabel: {
    fontSize: 12,
    color: "#524a4e",
    fontFamily: "Pretendard",
  },

  priceDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 8,
  },

  priceValue: {
    fontSize: 12,
    color: "#524a4e",
    fontFamily: "Pretendard",
  },

  ctaButton: {
    backgroundColor: "#ff5c8d",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#800c3a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 3,
  },

  ctaButtonText: {
    fontSize: 12.167,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Pretendard",
    letterSpacing: -0.1307,
  },

  // 비슷한 업체 추천 섹션
  similarSection: {
    marginTop: 32,
    marginBottom: 24,
  },

  similarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
    fontFamily: "Pretendard",
  },

  similarScrollContent: {
    gap: 12,
    paddingRight: 24,
  },

  similarCard: {
    width: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  similarCardImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#d9d9d9",
  },

  similarCardImagePlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: "#d9d9d9",
  },

  similarCardContent: {
    padding: 12,
  },

  similarCardName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 6,
    fontFamily: "Pretendard",
  },

  similarCardBadge: {
    backgroundColor: "#fdeff4",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginBottom: 6,
  },

  similarCardBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#ff5c8d",
    fontFamily: "Pretendard",
  },

  similarCardPrice: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff5c8d",
    marginBottom: 6,
    fontFamily: "Pretendard",
  },

  similarCardLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  similarCardLocationText: {
    fontSize: 10,
    color: "#524a4e",
    fontFamily: "Pretendard",
    flex: 1,
  },
});
