/**
 * SignUp Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4201:4552
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] nativewind 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { Input } from "@/commons/components/input";
import { RadioGroup } from "@/commons/components/radio";
import { Button } from "@/commons/components/button";
import { styles } from "./styles";

/**
 * SignUp 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 회원가입 페이지
 */
export const SignUp: React.FC = () => {
  // 폼 상태 관리
  const [name, setName] = useState("");
  const [gender, setGender] = useState("female"); // 기본값: 여성 (피그마 디자인 기준)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");

  /**
   * 폼 유효성 검사: 모든 필드가 채워져 있는지 확인
   */
  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    passwordConfirm.trim() !== "" &&
    phone.trim() !== "";

  /**
   * 회원가입 처리
   */
  const handleSignUp = () => {
    // TODO: 실제 회원가입 API 연동
    console.log("SignUp attempt:", {
      name,
      gender,
      email,
      password,
      passwordConfirm,
      phone,
    });
  };

  /**
   * 성별 라디오 옵션
   */
  const genderOptions = [
    { value: "female", label: "여성" },
    { value: "male", label: "남성" },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        keyboardDismissMode="on-drag"
      >
        <ImageBackground
          source={require("@/assets/form-background.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* 전체 콘텐츠 래퍼 */}
          <View style={styles.contentWrapper}>
            {/* 타이틀 영역 */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleMain}>Plan A</Text>
              <Text style={styles.titleSub}>결혼 준비 이제 한 곳 에서,</Text>
            </View>

            {/* 회원가입 카드 */}
            <View style={styles.cardWrapper}>
              {/* Glassmorphism 효과 */}
              <BlurView
                intensity={20}
                tint="light"
                style={styles.blurContainer}
              >
                <View style={styles.cardContent}>
                  {/* 입력 필드 영역 */}
                  <View style={styles.inputSection}>
                    {/* 이름 입력 */}
                    <Input
                      label="이름"
                      placeholder="이름을 입력해주세요."
                      value={name}
                      onChangeText={setName}
                      autoComplete="name"
                      size="medium"
                    />

                    {/* 성별 선택 */}
                    <View style={styles.genderContainer}>
                      <Text style={styles.genderLabel}>성별</Text>
                      <RadioGroup
                        value={gender}
                        onChange={setGender}
                        options={genderOptions}
                        direction="horizontal"
                      />
                    </View>

                    {/* 이메일 입력 */}
                    <Input
                      label="이메일"
                      placeholder="이메일을 입력해주세요."
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      size="medium"
                    />

                    {/* 비밀번호 입력 */}
                    <Input
                      label="비밀번호"
                      placeholder="비밀번호를 입력해주세요."
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoCapitalize="none"
                      autoComplete="password"
                      size="medium"
                    />

                    {/* 비밀번호 확인 입력 */}
                    <Input
                      label="비밀번호 확인"
                      placeholder="비밀번호를 한 번 더 입력해주세요."
                      value={passwordConfirm}
                      onChangeText={setPasswordConfirm}
                      secureTextEntry
                      autoCapitalize="none"
                      autoComplete="password"
                      size="medium"
                    />

                    {/* 연락처 입력 */}
                    <Input
                      label="연락처"
                      placeholder="010-1234-5678"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      autoComplete="tel"
                      size="medium"
                    />
                  </View>

                  {/* 버튼 영역 */}
                  <View style={styles.buttonSection}>
                    {/* 회원가입 버튼 */}
                    <Button
                      variant="filled"
                      size="medium"
                      onPress={handleSignUp}
                      disabled={!isFormValid}
                    >
                      회원가입
                    </Button>
                  </View>
                </View>
              </BlurView>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
