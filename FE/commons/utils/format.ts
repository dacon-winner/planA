/**
 * Format Utility Functions
 * 버전: 1.1.0
 * 생성 시각: 2025-12-01
 * 업데이트: 2025-12-01
 * 설명: 날짜, 금액, 지역 등 공통 포맷 함수 모음
 */

/**
 * 날짜를 한국어 형식으로 변환
 * @param dateString - ISO 형식 날짜 문자열 (YYYY-MM-DD)
 * @param options - 포맷 옵션
 * @param options.includeDayOfWeek - 요일 포함 여부 (기본값: true)
 * @param options.fallback - 날짜가 없을 때 표시할 텍스트 (기본값: "날짜 미정")
 * @returns "YYYY년 M월 D일" 또는 "YYYY년 M월 D일 요일" 형식 문자열
 * @example
 * formatWeddingDate("2026-05-15") // "2026년 5월 15일 금요일"
 * formatWeddingDate("2026-05-15", { includeDayOfWeek: false }) // "2026년 5월 15일"
 * formatWeddingDate(null, { fallback: "미정" }) // "미정"
 */
export function formatWeddingDate(
  dateString: string | null,
  options?: {
    includeDayOfWeek?: boolean;
    fallback?: string;
  }
): string {
  const { includeDayOfWeek = true, fallback = "날짜 미정" } = options || {};

  if (!dateString) return fallback;

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (!includeDayOfWeek) {
    return `${year}년 ${month}월 ${day}일`;
  }

  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
}

/**
 * D-Day 계산 함수
 * @param weddingDate - 결혼식 날짜 (YYYY-MM-DD)
 * @returns "D-N일", "D-Day", "D+N일" 형식 문자열
 * @example
 * calculateDDay("2025-06-15") // "D-14일" (14일 남음)
 * calculateDDay("2025-06-01") // "D-Day" (오늘이 결혼식)
 * calculateDDay("2025-05-15") // "D+5일" (결혼식 지남)
 * calculateDDay(null) // "D-Day"
 */
export function calculateDDay(weddingDate: string | null): string {
  if (!weddingDate) return "D-Day";

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 부분 제거

  const wedding = new Date(weddingDate);
  wedding.setHours(0, 0, 0, 0); // 시간 부분 제거

  const diffTime = wedding.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `D+${Math.abs(diffDays)}일`; // 결혼식 지남
  } else if (diffDays === 0) {
    return "D-Day"; // 오늘이 결혼식
  } else {
    return `${diffDays}일`; // 결혼식까지 남은 일수
  }
}

/**
 * 예산을 한국어 형식으로 변환
 * @param budget - 예산 (숫자, 원 단위)
 * @param options - 포맷 옵션
 * @param options.style - 포맷 스타일: "compact" (5천만원) 또는 "full" (5,000만원)
 * @param options.fallback - 예산이 없을 때 표시할 텍스트 (기본값: "예산 미정")
 * @returns 포맷된 예산 문자열
 * @example
 * formatBudget(50000000) // "5,000만원"
 * formatBudget(50000000, { style: "compact" }) // "5천만원"
 * formatBudget(150000000, { style: "compact" }) // "1억 5천만원"
 * formatBudget(null, { fallback: "미정" }) // "미정"
 */
export function formatBudget(
  budget: number | null,
  options?: {
    style?: "compact" | "full";
    fallback?: string;
  }
): string {
  const { style = "full", fallback = "예산 미정" } = options || {};

  if (!budget) return fallback;

  if (style === "compact") {
    const eok = Math.floor(budget / 100000000); // 억
    const cheonMan = Math.floor((budget % 100000000) / 10000000); // 천만
    const baekMan = Math.floor((budget % 10000000) / 1000000); // 백만
    const sipMan = Math.floor((budget % 1000000) / 100000); // 십만
    const man = Math.floor((budget % 100000) / 10000); // 만

    let result = "";
    if (eok > 0) result += `${eok}억 `;
    if (cheonMan > 0) result += `${cheonMan}천만원`;
    else if (baekMan > 0) result += `${baekMan}백만원`;
    else if (sipMan > 0) result += `${sipMan}십만원`;
    else if (man > 0) result += `${man}만원`;
    else return fallback;

    return result.trim();
  }

  // full 스타일 (기본값)
  return `${(budget / 10000).toLocaleString()}만원`;
}

/**
 * 지역 정보를 표준 형식으로 변환
 * @param region - 지역명
 * @param options - 포맷 옵션
 * @param options.addCity - 시/도 자동 추가 여부 (기본값: true)
 * @param options.fallback - 지역이 없을 때 표시할 텍스트 (기본값: "지역 미정")
 * @returns 표준화된 지역명
 * @example
 * formatRegion("강남구") // "서울 강남구"
 * formatRegion("송파구") // "서울 송파구"
 * formatRegion("서울 강남구") // "서울 강남구" (이미 포함된 경우)
 * formatRegion("경기 성남시") // "경기 성남시" (이미 포함된 경우)
 * formatRegion("강남구", { addCity: false }) // "강남구"
 * formatRegion(null, { fallback: "미정" }) // "미정"
 */
export function formatRegion(
  region: string | null,
  options?: {
    addCity?: boolean;
    fallback?: string;
  }
): string {
  const { addCity = true, fallback = "지역 미정" } = options || {};

  if (!region) return fallback;

  if (!addCity) return region;

  // 이미 "서울", "경기", "인천" 등 시/도가 포함되어 있으면 그대로 반환
  if (
    region.includes("서울") ||
    region.includes("경기") ||
    region.includes("인천") ||
    region.includes("부산") ||
    region.includes("대구") ||
    region.includes("광주") ||
    region.includes("대전") ||
    region.includes("울산") ||
    region.includes("세종")
  ) {
    return region;
  }

  // "구"로 끝나면 서울로 간주
  if (region.endsWith("구")) {
    return `서울 ${region}`;
  }

  return region;
}
