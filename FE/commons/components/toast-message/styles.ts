/**
 * Toast Message Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-01-27
 * 토스트 메시지 컴포넌트 스타일 정의
 */

import { StyleSheet } from "react-native";

import { colors } from "@/commons/enums/color";

/**
 * 토스트 메시지 스타일 객체
 */
export const toastMessageStyles = StyleSheet.create({
  /**
   * 래퍼 스타일
   * 그림자가 그려질 공간을 확보하기 위한 투명한 여백
   * Blur: 20이므로 충분한 padding 확보
   */
  wrapper: {
    padding: 20, // 그림자 blur(20)만큼의 여백 확보
    overflow: "visible", // 그림자가 영역 밖으로 나가도 잘리지 않도록 설정
  },

  /**
   * 컨테이너 스타일
   * 아이콘과 텍스트를 중앙에 배치하고 8px 간격 유지
   * Drop shadow: X:0, Y:0, Blur:20, Spread:-3.48, Color:red-10 (20% opacity)
   */
  container: {
    backgroundColor: colors.root.brand,
    borderRadius: 4,
    width: 345,
    height: 30,
    // Flex 레이아웃 설정
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // 아이콘과 텍스트 사이 간격 8px
    gap: 8,
    // iOS Shadow
    shadowColor: colors.red["red-10"], // #73293f (가장 어두운 빨간색, #800C3A와 유사)
    shadowOffset: {
      width: 0,
      height: 4, // 그림자가 아래쪽으로 살짝 내려오게 하여 가시성 향상
    },
    shadowOpacity: 0.3, // 30% opacity (0.2 → 0.3으로 증가하여 더 진하게)
    shadowRadius: 20, // Blur: 20
    // Android Shadow (elevation은 blur와 spread를 정확히 표현하기 어려우므로 근사값 사용)
    elevation: 10, // 8 → 10으로 증가하여 Android에서 그림자 가시성 향상
  },

  /**
   * 텍스트 스타일
   * 피그마 디자인 토큰 기반 폰트 설정
   */
  text: {
    fontSize: 12.167227745056152,
    fontWeight: "700",
    lineHeight: 17.38175392150879,
    letterSpacing: -0.1307026445865631,
    color: colors.black["black-1"],
    textAlign: "center",
    fontFamily: "PretendardVariable",
    // 폰트 잘림 방지
    includeFontPadding: false,
  },
});

// 아이콘 색상 상수 (StyleSheet 외부에서 export)
export const iconColors = {
  toast: colors.black["black-1"], // #ffffff
} as const;
