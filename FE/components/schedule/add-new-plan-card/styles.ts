/**
 * AddNewPlanCard Styles
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

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindConfig = require('@/tailwind.config.js') as any;
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;
const borderRadius = tailwindConfig.theme.extend.borderRadius;

export const styles = StyleSheet.create({
  'add-new-plan-card-container': {
    backgroundColor: colors.black['black-1'],
    borderWidth: 1,
    borderColor: colors.brown['brown-3'],
    borderStyle: 'dashed',
    borderRadius: parseInt(borderRadius.md),
    marginBottom: parseInt(spacing.md),
  },

  'add-new-plan-card-content': {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: parseInt(spacing.sm),
    padding: parseInt(spacing.md),
  },

  'add-new-plan-card-text': {
    fontSize: parseInt(fontSize['mobile-s-medium'][0]),
    lineHeight: parseInt(fontSize['mobile-s-medium'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-s-medium'][1].letterSpacing) *
      parseInt(fontSize['mobile-s-medium'][0]),
    fontWeight: fontSize['mobile-s-medium'][1].fontWeight,
    color: colors.brown['brown-3'],
    textAlign: 'center',
    fontFamily: 'Pretendard',
  },
});

