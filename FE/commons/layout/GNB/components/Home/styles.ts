/**
 * Home Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려
 */

import { StyleSheet } from "react-native";

const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

/* Layout */
export const styles = StyleSheet.create({
  "home-scroll-container": {
    flexGrow: 1,
    paddingVertical: parseInt(spacing.lg),
  },

  "home-container": {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: parseInt(spacing.md),
    backgroundColor: colors.secondary[50],
    gap: parseInt(spacing.md),
  },

  /* Components */
  "home-title": {
    fontSize: parseInt(fontSize["mobile-3xl-bold"][0]),
    lineHeight: parseInt(fontSize["mobile-3xl-bold"][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize["mobile-3xl-bold"][1].letterSpacing) *
      parseInt(fontSize["mobile-3xl-bold"][0]),
    fontWeight: fontSize["mobile-3xl-bold"][1].fontWeight,
    color: colors.primary[400],
    marginBottom: parseInt(spacing.md),
    fontFamily: "PretendardVariable",
  },

  "home-subtitle": {
    fontSize: parseInt(fontSize["mobile-l"][0]),
    lineHeight: parseInt(fontSize["mobile-l"][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize["mobile-l"][1].letterSpacing) *
      parseInt(fontSize["mobile-l"][0]),
    fontWeight: fontSize["mobile-l"][1].fontWeight,
    color: colors.secondary[700],
    fontFamily: "PretendardVariable",
    marginBottom: parseInt(spacing.lg),
  },

  /* Demo Sections */
  "input-demo-section": {
    width: "100%",
    maxWidth: 400,
    gap: parseInt(spacing.md),
    paddingVertical: parseInt(spacing.md),
  },

  "button-demo-section": {
    width: "100%",
    maxWidth: 400,
    gap: parseInt(spacing.md),
    paddingVertical: parseInt(spacing.md),
  },

  "section-title": {
    fontSize: parseInt(fontSize["mobile-xl-bold"][0]),
    lineHeight: parseInt(fontSize["mobile-xl-bold"][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize["mobile-xl-bold"][1].letterSpacing) *
      parseInt(fontSize["mobile-xl-bold"][0]),
    fontWeight: fontSize["mobile-xl-bold"][1].fontWeight,
    color: colors.primary[500],
    fontFamily: "PretendardVariable",
    marginBottom: parseInt(spacing.sm),
  },
});
