import { StyleSheet } from 'react-native';
import { secondaryColors, blackColors, brownColors } from '../../enums/color';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: secondaryColors['secondary-800'],
    borderWidth: 1,
    borderColor: secondaryColors['secondary-800'],
  },
  inactiveButton: {
    backgroundColor: blackColors['black-1'],
    borderWidth: 1,
    borderColor: blackColors['black-5'],
  },
  activeText: {
    color: blackColors['black-1'],
    fontSize: 14, // mobile-s
    fontWeight: '500', // medium
    lineHeight: 20, // mobile-s lineHeight
    fontFamily: 'PretendardVariable',
  },
  inactiveText: {
    color: brownColors['brown-6'],
    fontSize: 14, // mobile-s
    fontWeight: '500', // medium
    lineHeight: 20, // mobile-s lineHeight
    fontFamily: 'PretendardVariable',
  },
});
