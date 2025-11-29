/**
 * Badge Component
 * 아이콘과 텍스트를 포함한 뱃지 컴포넌트
 */

import React from "react";
import { View, Text } from "react-native";
import { Sparkles, ChessQueen } from "lucide-react-native";
import { styles } from "./styles";

/**
 * Badge 컴포넌트 variant 타입
 */
export type BadgeVariant = "summary" | "ai" | "plan";

/**
 * Badge 컴포넌트 Props
 */
export interface BadgeProps {
  /** 뱃지 스타일 변형 */
  variant: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ variant }) => {
  const getBadgeConfig = () => {
    switch (variant) {
      case 'summary':
        return {
          text: '요약',
          Icon: Sparkles,
          containerStyle: styles.badgeSummaryContainer,
          textStyle: styles.badgeSummaryText,
          iconStyle: styles.badgeSummaryIcon,
        };
      case 'ai':
        return {
          text: 'AI',
          Icon: Sparkles,
          containerStyle: styles.badgeAiContainer,
          textStyle: styles.badgeAiText,
          iconStyle: styles.badgeAiIcon,
        };
      case 'plan':
        return {
          text: '대표 플랜',
          Icon: ChessQueen,
          containerStyle: styles.badgePlanContainer,
          textStyle: styles.badgePlanText,
          iconStyle: styles.badgePlanIcon,
        };
    }
  };

  const config = getBadgeConfig();
  const { text, Icon, containerStyle, textStyle, iconStyle } = config;

  return (
    <View style={containerStyle}>
      <Icon size={12} style={iconStyle} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

export type BadgePolicyVariant = 'loan' | 'always' | 'period' | 'subsidy';

export interface BadgePolicyProps {
  variant: BadgePolicyVariant;
}

const BadgePolicy: React.FC<BadgePolicyProps> = ({ variant }) => {
  const getBadgePolicyConfig = () => {
    switch (variant) {
      case 'loan':
        return {
          text: '대출',
          containerStyle: styles.badgePolicyLoanContainer,
          textStyle: styles.badgePolicyLoanText,
        };
      case 'always':
        return {
          text: '상시',
          containerStyle: styles.badgePolicyAlwaysContainer,
          textStyle: styles.badgePolicyAlwaysText,
        };
      case 'period':
        return {
          text: '기간제',
          containerStyle: styles.badgePolicyPeriodContainer,
          textStyle: styles.badgePolicyPeriodText,
        };
      case 'subsidy':
        return {
          text: '보조금',
          containerStyle: styles.badgePolicySubsidyContainer,
          textStyle: styles.badgePolicySubsidyText,
        };
    }
  };

  const config = getBadgePolicyConfig();
  const { text, containerStyle, textStyle } = config;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

export { Badge, BadgePolicy };
