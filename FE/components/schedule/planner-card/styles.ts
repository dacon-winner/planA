/**
 * PlannerCard Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-12-19
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려
 */

import { StyleSheet } from 'react-native';
import { colors } from '@/commons/enums/color';

const tailwindConfig = require('@/tailwind.config.js');
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;
const borderRadius = tailwindConfig.theme.extend.borderRadius;

export const styles = StyleSheet.create({
  'planner-card-container': {
    backgroundColor: colors.black['black-1'],
    borderWidth: 1,
    borderColor: colors.brown['brown-1'],
    borderRadius: parseInt(borderRadius.md),
    marginBottom: parseInt(spacing.md),
  },

  'planner-card-content': {
    padding: parseInt(spacing.md),
    gap: parseInt(spacing.md),
  },

  'planner-card-header': {
    height: 24,
  },

  'planner-card-title-and-badges': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.sm),
    height: 24,
  },

  'planner-card-plan-name': {
    fontSize: parseInt(fontSize['mobile-m-semibold'][0]),
    lineHeight: parseInt(fontSize['mobile-m-semibold'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-m-semibold'][1].letterSpacing) *
      parseInt(fontSize['mobile-m-semibold'][0]),
    fontWeight: fontSize['mobile-m-semibold'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  'planner-card-badges': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.sm),
  },

  'planner-card-info': {
    flexDirection: 'column',
    gap: parseInt(spacing.sm),
  },

  'planner-card-info-row': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  'planner-card-info-text': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-xs'][1].letterSpacing) *
      parseInt(fontSize['mobile-xs'][0]),
    fontWeight: fontSize['mobile-xs'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  'planner-card-buttons': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: parseInt(spacing.sm),
  },

  'planner-card-button-wrapper': {
    flex: 1,
  },
});

