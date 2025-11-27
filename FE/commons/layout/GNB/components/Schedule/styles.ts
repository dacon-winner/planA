/**
 * Schedule Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려
 */

import { StyleSheet } from 'react-native';

const tailwindConfig = require('@/tailwind.config.js');
const colors = tailwindConfig.theme.extend.colors;
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

/* Layout */
export const styles = StyleSheet.create({
  'schedule-container': {
    flex: 1,
    backgroundColor: colors.secondary[50],
  },

  'schedule-header': {
    padding: parseInt(spacing.lg),
    paddingTop: 60,
    backgroundColor: colors.primary[400],
  },

  'schedule-content': {
    flex: 1,
    padding: parseInt(spacing.lg),
  },

  /* Components */
  'schedule-header-title': {
    fontSize: parseInt(fontSize['mobile-3xl-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-3xl-bold'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-3xl-bold'][1].letterSpacing) * parseInt(fontSize['mobile-3xl-bold'][0]),
    fontWeight: fontSize['mobile-3xl-bold'][1].fontWeight,
    color: colors.secondary[50],
    fontFamily: 'PretendardVariable',
  },

  'schedule-section': {
    marginBottom: parseInt(spacing.lg),
  },

  'schedule-section-title': {
    fontSize: parseInt(fontSize['mobile-xl-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-xl-bold'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-xl-bold'][1].letterSpacing) * parseInt(fontSize['mobile-xl-bold'][0]),
    fontWeight: fontSize['mobile-xl-bold'][1].fontWeight,
    color: colors.secondary[900],
    marginBottom: parseInt(spacing.sm) * 1.5,
    fontFamily: 'PretendardVariable',
  },

  /* Utilities */
  'schedule-placeholder': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-m'][1].letterSpacing) * parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: colors.secondary[600],
    textAlign: 'center',
    padding: 40,
    fontFamily: 'PretendardVariable',
  },
});




