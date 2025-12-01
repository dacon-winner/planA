import { useState, useMemo, useEffect, useCallback } from "react";
import { usePlanDetail } from "@/commons/hooks/usePlans";
import {
  useAiRecommendations,
  type AiRecommendedVendor,
} from "@/commons/hooks/useAiRecommendations";
import { useVendorDetail } from "@/commons/hooks/useVendors";
import {
  usePlanState,
  VendorCategory,
  VendorStatus,
} from "@/commons/providers/plan-state/plan-state.provider";
import { useSaveVendor, useCreateReservation } from "@/commons/hooks/useReservations";
import {
  mapApiCategoryToVendorCategory,
  VENDOR_CATEGORY_ORDER,
  getVendorCategoryByIndex,
  vendorCategoryFromLabel,
  getApiCategoryByVendorCategory,
} from "@/commons/utils";
import { showPlanToast } from "@/commons/components/plan-detail/plan-toast";
import { usePlanDetailStore } from "@/commons/stores/usePlanDetailStore";

type Recommendation = {
  vendor_id: string;
  name: string;
  price: string;
};

type ServiceCard = {
  type: string;
  name: string;
  statusText: string;
  statusIcon: "clock" | "clockCheck" | "calendar" | null;
  isSelected: boolean;
};

type PlanDetailInfo = {
  summary: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  service: string;
  prices: { level: string; price: string }[];
  images: string[] | null;
};

type PlanData = {
  planName: string;
  daysLeft: string;
  date: string;
  location: string;
  budget: string;
  services: {
    type: string;
    name: string;
    status: string;
    statusIcon: "clock" | "clockCheck" | null;
    isSelected: boolean;
  }[];
  aiRecommendations: Record<VendorCategory, AiRecommendedVendor[]>;
};

const DEFAULT_MODAL_STATE: Record<string, boolean> = {
  스튜디오: false,
  드레스: false,
  메이크업: false,
  웨딩홀: false,
};

const formatDateToKorean = (dateString: string | null): string => {
  if (!dateString) return "날짜 미정";
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][
      date.getDay()
    ];
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
  } catch {
    return "날짜 미정";
  }
};

const calculateDaysLeft = (weddingDate: string | null): string => {
  if (!weddingDate) return "N";
  try {
    const today = new Date();
    const wedding = new Date(weddingDate);
    const diffTime = wedding.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays.toString() : "0";
  } catch {
    return "N";
  }
};

const formatBudget = (budget: number | null): string => {
  if (!budget) return "예산 미정";
  const manWon = Math.floor(budget / 10000);
  return `${manWon.toLocaleString()}만원`;
};

export const parseWeddingDate = (dateString: string): Date | null => {
  try {
    const match = dateString.match(/(\d{4})년\s+(\d{1,2})월\s+(\d{1,2})일/);
    if (match) {
      const [, year, month, day] = match;
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    }
    return null;
  } catch {
    return null;
  }
};

const DEFAULT_EMPTY_RECOMMENDATIONS: Record<VendorCategory, AiRecommendedVendor[]> = {
  스튜디오: [],
  드레스: [],
  메이크업: [],
  웨딩홀: [],
};

