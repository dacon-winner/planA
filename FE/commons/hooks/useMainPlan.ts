/**
 * useMainPlan Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { client } from "@/commons/api/client";

/**
 * Vendor 카테고리 타입
 */
export type VendorCategory =
  | "VENUE"
  | "DRESS"
  | "STUDIO"
  | "MAKEUP"
  | "BOUQUET"
  | "HANBOK"
  | "SNAP"
  | "VIDEO";

/**
 * 플랜 아이템 타입
 */
export interface MainPlanItem {
  plan_item_id: string;
  vendor_id: string;
  vendor_name: string;
  category: VendorCategory;
  address: string;
  reservation_date: string | null;
  vendor_thumbnail_url: string;
}

/**
 * 대표 플랜 응답 타입
 */
export interface MainPlanResponse {
  plan_id: string;
  plan_title: string;
  wedding_date: string;
  items: MainPlanItem[];
}

/**
 * 카테고리별 한글 이름 매핑
 */
export const CATEGORY_LABELS: Record<VendorCategory, string> = {
  VENUE: "웨딩홀",
  DRESS: "드레스",
  STUDIO: "스튜디오",
  MAKEUP: "메이크업",
  BOUQUET: "부케",
  HANBOK: "한복",
  SNAP: "스냅",
  VIDEO: "영상",
};

/**
 * 주소에서 지역만 추출하는 유틸 함수
 *
 * @param address - 전체 주소 (예: "서울시 강남구 테헤란로 123")
 * @returns 지역 (예: "서울 강남구")
 *
 * @example
 * extractRegion("서울시 강남구 테헤란로 123") // "서울 강남구"
 */
export function extractRegion(address: string): string {
  if (!address) return "";

  // "서울시 강남구 테헤란로 123" → "서울 강남구"
  const parts = address.split(" ");
  if (parts.length >= 2) {
    const city = parts[0].replace("시", "");
    const district = parts[1].replace("구", "구"); // 구는 그대로
    return `${city} ${district}`;
  }

  return address;
}

/**
 * 대표 플랜 조회 Hook
 *
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 대표 플랜 정보 및 메타데이터
 *
 * @example
 * const { data, isLoading, error } = useMainPlan();
 */
export function useMainPlan(enabled: boolean = true) {
  return useQuery({
    queryKey: ["plans", "main"],
    queryFn: async () => {
      console.log("🌐 [API] 대표 플랜 요청");

      const response = await client.get<{
        success: boolean;
        data: MainPlanResponse;
      }>("/api/v1/plans/main");

      console.log("✅ [API] 대표 플랜 응답:", {
        planId: response.data.data.plan_id,
        itemsCount: response.data.data.items?.length || 0,
      });

      // 백엔드 응답 구조: { success, data: { plan_id, plan_title, wedding_date, items } }
      return response.data.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    refetchOnMount: false, // 마운트 시 재요청 방지
  });
}

/**
 * 대표 플랜 설정 요청 타입
 */
export interface SetMainPlanRequest {
  /** 대표 플랜으로 설정할 플랜 ID */
  planId: string;
}

/**
 * 대표 플랜 설정 응답 타입
 */
export interface SetMainPlanResponse {
  message: string;
}

/**
 * 대표 플랜 설정 Hook
 *
 * @returns 대표 플랜 설정 Mutation 객체
 *
 * @example
 * const { mutate: setMainPlan, isPending } = useSetMainPlan();
 * setMainPlan(
 *   { planId: 'plan-id' },
 *   {
 *     onSuccess: () => console.log('대표 플랜 설정 완료'),
 *     onError: (error) => console.error('설정 실패', error),
 *   }
 * );
 */
export function useSetMainPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SetMainPlanRequest) => {
      console.log("🌐 [API] 대표 플랜 설정 요청:", data);

      const response = await client.post<{
        success: boolean;
        data: SetMainPlanResponse;
      }>("/api/v1/plans/main", {
        planId: data.planId,
      });

      console.log("✅ [API] 대표 플랜 설정 응답:", response.data);

      return response.data.data;
    },
    onSuccess: () => {
      // 대표 플랜 설정 성공 시 플랜 목록 및 대표 플랜 캐시 무효화
      console.log("🔄 [Cache] 대표 플랜 설정 성공 - 캐시 무효화");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.invalidateQueries({ queryKey: ["plans", "main"] });
      console.log("✅ [Cache] 플랜 캐시 무효화 완료");
    },
    onError: (error) => {
      console.error("❌ [API] 대표 플랜 설정 실패:", error);
      Alert.alert("오류", "대표 플랜 설정에 실패했습니다.\n다시 시도해주세요.");
    },
  });
}
