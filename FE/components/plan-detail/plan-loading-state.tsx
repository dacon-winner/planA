import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "@/commons/styles/planDetail";

interface PlanLoadingStateProps {
  isLoading: boolean;
  error?: Error | null;
}

export const PlanLoadingState: React.FC<PlanLoadingStateProps> = ({
  isLoading,
  error,
}) => {
  return (
    <View style={styles["plan-detail-wrapper"]}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Image
        source={require("@/assets/Gradient.png")}
        style={styles["background-gradient"]}
      />
      <SafeAreaView style={styles["safe-area"]}>
        <View style={styles["loading-state-container"]}>
          <Text style={styles["loading-state-text"]}>
            {isLoading
              ? "플랜 정보를 불러오는 중..."
              : error
              ? "플랜 정보를 불러오는 중 오류가 발생했습니다."
              : "플랜 데이터를 불러올 수 없습니다."}
          </Text>
          {error && (
            <Text style={styles["loading-state-error"]}>
              {error instanceof Error ? error.message : "알 수 없는 오류"}
            </Text>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

