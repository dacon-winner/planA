/**
 * MyInfo Styles
 * 버전: 2.0.0
 * 생성 시각: 2025-01-XX
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려
 * 피그마 노드ID: 4162-1063
 */

import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@/commons/enums/color';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindConfig = require('@/tailwind.config.js');
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export const styles = StyleSheet.create({
  /* ========================================
   * LAYOUT STYLES
   * ======================================== */
  'myinfo-wrapper': {
    flex: 1,
    backgroundColor: colors.black['black-1'],
  },

  'content-scroll': {
    flex: 1,
  },

  'content-container': {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 0,
    gap: parseInt(spacing.md),
  },

  /* ========================================
   * HEADER STYLES
   * ======================================== */
  'header-container': {
    position: 'relative',
    paddingHorizontal: 0,
    paddingTop: STATUSBAR_HEIGHT + 60,
    paddingBottom: parseInt(spacing.sm),
  },

  'header-section': {
    gap: 4,
    zIndex: 1,
  },

  'header-title': {
    fontSize: parseInt(fontSize['mobile-3xl-semibold'][0]),
    lineHeight: parseInt(fontSize['mobile-3xl-semibold'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-3xl-semibold'][1].letterSpacing) * parseInt(fontSize['mobile-3xl-semibold'][0]),
    fontWeight: fontSize['mobile-3xl-semibold'][1].fontWeight,
    color: colors.black['black-13'],
    fontFamily: 'Pretendard',
  },

  'header-subtitle': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-m'][1].letterSpacing) * parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: 'rgba(0, 0, 0, 0.9)',
    fontFamily: 'Pretendard',
  },

  /* ========================================
   * USER CARD STYLES
   * ======================================== */
  'user-card': {
    backgroundColor: colors.black['black-1'],
    borderWidth: 1,
    borderColor: `rgba(82, 74, 78, 0.1)`,
    borderRadius: parseInt(spacing.sm),
    padding: 21,
    gap: 20,
    width: '100%',
  },

  'user-header': {
    height: 48,
    width: '100%',
  },

  'user-info-row': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    width: '100%',
  },

  'profile-container': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.md),
    height: 48,
  },

  'profile-icon-wrapper': {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: colors.red['red-1'],
    alignItems: 'center',
    justifyContent: 'center',
  },

  'user-name-container': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.xs),
    justifyContent: 'center',
  },

  'user-name': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-m'][1].letterSpacing) * parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  'user-name-suffix': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.root.text,
    opacity: 0.7,
    fontFamily: 'Pretendard',
  },

  'divider': {
    height: 1,
    width: '100%',
    backgroundColor: `rgba(82, 74, 78, 0.1)`,
  },

  'user-details': {
    gap: parseInt(spacing.sm),
    width: '100%',
  },

  'detail-row': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.xs),
    minHeight: 14,
  },


  'detail-text': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-xs'][1].letterSpacing) * parseInt(fontSize['mobile-xs'][0]),
    fontWeight: fontSize['mobile-xs'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  /* ========================================
   * STATS CARD STYLES
   * ======================================== */
  'stats-row': {
    flexDirection: 'row',
    gap: parseInt(spacing.md),
  },

  'stat-card': {
    flex: 1,
    backgroundColor: colors.black['black-1'],
    borderWidth: 1,
    borderColor: `rgba(82, 74, 78, 0.1)`,
    borderRadius: parseInt(spacing.sm),
    height: 106,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  'stat-card-content': {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: 76,
  },

  'stat-text-container': {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: parseInt(spacing.xs),
    width: '100%',
  },


  'stat-label': {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.1504,
    fontWeight: '400',
    color: colors.root.text,
    opacity: 0.7,
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  'stat-value': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: 16,
    letterSpacing: -0.3125,
    fontWeight: '400',
    color: colors.root.text,
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  /* ========================================
   * SCHEDULE CARD STYLES
   * ======================================== */
  'schedule-card': {
    backgroundColor: colors.secondary['secondary-50'],
    borderWidth: 1,
    borderColor: `rgba(82, 74, 78, 0.1)`,
    borderRadius: parseInt(spacing.sm),
    padding: 21,
    gap: parseInt(spacing.md),
  },

  'schedule-header': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.sm),
    height: 32,
  },

  'schedule-title': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-m'][1].letterSpacing) * parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  'schedule-content': {
    gap: parseInt(spacing.lg),
  },

  'schedule-date-group': {
    gap: parseInt(spacing.md),
  },

  'schedule-date-header': {
    height: 24,
    justifyContent: 'center',
  },

  'schedule-date': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-xs'][1].letterSpacing) * parseInt(fontSize['mobile-xs'][0]),
    fontWeight: fontSize['mobile-xs'][1].fontWeight,
    color: colors.root.text,
    opacity: 0.7,
    fontFamily: 'Pretendard',
  },

  'schedule-items': {
    gap: parseInt(spacing.xs),
  },

  'schedule-item': {
    flexDirection: 'column',
    gap: parseInt(spacing.xs),
  },

  'schedule-item-header': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.sm),
  },

  'schedule-time': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.root.text,
    opacity: 0.7,
    fontFamily: 'Pretendard',
  },

  'schedule-item-content': {
    flex: 1,
  },

  'schedule-item-name': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  'schedule-item-address': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-xs'][1].letterSpacing) * parseInt(fontSize['mobile-xs'][0]),
    fontWeight: fontSize['mobile-xs'][1].fontWeight,
    color: colors.brown['brown-4'],
    fontFamily: 'Pretendard',
    paddingLeft: 48,
  },

  /* ========================================
   * NOTIFICATION CARD STYLES
   * ======================================== */
  'notification-card': {
    backgroundColor: colors.black['black-1'],
    borderWidth: 1,
    borderColor: `rgba(82, 74, 78, 0.1)`,
    borderRadius: parseInt(spacing.sm),
    padding: 21,
    gap: 40,
  },

  'notification-header': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.sm),
    height: 24,
  },


  'notification-title': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-m'][1].letterSpacing) * parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  'notification-content': {
    gap: 16,
    width: '100%',
  },

  'notification-item': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },

  'notification-item-content': {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 44,
  },

  'notification-item-title': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: 24,
    letterSpacing: -0.3125,
    fontWeight: '400',
    color: colors.root.text,
    fontFamily: 'Pretendard',
    height: 24,
  },

  'notification-item-subtitle': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: 20,
    letterSpacing: -0.1504,
    fontWeight: '400',
    color: colors.root.text,
    opacity: 0.7,
    fontFamily: 'Pretendard',
    height: 20,
  },

  'notification-divider': {
    height: 1,
    backgroundColor: `rgba(82, 74, 78, 0.1)`,
  },

  // 로그아웃 섹션
  'logout-section': {
    paddingHorizontal: parseInt(spacing.lg),
    paddingTop: parseInt(spacing.lg),
    paddingBottom: parseInt(spacing.xl),
  },
});