const transformPlanData = (
  planDetailData: any,
  aiRecommendationsData?: any
): PlanData | null => {
  if (!planDetailData) {
    return null;
  }

  const { users_info, plan, plan_items } = planDetailData;

  const categorizedServices: Record<VendorCategory, any> = {
    스튜디오: null,
    드레스: null,
    메이크업: null,
    웨딩홀: null,
  };

  plan_items.forEach((item: any) => {
    const normalizedCategory = mapApiCategoryToVendorCategory(item.vendor.category);
    if (normalizedCategory && categorizedServices[normalizedCategory] === null) {
      categorizedServices[normalizedCategory] = item;
    }
  });

  const services = VENDOR_CATEGORY_ORDER.map((category) => {
    const item = categorizedServices[category];
    if (!item) {
      return {
        type: category,
        name: "업체 미정",
        status: "업체 저장 전",
        statusIcon: null,
        isSelected: false,
      };
    }

    const { vendor, reservation, is_confirmed } = item;
    let status = "업체 저장 전";
    let statusIcon: "clock" | "clockCheck" | null = null;

    if (is_confirmed && reservation) {
      status = `${
        formatDateToKorean(reservation.reservation_date).split(" ")[0]
      } ${reservation.reservation_time} 방문 예정`;
      statusIcon = "clockCheck";
    } else if (is_confirmed) {
      status = "업체 저장됨";
      statusIcon = "clock";
    }

    return {
      type: category,
      name: vendor.name,
      status,
      statusIcon,
      isSelected: is_confirmed,
    };
  });

  const aiRecommendations: Record<VendorCategory, AiRecommendedVendor[]> =
    aiRecommendationsData?.recommendations && Array.isArray(aiRecommendationsData.recommendations)
      ? VENDOR_CATEGORY_ORDER.reduce(
          (acc, category) => {
            const apiCategory = getApiCategoryByVendorCategory(category);
            acc[category] = aiRecommendationsData.recommendations.filter(
              (item: AiRecommendedVendor) => item.category === apiCategory
            );
            return acc;
          },
          { ...DEFAULT_EMPTY_RECOMMENDATIONS }
        )
      : { ...DEFAULT_EMPTY_RECOMMENDATIONS };

  return {
    planName: plan.title || "플랜",
    daysLeft: calculateDaysLeft(users_info.wedding_date),
    date: formatDateToKorean(users_info.wedding_date),
    location: users_info.preferred_region || "지역 미정",
    budget: formatBudget(plan.total_budget || users_info.budget_limit),
    services,
    aiRecommendations,
  };
};

