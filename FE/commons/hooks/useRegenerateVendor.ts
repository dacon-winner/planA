/**
 * useRegenerateVendor Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-01-XX
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 최소한의 useState, useEffect
 * - [x] 독립적인 기능 구현
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/commons/api/client';
import { usePlanState } from '@/commons/providers/plan-state/plan-state.provider';
import { showPlanToast } from '@/commons/components/plan-detail/plan-toast';
import { mapApiCategoryToVendorCategory } from '@/commons/utils';

/**
 * 업체 재생성 요청 타입
 */
export interface RegenerateVendorRequest {
  planId: string;
  vendorId: string;
}

/**
 * 업체 재생성 응답 타입
 */
export interface RegenerateVendorResponse {
  message: string;
  planItem: {
    id: string;
    vendor: {
      id: string;
      name: string;
      category: string;
    };
  };
}

/**
 * 업체 재생성 Hook
 * 플랜에 포함된 특정 업체를 AI가 다시 추천한 업체로 교체합니다.
 *
 * @description
 * **동작 방식:**
 * - planId로 플랜 조회 (users_info 포함)
 * - vendorId가 플랜에 포함되어 있는지 확인
 * - 예약 여부 확인 (예약이 있으면 교체 불가)
 * - 현재 플랜의 다른 업체들 조회
 * - 현재 총 예산 계산 (교체 대상 제외)
 * - AI에게 해당 카테고리의 다른 업체 추천 요청
 *   - users_info의 wedding_date, preferred_region, budget_limit 활용
 *   - 이미 플랜에 포함된 업체들은 제외
 *   - 총 예산을 초과하지 않는 업체만 후보로 선정
 * - plan_item 업데이트 (vendor_id, selection_reason)
 *
 * **제약 조건:**
 * - 예약이 있는 업체는 교체할 수 없습니다
 * - 해당 카테고리의 다른 업체가 없으면 교체 불가
 * - 예산 범위를 초과하는 업체만 남았다면 교체 불가
 *
 * **AI 추천 기준:**
 * - 남은 예산 범위 내의 업체
 * - 선호 지역과 가까운 업체 우선
 * - 가격 대비 품질이 좋은 업체
 *
 * @returns 업체 재생성 뮤테이션 객체
 *
 * @example
 * const regenerateVendorMutation = useRegenerateVendor();
 *
 * const handleRegenerate = async () => {
 *   try {
 *     const result = await regenerateVendorMutation.mutateAsync({
 *       planId: 'plan-123',
 *       vendorId: 'vendor-456',
 *     });
 *     console.log('업체 재생성 성공:', result);
 *   } catch (error) {
 *     console.error('업체 재생성 실패:', error);
 *   }
 * };
 */
export function useRegenerateVendor() {
  const queryClient = useQueryClient();
  const { updateVendorState } = usePlanState();

  return useMutation({
    mutationFn: async (
      data: RegenerateVendorRequest
    ): Promise<RegenerateVendorResponse> => {
      console.log('🔄 [API] 업체 재생성 요청:', data);

      // 쿼리 파라미터를 URL에 직접 포함
      const url = `/api/v1/plans/regenerate-vendor?planId=${data.planId}&vendorId=${data.vendorId}`;

      const response = await client.post<{
        success: boolean;
        data: RegenerateVendorResponse;
      }>(url, {});

      if (!response.data.success) {
        throw new Error('업체 재생성에 실패했습니다.');
      }

      return response.data.data;
    },
    onSuccess: async (data, variables) => {
      console.log('✅ [API] 업체 재생성 성공:', data);

      // 플랜 상세 캐시 무효화하여 최신 데이터로 업데이트
      queryClient.invalidateQueries({ queryKey: ['plan', variables.planId] });

      // 플랜 목록 캐시도 무효화
      queryClient.invalidateQueries({ queryKey: ['plans'] });

      // 업체 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['vendor', data.planItem.vendor.id],
      });

      // AI 추천 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['aiRecommendations'] });

      // 플랜 상태 업데이트
      const category = mapApiCategoryToVendorCategory(
        data.planItem.vendor.category
      );
      if (category) {
        await updateVendorState(
          variables.planId,
          category,
          data.planItem.vendor.id,
          '업체 저장됨'
        );
      }

      showPlanToast({
        variant: 'success',
        message: `${data.planItem.vendor.name} 업체로 교체되었습니다.`,
      });
    },
    onError: (error: any) => {
      console.error('❌ [API] 업체 재생성 실패:', error);

      // 에러 메시지 추출
      let errorMessage = '업체 재생성에 실패했습니다.';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      showPlanToast({
        variant: 'error',
        message: errorMessage,
      });
    },
  });
}

