/**
 * WeddingFormLoading Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4343:434
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 피그마 정확한 색상값 사용 (디자인 토큰 우선)
 * [✓] 인라인 스타일 0건
 * [✓] position flexbox 방식 사용
 */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /**
   * Container
   * 전체 로딩 화면 컨테이너
   * form.tsx의 container와 동일한 구조
   */
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "transparent",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  /**
   * Gradient Background
   * 배경 그라데이션 이미지
   * form.tsx의 gradientBackground와 동일한 구조
   */
  gradientBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  /**
   * Content Container
   * 텍스트 콘텐츠를 감싸는 컨테이너
   * 피그마 노드ID: 4343:434
   * 화면 왼쪽에서 24px 떨어진 위치
   */
  contentContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    width: "100%",
  },

  /**
   * Loading Text
   * 로딩 메시지 텍스트
   * 피그마 노드ID: 4058:12433
   * fontSize 24px, fontWeight 700, lineHeight 28px
   * letterSpacing -0.24px, color #5c5050 (gray/1)
   */
  loadingText: {
    fontFamily: "Pretendard Variable",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.24,
    fontWeight: "700",
    color: "#5c5050", // Figma gray/1
  },
});

export default styles;