export function usePlanDetailScreen(planId?: string) {
  const normalizedPlanId = planId ?? "";

  const [selectedTab, setSelectedTab] = useState(0);
  const [changeVendorModals, setChangeVendorModals] = useState<Record<string, boolean>>(
    DEFAULT_MODAL_STATE
  );

  // Zustand 스토어에서 상태 가져오기
  const {
    selectedDate,
    selectedTime,
    showTimePicker,
    isReserved,
    selectedAiRecommendation,
    setSelectedDate,
    setSelectedTime,
    setShowTimePicker,
    setIsReserved,
    setSelectedAiRecommendation,
    resetReservationState,
  } = usePlanDetailStore();

  const timeOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = 9 + i;
      return {
        value: `${hour.toString().padStart(2, "0")}:00`,
        label: `${hour.toString().padStart(2, "0")}:00`,
      };
    });
  }, []);

  useEffect(() => {
    resetReservationState();
  }, [selectedTab, resetReservationState]);

  const { data: planDetailData, isLoading, error } = usePlanDetail(
    normalizedPlanId
  );

  const currentVendorId = useMemo(() => {
    if (!planDetailData || !planDetailData.plan_items) {
      return null;
    }

    const targetCategory = getVendorCategoryByIndex(selectedTab);
    if (!targetCategory) {
      return null;
    }

    const planItem = planDetailData.plan_items.find((item: any) => {
      const normalized = mapApiCategoryToVendorCategory(item.vendor.category);
      return normalized === targetCategory;
    });

    return planItem?.vendor.id || null;
  }, [planDetailData, selectedTab]);

  const {
    data: aiRecommendationsData,
    isLoading: isAiRecommendationsLoading,
  } = useAiRecommendations(currentVendorId, false); // AI 추천 기능 비활성화

  const planData = useMemo(
    () => transformPlanData(planDetailData, aiRecommendationsData),
    [planDetailData, aiRecommendationsData]
  );

  const { data: vendorDetail } = useVendorDetail(
    selectedAiRecommendation?.vendor_id || currentVendorId,
    normalizedPlanId,
    Boolean(selectedAiRecommendation?.vendor_id || currentVendorId)
  );

  const { getPlanState, updateVendorState } = usePlanState();
  const planState = getPlanState(normalizedPlanId);

  const saveVendorMutation = useSaveVendor();
  const createReservationMutation = useCreateReservation();

  const getVendorStateByServiceType = useCallback(
    (serviceType: string) => {
      const category = vendorCategoryFromLabel(serviceType);
      if (!category) return null;
      return planState[category] ?? null;
    },
    [planState]
  );

  const isServiceSaved = useCallback(
    (serviceType: string) => {
      if (!planData) return false;
      const category = vendorCategoryFromLabel(serviceType);
      if (!category) {
        return false;
      }

      const vendorState = planState[category];
      if (vendorState && vendorState.status !== "업체 저장전") {
        return true;
      }

      const serviceIndex = VENDOR_CATEGORY_ORDER.indexOf(category);
      if (serviceIndex === -1) {
        return false;
      }
      return Boolean(planData.services[serviceIndex]?.isSelected);
    },
    [planData, planState]
  );

  const serviceCards: ServiceCard[] = useMemo(() => {
    if (!planData) return [];
    return planData.services.map((service, index) => {
      const serviceType = service.type;
      const vendorState = getVendorStateByServiceType(serviceType);
      const isCurrentTab = index === selectedTab;

      // 상태 계산
      let statusText = "업체 저장 전";
      let statusIcon: "clock" | "clockCheck" | "calendar" | null = null;

      if (vendorState?.status === "예약됨") {
        statusText = "방문 예정";
        statusIcon = "clockCheck";
      } else if (vendorState?.status === "업체 저장됨") {
        statusText = "업체 저장됨";
        statusIcon = "clock";
      } else if (!isCurrentTab) {
        const saved = isServiceSaved(serviceType);
        statusText = saved ? "업체 저장됨" : "업체 저장 전";
        statusIcon = saved ? "clock" : null;
      } else {
        // 현재 탭인 경우
        if (service.status === "계약 완료") {
          statusText = "계약 완료";
          statusIcon = "clockCheck";
        } else if (service.status?.includes("방문 예정")) {
          statusText = "방문 예정";
          statusIcon = "clockCheck";
        } else if (isReserved && selectedDate && selectedTime) {
          statusText = "방문 예정";
          statusIcon = "clockCheck";
        } else if (selectedDate && !selectedTime) {
          statusText = "날짜 지정됨";
          statusIcon = "calendar";
        } else if (isServiceSaved(serviceType)) {
          statusText = "업체 저장됨";
          statusIcon = "clock";
        } else if (service.status === "예약 문의 중") {
          statusText = "예약 문의 중";
          statusIcon = "clock";
        }
      }

      return {
        type: service.type,
        name: service.name,
        statusText,
        statusIcon,
        isSelected: service.isSelected,
      };
    });
  }, [
    planData,
    selectedTab,
    isReserved,
    selectedDate,
    selectedTime,
    getVendorStateByServiceType,
    isServiceSaved,
  ]);

  const updateVendorStatusLocally = useCallback(
    async (category: VendorCategory, vendorId: string, status: VendorStatus) => {
      await updateVendorState(normalizedPlanId, category, vendorId, status);
    },
    [normalizedPlanId, updateVendorState]
  );

  const handleViewOtherVendors = useCallback(
    (onExpand?: () => void) => {
      if (!aiRecommendationsData?.recommendations || !planData) {
        showPlanToast({
          variant: "info",
          message: "현재 카테고리에 대한 AI 추천이 없습니다.",
        });
        return;
      }

      const targetCategory = getVendorCategoryByIndex(selectedTab);
      const targetApiCategory = targetCategory
        ? getApiCategoryByVendorCategory(targetCategory)
        : null;

      const currentRecommendations = aiRecommendationsData.recommendations.filter(
        (item: any) => !targetApiCategory || item.category === targetApiCategory
      );

      if (currentRecommendations.length === 0) {
        showPlanToast({
          variant: "info",
          message: "현재 카테고리에 대한 AI 추천이 없습니다.",
        });
        return;
      }

      const currentMainServiceName =
        selectedAiRecommendation?.name || planData.services[selectedTab].name;

      const availableRecommendations = currentRecommendations.filter(
        (rec: any) => rec.name !== currentMainServiceName
      );

      if (availableRecommendations.length === 0) {
        showPlanToast({
          variant: "info",
          message: "표시할 수 있는 다른 추천 업체가 없습니다.",
        });
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableRecommendations.length);
      const selectedRecommendation = availableRecommendations[randomIndex];

      setSelectedAiRecommendation({
        vendor_id: selectedRecommendation.vendor_id,
        name: selectedRecommendation.name,
        price: selectedRecommendation.reason || "추천 업체",
      });
      
      onExpand?.();

      showPlanToast({
        variant: "success",
        message: `${selectedRecommendation.name} 업체 정보를 확인해보세요!`,
      });
    },
    [aiRecommendationsData, planData, selectedAiRecommendation, selectedTab, setSelectedAiRecommendation]
  );

  const handleAiRecommendationPress = useCallback(
    (recommendation: Recommendation, onExpand?: () => void) => {
      setSelectedAiRecommendation(recommendation);
      onExpand?.();
    },
    [setSelectedAiRecommendation]
  );

  const handleSaveConfirm = useCallback(async () => {
    if (!planData || !currentVendorId) {
      if (!currentVendorId) {
        showPlanToast({
          variant: "error",
          message: "업체를 선택해주세요.",
        });
      }
      return;
    }

    const currentServiceType = planData.services[selectedTab].type;
    const category = vendorCategoryFromLabel(currentServiceType);

    if (!category) {
      showPlanToast({
        variant: "error",
        message: "잘못된 서비스 타입입니다.",
      });
      return;
    }

    try {
      await saveVendorMutation.mutateAsync({
        plan_id: normalizedPlanId,
        category,
        vendor_id: currentVendorId,
      });

      await updateVendorStatusLocally(category, currentVendorId, "업체 저장됨");
      
      setChangeVendorModals((prev) => ({
        ...prev,
        [currentServiceType]: false,
      }));

      showPlanToast({
        variant: "success",
        message: "플랜이 성공적으로 저장되었습니다.",
      });
    } catch (error) {
      console.error("업체 저장 실패:", error);
      showPlanToast({
        variant: "error",
        message: "업체 저장에 실패했습니다.",
      });
    }
  }, [
    currentVendorId,
    normalizedPlanId,
    planData,
    saveVendorMutation,
    selectedTab,
    updateVendorStatusLocally,
  ]);

  const handleSaveCancel = useCallback(() => {
    if (!planData) return;
    const currentServiceType = planData.services[selectedTab].type;
    setChangeVendorModals((prev) => ({
      ...prev,
      [currentServiceType]: false,
    }));
  }, [planData, selectedTab]);

  const handleSave = useCallback(async () => {
    if (!planData || !currentVendorId) {
      if (!currentVendorId) {
        showPlanToast({
          variant: "error",
          message: "업체를 선택해주세요.",
        });
      }
      return;
    }

    const currentServiceType = planData.services[selectedTab].type;

    if (isServiceSaved(currentServiceType)) {
      setChangeVendorModals((prev) => ({
        ...prev,
        [currentServiceType]: true,
      }));
      return;
    }

    const category = vendorCategoryFromLabel(currentServiceType);
    if (!category) {
      showPlanToast({
        variant: "error",
        message: "잘못된 서비스 타입입니다.",
      });
      return;
    }

    try {
      await saveVendorMutation.mutateAsync({
        plan_id: normalizedPlanId,
        category,
        vendor_id: currentVendorId,
      });

      await updateVendorStatusLocally(category, currentVendorId, "업체 저장됨");

      showPlanToast({
        variant: "success",
        message: "플랜이 성공적으로 저장되었습니다.",
      });
    } catch (error) {
      console.error("업체 저장 실패:", error);
      showPlanToast({
        variant: "error",
        message: "업체 저장에 실패했습니다.",
      });
    }
  }, [
    currentVendorId,
    isServiceSaved,
    normalizedPlanId,
    planData,
    saveVendorMutation,
    selectedTab,
    updateVendorStatusLocally,
  ]);

  const handleReservation = useCallback(async () => {
    if (!planData || !currentVendorId || !selectedDate || !selectedTime) return;

    const currentServiceType = planData.services[selectedTab].type;
    const category = vendorCategoryFromLabel(currentServiceType);

    if (!category) {
      showPlanToast({
        variant: "error",
        message: "잘못된 서비스 타입입니다.",
      });
      return;
    }

    try {
      await createReservationMutation.mutateAsync({
        vendor_id: currentVendorId,
        reservation_date: selectedDate.toISOString().split("T")[0],
        reservation_time: selectedTime,
        plan_id: normalizedPlanId,
        category,
      });

      setIsReserved(true);
      setShowTimePicker(false);
      await updateVendorStatusLocally(category, currentVendorId, "예약됨");
    } catch (error) {
      console.error("예약 생성 실패:", error);
      showPlanToast({
        variant: "error",
        message: "예약 신청에 실패했습니다.",
      });
    }
  }, [
    createReservationMutation,
    currentVendorId,
    normalizedPlanId,
    planData,
    selectedDate,
    selectedTab,
    selectedTime,
    setIsReserved,
    setShowTimePicker,
    updateVendorStatusLocally,
  ]);

  const currentDetailInfo: PlanDetailInfo = useMemo(() => {
    const defaultInfo: PlanDetailInfo = {
      summary: "업체 정보 없음",
      name: "업체 미정",
      address: "주소 정보가 제공되지 않습니다",
      phone: "전화번호 정보가 제공되지 않습니다",
      hours: "영업시간 정보가 제공되지 않습니다",
      service: "서비스 정보 없음",
      prices: [{ level: "기본", price: "정보 없음" }],
      images: null,
    };

    if (!planData) return defaultInfo;

    const serviceType = planData.services[selectedTab]?.type || "";
    const currentService = planData.services[selectedTab];

    // AI 추천 업체가 선택된 경우
    if (selectedAiRecommendation) {
      const isLoading = !vendorDetail;
      const loadingText = "정보를 불러오는 중...";

      return {
        summary: `AI 추천 ${serviceType} 업체`,
        name: isLoading ? selectedAiRecommendation.name : vendorDetail.name,
        address: isLoading ? loadingText : vendorDetail.address || defaultInfo.address,
        phone: isLoading ? loadingText : vendorDetail.phone || defaultInfo.phone,
        hours: defaultInfo.hours,
        service: isLoading
          ? `${serviceType} 서비스`
          : vendorDetail.service_items?.[0]?.name || `${serviceType} 서비스`,
        prices: isLoading
          ? [{ level: "기본", price: loadingText }]
          : vendorDetail.service_items?.length
          ? vendorDetail.service_items.map((item: any) => ({
              level: item.name,
              price: `${item.price.toLocaleString()} 원`,
            }))
          : defaultInfo.prices,
        images: isLoading ? null : vendorDetail.vendor_images,
      };
    }

    // 업체 상세 정보가 있는 경우
    if (vendorDetail) {
      return {
        summary: vendorDetail.introduction || `${vendorDetail.category} 업체`,
        name: vendorDetail.name,
        address: vendorDetail.address || defaultInfo.address,
        phone: vendorDetail.phone || defaultInfo.phone,
        hours: defaultInfo.hours,
        service: vendorDetail.service_items?.[0]?.name || `${vendorDetail.category} 서비스`,
        prices: vendorDetail.service_items?.length
          ? vendorDetail.service_items.map((item: any) => ({
              level: item.name,
              price: `${item.price.toLocaleString()} 원`,
            }))
          : defaultInfo.prices,
        images: vendorDetail.vendor_images,
      };
    }

    // 기본 서비스 정보만 있는 경우
    return {
      ...defaultInfo,
      summary: `${currentService.type} 기본 정보`,
      name: currentService.name,
      service: `${currentService.type} 서비스`,
    };
  }, [planData, selectedAiRecommendation, selectedTab, vendorDetail]);

  const aiRecommendationsForCurrentTab = useMemo(() => {
    if (!planData) return [];
    const currentServiceType = planData.services[selectedTab]?.type;
    if (!currentServiceType) return [];
    
    const category = vendorCategoryFromLabel(currentServiceType);
    return category ? planData.aiRecommendations[category] ?? [] : [];
  }, [planData, selectedTab]);

  const isReservationLoading = createReservationMutation.isPending;

  return {
    // 로딩 및 에러 상태
    isLoading,
    error,
    isAiRecommendationsLoading,
    isReservationLoading,
    
    // 데이터
    finalPlanData: planData,
    serviceCards,
    currentDetailInfo,
    aiRecommendationsForCurrentTab,
    
    // 탭 상태
    selectedTab,
    setSelectedTab,
    
    // 예약 상태 (Zustand에서 관리)
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    showTimePicker,
    setShowTimePicker,
    isReserved,
    
    // AI 추천 상태 (Zustand에서 관리)
    selectedAiRecommendation,
    
    // 모달 상태
    changeVendorModals,
    
    // 유틸리티
    timeOptions,
    parseWeddingDate,
    recommendationDisplayCount: 3,
    
    // 액션
    isServiceSaved,
    handleSave,
    handleSaveConfirm,
    handleSaveCancel,
    handleViewOtherVendors,
    handleAiRecommendationPress,
    handleReservation,
  };
}


