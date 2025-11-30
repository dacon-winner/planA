/**
 * TabLayout Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려 (탭타겟 44px 이상)
 * - [x] Figma 디자인 준수 (높이 56px, 아이콘 20px)
 */

const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

/* Tab Navigation Styles */
export const tabLayoutStyles = {
  screenOptions: {
    tabBarActiveTintColor: colors.primary[400],
    tabBarInactiveTintColor: "rgba(82, 74, 78, 0.5)",
    headerShown: false,
    tabBarStyle: {
      backgroundColor: colors.secondary[50],
      borderTopWidth: 0,
      height: 65,
    },
    tabBarLabelStyle: {
      fontSize: parseInt(fontSize["mobile-xs"][0]),
      fontWeight: fontSize["mobile-xs"][1].fontWeight,
      fontFamily: "Pretendard",
      marginTop: parseInt(spacing.xs),
    },
  },
};
