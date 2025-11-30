/**
 * TabLayout Component
 * 버전: 1.1.0
 * 생성 시각: 2025-11-14
 * 업데이트: 2025-11-30
 * 규칙 준수: 03-ui.mdc, figma
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건 (styles.ts로 분리)
 * - [x] 시맨틱 구조 유지
 * - [x] Figma 디자인 준수 (노드ID: 4069:14184)
 * - [x] lucide-react-native 아이콘 사용
 */

import { Tabs } from "expo-router";
import { Home, Search, CalendarDays, User } from "lucide-react-native";
import { tabLayoutStyles } from "./styles";
import { TAB_LABELS } from "@/commons/enums/gnb";

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabLayoutStyles.screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: TAB_LABELS.HOME,
          tabBarIcon: ({ color }) => <Home size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: TAB_LABELS.SEARCH,
          tabBarIcon: ({ color }) => <Search size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: TAB_LABELS.SCHEDULE,
          tabBarIcon: ({ color }) => <CalendarDays size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="myinfo"
        options={{
          title: TAB_LABELS.MY_INFO,
          tabBarIcon: ({ color }) => <User size={20} color={color} />,
        }}
      />
      {/* 플랜 상세 페이지 - 탭 바에는 표시하지 않음 */}
      <Tabs.Screen
        name="plans/[id]/index"
        options={{
          href: null, // 탭 바에서 숨김
        }}
      />
    </Tabs>
  );
}
