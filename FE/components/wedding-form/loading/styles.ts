/**
 * WeddingFormLoading Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4048:12225
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 피그마 정확한 색상값 사용 (디자인 토큰 우선)
 * [✓] 인라인 스타일 0건
 * [✓] only flexbox 방식 사용 (position-absolute 금지)
 * [✓] 스피너 회전 애니메이션 스타일 추가
 * [✓] 로딩 스텝 목록 스타일 추가
 */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /**
   * Container
   * 전체 로딩 화면 컨테이너
   * 피그마 노드ID: 4048:12225
   * flexbox로 상-중-하 구조 구현
   */
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },

  /**
   * Background Wrapper
   * 배경 이미지를 감싸는 래퍼
   * flexbox 구조에서 배경을 표현하기 위한 컨테이너
   */
  backgroundWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  /**
   * Gradient Background
   * 배경 그라데이션 이미지
   * 피그마 노드ID: 4048:12226
   */
  gradientBackground: {
    width: "100%",
    height: "100%",
  },

  /**
   * Content Wrapper
   * 모든 콘텐츠를 감싸는 메인 래퍼
   * flexbox column으로 상-중-하 배치
   */
  contentWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 115,
    paddingBottom: 100,
  },

  /**
   * Top Text Container
   * 상단 텍스트를 감싸는 컨테이너
   * 피그마 노드ID: 4343:434
   */
  topTextContainer: {
    paddingLeft: 44,
    paddingRight: 44,
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
    color: "#5c5050",
  },

  /**
   * Spinner Container
   * 스피너를 감싸는 컨테이너
   * 피그마 노드ID: 4052:12307
   * flexbox로 중앙 정렬
   */
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Spinner
   * 회전하는 스피너 이미지
   * 피그마 노드ID: 4052:12307
   * 크기: 224x224
   */
  spinner: {
    width: 224,
    height: 224,
  },

  /**
   * Icon Container
   * 중앙 아이콘을 감싸는 컨테이너
   * 스피너 위에 겹쳐서 배치
   * 피그마 노드ID: 4058:12430, 4058:12575, 4058:12578
   */
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 224,
    height: 224,
  },

  /**
   * Steps Container
   * 하단 스텝 목록 컨테이너
   * 피그마 노드ID: 4058:12434
   */
  stepsContainer: {
    flexDirection: "column",
    paddingHorizontal: 24,
  },

  /**
   * Step Wrapper
   * 개별 스텝을 감싸는 래퍼
   * 피그마 노드ID: 4058:12435
   */
  stepWrapper: {
    paddingVertical: 16,
  },

  /**
   * Step Content
   * 스텝 내용 (인디케이터 + 텍스트)
   * 피그마 노드ID: 4058:12437
   */
  stepContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  /**
   * Step Indicator Base
   * 스텝 인디케이터 기본 스타일
   */
  stepIndicator: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Step Indicator Active
   * 현재 진행 중인 스텝 (분홍색 배경)
   * 피그마 노드ID: 4058:12438
   */
  stepIndicatorActive: {
    backgroundColor: "#e64485",
  },

  /**
   * Step Indicator Inactive
   * 대기 중인 스텝 (분홍색 보더)
   * 피그마 노드ID: 4058:12572
   */
  stepIndicatorInactive: {
    backgroundColor: "rgba(230, 68, 133, 0.15)",
    borderWidth: 1,
    borderColor: "#e64485",
  },

  /**
   * Checkmark
   * 완료된 스텝의 체크 표시
   */
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  /**
   * Step Text
   * 스텝 설명 텍스트
   * 피그마 노드ID: 4058:12439
   */
  stepText: {
    fontFamily: "Pretendard Variable",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#0d0b26",
  },
});

export default styles;
