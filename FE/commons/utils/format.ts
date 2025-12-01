/**
 * Format Utility Functions
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 설명: 날짜, 금액, 지역 등 공통 포맷 함수 모음
 */

/**
 * 날짜를 한국어 형식으로 변환
 * @param dateString - ISO 형식 날짜 문자열 (YYYY-MM-DD)
 * @returns "YYYY년 M월 D일 요일" 형식 문자열
 * @example
 * formatWeddingDate("2026-05-15") // "2026년 5월 15일 금요일"
 * formatWeddingDate(null) // "날짜 미정"
 */
export function formatWeddingDate(dateString: string | null): string {
  if (!dateString) return "날짜 미정";
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  
  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
}

/**
 * 예산을 한국어 형식으로 변환
 * @param budget - 예산 (숫자, 원 단위)
 * @returns "X,XXX만원" 형식 문자열
 * @example
 * formatBudget(10000000) // "1,000만원"
 * formatBudget(50000000) // "5,000만원"
 * formatBudget(null) // "예산 미정"
 */
export function formatBudget(budget: number | null): string {
  if (!budget) return "예산 미정";
  
  return `${(budget / 10000).toLocaleString()}만원`;
}

/**
 * 지역 정보를 표준 형식으로 변환
 * @param region - 지역명
 * @returns 표준화된 지역명
 * @example
 * formatRegion("강남구") // "강남구"
 * formatRegion(null) // "지역 미정"
 */
export function formatRegion(region: string | null): string {
  if (!region) return "지역 미정";
  
  // 필요시 추가 포맷 로직 구현
  // 예: "강남구" -> "서울특별시 강남구"
  return region;
}

