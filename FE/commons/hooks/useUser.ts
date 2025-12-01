/**
 * useUser Hook
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 04-func.mdc
 * - [x] @tanstack/react-query 사용
 * - [x] 독립적인 기능 구현
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { buildApiUrl } from '@/commons/config';
import { useAuth } from '@/commons/providers/auth/auth.provider';

// 서버 공통 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

// 사용자 정보 응답 타입 (백엔드 UserResponseDto 기반)
export interface UserInfo {
  id: string;
  email: string;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phone: string;
  wedding_date: Date | null;
  preferred_region: string | null;
  budget_limit: number | null;
  provider: string;
  is_push_on: boolean;
  created_at: Date;
}

/**
 * 사용자 정보 조회 Hook
 *
 * @param enabled 쿼리 활성화 여부 (기본: true)
 * @returns 사용자 정보 및 메타데이터
 *
 * @example
 * const { data, isLoading, error } = useMe();
 */
export function useMe(enabled: boolean = true) {
  const { getAccessToken } = useAuth();

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const url = buildApiUrl('/api/v1/users/auth/me');
      console.log('🌐 [API] 사용자 정보 요청');

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Access token이 없습니다. 로그인이 필요합니다.');
      }

      const response = await axios.get<ApiResponse<UserInfo>>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('✅ [API] 사용자 정보 응답:', {
        name: response.data.data.name,
        email: response.data.data.email,
      });

      // 백엔드 응답 구조: { success, data: UserInfo }
      return response.data.data;
    },
    enabled,
  });
}
