/**
 * PolicyCard Component
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 피그마 노드ID: 4174:1721
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import React from "react";
import { View, Text, Pressable, Linking } from "react-native";
import { CircleCheck } from "lucide-react-native";
import { Button } from "../button";
import { styles } from "./PolicyCard.styles";
import { colors } from "../../enums/color";
import type { PolicyInfo } from "@/commons/hooks/usePolicies";

/**
 * PolicyCard Props 타입 정의
 */
export interface PolicyCardProps {
  /** 정책 정보 */
  policy: PolicyInfo;
  /** 카드 클릭 핸들러 (optional) */
  onPress?: () => void;
}

/**
 * PolicyCard 컴포넌트
 * API 응답 구조를 기반으로 한 정책 카드 컴포넌트
 */
export const PolicyCard: React.FC<PolicyCardProps> = ({ policy, onPress }) => {
  const CardContainer = onPress ? Pressable : View;

  // 신청하기 버튼 핸들러
  const handleApply = async () => {
    try {
      const canOpen = await Linking.canOpenURL(policy.apply_url);
      if (canOpen) {
        await Linking.openURL(policy.apply_url);
      } else {
        console.warn("⚠️ [PolicyCard] URL을 열 수 없습니다:", policy.apply_url);
      }
    } catch (error) {
      console.error("❌ [PolicyCard] URL 열기 실패:", error);
    }
  };

  // benefit_summary를 쉼표 기준으로 분리하여 배열로 반환
  // 예: "최저 연 2.15% ~ 3.25% 금리 적용, 최대 4억원 한도"
  // → ["최저 연 2.15% ~ 3.25% 금리 적용", "최대 4억원 한도"]
  const parseBenefitSummary = (summary: string) => {
    return summary
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const benefitItems = parseBenefitSummary(policy.benefit_summary);

  return (
    <CardContainer
      style={styles.cardContainer}
      onPress={onPress}
      accessible={true}
      accessibilityRole={onPress ? "button" : "none"}
    >
      {/* 뱃지 섹션 */}
      <View style={styles.badgeContainer}>
        {policy.badges.map((badge, index) => (
          <View
            key={index}
            style={index === 0 ? styles.badgeFilled : styles.badgeOutline}
          >
            <Text
              style={
                index === 0 ? styles.badgeFilledText : styles.badgeOutlineText
              }
            >
              {badge}
            </Text>
          </View>
        ))}
      </View>

      {/* 제목 */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {policy.title}
        </Text>
      </View>

      {/* 부제목/설명 */}
      <View style={styles.subtitleContainer}>
        <Text
          style={styles.subtitleText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {policy.subtitle}
        </Text>
      </View>

      {/* 지원 혜택 박스 */}
      <View style={styles.benefitsBox}>
        {/* 지원 혜택 헤더 */}
        <View style={styles.benefitsHeader}>
          <CircleCheck size={16} color={colors.root.brand} />
          <Text style={styles.benefitsHeaderText}>지원 혜택</Text>
        </View>

        {/* 혜택 항목들 (쉼표 기준 줄바꿈, 최대 3개 표시) */}
        {benefitItems.slice(0, 3).map((item, index) => {
          // "최대 N만원" 또는 "최대 N억원" 패턴이 있으면 강조 색상 사용
          const isAmountItem = /최대\s*[\d,]+[만억]원/.test(item);

          return (
            <View key={index} style={styles.benefitsItemContainer}>
              <Text
                style={
                  isAmountItem ? styles.benefitsAmountText : styles.benefitsText
                }
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item}
              </Text>
            </View>
          );
        })}
      </View>

      {/* 정책 타입 정보 */}
      <View style={styles.typeInfoContainer}>
        <View style={styles.typeInfoRow}>
          <View style={styles.typeInfoIconContainer}>
            <Text style={styles.typeInfoIcon}>📋</Text>
          </View>
          <View style={styles.typeInfoTextContainer}>
            <Text style={styles.typeInfoText}>
              {policy.type === "LOAN"
                ? "대출"
                : policy.type === "SUBSIDY"
                ? "보조금"
                : policy.type === "GRANT"
                ? "지원금"
                : "세제 혜택"}
            </Text>
          </View>
        </View>
      </View>

      {/* 신청하기 버튼 */}
      <View style={styles.buttonContainer}>
        <Button variant="filled" size="medium" onPress={handleApply}>
          신청하기
        </Button>
      </View>
    </CardContainer>
  );
};

export default PolicyCard;
