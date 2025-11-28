/**
 * Home Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { HOME_CONTENT } from "@/commons/enums/gnb";
import Button from "@/commons/components/button";

export default function Home() {
  return (
    <View style={styles["home-container"]}>
      <Text style={styles["home-title"]}>{HOME_CONTENT.TITLE}</Text>
      <Text style={styles["home-subtitle"]}>{HOME_CONTENT.SUBTITLE}</Text>
      <StatusBar style="auto" />
      <Button
        variant="outlined"
        size="small"
        onPress={() => console.log("cancel")}
      >
        취소
      </Button>
      <Button disabled={true}>예약 신청</Button>
    </View>
  );
}
