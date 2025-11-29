import { StyleSheet } from 'react-native';
import { colors } from '@/commons/enums/color';
import { typography } from '@/commons/enums/typography';

export const toastMessageStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.root.brand,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: colors.black['black-1'], // #ffffff
    textAlign: 'center',
  },
});
