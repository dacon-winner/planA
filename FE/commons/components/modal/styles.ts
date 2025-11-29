import { StyleSheet } from 'react-native';
import { colors } from '@/commons/enums/color';

const tailwindConfig = require("@/tailwind.config.js");
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

/**
 * Modal 스타일 정의
 * 피그마 디자인 시스템을 기반으로 한 모달 스타일
 */
export const styles = StyleSheet.create({
  // 컨테이너 스타일
  container: {
    backgroundColor: colors.black['black-1'], // #ffffff
    opacity: 1, // 완전히 불투명하게 설정
    borderRadius: 16,
    paddingVertical: 21,
    paddingHorizontal: 30,
    width: 345,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  // 제목 스타일
  title: {
    fontFamily: 'Pretendard Variable',
    fontWeight: '600' as const,
    fontSize: 15.64357852935791,
    lineHeight: 15.64357852935791,
    letterSpacing: -0.38192328810691833,
    color: colors.blue['blue-6'], // #1f2937
    textAlign: 'center' as const,
    marginBottom: 8,
  },

  // 설명 컨테이너 스타일
  descriptionContainer: {
    marginBottom: 16,
  },

  // 설명 스타일
  description: {
    fontFamily: 'Pretendard Variable',
    fontWeight: '400' as const,
    fontSize: 12.167227745056152,
    lineHeight: 17.38175392150879,
    letterSpacing: -0.1307026445865631,
    color: colors.blue['blue-5'], // #6b7280
    textAlign: 'center' as const,
    marginBottom: 4, // 줄 간격
  },

  // 컨텐츠 영역 스타일
  content: {
    marginBottom: 20,
  },

  // 버튼 영역 컨테이너
  buttonContainer: {
    flexDirection: 'row' as const,
    gap: 5,
  },

  // 왼쪽 버튼 (취소/닫기)
  leftButton: {
    flex: 1,
  },

  // 오른쪽 버튼 (확인/저장)
  rightButton: {
    flex: 1,
  },

  // 버튼 사이 간격 조정 (2개 버튼일 때)
  buttonGap: {
    width: 8,
  },

  /* Error Modal Styles */
  'error-modal-content': {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: parseInt(spacing.md),
    paddingHorizontal: parseInt(spacing.md),
  },

  'error-icon': {
    marginBottom: parseInt(spacing.md),
  },

  'error-description-container': {
    alignItems: 'center',
    width: '100%',
  },

  'error-description': {
    fontSize: parseInt(fontSize['mobile-s'][0]),
    lineHeight: parseInt(fontSize['mobile-s'][1].lineHeight),
    letterSpacing: parseFloat(fontSize['mobile-s'][1].letterSpacing) * parseInt(fontSize['mobile-s'][0]),
    fontWeight: fontSize['mobile-s'][1].fontWeight,
    color: colors.secondary['secondary-900'],
    fontFamily: 'PretendardVariable',
    textAlign: 'center',
    paddingHorizontal: parseInt(spacing.md),
    marginBottom: 2,
    width: '100%',
  },

  /* Plan Info Styles */
  'plan-info-section': {
    marginTop: 14,
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
    color: colors.secondary['secondary-600'],
    fontFamily: 'PretendardVariable',
  },
});
