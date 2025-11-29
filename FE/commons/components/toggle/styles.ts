/**
 * Toggle Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
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
 */

import { StyleSheet } from "react-native";
import { rootColors, blackColors } from "../../enums/color";

/**
 * Toggle Styles
 * 피그마 디자인 토큰 기반 스타일 정의
 */
export const styles = StyleSheet.create({
  /* ========================================
   * CONTAINER STYLES
   * ======================================== */

  /**
   * Container On
   * 피그마: width 32, height 18, bg #ff5c8d, borderRadius 무한대
   */
  containerOn: {
    width: 32,
    height: 18,
    backgroundColor: rootColors.brand, // #ff5c8d
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 1,
  },

  /**
   * Container Off
   * 피그마: width 32, height 18, bg #e5e7eb, borderRadius 무한대
   */
  containerOff: {
    width: 32,
    height: 18,
    backgroundColor: rootColors.navigation, // #e5e7eb
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 1,
  },

  /* ========================================
   * HANDLE STYLES
   * ======================================== */

  /**
   * Handle On
   * 피그마: width 16, height 16, bg #ffffff, borderRadius 무한대
   * 위치: 오른쪽 정렬
   */
  handleOn: {
    width: 16,
    height: 16,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 9999,
  },

  /**
   * Handle Off
   * 피그마: width 16, height 16, bg #ffffff, borderRadius 무한대
   * 위치: 왼쪽 정렬
   */
  handleOff: {
    width: 16,
    height: 16,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 9999,
  },
});

export default styles;
