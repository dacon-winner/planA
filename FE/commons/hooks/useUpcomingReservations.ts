/**
 * useUpcomingReservations Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useQuery } from '@tanstack/react-query';
import client from '@/commons/api/client';

/**
 * 다가오는 일정 업체 정보 타입
 */
export interface UpcomingReservationVendor {
  id: string;
  name: string;
  address: string;
}

/**
 * 다가오는 일정 단일 항목 타입
 */
export interface UpcomingReservationItem {
  reservation_date: Date | string;
  reservation_time: string;
  vendor: UpcomingReservationVendor;
}

/**
 * 다가오는 일정 응답 타입
 */
export interface UpcomingReservationsResponse {
  reservations: UpcomingReservationItem[];
}

/**
 * 다가오는 일정 조회 Hook
 * @description 사용자의 모든 예약 중 예약 날짜 기준으로 가장 빠른 4개의 예약을 반환합니다.
 *
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 다가오는 예약 목록 (최대 4개) 및 조회 상태
 *
 * @example
 * const { data, isLoading, error } = useUpcomingReservations();
 *
 * // 데이터 사용
 * const upcomingSchedules = data?.reservations || [];
 */
export function useUpcomingReservations(enabled: boolean = true) {
  return useQuery({
    queryKey: ['reservations', 'upcoming'],
    queryFn: async (): Promise<UpcomingReservationsResponse> => {
      console.log('🌐 [API] 다가오는 일정 조회 요청');

      const response = await client.get<{ success: boolean; data: UpcomingReservationsResponse }>(
        '/api/v1/reservations/upcoming'
      );

      if (!response.data.success) {
        throw new Error('다가오는 일정 조회에 실패했습니다.');
      }

      console.log('✅ [API] 다가오는 일정 조회 성공:', response.data.data);
      return response.data.data;
    },
    enabled,
  });
}

