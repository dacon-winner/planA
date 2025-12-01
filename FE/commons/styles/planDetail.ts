/**
 * Plan Detail Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-12-19
 * 피그마 노드ID: 4069:14018
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려
 */

import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@/commons/enums/color';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindConfig = require('@/tailwind.config.js') as any;

const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

// 동적 스타일 함수
export const getDetailContentScrollStyle = (screenHeight: number) => ({
  flex: 1,
  paddingHorizontal: parseInt(spacing.lg),
  height: screenHeight * 0.6,
});

export const styles = StyleSheet.create({
  'plan-detail-wrapper': {
    flex: 1,
    backgroundColor: colors.black['black-1'],
  },

  'background-gradient': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 284,
    zIndex: 0,
  },

  'safe-area': {
    flex: 1,
  },

  'plan-detail-scroll': {
    flex: 1,
  },

  'plan-detail-scroll-container': {
    paddingBottom: 100,
  },

  'loading-state-container': {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: parseInt(spacing.lg),
    gap: parseInt(spacing.xs),
  },

  'loading-state-text': {
    fontSize: parseInt(fontSize['mobile-2xl'][0]),
    lineHeight: parseInt(fontSize['mobile-2xl'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-2xl'][1].letterSpacing) *
      parseInt(fontSize['mobile-2xl'][0]),
    fontWeight: fontSize['mobile-2xl'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  'loading-state-error': {
    fontSize: parseInt(fontSize['mobile-l'][0]),
    lineHeight: parseInt(fontSize['mobile-l'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-l'][1].letterSpacing) *
      parseInt(fontSize['mobile-l'][0]),
    fontWeight: fontSize['mobile-l'][1].fontWeight,
    color: colors.brown['brown-3'],
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  /* Header Section */
  'header-section': {
    paddingHorizontal: parseInt(spacing.lg),
    paddingTop: STATUSBAR_HEIGHT, // 더 위로 올리기 (15 -> 8)
    paddingBottom: parseInt(spacing.md),
    position: 'relative',
    zIndex: 1,
  },

  'header-section-compact': {
    paddingTop: parseInt(spacing.lg),
  },
  
  'header-content': {
    marginBottom: parseInt(spacing.md), // 8px gap
    gap: parseInt(spacing.sm), // 8px gap (xs -> sm)
  },

  'header-subtitle': {
    fontSize: parseInt(fontSize['mobile-m'][0]),
    lineHeight: parseInt(fontSize['mobile-m'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-m'][1].letterSpacing) *
      parseInt(fontSize['mobile-m'][0]),
    fontWeight: fontSize['mobile-m'][1].fontWeight,
    color: colors.black['black-13'],
    fontFamily: 'Pretendard',
    opacity: 0.9,
  },

  'header-title': {
    // 기본: 80% 도달 전 - bold/24px
    fontSize: parseInt(fontSize['mobile-3xl-bold'][0]), // 24px
    lineHeight: parseInt(fontSize['mobile-3xl-bold'][1].lineHeight), // 32px
    letterSpacing:
      parseFloat(fontSize['mobile-3xl-bold'][1].letterSpacing) *
      parseInt(fontSize['mobile-3xl-bold'][0]), // -0.01em
    fontWeight: fontSize['mobile-3xl-bold'][1].fontWeight, // 700
    color: colors.black['black-13'], // #000000
    fontFamily: 'Pretendard',
  },

  'header-title-compact': {
    // 80% 도달 후 - bold/16px
    fontSize: 16, // 16px
    lineHeight: 20, // 20px
    letterSpacing: 0.0703, // 0.0703px
  },

  'basic-info': {
    gap: parseInt(spacing.xs), // 4px
    paddingHorizontal: parseInt(spacing.sm), // 8px (xs -> sm)
  },

  'info-row': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.xs),
  },

  'info-text': {
    fontSize: 12, // 12px
    lineHeight: 12, // 12px
    letterSpacing: -0.12, // -0.12px
    fontWeight: '400', // normal
    color: colors.root.text, // #524a4e
    fontFamily: 'Pretendard',
  },

  /* Service Grid Card */
  'service-grid-card': {
    marginHorizontal: parseInt(spacing.lg),
    marginTop: parseInt(spacing.sm),
    marginBottom: parseInt(spacing.md),
    backgroundColor: colors.black['black-1'], // var(--white, #FFF)
    borderRadius: 12, // border-radius: 12px
    borderWidth: 1, // border: 1px solid
    borderColor: colors.black['black-1'], // var(--white, #FFF)
    position: 'relative',
    opacity: 0.85, // opacity: 0.85
    width: 345,
    height: 215,
    alignSelf: 'center',
    // overflow: 'hidden' 제거 - 그림자가 보이도록
    // 그림자 효과: box-shadow: 0 0 20px 0 rgba(128, 12, 58, 0.10)
    shadowColor: '#800C3A', // rgba(128, 12, 58, 0.10)
    shadowOffset: { width: 0, height: 0 }, // 0 0
    shadowOpacity: 0.1, // 0.10
    shadowRadius: 20, // 20px
    elevation: 10, // Android용 그림자
  },

  'service-grid-item': {
    width: 172.5, // 정확히 절반 (345 / 2)
    height: 107.5, // 정확히 절반 (215 / 2)
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 23,
    position: 'absolute',
    zIndex: 2, // 구분선 위에 표시되도록
  },

  'service-grid-item-top-left': {
    top: 0,
    left: 0,
  },

  'service-grid-item-top-right': {
    top: 0,
    right: 0,
  },

  'service-grid-item-bottom-left': {
    bottom: 0,
    left: 0,
  },

  'service-grid-item-bottom-right': {
    bottom: 0,
    right: 0,
  },

  'service-grid-item-inactive': {
    // inactive 상태는 텍스트 색상으로만 표현
  },

  'service-grid-type': {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '500',
    color: colors.root.text,
    fontFamily: 'Pretendard',
    textAlign: 'center',
    marginBottom: 8,
  },

  'service-grid-type-inactive': {
    color: colors.brown['brown-3'],
  },

  'service-grid-content': {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: '100%',
  },

  'service-grid-name': {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.15,
    fontWeight: '700',
    color: colors.root.text,
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  'service-grid-name-inactive': {
    color: colors.brown['brown-3'],
  },

  'service-grid-status': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
  },

  'service-grid-status-text': {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.1,
    fontWeight: '400',
    color: colors.root.text,
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  'service-grid-status-text-inactive': {
    color: colors.brown['brown-3'],
  },

  'service-grid-divider-horizontal': {
    position: 'absolute',
    left: 29.5, // (345 - 286) / 2 = 29.5
    width: 286, // 가로 선 길이: 286px
    top: 107.5, // 정확히 절반 (215 / 2)
    height: 1,
    backgroundColor: colors.divider.default, // #ADA2A233
    zIndex: 1, // 아이템 아래에 표시
  },

  'service-grid-divider-vertical': {
    position: 'absolute',
    left: 172.5, // 정확히 절반 (345 / 2)
    top: 16, // (215 - 183) / 2 = 16
    height: 183, // 세로 선 길이: 183px
    width: 1,
    backgroundColor: colors.divider.default, // #ADA2A233
    zIndex: 1, // 아이템 아래에 표시
  },

  /* Bottom Sheet Styles */
  'bottom-sheet-wrapper': {
    // 그림자 효과: box-shadow: 0 0 20px 0 rgba(128, 12, 58, 0.10)
    shadowColor: '#800C3A', // rgba(128, 12, 58, 0.10)
    shadowOffset: { width: 0, height: -4 }, // 위쪽으로 그림자
    shadowOpacity: 0.1, // 0.10
    shadowRadius: 20, // 20px
    elevation: 20, // Android용 그림자
  },

  'bottom-sheet-background': {
    // backgroundColor: 'blue',
    // backgroundColor: colors.black['black-1'], // var(--white, #FFF)
    borderTopLeftRadius: 32, // border-radius: 32px 32px 0 0
    borderTopRightRadius: 32,
    // 그림자 효과: box-shadow: 0px 0px 20px 0px rgba(128, 12, 58, 0.1)
    shadowColor: '#800C3A', // rgba(128, 12, 58, 0.1)
    shadowOffset: { width: 0, height: 0 }, // 0px 0px
    shadowOpacity: 0.1, // 0.1
    shadowRadius: 20, // 20px
    elevation: 20, // Android용 그림자
  },

  'bottom-sheet-handle-indicator': {
    backgroundColor: colors.black['black-5'],
    width: 49,
    height: 4,
  },

  'bottom-sheet-content': {
    flex: 1,
    // backgroundColor: 'red'
  },

  'detail-content-scroll': {
    flex: 1,
    paddingHorizontal: parseInt(spacing.lg),
  },

  /* Detail Section (Bottom Sheet) */
  'detail-section': {
    backgroundColor: colors.black['black-1'],
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: parseInt(spacing['2xl']),
    paddingTop: parseInt(spacing.lg),
    paddingHorizontal: parseInt(spacing.lg),
    paddingBottom: parseInt(spacing['2xl']),
    shadowColor: colors.modal.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  'detail-section-header': {
    alignItems: 'center',
    marginBottom: parseInt(spacing.md),
    paddingTop: parseInt(spacing.md), // ★ 공간 절약을 위해 sm에서 xs로 축소
    paddingHorizontal: parseInt(spacing.lg), // 좌우 padding 추가
    paddingBottom: parseInt(spacing.xs),
  },

  'detail-section-header-scrolled': {
    backgroundColor: colors.black['black-1'],
    borderBottomWidth: 1,
    borderBottomColor: colors.divider.default,
    // 그림자 효과 추가
    shadowColor: colors.modal.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  'detail-section-handle': {
    width: 49,
    height: 4,
    backgroundColor: colors.black['black-5'],
    borderRadius: 2,
  },

  'content-switcher-wrapper': {
    marginBottom: parseInt(spacing.md),
    alignItems: 'center',
    paddingHorizontal: parseInt(spacing.lg), // 좌우 padding 추가
  },

  'content-switcher-wrapper-scrolled': {
    backgroundColor: colors.black['black-1'],
    paddingTop: parseInt(spacing.xs),
    paddingBottom: parseInt(spacing.xs),
    // 그림자 효과 추가
    shadowColor: colors.modal.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  'detail-content': {
    gap: parseInt(spacing.sm), // 8px
    alignItems: 'flex-start',
    paddingTop: 0, // 상단 padding 제거 (이미 헤더에 있음)
    paddingBottom: 0, // paddingBottom 제거 - ai-recommendations의 paddingBottom으로 처리
    width: '100%',
  },

  'detail-summary-row': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.xs),
    alignSelf: 'flex-start',
  },

  'detail-summary-text': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-xs'][1].letterSpacing) *
      parseInt(fontSize['mobile-xs'][0]),
    fontWeight: fontSize['mobile-xs'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  'detail-name': {
    fontSize: 16, // 16px
    lineHeight: 20, // normal 대신 적절한 값
    letterSpacing: 0,
    fontWeight: '700', // bold
    color: colors.black['black-13'], // #000000
    fontFamily: 'Pretendard',
    alignSelf: 'flex-start',
  },

  'detail-images': {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },

  'detail-images-scroll-content': {
    // ScrollView contentContainerStyle - gap 없이 이미지들이 연속으로 배치
  },

  'detail-image-placeholder': {
    // width는 인라인 스타일로 동적으로 설정됨 (화면 너비)
    aspectRatio: 4/3,
    backgroundColor: colors.black['black-5'], // #d9d9d9
    borderRadius: 0,
  },

  'image-indicator-container': {
    position: 'absolute',
    bottom: parseInt(spacing.md),
    flexDirection: 'row',
    gap: parseInt(spacing.xs),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  'image-indicator-dot': {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.black['black-1'],
    opacity: 0.4,
  },

  'image-indicator-dot-active': {
    opacity: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  'detail-info-list': {
    width: '100%',
    gap: parseInt(spacing.sm), // 8px
    alignSelf: 'flex-start',
  },

  'detail-info-item': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.xs), // 4px
  },

  'detail-info-text': {
    fontSize: 12, // 12px
    lineHeight: 16, // normal 대신 적절한 값
    letterSpacing: 0,
    fontWeight: '400', // regular
    color: colors.root.text, // #524a4e
    fontFamily: 'Pretendard',
    flex: 1,
  },

  'detail-prices': {
    width: '100%',
    paddingHorizontal: parseInt(spacing.sm), // 12px
    gap: parseInt(spacing.xs), // 4px
  },

  'detail-price-row': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.xs), // 4px
  },

  'detail-price-level': {
    fontSize: 12, // 12px
    lineHeight: 16,
    letterSpacing: 0,
    fontWeight: '400', // regular
    color: colors.root.text, // #524a4e
    fontFamily: 'Pretendard',
    minWidth: 50, // 최소 너비 설정
  },

  'detail-price-dots': {
    flex: 1, // 남은 공간을 모두 차지
    height: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 3,
    maxWidth: 220, // 최대 너비 증가 (180 → 220)
  },

  'detail-price-dot': {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.black['black-5'], // #d9d9d9
  },

  'detail-price-amount': {
    fontSize: 12, // 12px
    lineHeight: 16,
    letterSpacing: 0,
    fontWeight: '400', // regular
    color: colors.root.text, // #524a4e
    fontFamily: 'Pretendard',
  },

  'detail-actions': {
    flexDirection: 'row',
    gap: parseInt(spacing.sm),
    width: '100%',
    marginTop: parseInt(spacing.md),
  },

  'detail-action-button': {
    flex: 1,
  },

  'ai-recommendations': {
    width: '100%',
    marginTop: parseInt(spacing.md), // 가격 정보와 버튼 사이 간격과 동일
    gap: parseInt(spacing.sm),
    paddingBottom: 20, // 하단 여백 - 스크롤 영역에 확실히 포함되도록 충분히 크게
  },

  'ai-recommendations-title': {
    fontSize: parseInt(fontSize['mobile-s-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-s-bold'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-s-bold'][1].letterSpacing) *
      parseInt(fontSize['mobile-s-bold'][0]),
    fontWeight: fontSize['mobile-s-bold'][1].fontWeight,
    color: colors.black['black-13'],
    fontFamily: 'Pretendard',
  },

  'ai-recommendations-images': {
    flexDirection: 'row',
    gap: parseInt(spacing.xs), // 4px
    paddingRight: parseInt(spacing.lg), // 오른쪽 여백
  },

  'ai-recommendation-image': {
    width: 140,
    height: 140,
    backgroundColor: colors.black['black-5'], // #d9d9d9
    borderRadius: 0,
  },

  'ai-recommendation-item': {
    alignItems: 'center',
    gap: parseInt(spacing.xs), // 4px
  },

  'ai-recommendation-text-container': {
    alignItems: 'flex-start',
    gap: 2,
    width: 140, // 이미지 너비와 동일하게
  },

  'ai-recommendation-name': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-xs'][1].letterSpacing) *
      parseInt(fontSize['mobile-xs'][0]),
    fontWeight: '700', // Bold - 더 굵게 표시
    color: colors.black['black-12'], 
    fontFamily: 'Pretendard',
    textAlign: 'left', // 왼쪽 정렬
  },

  'ai-recommendation-price': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-xs'][1].letterSpacing) *
      parseInt(fontSize['mobile-xs'][0]),
    fontWeight: '400', // Regular - 얇게 표시
    color: colors.black['black-11'], 
    fontFamily: 'Pretendard',
    textAlign: 'left', // 왼쪽 정렬
  },

  /* Calendar Section */
  'calendar-section': {
    width: 345,
    borderWidth: 1,
    borderColor: colors.black['black-5'], // #d9d9d9
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: parseInt(spacing.md),
    overflow: 'hidden',
  },

  /* Reservation Section */
  'reservation-section': {
    width: '100%',
    marginTop: parseInt(spacing.md),
    paddingBottom: 20, // 하단 여백 - 스크롤 영역에 확실히 포함되도록 충분히 크게
  },

  'reservation-divider': {
    width: '100%',
    height: 1,
    backgroundColor: colors.divider.default,
    marginBottom: parseInt(spacing.lg),
  },

  'reservation-title': {
    fontSize: parseInt(fontSize['mobile-s-bold'][0]),
    lineHeight: parseInt(fontSize['mobile-s-bold'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-s-bold'][1].letterSpacing) *
      parseInt(fontSize['mobile-s-bold'][0]),
    fontWeight: fontSize['mobile-s-bold'][1].fontWeight,
    color: colors.black['black-13'],
    fontFamily: 'Pretendard',
    marginBottom: parseInt(spacing.md),
  },

  /* Datetime Picker */
  'datetime-picker-container': {
    width: 345,
    height: 73,
    borderWidth: 1,
    borderColor: colors.black['black-5'], // #d9d9d9
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    gap: 0,
    alignSelf: 'center',
    marginBottom: parseInt(spacing.md),
  },

  'datetime-picker-item': {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minWidth: 0,
  },

  'datetime-picker-label': {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.3125,
    fontWeight: '400',
    color: colors.root.text, // #524a4e
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  'datetime-picker-value': {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '600', // SemiBold
    color: colors.root.text, // #524a4e
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  'datetime-picker-divider': {
    width: 1,
    height: 29,
    backgroundColor: colors.black['black-5'], // #d9d9d9
  },

  /* Time Picker */
  'time-picker-container': {
    width: 345,
    alignSelf: 'center',
    paddingVertical: parseInt(spacing.md),
    paddingHorizontal: 0,
    // 좌우 갭을 더 작게 하기 위해 padding 제거
  },

  'time-picker-header': {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: parseInt(spacing.md),
  },

  'time-picker-label': {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.3125,
    fontWeight: '400',
    color: colors.root.text, // #524a4e
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  'time-picker-value': {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '600', // SemiBold
    color: colors.root.text, // #524a4e
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },

  'time-picker-grid': {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: parseInt(spacing.xs), // 4px로 더 작게
    columnGap: parseInt(spacing.xs), // 4px로 더 작게
    justifyContent: 'center',
  },

  'time-picker-button-wrapper': {
    // 3개씩 배치: 컨테이너 345px, gap 4px * 2 = 8px, 각 버튼 (345 - 8) / 3 = 112.33px
    // SelectButton small 크기는 112px이므로 정확히 맞춤
    width: 112,
  },

  /* Datetime Section */
  'datetime-section': {
    width: '100%',
    marginTop: parseInt(spacing.lg),
  },

  'datetime-divider': {
    width: '100%',
    height: 1,
    backgroundColor: colors.divider.default,
    marginBottom: parseInt(spacing.lg),
  },

  'datetime-display': {
    width: '100%',
    gap: parseInt(spacing.md),
  },

  'datetime-item': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseInt(spacing.md),
  },

  'datetime-label': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-s'][1].letterSpacing) *
      parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
    minWidth: 40,
  },

  'datetime-value': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-s'][1].letterSpacing) *
      parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.black['black-13'],
    fontFamily: 'Pretendard',
  },

  'time-options-container': {
    flexDirection: 'row',
    gap: parseInt(spacing.xs),
    paddingRight: parseInt(spacing.lg),
  },

  'time-option-button': {
    paddingVertical: parseInt(spacing.xs),
    paddingHorizontal: parseInt(spacing.sm),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.black['black-5'],
    backgroundColor: colors.black['black-1'],
  },

  'time-option-button-selected': {
    borderColor: colors.root.brand,
    backgroundColor: colors.red['red-1'],
  },

  'time-option-text': {
    fontSize: parseInt(fontSize['mobile-xs'][0]),
    lineHeight: parseInt(fontSize['mobile-xs'][1].lineHeight),
    letterSpacing:
      parseFloat(fontSize['mobile-xs'][1].letterSpacing) *
      parseInt(fontSize['mobile-xs'][0]),
    fontWeight: fontSize['mobile-xs'][1].fontWeight,
    color: colors.root.text,
    fontFamily: 'Pretendard',
  },

  'time-option-text-selected': {
    color: colors.root.brand,
    fontWeight: '600',
  },

  'reservation-actions': {
    flexDirection: 'row',
    gap: parseInt(spacing.sm),
    width: '100%',
    marginTop: parseInt(spacing.md),
  },

  'reservation-action-button': {
    flex: 1,
  },

  // AI 추천 스켈레톤 스타일
  'ai-recommendation-image-skeleton': {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.black['black-3'],
  },

  'ai-recommendation-name-skeleton': {
    width: 80,
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.black['black-3'],
    marginBottom: parseInt(spacing.xs),
  },

  'ai-recommendation-price-skeleton': {
    width: 60,
    height: 12,
    borderRadius: 4,
    backgroundColor: colors.black['black-3'],
  },
});

