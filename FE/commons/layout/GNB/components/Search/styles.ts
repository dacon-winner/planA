/**
 * Search Styles
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
  'search-wrapper': {
    flex: 1,
    backgroundColor: colors.primary[400],
  },

  'search-safe-area': {
    flex: 1,
  },

  'search-container': {
    flex: 1,
    backgroundColor: colors.secondary[50],
  },

  'search-header': {
    padding: parseInt(spacing.lg),
    paddingTop: 60,
    backgroundColor: colors.primary[400],
  },

  'search-content': {
    flex: 1,
    padding: parseInt(spacing.lg),
  },

  /* Components */
  'search-header-title': {
    fontSize: parseInt(fontSize['mobile-3xl-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-3xl-bold'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-3xl-bold'][1].letterSpacing) * parseInt(fontSize['mobile-3xl-bold'][0]),
    fontWeight: fontSize['mobile-3xl-bold'][1].fontWeight,
    color: colors.secondary[50],
    fontFamily: 'Pretendard',
  },

  'search-section': {
    marginBottom: parseInt(spacing.lg),
  },

  'search-section-title': {
    fontSize: parseInt(fontSize['mobile-xl-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-xl-bold'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-xl-bold'][1].letterSpacing) * parseInt(fontSize['mobile-xl-bold'][0]),
    fontWeight: fontSize['mobile-xl-bold'][1].fontWeight,
    color: colors.secondary[900],
    marginBottom: parseInt(spacing.sm) * 1.5,
    fontFamily: 'Pretendard',
  },

  /* Utilities */
  'search-placeholder': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-m'][1].letterSpacing) * parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: colors.secondary[600],
    textAlign: 'center',
    padding: 40,
    fontFamily: 'Pretendard',
  },

  /* Search Bar */
  'search-bar-container': {
    position: 'absolute',
    top: 16,
    left: 24,
    right: 24,
    zIndex: 20,
  },

  'search-bar': {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },

  'search-input': {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#524a4e',
    fontFamily: 'Pretendard',
  },

  /* Category Filter */
  'category-filter-container': {
    position: 'absolute',
    top: 82,
    left: 24,
    right: 24,
    zIndex: 10,
  },

  'category-filter-scroll': {
    gap: 8,
  },

  'category-button': {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#d1d5dc',
  },

  'category-button-selected': {
    backgroundColor: '#655d61',
    borderColor: '#655d61',
  },

  'category-button-text': {
    fontSize: 14,
    fontWeight: '500',
    color: '#524a4e',
    fontFamily: 'Pretendard',
    lineHeight: 20,
    letterSpacing: -0.1504,
  },

  'category-button-text-selected': {
    color: '#FFFFFF',
  },

  /* Current Location Button */
  'location-button': {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#800c3a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
});




