/**
 * useReservations Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { buildApiUrl } from '@/commons/config';
import { useAuth } from '@/commons/providers/auth/auth.provider';
import { usePlanState } from '@/commons/providers/plan-state/plan-state.provider';

// 플랜 상태 관리 타입들
export type VendorStatus = '업체 저장전' | '업체 저장됨' | '예약됨';

export type VendorCategory = '스튜디오' | '드레스' | '메이크업' | '웨딩홀';

export interface PlanVendorState {
  vendorId: string | null;
  status: VendorStatus;
}

export interface PlanState {
  스튜디오: PlanVendorState;
  드레스: PlanVendorState;
  메이크업: PlanVendorState;
  웨딩홀: PlanVendorState;
}


/**
 * 예약 정보 타입 (백엔드 GetReservationResponseDto 기반)
 * TODO: 업체 정보 연동을 위해 vendor_id 및 vendor 정보 추가 필요
 */
export interface ReservationInfo {
  plan_id: string;
  reservation_date: Date;
  reservation_time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  visitor_name: string;
  visitor_phone: string;
  // TODO: 업체 정보 연동 시 추가
  // vendor_id: string;
  // vendor?: {
  //   name: string;
  //   address: string;
  // };
}

/**
 * 예약 목록 응답 타입
 */
export interface ReservationListResponse {
  items: ReservationInfo[];
  total: number;
}

/**
 * 예약 생성 요청 타입
 */
export interface CreateReservationRequest {
  vendor_id: string;
  reservation_date: string;
  reservation_time: string;
  plan_id?: string; // 상태 업데이트를 위한 플랜 ID
  category?: VendorCategory; // 상태 업데이트를 위한 카테고리
}

/**
 * 업체 저장 요청 타입
 */
export interface SaveVendorRequest {
  plan_id: string;
  category: VendorCategory;
  vendor_id: string;
}

/**
 * 예약 생성 응답 타입
 */
export interface CreateReservationResponse {
  message: string;
  reservation_id: string;
}

/**
 * 예약 목록 조회 Hook
 * Note: 현재 백엔드에 전체 예약 조회 API가 없어 임시 구현
 *
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 예약 목록 및 메타데이터
 *
 * @example
 * const { data, isLoading, error } = useReservations();
 */
export function useReservations(enabled: boolean = true) {
  // const { getAccessToken } = useAuth(); // TODO: 실제 API 연동 시 사용

  return useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      // TODO: 백엔드에 전체 예약 조회 API가 추가되면 연동
      // 현재는 임시로 빈 배열 반환
      console.log('🌐 [API] 예약 목록 요청 (임시 구현)');

      // 실제 API 연동 시 아래 코드 사용:
      // const url = buildApiUrl('/api/v1/reservations');
      // const accessToken = await getAccessToken();
      // const response = await axios.get<{ success: boolean; data: ReservationListResponse }>(url, {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // });
      // return response.data.data;

      // 임시 데이터 반환
      return {
        items: [],
        total: 0,
      } as ReservationListResponse;
    },
    enabled,
  });
}

/**
 * 예약 생성 Hook
 *
 * @returns 예약 생성 뮤테이션 객체
 *
 * @example
 * const createReservationMutation = useCreateReservation();
 *
 * const handleCreateReservation = async (data: CreateReservationRequest) => {
 *   try {
 *     const result = await createReservationMutation.mutateAsync(data);
 *     console.log('예약 생성 성공:', result);
 *     // 성공 시 플랜 ID와 업체 ID로 예약 조회 처리
 *   } catch (error) {
 *     console.error('예약 생성 실패:', error);
 *   }
 * };
 */
export function useCreateReservation() {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();
  const { updateVendorState } = usePlanState();

  return useMutation({
    mutationFn: async (data: CreateReservationRequest): Promise<CreateReservationResponse> => {
      console.log('🌐 [API] 예약 생성 요청:', data);

      const url = buildApiUrl(`/plans/${data.plan_id}/reservations`);
      const accessToken = await getAccessToken();

      // API 요청 시 plan_id와 category는 제외하고 전송
      const { plan_id, category, ...apiData } = data;

      const response = await axios.post<{ success: boolean; data: CreateReservationResponse }>(url, apiData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.data.success) {
        throw new Error('예약 생성에 실패했습니다.');
      }

      return response.data.data;
    },
    onSuccess: async (data, variables) => {
      console.log('✅ [API] 예약 생성 성공:', data);

      // 예약 목록 캐시 무효화하여 최신 데이터로 업데이트
      queryClient.invalidateQueries({ queryKey: ['reservations'] });

      // 플랜 상태 업데이트 (예약됨)
      if (variables.plan_id && variables.category) {
        await updateVendorState(
          variables.plan_id,
          variables.category,
          variables.vendor_id,
          '예약됨'
        );
      }
    },
    onError: (error) => {
      console.error('❌ [API] 예약 생성 실패:', error);
    },
  });
}

/**
 * 업체 저장 Hook
 *
 * @returns 업체 저장 뮤테이션 객체
 *
 * @example
 * const saveVendorMutation = useSaveVendor();
 *
 * const handleSaveVendor = async (data: SaveVendorRequest) => {
 *   try {
 *     await saveVendorMutation.mutateAsync(data);
 *     console.log('업체 저장 성공');
 *   } catch (error) {
 *     console.error('업체 저장 실패:', error);
 *   }
 * };
 */
export function useSaveVendor() {
  const { updateVendorState } = usePlanState();

  return useMutation({
    mutationFn: async (data: SaveVendorRequest): Promise<void> => {
      console.log('💾 [Vendor] 업체 저장 요청:', data);

      // TODO: 실제 API 연동 시 백엔드에 업체 저장 요청
      // 현재는 상태만 업데이트

      // 플랜 상태 업데이트 (업체 저장됨)
      await updateVendorState(data.plan_id, data.category, data.vendor_id, '업체 저장됨');
    },
    onSuccess: (data, variables) => {
      console.log('✅ [Vendor] 업체 저장 성공:', variables);
    },
    onError: (error) => {
      console.error('❌ [Vendor] 업체 저장 실패:', error);
    },
  });
}

/**
 * 플랜 업체 상태 조회 Hook
 * 특정 플랜의 특정 카테고리 업체 상태를 쉽게 조회할 수 있습니다.
 *
 * @param planId 플랜 ID
 * @param category 업체 카테고리
 * @returns 해당 카테고리의 업체 상태 정보
 *
 * @example
 * const { vendorId, status } = usePlanVendorState('plan-123', '스튜디오');
 */
export function usePlanVendorState(planId: string, category: VendorCategory) {
  const { getPlanState } = usePlanState();

  return getPlanState(planId)[category];
}

/**
 * 플랜 전체 상태 조회 Hook
 * 특정 플랜의 모든 카테고리 상태를 조회할 수 있습니다.
 *
 * @param planId 플랜 ID
 * @returns 플랜의 전체 상태 정보
 *
 * @example
 * const planState = usePlanStateInfo('plan-123');
 * console.log(planState.스튜디오.status); // '업체 저장전' | '업체 저장됨' | '예약됨'
 */
export function usePlanStateInfo(planId: string) {
  const { getPlanState } = usePlanState();

  return getPlanState(planId);
}
