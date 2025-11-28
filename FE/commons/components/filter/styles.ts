import { StyleSheet } from 'react-native';

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
    backgroundColor: '#655D61',
  },
  inactiveButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DC',
  },
  activeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'PretendardVariable',
  },
  inactiveText: {
    color: '#524A4E',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'PretendardVariable',
  },
});
