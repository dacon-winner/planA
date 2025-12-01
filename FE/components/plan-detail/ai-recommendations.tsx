import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { styles } from "@/commons/styles/planDetail";

interface Recommendation {
  vendor_id: string;
  name: string;
  reason?: string;
  price?: string;
}

interface AiRecommendationsProps {
  isLoading: boolean;
  recommendations: Recommendation[];
  currentServiceName: string;
  displayCount: number;
  onRecommendationPress: (recommendation: {
    vendor_id: string;
    name: string;
    price: string;
  }) => void;
}

export const AiRecommendations: React.FC<AiRecommendationsProps> = ({
  isLoading,
  recommendations,
  currentServiceName,
  displayCount,
  onRecommendationPress,
}) => {
  const filteredRecommendations = recommendations
    ?.filter((rec) => rec.name !== currentServiceName)
    ?.slice(0, displayCount);

  return (
    <View style={styles["ai-recommendations"]}>
      <Text style={styles["ai-recommendations-title"]}>
        AI가 추천하는 다른 업체
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles["ai-recommendations-images"]}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <View
                key={`skeleton-${index}`}
                style={styles["ai-recommendation-item"]}
              >
                <View style={styles["ai-recommendation-image-skeleton"]} />
                <View style={styles["ai-recommendation-text-container"]}>
                  <View style={styles["ai-recommendation-name-skeleton"]} />
                  <View style={styles["ai-recommendation-price-skeleton"]} />
                </View>
              </View>
            ))
          : filteredRecommendations?.map((recommendation, index) => (
              <Pressable
                key={index}
                style={styles["ai-recommendation-item"]}
                onPress={() =>
                  onRecommendationPress({
                    vendor_id: recommendation.vendor_id,
                    name: recommendation.name,
                    price: recommendation.reason || recommendation.price || "",
                  })
                }
              >
                <View style={styles["ai-recommendation-image"]} />
                <View style={styles["ai-recommendation-text-container"]}>
                  <Text style={styles["ai-recommendation-name"]}>
                    {recommendation.name}
                  </Text>
                  <Text style={styles["ai-recommendation-price"]}>
                    {recommendation.reason}
                  </Text>
                </View>
              </Pressable>
            ))}
      </ScrollView>
    </View>
  );
};

