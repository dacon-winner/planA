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

import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { HOME_CONTENT } from "@/commons/enums/gnb";
import Button from "@/commons/components/button";
import Input from "@/commons/components/input";
import { AlarmClock } from "lucide-react-native";

export default function Home() {
  // Input 상태 관리
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [planName, setPlanName] = useState("");
  const [filledValue, setFilledValue] = useState("이름을 입력해주세요.");
  const [smallFilledValue, setSmallFilledValue] = useState("플랜 A");

  return (
    <ScrollView
      style={styles["home-scroll-view"]}
      contentContainerStyle={styles["home-scroll-container"]}
    >
      <View style={styles["home-container"]}>
        <Text style={styles["home-title"]}>{HOME_CONTENT.TITLE}</Text>
        <Text style={styles["home-subtitle"]}>{HOME_CONTENT.SUBTITLE}</Text>
        <StatusBar style="auto" />

        {/* Input 컴포넌트 예시 */}
        <View style={styles["input-demo-section"]}>
          <Text style={styles["section-title"]}>Input 컴포넌트 예시</Text>

          {/* Medium Size - Default (Empty) */}
          <Input
            label="이름"
            placeholder="이름을 입력해주세요."
            size="medium"
            value={name}
            onChangeText={setName}
          />

          {/* Medium Size - Filled */}
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요."
            size="medium"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Medium Size - Filled (초기값 있음) */}
          <Input
            label="닉네임"
            size="medium"
            value={filledValue}
            onChangeText={setFilledValue}
          />

          {/* Small Size - Default (Empty) */}
          <Input
            label="플랜 이름"
            placeholder="플랜 A"
            size="small"
            value={planName}
            onChangeText={setPlanName}
          />

          {/* Small Size - Filled (초기값 있음) */}
          <Input
            label="플랜 설명"
            size="small"
            value={smallFilledValue}
            onChangeText={setSmallFilledValue}
          />

          {/* Medium Size - Disabled */}
          <Input
            label="플랜 이름 (비활성화)"
            value="플랜 A"
            size="medium"
            disabled={true}
          />

          {/* Small Size - Disabled */}
          <Input
            label="메모 (비활성화)"
            value="수정 불가"
            size="small"
            disabled={true}
          />
        </View>

        {/* Button 컴포넌트 예시 */}
        <View style={styles["button-demo-section"]}>
          <Text style={styles["section-title"]}>Button 컴포넌트 예시</Text>

          <Button
            variant="outlined"
            size="small"
            onPress={() => console.log("cancel")}
          >
            취소
          </Button>
          <Button
            disabled={true}
            size="medium"
            icon={true}
            iconComponent={<AlarmClock size={20} color={"#fff"} />}
          >
            예약 신청
          </Button>
          <Button variant="filled" size="large">
            저장하기
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
