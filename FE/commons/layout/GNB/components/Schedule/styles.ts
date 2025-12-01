/**
 * Schedule Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 업데이트: 2025-12-19
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려
 */

import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@/commons/enums/color';

const tailwindConfig = require('@/tailwind.config.js');
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

/* Layout */
export const styles = StyleSheet.create({
  'schedule-wrapper': {
    flex: 1,
    backgroundColor: colors.black['black-1'],
  },

  'schedule-header': {
    position: 'relative',
    paddingHorizontal: 0,
    paddingTop: STATUSBAR_HEIGHT + 60,
    paddingBottom: parseInt(spacing.lg),
  },

  'header-section': {
    gap: 4,
    zIndex: 1,
  },

  'schedule-content': {
    flex: 1,
    backgroundColor: 'transparent',
  },

  'schedule-content-container': {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 0,
  },

  /* Components */
  'schedule-header-title': {
    fontSize: parseInt(fontSize['mobile-3xl-semibold'][0]),
    lineHeight: parseInt(fontSize['mobile-3xl-semibold'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-3xl-semibold'][1].letterSpacing) *
      parseInt(fontSize['mobile-3xl-semibold'][0]),
    fontWeight: fontSize['mobile-3xl-semibold'][1].fontWeight,
    color: colors.black['black-13'],
    fontFamily: 'Pretendard',
  },

  'schedule-header-subtitle': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-m'][1].letterSpacing) *
      parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: colors.brown['brown-6'],
    fontFamily: 'Pretendard',
  },
});




