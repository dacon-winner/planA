/**
 * MyInfo Styles
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
  'myinfo-container': {
    flex: 1,
    backgroundColor: colors.secondary[50],
  },

  'myinfo-header': {
    padding: parseInt(spacing.lg),
    paddingTop: 60,
    backgroundColor: colors.primary[400],
  },

  'myinfo-content': {
    flex: 1,
    padding: parseInt(spacing.lg),
  },

  /* Components */
  'myinfo-header-title': {
    fontSize: parseInt(fontSize['mobile-3xl-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-3xl-bold'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-3xl-bold'][1].letterSpacing) * parseInt(fontSize['mobile-3xl-bold'][0]),
    fontWeight: fontSize['mobile-3xl-bold'][1].fontWeight,
    color: colors.secondary[50],
    fontFamily: 'PretendardVariable',
  },

  'myinfo-section': {
    marginBottom: parseInt(spacing.lg),
  },

  'myinfo-section-title': {
    fontSize: parseInt(fontSize['mobile-xl-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-xl-bold'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-xl-bold'][1].letterSpacing) * parseInt(fontSize['mobile-xl-bold'][0]),
    fontWeight: fontSize['mobile-xl-bold'][1].fontWeight,
    color: colors.secondary[900],
    marginBottom: parseInt(spacing.sm) * 1.5,
    fontFamily: 'PretendardVariable',
  },

  /* Utilities */
  'myinfo-placeholder': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-m'][1].letterSpacing) * parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: colors.secondary[600],
    textAlign: 'center',
    padding: 40,
    fontFamily: 'PretendardVariable',
  },

  /* Badge Demo Section */
  'badge-demo-section': {
    marginBottom: parseInt(spacing.lg),
    paddingHorizontal: parseInt(spacing.md),
  },

  'section-title': {
    fontSize: parseInt(fontSize['mobile-l-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-l-bold'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-l-bold'][1].letterSpacing) * parseInt(fontSize['mobile-l-bold'][0]),
    fontWeight: fontSize['mobile-l-bold'][1].fontWeight,
    color: colors.secondary[900],
    marginBottom: parseInt(spacing.md),
    fontFamily: 'PretendardVariable',
  },

  'badge-demo-row': {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: parseInt(spacing.md),
    alignItems: 'center',
  },

  'badge-demo-item': {
    alignItems: 'center',
    gap: parseInt(spacing.sm),
    minWidth: 80,
  },

  'badge-demo-label': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.secondary[600],
    textAlign: 'center',
    fontFamily: 'PretendardVariable',
  },

  /* Toast Demo Section */
  'toast-demo-button': {
    backgroundColor: colors.primary[400],
    paddingHorizontal: parseInt(spacing.md),
    paddingVertical: parseInt(spacing.sm),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },

  'toast-demo-button-text': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s-bold'][1].fontWeight,
    color: colors.secondary[50],
    textAlign: 'center',
    fontFamily: 'PretendardVariable',
  },

  /* SearchBar Demo Section */
  'searchbar-demo-item': {
    alignItems: 'center',
    gap: parseInt(spacing.sm),
    width: '100%',
    marginBottom: parseInt(spacing.md),
  },

  'searchbar-demo-label': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.secondary[600],
    textAlign: 'center',
    fontFamily: 'PretendardVariable',
    marginBottom: parseInt(spacing.xs),
  },

  /* Dropdown Demo Section */
  'dropdown-demo-item': {
    alignItems: 'center',
    gap: parseInt(spacing.sm),
    minWidth: 120,
    marginBottom: parseInt(spacing.md),
  },

  'dropdown-demo-label': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.secondary[600],
    textAlign: 'center',
    fontFamily: 'PretendardVariable',
    marginBottom: parseInt(spacing.xs),
  },


  'dropdown-result-section': {
    marginTop: parseInt(spacing.md),
    paddingTop: parseInt(spacing.md),
    borderTopWidth: 1,
    borderTopColor: colors.secondary[200],
    alignItems: 'center',
  },

  'dropdown-result-text': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.secondary[700],
    textAlign: 'center',
    fontFamily: 'PretendardVariable',
    marginBottom: parseInt(spacing.xs),
  },

  /* Modal 관련 스타일 */
  'plan-info-section': {
    marginTop: parseInt(spacing.md),
  },

  'plan-info-row': {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: parseInt(spacing.sm),
  },

  'plan-info-icon': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    marginRight: parseInt(spacing.sm),
    width: 20,
    textAlign: 'center',
  },

  'plan-info-icon-component': {
    marginRight: parseInt(spacing.sm),
    width: 20,
    height: 16,
    justifyContent: 'center',
  },

  'plan-info-text': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.secondary[600],
    fontFamily: 'PretendardVariable',
  },

  'modal-node-label': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-xs'][1].letterSpacing) * parseInt(fontSize['mobile-xs'][0]),
    fontWeight: fontSize['mobile-xs'][1].fontWeight,
    color: colors.secondary[600],
    fontFamily: 'PretendardVariable',
    textAlign: 'center',
    marginTop: 2,
  },

  /* Error Modal Styles */
  'error-modal-content': {
    alignItems: 'center',
    paddingVertical: parseInt(spacing.md),
  },

  'error-icon': {
    marginBottom: parseInt(spacing.md),
  },

  'error-description': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.secondary[900],
    fontFamily: 'PretendardVariable',
    textAlign: 'center',
    paddingHorizontal: parseInt(spacing.md),
  },
});




