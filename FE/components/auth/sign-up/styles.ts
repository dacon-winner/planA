/**
 * SignUp Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4201:4552
 *
 * 주의사항:
 * - tailwind.config.js에 선언된 색상 토큰만 사용
 * - 직접 색상값(hex/rgb/hsl) 사용 금지
 * - 인라인 스타일 사용 금지
 * - StyleSheet.create로 스타일 관리
 */

import { StyleSheet, Dimensions } from "react-native";
import { brownColors, blackColors, redColors } from "@/commons/enums/color";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  /**
   * 컨테이너
   */
  container: {
    flex: 1,
    backgroundColor: blackColors["black-1"], // #ffffff
  },

  /**
   * 스크롤 컨텐츠
   */
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },

  /**
   * 배경 이미지
   * 콘텐츠를 화면 중앙에 배치
   */
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * 전체 콘텐츠 래퍼
   * 타이틀 + 카드를 묶어서 정확히 중앙 정렬
   */
  contentWrapper: {
    width: "100%",
    maxWidth: 500,
    paddingHorizontal: 20,
  },

  /**
   * 타이틀 컨테이너
   * Figma: top 0px, left 16px
   */
  titleContainer: {
    width: "100%",
    marginTop: 45,
  },

  /**
   * 메인 타이틀
   * Figma: Plan A
   */
  titleMain: {
    fontFamily: "Pretendard-Bold",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
    letterSpacing: -0.32,
    color: brownColors["brown-6"], // #524a4e
  },

  /**
   * 서브 타이틀
   * Figma: 결혼 준비 이제 한 곳 에서,
   */
  titleSub: {
    fontFamily: "Pretendard-Medium",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.18,
    color: brownColors["brown-6"], // #524a4e
  },

  /**
   * 카드 래퍼
   * Figma: 타이틀과 카드 사이 간격
   */
  cardWrapper: {
    marginTop: 16,
    alignSelf: "stretch",
    width: "100%",
  },

  /**
   * Blur 컨테이너 (Glassmorphism)
   */
  blurContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: blackColors["black-1"], // #ffffff
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Glassmorphism 효과를 위한 투명도 포함
  },

  /**
   * 카드 내용
   * Figma: left 23px, top 27px, width 297px
   */
  cardContent: {
    paddingTop: 27,
    paddingBottom: 27,
    paddingLeft: 23,
    paddingRight: 23,
    gap: 40,
  },

  /**
   * 입력 필드 섹션
   * Figma: gap 16px
   */
  inputSection: {
    gap: 16,
  },

  /**
   * 성별 컨테이너
   * Figma: Input과 동일한 구조
   */
  genderContainer: {
    gap: 8,
  },

  /**
   * 성별 라벨
   * Figma: 성별 라벨 스타일
   */
  genderLabel: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: -0.1504,
    color: brownColors["brown-9"], // gray-800 대응
  },

  /**
   * 버튼 섹션
   */
  buttonSection: {
    gap: 16,
  },

  /**
   * 폼 에러 텍스트
   */
  errorText: {
    marginTop: 4,
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    lineHeight: 14,
    color: redColors["red-7"],
  },
});
