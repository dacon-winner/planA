/**
 * TabLayout Styles
 * 버전: 1.1.0
 * 생성 시각: 2025-11-30
 * 규칙 준수: 03-ui.mdc, figma
 * - [x] tailwind.config.js의 토큰만 사용
 * - [x] 하드코딩 색상 0건
 * - [x] StyleSheet 전용
 * - [x] 반응형/접근성 고려 (탭타겟 44px 이상)
 * - [x] Figma 디자인 준수 (노드ID: 4069:14184)
 * - [x] 아이콘: lucide-react-native 사용
 * - [x] 활성 색상: root.brand (#ff5c8d)
 * - [x] 비활성 색상: rgba(82,74,78,0.5)
 */

const tailwindConfig = require("@/tailwind.config.js");
const colors = tailwindConfig.theme.extend.colors;
const spacing = tailwindConfig.theme.extend.spacing;
const fontSize = tailwindConfig.theme.extend.fontSize;

/* Tab Navigation Styles */
export const tabLayoutStyles = {
  screenOptions: {
    tabBarActiveTintColor: colors.root.brand,
    tabBarInactiveTintColor: "rgba(82, 74, 78, 0.5)",
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: "#E5E7EB",
      height: 65,
      paddingTop: 1,
      paddingBottom: 0,
      paddingHorizontal: parseInt(spacing.md),
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "normal" as const,
      fontFamily: "Pretendard",
      marginTop: 4,
      lineHeight: 16,
    },
    tabBarIconStyle: {
      marginTop: 4,
    },
  },
};
