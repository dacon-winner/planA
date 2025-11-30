/**
 * WeddingFormLoading Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4343:434
 *
 * 체크리스트:
 * [✓] form.tsx와 동일한 배경 구조 적용
 * [✓] 피그마 텍스트 프레임 구현
 * [✓] 인라인 스타일 0건
 */

import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "./styles";

/**
 * WeddingFormLoading Props
 */
export interface WeddingFormLoadingProps {
  /** 추가 Props가 필요한 경우 여기에 정의 */
}

/**
 * WeddingFormLoading Component
 * 웨딩 폼 제출 후 로딩 화면
 */
export const WeddingFormLoading: React.FC<WeddingFormLoadingProps> = () => {
  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <Image
        source={require("@/assets/loading-background.png")}
        style={styles.gradientBackground}
      />

      {/* Loading Text Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.loadingText}>
          AI가{"\n"}예비신부님을 위한{"\n"}맞춤 정보를 찾고 있어요
        </Text>
      </View>
    </View>
  );
};

export default WeddingFormLoading;
