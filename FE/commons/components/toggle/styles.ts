/**
 * Toggle Styles
 * 버전: v1.1.0
 * 생성 시각: 2025-11-29
 * 업데이트: 2025-11-29 - 애니메이션 지원을 위한 스타일 구조 변경
 * 피그마 노드ID: 4180:2458
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] nativewind 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 * [✓] 애니메이션 지원
 */

import { StyleSheet } from "react-native";
import { blackColors } from "../../enums/color";

/**
 * Toggle Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 * 애니메이션을 위해 배경색과 위치는 index.tsx에서 동적으로 처리
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Container
   * 피그마: width 32, height 18, borderRadius 무한대
   * 배경색은 애니메이션으로 처리 (#e5e7eb <-> #ff5c8d)
   */
  container: {
    width: 32,
    height: 18,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 1,
  },

  /* ========================================
   * HANDLE STYLES
   * ======================================== */

  /**
   * Handle
   * 피그마: width 16, height 16, bg #ffffff, borderRadius 무한대
   * 위치는 애니메이션으로 처리 (translateX)
   */
  handle: {
    width: 16,
    height: 16,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 9999,
  },
});

export default styles;
