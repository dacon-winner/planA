import { StyleSheet } from 'react-native';
import { colors } from '@/commons/enums/color';

export const toastMessageStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.root.brand,
    borderRadius: 4,
    width: 345,
    height: 30,
    // Flex 설정
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // 핵심: 아이콘과 텍스트 사이 간격 8px
    gap: 8,
  },
  text: {
    fontSize: 12.167227745056152,
    fontWeight: '700',
    lineHeight: 17.38175392150879,
    letterSpacing: -0.1307026445865631,
    color: colors.black['black-1'],
    textAlign: 'center',
    fontFamily: 'PretendardVariable',
    // 폰트가 잘리는 현상 방지용 (선택사항)
    includeFontPadding: false,
  },
});
