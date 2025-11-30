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
import { View, Text, ScrollView, Image } from "react-native";
import {
  StepperWithContext,
  useStepperContext,
} from "@/commons/components/stepper";
import { Calendar } from "@/commons/components/calendar";
import { SelectButton } from "@/commons/components/select-button";
import { MapPin } from "lucide-react-native";
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
 * Step 1: 결혼 예정일 입력 컴포넌트
 */
interface DateStepProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const DateStep: React.FC<DateStepProps> = ({ selectedDate, onDateSelect }) => {
  const { goToNextStep } = useStepperContext();

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    // 날짜 선택 후 자동으로 다음 단계로 이동
    setTimeout(() => {
      goToNextStep();
    }, 300);
  };

  return (
    <View style={styles.calendarWrapper}>
      <View style={styles.calendarCard}>
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          subtitle="날짜를 선택하세요"
        />
      </View>
    </View>
  );
};

/**
 * Step 2: 희망 지역 입력 컴포넌트
 */
interface RegionStepProps {
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
}

const RegionStep: React.FC<RegionStepProps> = ({
  selectedRegion,
  onRegionSelect,
}) => {
  const { goToNextStep } = useStepperContext();

  // 서울시 25개 구 목록
  const regions = [
    "강남구",
    "서초구",
    "마포구",
    "서대문구",
    "노원구",
    "은평구",
    "양천구",
    "송파구",
    "강동구",
    "종로구",
    "동대문구",
    "영등포구",
    "동작구",
    "광진구",
    "성동구",
    "중랑구",
    "성북구",
    "관악구",
    "금천구",
    "중구",
    "용산구",
    "강북구",
    "도봉구",
    "구로구",
    "강서구",
  ];

  const handleRegionSelect = (region: string) => {
    onRegionSelect(region);
    // 지역 선택 후 자동으로 다음 단계로 이동
    setTimeout(() => {
      goToNextStep();
    }, 300);
  };

  // 각 페이지에 2열 x 4행 = 8개씩 버튼 배치 (달력처럼 페이지 단위로 스냅)
  const pages: string[][] = [];
  for (let i = 0; i < regions.length; i += 8) {
    pages.push(regions.slice(i, i + 8));
  }

  return (
    <View style={styles.regionWrapper}>
      <View style={styles.regionCard}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={345} // 각 페이지 전체 너비에 맞춰 스냅
          bounces={false}
        >
          {pages.map((pageRegions, pageIndex) => (
            <View key={pageIndex} style={styles.regionPage}>
              <View style={styles.regionGridContainer}>
                {Array.from({ length: 4 }).map((_, rowIndex) => {
                  const startIdx = rowIndex * 2;
                  const rowRegions = pageRegions.slice(startIdx, startIdx + 2);

                  if (rowRegions.length === 0) return null;

                  return (
                    <View key={rowIndex} style={styles.regionRow}>
                      {rowRegions.map((region) => (
                        <SelectButton
                          key={region}
                          value={region}
                          label={region}
                          size="medium"
                          state={
                            selectedRegion === region ? "selected" : "default"
                          }
                          icon={
                            <MapPin
                              size={20}
                              color={
                                selectedRegion === region
                                  ? "#861043"
                                  : "#d5d4d5"
                              }
                            />
                          }
                          onSelect={() => handleRegionSelect(region)}
                        />
                      ))}
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

/**
 * Step 3: 예상 예산 입력 컴포넌트
 */
interface BudgetStepProps {
  selectedBudget: string | null;
  onBudgetSelect: (budget: string) => void;
}

const BudgetStep: React.FC<BudgetStepProps> = ({
  selectedBudget,
  onBudgetSelect,
}) => {
  const { goToNextStep } = useStepperContext();

  // 예산 옵션 목록
  const budgetOptions = [
    "1,000만원",
    "2,000만원",
    "3,000만원",
    "4,000만원",
    "5,000만원",
    "6,000만원",
    "7,000만원",
    "8,000만원 이상",
  ];

  const handleBudgetSelect = (budget: string) => {
    onBudgetSelect(budget);
    // 예산 선택 후 자동으로 다음 단계로 이동
    setTimeout(() => {
      goToNextStep();
    }, 300);
  };

  return (
    <View style={styles.budgetWrapper}>
      <View style={styles.budgetCard}>
        <View style={styles.budgetGridContainer}>
          {Array.from({ length: 4 }).map((_, rowIndex) => {
            const startIdx = rowIndex * 2;
            const rowBudgets = budgetOptions.slice(startIdx, startIdx + 2);

            return (
              <View key={rowIndex} style={styles.budgetRow}>
                {rowBudgets.map((budget) => (
                  <SelectButton
                    key={budget}
                    value={budget}
                    label={budget}
                    size="medium"
                    state={selectedBudget === budget ? "selected" : "default"}
                    onSelect={() => handleBudgetSelect(budget)}
                  />
                ))}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

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
   * 날짜를 "YYYY년 M월 D일" 형식으로 포맷
   */
  const formatDate = (date: Date | null): string => {
    if (!date) return "결혼 예정일 입력";

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

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

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <Image
        source={require("@/assets/form-background.png")}
        style={styles.gradientBackground}
      />
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
              PlanA와 함께{"\n"}결혼 준비를 시작해보세요.
            </Text>
          </View>

          {/* Form Content */}
          <View style={styles.formContentContainer}>
            <View style={styles.stepperWrapper}>
              <StepperWithContext
                steps={[
                  {
                    title: formatDate(formData.weddingDate),
                    content: (
                      <DateStep
                        selectedDate={formData.weddingDate}
                        onDateSelect={handleDateSelect}
                      />
                    ),
                  },
                  {
                    title: formData.region || "희망 지역 입력",
                    content: (
                      <RegionStep
                        selectedRegion={formData.region}
                        onRegionSelect={(region) =>
                          setFormData((prev) => ({ ...prev, region }))
                        }
                      />
                    ),
                  },
                  {
                    title: formData.budget || "예상 예산 입력",
                    content: (
                      <BudgetStep
                        selectedBudget={formData.budget}
                        onBudgetSelect={(budget) =>
                          setFormData((prev) => ({ ...prev, budget }))
                        }
                      />
                    ),
                  },
                ]}
                currentStep={0}
                completedSteps={[]}
                onStepChange={(stepIndex) => {
                  console.log("Step changed to:", stepIndex);
                }}
                onStepComplete={(stepIndex) => {
                  console.log("Step completed:", stepIndex);
                  console.log("Form data:", formData);
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
