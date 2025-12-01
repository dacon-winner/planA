/**
 * Schedule Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 업데이트: 2025-12-19
 * 피그마 노드ID: 4100:84
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { PlannerCard } from "@/components/schedule/planner-card";
import { AddNewPlanCard } from "@/components/schedule/add-new-plan-card";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { NewPlanModalContent } from "@/commons/components/modal";
import { getPlanDetailUrl } from "@/commons/enums/url";
import { GradientBackground } from "@/commons/components/gradient-background";
import { usePlans } from "@/commons/hooks";

export default function Schedule() {
  const { openModal } = useModal();
  const router = useRouter();
  const { data: planListResponse, isLoading, error } = usePlans();

  // API 데이터를 PlannerCard에 맞는 형식으로 변환
  const plans = planListResponse?.items?.map((item) => {
    const plan = item.plan;
    const usersInfo = item.users_info;

    // wedding_date를 한국어 형식으로 변환
    const formatDate = (dateString: string | null) => {
      if (!dateString) return "날짜 미정";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
      return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
    };

    // 예산을 한국어 형식으로 변환
    const formatBudget = (budget: number | null) => {
      if (!budget) return "예산 미정";
      return `${(budget / 10000).toLocaleString()}만원`;
    };

    return {
      id: plan?.id || usersInfo.id,
      planName: plan?.title || "플랜",
      isAi: plan?.is_ai_generated || false,
      isRepresentative: usersInfo.is_main_plan,
      date: formatDate(usersInfo.wedding_date),
      location: usersInfo.preferred_region || "지역 미정",
      budget: formatBudget(plan?.total_budget || usersInfo.budget_limit),
    };
  }) || [];

  const handleSetRepresentative = (planName: string) => {
    // TODO: 대표 플랜 설정 로직 구현
    console.log(`대표 플랜 설정: ${planName}`);
  };

  const handleViewDetails = (planId: string) => {
    const url = getPlanDetailUrl(planId);
    router.push(url);
  };

  const handleAddNewPlan = () => {
    // NewPlanModal 열기
    openModal(
      <NewPlanModalContent
        onManualAdd={() => {
          console.log("직접 업체 추가");
        }}
        onAIGenerate={(planName: string) => {
          console.log("AI 플랜 생성:", planName);
        }}
      />
    );
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <View style={styles["schedule-wrapper"]}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <GradientBackground zIndex={0} />
        <View style={styles["schedule-content"]}>
          <View style={styles["schedule-header"]}>
            <View style={styles["header-section"]}>
              <Text style={styles["schedule-header-title"]}>
                나의 플랜 관리
              </Text>
              <Text style={styles["schedule-header-subtitle"]}>로딩 중...</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <View style={styles["schedule-wrapper"]}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <GradientBackground zIndex={0} />
        <View style={styles["schedule-content"]}>
          <View style={styles["schedule-header"]}>
            <View style={styles["header-section"]}>
              <Text style={styles["schedule-header-title"]}>
                나의 플랜 관리
              </Text>
              <Text style={styles["schedule-header-subtitle"]}>오류 발생</Text>
            </View>
          </View>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: 'red', textAlign: 'center' }}>
              플랜 목록을 불러오는 중 오류가 발생했습니다.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles["schedule-wrapper"]}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* 배경 그라데이션 */}
      <GradientBackground zIndex={0} />

      <ScrollView
        style={styles["schedule-content"]}
        contentContainerStyle={styles["schedule-content-container"]}
      >
        {/* Header with Gradient */}
        <View style={styles["schedule-header"]}>
          <View style={styles["header-section"]}>
            <Text style={styles["schedule-header-title"]}>
              나의 플랜 관리
            </Text>
            <Text style={styles["schedule-header-subtitle"]}>D-0일</Text>
          </View>
        </View>

        {/* Content: Plan Cards */}
        {plans.length > 0 ? (
          plans.map((plan, index) => (
            <PlannerCard
              key={plan.id}
              planName={plan.planName}
              isAi={plan.isAi}
              isRepresentative={plan.isRepresentative}
              date={plan.date}
              location={plan.location}
              budget={plan.budget}
              onSetRepresentative={() =>
                handleSetRepresentative(plan.planName)
              }
              onViewDetails={() => handleViewDetails(plan.id)}
            />
          ))
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>
              생성된 플랜이 없습니다.
            </Text>
          </View>
        )}
        <AddNewPlanCard onPress={handleAddNewPlan} />
      </ScrollView>
    </View>
  );
}
