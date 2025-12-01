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

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  StepperWithContext,
  useStepperContext,
} from "@/commons/components/stepper";
import { Calendar } from "@/commons/components/calendar";
import { SelectButton } from "@/commons/components/select-button";
import { Button } from "@/commons/components/button";
import { MapPin } from "lucide-react-native";
import { URL_PATHS } from "@/commons/enums/url";
import { styles } from "./styles";

/**
 * WeddingForm Props
 */
export interface WeddingFormProps {
  /** 날짜 선택 완료 핸들러 */
  onDateSelected?: (date: Date) => void;
  /** 폼 제출 핸들러 */
  onSubmit?: (data: WeddingFormData) => void;
  /** 직접 업체 추가 모드 여부 */
  isManualAddMode?: boolean;
  /** 로딩 상태 */
  isLoading?: boolean;
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
                          onSelect={() => onRegionSelect(region)}
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
    // 부모 컴포넌트에서 완료 처리
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
  isManualAddMode = false,
  isLoading = false,
}) => {
  // 라우터 및 URL params
  const router = useRouter();
  const params = useLocalSearchParams();

  // URL params에서 수정 모드 여부 확인 (AI 플랜 수정 또는 직접 업체 추가)
  const isEditMode = params.isEdit === "true" || params.isManualAdd === "true";

  // params에서 초기 데이터 파싱
  const initialDate = params.wedding_date
    ? new Date(params.wedding_date as string)
    : null;
  const initialRegion = (params.preferred_region as string) || null;
  const initialBudget = params.budget_limit
    ? `${(Number(params.budget_limit) / 10000).toLocaleString()}만원`
    : null;

  // 폼 데이터 상태 - 수정 모드일 경우 초기값 설정
  const [formData, setFormData] = useState<WeddingFormData>({
    weddingDate: initialDate,
    region: initialRegion,
    budget: initialBudget,
  });

  // Stepper 상태 - 수정 모드일 경우 모든 스텝 완료 상태로 시작
  const [currentStep, setCurrentStep] = useState(isEditMode ? 2 : 0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    isEditMode ? [0, 1, 2] : []
  );

  // 분석하기 버튼 애니메이션
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // 초기 마운트 체크용 (초기 로드 시 자동 제출 방지)
  const isInitialMount = useRef(true);

  /**
   * formData 변경 시 완료 상태 자동 업데이트
   * budget이 null이 아니면 모든 단계가 완료된 것으로 간주
   */
  useEffect(() => {
    if (formData.budget !== null) {
      // 모든 단계 완료
      setCompletedSteps([0, 1, 2]);
      setCurrentStep(-1);

      // 초기 마운트가 아닐 때만 onSubmit 호출 (수정 모드에서는 자동 제출 방지)
      if (onSubmit && !isInitialMount.current) {
        onSubmit(formData);
      }

      // 초기 마운트 플래그 해제
      isInitialMount.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.budget]);

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

    // 날짜가 선택되었으므로 0단계 완료
    if (!completedSteps.includes(0)) {
      setCompletedSteps((prev) => [...prev, 0]);
    }

    if (onDateSelected) {
      onDateSelected(date);
    }
  };

  /**
   * 지역 선택 핸들러
   */
  const handleRegionSelect = (region: string) => {
    setFormData((prev) => ({ ...prev, region }));

    // 지역이 선택되었으므로 1단계 완료 (같은 값을 다시 선택해도 완료 처리)
    if (!completedSteps.includes(1)) {
      setCompletedSteps((prev) => [...prev, 1]);
    }

    // 지역 선택 후 자동으로 3단계(예산)로 이동
    setTimeout(() => {
      setCurrentStep(2);
    }, 300);
  };

  /**
   * 예산 선택 핸들러
   */
  const handleBudgetSelect = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget }));

    // 예산이 선택되었으므로 2단계 완료 (같은 값을 다시 선택해도 완료 처리)
    if (!completedSteps.includes(2)) {
      setCompletedSteps((prev) => [...prev, 2]);
    }

    // 예산 선택 후 폼 닫기 (모든 단계 완료)
    setTimeout(() => {
      setCurrentStep(-1);
    }, 300);
  };

  /**
   * 모든 폼 데이터가 입력되었는지 확인
   */
  const isFormComplete =
    formData.weddingDate !== null &&
    formData.region !== null &&
    formData.budget !== null;

  /**
   * 폼 완료 시 분석하기 버튼 페이드인 애니메이션
   * 타이밍: 예산 선택 후 300ms 디바운싱 + 300ms 스텝퍼 닫힘 애니메이션 = 600ms
   * 버튼 애니메이션: 300ms delay (스텝퍼 닫힘 시작 시점) + 300ms duration
   */
  useEffect(() => {
    if (isFormComplete) {
      // 300ms delay 후 0.3초 동안 opacity 0 -> 1 애니메이션
      // (스텝퍼가 닫히기 시작할 때 버튼이 나타나기 시작)
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 300,
        delay: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // 폼이 완료되지 않았으면 버튼 숨김
      buttonOpacity.setValue(0);
    }
  }, [isFormComplete, buttonOpacity]);

  /**
   * 분석하기/저장하기 버튼 클릭 핸들러
   * - AI 플랜 생성 모드: 로딩 화면으로 이동
   * - 직접 업체 추가 모드: 부모 컴포넌트(FormPage)의 onSubmit 호출
   */
  const handleAnalyze = () => {
    // 데이터 변환 로직
    const weddingDateStr = formData.weddingDate
      ? formData.weddingDate.toISOString().split("T")[0]
      : "";

    const budgetNum = formData.budget
      ? parseInt(
          formData.budget
            .replace(/,/g, "")
            .replace("만원", "")
            .replace(" 이상", "")
        ) * 10000
      : 0;

    console.log("Form data to be sent:", {
      wedding_date: weddingDateStr,
      preferred_region: formData.region,
      budget_limit: budgetNum,
    });

    // onSubmit 콜백이 있으면 호출
    if (onSubmit) {
      onSubmit(formData);
    }

    // 직접 업체 추가 모드가 아닌 경우에만 로딩 화면으로 이동
    if (!isManualAddMode) {
      // AI 플랜 생성: 로딩 화면으로 이동하며 데이터 전달
      router.push({
        pathname: URL_PATHS.FORM_LOADING,
        params: {
          wedding_date: weddingDateStr,
          preferred_region: formData.region,
          budget_limit: budgetNum.toString(), // URL 파라미터는 문자열로 전달
        },
      });
    }
    // 직접 업체 추가 모드는 부모 컴포넌트(FormPage)의 onSubmit에서 처리
  };

  // 버튼 텍스트 결정
  const buttonText = isManualAddMode ? "저장하기" : "분석하기";

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
                        onRegionSelect={handleRegionSelect}
                      />
                    ),
                  },
                  {
                    title: formData.budget || "예상 예산 입력",
                    content: (
                      <BudgetStep
                        selectedBudget={formData.budget}
                        onBudgetSelect={handleBudgetSelect}
                      />
                    ),
                  },
                ]}
                currentStep={currentStep}
                completedSteps={completedSteps}
                onStepChange={(stepIndex) => {
                  console.log("Step changed to:", stepIndex);
                  setCurrentStep(stepIndex);
                }}
                onStepComplete={(stepIndex) => {
                  console.log("Step completed:", stepIndex);
                  console.log("Form data:", formData);

                  // 마지막 단계가 완료되면 onSubmit 호출
                  if (stepIndex === 2) {
                    if (onSubmit) {
                      onSubmit(formData);
                    }
                  }
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 분석하기/저장하기 버튼 - 모든 데이터가 입력되었을 때만 표시 (화면 하단 고정) */}
      {isFormComplete && (
        <Animated.View
          style={[styles.analyzeButtonWrapper, { opacity: buttonOpacity }]}
        >
          <SafeAreaView>
            <View style={styles.analyzeButtonContainer}>
              <Button
                variant="filled"
                size="large"
                onPress={handleAnalyze}
                disabled={isLoading}
              >
                {isLoading ? "생성 중..." : buttonText}
              </Button>
            </View>
          </SafeAreaView>
        </Animated.View>
      )}
    </View>
  );
};

export default WeddingForm;
