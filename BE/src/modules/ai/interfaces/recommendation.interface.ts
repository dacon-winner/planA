/**
 * AI 추천 관련 인터페이스
 */

/**
 * AI 추천 요청 파라미터
 */
export interface RecommendationRequest {
  /** 결혼 예정일 */
  wedding_date: Date | null;
  /** 선호 지역 */
  preferred_region: string | null;
  /** 예산 제한 */
  budget_limit: number | null;
}

/**
 * 단일 업체 추천 결과
 */
export interface VendorRecommendation {
  /** 업체 ID */
  vendor_id: string;
  /** 업체 카테고리 (STUDIO, DRESS, MAKEUP, VENUE) */
  category: string;
  /** 업체명 */
  name: string;
  /** 추천 이유 */
  selection_reason: string;
  /** 추천 점수 (0-1) */
  confidence_score?: number;
}

/**
 * 스드메 조합 추천 결과
 */
export interface VendorCombinationRecommendation {
  /** 스튜디오 추천 */
  studio: VendorRecommendation | null;
  /** 드레스 추천 */
  dress: VendorRecommendation | null;
  /** 메이크업 추천 */
  makeup: VendorRecommendation | null;
  /** 웨딩홀 추천 (향후 추가) */
  venue: VendorRecommendation | null;
  /** 전체 추천 이유 */
  overall_reason?: string;
}

