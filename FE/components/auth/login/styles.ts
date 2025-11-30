/**
 * Login Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4201:4611
 *
 * 주의사항:
 * - tailwind.config.js에 선언된 색상 토큰만 사용
 * - 직접 색상값(hex/rgb/hsl) 사용 금지
 * - 인라인 스타일 사용 금지
 * - StyleSheet.create로 스타일 관리
 */

import { StyleSheet, Dimensions } from "react-native";
import { rootColors, brownColors, blackColors } from "@/commons/enums/color";

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
  },

  /**
   * 배경 이미지
   */
  backgroundImage: {
    flex: 1,
    width: "100%",
    minHeight: height,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  /**
   * 타이틀 컨테이너
   */
  titleContainer: {
    marginTop: 143,
    paddingHorizontal: 40,
    width: "100%",
    maxWidth: 345,
  },

  /**
   * 메인 타이틀
   * Figma: Plan A
   */
  titleMain: {
    fontFamily: "Pretendard_Variable",
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 44,
    letterSpacing: -0.4,
    color: brownColors["brown-6"], // #524a4e (Figma gray/1 #5C5050와 가장 유사)
  },

  /**
   * 서브 타이틀
   * Figma: 결혼 준비 이제 한 곳 에서,
   */
  titleSub: {
    fontFamily: "Pretendard_Variable",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 28,
    letterSpacing: -0.24,
    color: brownColors["brown-6"], // #524a4e (Figma gray/1 #5C5050와 가장 유사)
  },

  /**
   * 카드 래퍼
   */
  cardWrapper: {
    marginTop: 60,
    width: "100%",
    maxWidth: 353,
    paddingHorizontal: 20,
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
   */
  cardContent: {
    padding: 20,
    paddingHorizontal: 27,
    gap: 40,
  },

  /**
   * 입력 필드 섹션
   */
  inputSection: {
    gap: 16,
  },

  /**
   * 버튼 섹션
   */
  buttonSection: {
    gap: 16,
  },

  /**
   * 회원가입 버튼
   */
  signUpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 8,
  },

  /**
   * 회원가입 텍스트 (일반)
   */
  signUpTextNormal: {
    fontFamily: "Pretendard_Variable",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: -0.1504,
    color: rootColors.text, // #524a4e
  },

  /**
   * 회원가입 텍스트 (볼드)
   */
  signUpTextBold: {
    fontFamily: "Pretendard_Variable",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 20,
    letterSpacing: -0.1504,
    color: rootColors.text, // #524a4e
  },
});
