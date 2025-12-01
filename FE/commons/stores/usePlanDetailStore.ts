import { create } from "zustand";

interface PlanDetailState {
  // Bottom Sheet 상태
  isHeaderCompact: boolean;
  setIsHeaderCompact: (compact: boolean) => void;

  // 예약 관련 상태
  selectedDate: Date | null;
  selectedTime: string | null;
  showTimePicker: boolean;
  isReserved: boolean;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setShowTimePicker: (show: boolean) => void;
  setIsReserved: (reserved: boolean) => void;

  // AI 추천 관련 상태
  selectedAiRecommendation: {
    vendor_id: string;
    name: string;
    price: string;
  } | null;
  setSelectedAiRecommendation: (
    recommendation: { vendor_id: string; name: string; price: string } | null
  ) => void;

  // 탭 변경 시 상태 초기화
  resetReservationState: () => void;
}

export const usePlanDetailStore = create<PlanDetailState>((set) => ({
  // 초기 상태
  isHeaderCompact: false,
  selectedDate: null,
  selectedTime: null,
  showTimePicker: false,
  isReserved: false,
  selectedAiRecommendation: null,

  // 액션
  setIsHeaderCompact: (compact) => set({ isHeaderCompact: compact }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setShowTimePicker: (show) => set({ showTimePicker: show }),
  setIsReserved: (reserved) => set({ isReserved: reserved }),
  setSelectedAiRecommendation: (recommendation) =>
    set({ selectedAiRecommendation: recommendation }),

  // 탭 변경 시 예약 관련 상태 초기화
  resetReservationState: () =>
    set({
      selectedDate: null,
      selectedTime: null,
      showTimePicker: false,
      isReserved: false,
      selectedAiRecommendation: null,
    }),
}));

