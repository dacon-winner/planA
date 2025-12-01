/**
 * useReservations Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { buildApiUrl } from '@/commons/config';
import { useAuth } from '@/commons/providers/auth/auth.provider';


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
  const { getAccessToken } = useAuth();

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
