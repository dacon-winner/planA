/**
 * Users Info 관련 타입 정의
 * 버전: v1.0.0
 */

// 요청 타입
export interface CreateUsersInfoRequest {
  wedding_date?: string; // YYYY-MM-DD
  preferred_region?: string;
  budget_limit?: number;
}

// 응답 관련 타입들
export interface VendorInfo {
  id: string;
  name: string;
  category: string;
  region: string;
  thumbnail_url: string;
}

export interface ServiceItemInfo {
  id: string;
  name: string;
  description: string;
  price: number;
  is_package: boolean;
  thumbnail_url: string;
}

export interface PlanItemInfo {
  id: string;
  is_confirmed: boolean;
  vendor: VendorInfo;
  service_item: ServiceItemInfo;
}

export interface UsersInfoResponse {
  id: string;
  user_id: string;
  users_info_id: string;
  title: string;
  total_budget: number;
  is_ai_generated: boolean;
  created_at: string;
  plan_items: PlanItemInfo[];
}

