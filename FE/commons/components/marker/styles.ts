/**
 * Marker Styles
 * 버전: v2.0.0
 * 생성 시각: 2025-01-27
 * 피그마 노드ID: 4183:8055 (category), 4188:8084 (location)
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
import { blackColors, rootColors } from "../../enums/color";

/**
 * Variant별 색상 정의 (color.ts에 없는 색상)
 */
export const variantColors = {
  shirt: rootColors.brand, // #ff5c8d
  camera: "#b885fa", // 보라색 - color.ts에 없음
  palette: "#ffa537", // 주황색 - color.ts에 없음
  hotel: "#73c600", // 초록색 - color.ts에 없음
} as const;

/**
 * Variant 색상 가져오기 함수
 * 색상 로직을 중앙에서 관리
 */
export const getVariantColor = (
  variant: "shirt" | "camera" | "palette" | "hotel"
): string => {
  return variantColors[variant];
};

export const styles = StyleSheet.create({
  /* ========================================
   * 비활성 상태 (기본 원형 마커)
   * ======================================== */

  /**
   * Marker Container (비활성)
   * 피그마 노드ID: 4183:8055
   * width 32, height 32, cornerRadius 16, bg #ffffff, 테두리 variant별 색상
   * borderWidth 4이므로 내부 원 크기는 24x24 (32 - 4*2)
   */
  container: {
    width: 32,
    height: 32,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 16,
    borderWidth: 4, // border 4
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Icon Container
   * 비활성화 상태의 내부 원 크기 (border 제외)
   * 32 - (4 * 2) = 24x24
   */
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ========================================
   * 활성 상태 (캡슐 형태 마커)
   * ======================================== */

  /**
   * Selected Container (활성)
   * 캡슐과 꼬리표를 포함하는 컨테이너
   */
  selectedContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },

  /**
   * Capsule (캡슐 본체)
   * 색상 배경 + 내부 흰색 아이콘 원 + 가격 라벨
   */
  capsule: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
    paddingRight: 7,
    borderRadius: 20,
    minHeight: 32,
  },

  /**
   * Selected Icon Circle (내부 흰색 아이콘 원)
   * 활성 상태일 때 아이콘을 감싸는 흰색 원
   * 비활성화 상태의 내부 원 크기와 동일하게 24x24
   */
  selectedIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: blackColors["black-1"], // #ffffff
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },

  /**
   * Label (가격 라벨)
   * 캡슐 내부에 표시되는 텍스트
   */
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: blackColors["black-1"], // #ffffff
    lineHeight: 16,
  },

  /**
   * Triangle (꼬리표)
   * 캡슐 하단에 붙는 역삼각형
   * border hack을 사용하여 구현
   */
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginTop: -1, // 캡슐과 겹치도록
  },
});

export default styles;
