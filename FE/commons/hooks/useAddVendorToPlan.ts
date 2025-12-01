/**
 * useAddVendorToPlan Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * 
 * 플랜에 업체를 추가하거나 교체하는 커스텀 훅
 * 
 * @description
 * - React Query useMutation 사용
 * - 같은 카테고리 업체가 있으면 백엔드에서 자동 교체
 * - 같은 카테고리 업체가 없으면 신규 추가
 * 
 * @example
 * ```tsx
 * const { mutate: addVendorToPlan, isPending } = useAddVendorToPlan({
 *   onSuccess: (data) => {
 *     if (data.action === 'added') {
 *       Toast.success('플랜에 추가되었습니다');
 *     } else {
 *       Toast.success('기존 업체가 교체되었습니다');
 *     }
 *   }
 * });
 * 
 * addVendorToPlan({ planId: 'uuid', vendorId: 'uuid' });
 * ```
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/commons/api/client';

/**
 * 업체 추가 요청 파라미터
 */
export interface AddVendorToPlanParams {
  /** 플랜 ID */
  planId: string;
  /** 업체 ID */
  vendorId: string;
}

/**
 * 업체 추가 요청 Body
 */
interface AddVendorToPlanRequest {
  vendor_id: string;
}

/**
 * 업체 추가 응답
 */
export interface AddVendorToPlanResponse {
  /** 추가 또는 교체 여부 */
  action: 'added' | 'replaced';
  /** 응답 메시지 */
  message: string;
}

/**
 * Hook 옵션
 */
interface UseAddVendorToPlanOptions {
  onSuccess?: (data: AddVendorToPlanResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * 플랜에 업체 추가/교체 Hook
 * 
 * @param options Hook 옵션 (onSuccess, onError)
 * @returns useMutation 결과 (mutate, isPending, etc.)
 * 
 * @example
 * const { mutate: addVendorToPlan, isPending } = useAddVendorToPlan({
 *   onSuccess: (data) => console.log('성공:', data.action),
 *   onError: (error) => console.error('실패:', error)
 * });
 */
export function useAddVendorToPlan(options?: UseAddVendorToPlanOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ planId, vendorId }: AddVendorToPlanParams) => {
      console.log('🌐 [API] 업체 추가/교체 요청:', { planId, vendorId });

      const requestBody: AddVendorToPlanRequest = {
        vendor_id: vendorId,
      };

      const response = await client.post<{ success: boolean; data: AddVendorToPlanResponse }>(
        `/api/v1/plans/${planId}/vendors`,
        requestBody
      );

      console.log('✅ [API] 업체 추가/교체 응답:', {
        action: response.data.data.action,
        message: response.data.data.message,
      });

      return response.data.data;
    },
    onSuccess: (data) => {
      // 플랜 목록 캐시 무효화 (자동 갱신)
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      queryClient.invalidateQueries({ queryKey: ['mainPlan'] });
      
      console.log('🔄 [Cache] 플랜 목록 캐시 무효화 완료');

      // 사용자 정의 onSuccess 콜백 실행
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      console.error('❌ [API] 업체 추가/교체 실패:', error);

      // 사용자 정의 onError 콜백 실행
      if (options?.onError) {
        options.onError(error as Error);
      }
    },
  });
}

