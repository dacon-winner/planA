/**
 * Form Page
 * 웨딩 폼 페이지
 * 버전: 1.1.0
 * 업데이트: 2025-12-01
 * - AI 플랜 생성 및 직접 업체 추가 모드 지원
 */

import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";
import { WeddingForm, type WeddingFormData } from "@/components/wedding-form/form/form";
import { useCreateEmptyPlan } from "@/commons/hooks";
import { URL_PATHS } from "@/commons/enums/url";

export default function FormPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // URL params에서 모드 확인
  const isManualAdd = params.isManualAdd === "true";
  
  // 빈 플랜 생성 Hook
  const { mutate: createEmptyPlan, isPending: isCreatingPlan } = useCreateEmptyPlan();

  const handleDateSelected = (date: Date) => {
    console.log("선택된 날짜:", date);
  };

  const handleSubmit = (data: WeddingFormData) => {
    console.log("폼 데이터:", data);
    
    if (isManualAdd) {
      // 직접 업체 추가 모드: 빈 플랜 생성 후 Search로 이동
      console.log("📱 [Form] 직접 업체 추가 모드 - 빈 플랜 생성");
      
      const weddingDateStr = data.weddingDate
        ? data.weddingDate.toISOString().split("T")[0]
        : undefined;
      
      const budgetNum = data.budget
        ? parseInt(data.budget.replace(/,/g, "").replace("만원", "").replace(" 이상", "")) * 10000
        : undefined;
      
      createEmptyPlan(
        {
          wedding_date: weddingDateStr,
          preferred_region: data.region || undefined,
          budget_limit: budgetNum,
          title: "나의 웨딩 플랜",
        },
        {
          onSuccess: () => {
            console.log("✅ [Form] 빈 플랜 생성 성공 - Search로 이동");
            router.push({
              pathname: URL_PATHS.SEARCH,
              params: { showNewPlanToast: "true" },
            } as any);
          },
          onError: (error) => {
            console.error("❌ [Form] 빈 플랜 생성 실패:", error);
            Alert.alert("오류", "플랜 생성에 실패했습니다.\n다시 시도해주세요.");
          },
        }
      );
    }
    // AI 플랜 생성 모드는 WeddingForm 내부의 handleAnalyze에서 처리됨
  };

  return (
    <WeddingForm 
      onDateSelected={handleDateSelected} 
      onSubmit={handleSubmit}
      isManualAddMode={isManualAdd}
      isLoading={isCreatingPlan}
    />
  );
}
