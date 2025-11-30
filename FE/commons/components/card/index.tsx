/**
 * Card Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4174:1462
 *
 * 체크리스트:
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] 색상 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 공통 컴포넌트 활용 (BadgePolicy, Button)
 */

import React from "react";
import { View, Text, Pressable } from "react-native";
import { CircleCheck } from "lucide-react-native";
import { BadgePolicy } from "../badge";
import { Button } from "../button";
import { styles } from "./styles";
import { colors } from "../../enums/color";

/**
 * Card Props 타입 정의
 */
export interface CardProps {
  /** 정책 카테고리 (대출/상시/기간제/보조금) */
  categories: Array<"loan" | "always" | "period" | "subsidy">;
  /** 정책 제목 */
  title: string;
  /** 정책 간단 설명 */
  description: string;
  /** 혜택 정보 */
  benefits: {
    /** 혜택 텍스트 */
    text: string;
    /** 혜택 금액 */
    amount: string;
  };
  /** 상세 정보 목록 */
  details: Array<{
    /** 아이콘 (이모지) */
    icon: string;
    /** 상세 텍스트 */
    text: string;
  }>;
  /** 전체 상세 설명 */
  fullDescription: string;
  /** 신청하기 버튼 클릭 핸들러 */
  onApply?: () => void;
  /** 카드 클릭 핸들러 (optional) */
  onPress?: () => void;
}

/**
 * Card 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 정책 카드 컴포넌트
 */
export const Card: React.FC<CardProps> = ({
  categories,
  title,
  description,
  benefits,
  details,
  fullDescription,
  onApply,
  onPress,
}) => {
  const CardContainer = onPress ? Pressable : View;

  return (
    <CardContainer
      style={styles.cardContainer}
      onPress={onPress}
      accessible={true}
      accessibilityRole={onPress ? "button" : "none"}
    >
      {/* 뱃지 섹션 */}
      <View style={styles.badgeContainer}>
        {categories.map((category, index) => (
          <BadgePolicy key={index} variant={category} />
        ))}
      </View>

      {/* 제목 */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* 설명 */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      {/* 지원 혜택 박스 */}
      <View style={styles.benefitsBox}>
        {/* 지원 혜택 헤더 */}
        <View style={styles.benefitsHeader}>
          <CircleCheck size={16} color={colors.root.brand} />
          <Text style={styles.benefitsHeaderText}>지원 혜택</Text>
        </View>

        {/* 혜택 상세 텍스트 */}
        <View style={styles.benefitsTextContainer}>
          <Text style={styles.benefitsText}>{benefits.text}</Text>
        </View>

        {/* 혜택 금액 */}
        <View style={styles.benefitsAmountContainer}>
          <Text style={styles.benefitsAmountText}>{benefits.amount}</Text>
        </View>
      </View>

      {/* 상세 정보 */}
      <View style={styles.detailsContainer}>
        {details.map((detail, index) => (
          <View key={index} style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Text style={styles.detailIcon}>{detail.icon}</Text>
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailText}>{detail.text}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 구분선 + 전체 설명 */}
      <View style={styles.fullDescriptionContainer}>
        <View style={styles.fullDescriptionTextContainer}>
          <Text style={styles.fullDescriptionText}>{fullDescription}</Text>
        </View>
      </View>

      {/* 신청하기 버튼 */}
      <View style={styles.buttonContainer}>
        <Button variant="filled" size="medium" onPress={onApply}>
          신청하기
        </Button>
      </View>
    </CardContainer>
  );
};

export default Card;
