/**
 * WeddingForm Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4040:3921
 *
 * 체크리스트:
 * [✓] 공통 컴포넌트 활용 (Stepper, Calendar, GradientBackground)
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 구조와 로직만 구현 (스타일은 styles.ts에 분리)
 * [✓] 인라인 스타일 0건
 * [✓] 피그마 구조 대비 누락 섹션 없음
 */

import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StepperWithContext } from "@/commons/components/stepper";
import { Calendar } from "@/commons/components/calendar";
import { GradientBackground } from "@/commons/components/gradient-background";
import { styles } from "./styles";

/**
 * WeddingForm Props
 */
export interface WeddingFormProps {
  /** 날짜 선택 완료 핸들러 */
  onDateSelected?: (date: Date) => void;
  /** 폼 제출 핸들러 */
  onSubmit?: (data: WeddingFormData) => void;
}

/**
 * 웨딩 폼 데이터 타입
 */
export interface WeddingFormData {
  /** 결혼 예정일 */
  weddingDate: Date | null;
  /** 희망 지역 */
  region: string | null;
  /** 예상 예산 */
  budget: string | null;
}

/**
 * WeddingForm Component
 * 결혼 준비를 위한 다단계 폼
 * - Step 1: 결혼 예정일 입력
 * - Step 2: 희망 지역 입력
 * - Step 3: 예상 예산 입력
 */
export const WeddingForm: React.FC<WeddingFormProps> = ({
  onDateSelected,
  onSubmit,
}) => {
  // 폼 데이터 상태
  const [formData, setFormData] = useState<WeddingFormData>({
    weddingDate: null,
    region: null,
    budget: null,
  });

  /**
   * 날짜 선택 핸들러
   */
  const handleDateSelect = (date: Date) => {
    setFormData((prev) => ({
      ...prev,
      weddingDate: date,
    }));

    if (onDateSelected) {
      onDateSelected(date);
    }
  };

  /**
   * Step 1: 결혼 예정일 입력 컨텐츠
   */
  const renderDateStep = () => {
    return (
      <View style={styles.calendarWrapper}>
        <View style={styles.calendarCard}>
          <View style={styles.calendarInnerContainer}>
            <Calendar
              selectedDate={formData.weddingDate}
              onDateSelect={handleDateSelect}
              subtitle="날짜를 선택하세요"
            />
          </View>
        </View>
      </View>
    );
  };

  /**
   * Step 2: 희망 지역 입력 컨텐츠 (미구현)
   */
  const renderRegionStep = () => {
    return (
      <View>
        <Text>희망 지역 입력 (미구현)</Text>
      </View>
    );
  };

  /**
   * Step 3: 예상 예산 입력 컨텐츠 (미구현)
   */
  const renderBudgetStep = () => {
    return (
      <View>
        <Text>예상 예산 입력 (미구현)</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <GradientBackground top={190} zIndex={-1} />

      {/* Content */}
      <ScrollView
        style={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>
              PlanA와 함께 결혼 준비를 시작해보세요.
            </Text>
          </View>

          {/* Form Content */}
          <View style={styles.formContentContainer}>
            <View style={styles.stepperWrapper}>
              <StepperWithContext
                steps={[
                  {
                    title: "결혼 예정일 입력",
                    content: renderDateStep(),
                  },
                  {
                    title: "희망 지역 입력",
                    content: renderRegionStep(),
                  },
                  {
                    title: "예상 예산 입력",
                    content: renderBudgetStep(),
                  },
                ]}
                currentStep={0}
                completedSteps={[]}
                onStepChange={(stepIndex) => {
                  console.log("Step changed to:", stepIndex);
                }}
                onStepComplete={(stepIndex) => {
                  console.log("Step completed:", stepIndex);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WeddingForm;

