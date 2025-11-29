import { StyleSheet } from 'react-native';
import { colors } from '../../enums/color';

export const styles = StyleSheet.create({
  // Badge 컴포넌트 스타일
  badgeSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: colors.red['red-1'],
    borderRadius: 10,
    gap: 4,
    overflow: 'hidden',
  },
  badgeSummaryText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.root.brand,
  },
  badgeSummaryIcon: {
    width: 12,
    height: 12,
    color: colors.root.brand,
  },

  badgeAiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: colors.root.brand,
    borderRadius: 10,
    gap: 4,
    overflow: 'hidden',
  },
  badgeAiText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.black['black-1'],
  },
  badgeAiIcon: {
    width: 12,
    height: 12,
    color: colors.black['black-1'],
  },

  badgePlanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: colors.secondary['secondary-600'],
    borderRadius: 10,
    gap: 4,
    overflow: 'hidden',
  },
  badgePlanText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.black['black-1'],
  },
  badgePlanIcon: {
    width: 12,
    height: 12,
    color: colors.black['black-1'],
  },

  // BadgePolicy 컴포넌트 스타일
  badgePolicyLoanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: colors.secondary['secondary-100'],
    borderRadius: 10,
    overflow: 'hidden',
  },
  badgePolicyLoanText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.root.brand,
  },

  badgePolicyAlwaysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.root.brand,
    overflow: 'hidden',
  },
  badgePolicyAlwaysText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.root.brand,
  },

  badgePolicyPeriodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.root.brand,
    overflow: 'hidden',
  },
  badgePolicyPeriodText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.root.brand,
  },

  badgePolicySubsidyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: colors.root.brand,
    borderRadius: 10,
    overflow: 'hidden',
  },
  badgePolicySubsidyText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.black['black-1'],
  },
});
