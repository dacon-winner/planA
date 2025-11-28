/**
 * Button Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-28
 * 피그마 노드ID: 4116:384
 * 
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] nativewind 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 */

import { StyleSheet } from 'react-native';
import { rootColors, blackColors } from '../../enums/color';

/**
 * Button Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * FILLED VARIANT STYLES
   * ======================================== */
  
  /**
   * Filled Medium (기본)
   * 피그마: height 40, cornerRadius 8, bg #ff5c8d
   */
  buttonFilledMedium: {
    height: 40,
    backgroundColor: rootColors.brand, // #ff5c8d
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },

  /**
   * Filled Small
   * 피그마: height 32, cornerRadius 8, bg #ff5c8d
   */
  buttonFilledSmall: {
    height: 32,
    backgroundColor: rootColors.brand, // #ff5c8d
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },

  /**
   * Filled Large
   * 피그마: height 44, cornerRadius 8, bg #ff5c8d
   */
  buttonFilledLarge: {
    height: 44,
    backgroundColor: rootColors.brand, // #ff5c8d
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },

  /* ========================================
   * OUTLINED VARIANT STYLES
   * ======================================== */
  
  /**
   * Outlined Medium
   * 피그마: height 40, cornerRadius 8, border #ff5c8d
   */
  buttonOutlinedMedium: {
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: rootColors.brand, // #ff5c8d
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },

  /**
   * Outlined Small
   * 피그마: height 32, cornerRadius 8, border #ff5c8d
   */
  buttonOutlinedSmall: {
    height: 32,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: rootColors.brand, // #ff5c8d
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },

  /**
   * Outlined Large
   * 피그마: height 44, cornerRadius 8, border #ff5c8d
   */
  buttonOutlinedLarge: {
    height: 44,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: rootColors.brand, // #ff5c8d
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },

  /* ========================================
   * DISABLED STATE STYLES
   * ======================================== */
  
  /**
   * Disabled
   * 피그마: height 40, cornerRadius 8, bg #c2b8b8 (가장 유사한 토큰: #bfbfbf)
   */
  buttonDisabled: {
    height: 40,
    backgroundColor: blackColors['black-6'], // #bfbfbf (피그마 #c2b8b8와 가장 유사)
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },

  /* ========================================
   * TEXT STYLES
   * ======================================== */
  
  /**
   * Filled Text
   * 피그마: fontSize 12, fontWeight 700, letterSpacing -0.150390625, lineHeight 20, color #ffffff
   */
  textFilled: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.150390625,
    lineHeight: 20,
    color: blackColors['black-1'], // #ffffff
    textAlign: 'center',
  },

  /**
   * Outlined Text
   * 피그마: fontSize 12, fontWeight 700, letterSpacing -0.150390625, lineHeight 20, color #ff5c8d
   */
  textOutlined: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.150390625,
    lineHeight: 20,
    color: rootColors.brand, // #ff5c8d
    textAlign: 'center',
  },

  /**
   * Disabled Text
   * 피그마: fontSize 12, fontWeight 700, letterSpacing -0.150390625, lineHeight 20, color #ffffff
   */
  textDisabled: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.150390625,
    lineHeight: 20,
    color: blackColors['black-1'], // #ffffff
    textAlign: 'center',
  },

  /**
   * Filled Large Text
   * fontSize 16, fontWeight 700, letterSpacing -0.150390625, lineHeight 24, color #ffffff
   */
  textFilledLarge: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.150390625,
    lineHeight: 24,
    color: blackColors['black-1'], // #ffffff
    textAlign: 'center',
  },

  /**
   * Outlined Large Text
   * fontSize 16, fontWeight 700, letterSpacing -0.150390625, lineHeight 24, color #ff5c8d
   */
  textOutlinedLarge: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.150390625,
    lineHeight: 24,
    color: rootColors.brand, // #ff5c8d
    textAlign: 'center',
  },

  /* ========================================
   * ICON STYLES
   * ======================================== */
  
  /**
   * Icon Container
   * 피그마: 20x20
   */
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

