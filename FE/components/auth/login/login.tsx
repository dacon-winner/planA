/**
 * Login Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
 * 피그마 노드ID: 4201:4611
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
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import { URL_PATHS } from "@/commons/enums/url";
import { styles } from "./styles";

/**
 * Login 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 로그인 페이지
 */
export const Login: React.FC = () => {
  const router = useRouter();

  // 폼 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 폼 유효성 검사 - 이메일과 비밀번호가 모두 입력되었는지 확인
  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  /**
   * 로그인 처리
   */
  const handleLogin = () => {
    // TODO: 실제 로그인 API 연동
    console.log("Login attempt:", { email, password });
  };

  /**
   * 회원가입 페이지로 이동
   */
  const handleSignUp = () => {
    router.push(URL_PATHS.AUTH_SIGNUP);
  };

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
          {/* 타이틀 영역 */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleMain}>Plan A</Text>
            <Text style={styles.titleSub}>결혼 준비 이제 한 곳 에서,</Text>
          </View>

          {/* 로그인 카드 */}
          <View style={styles.cardWrapper}>
            {/* Glassmorphism 효과 */}
            <BlurView intensity={20} tint="light" style={styles.blurContainer}>
              <View style={styles.cardContent}>
                {/* 입력 필드 영역 */}
                <View style={styles.inputSection}>
                  {/* 이메일 입력 */}
                  <Input
                    label="이메일"
                    placeholder="example@plan.com"
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
                    placeholder="********************"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    size="medium"
                  />
                </View>

                {/* 버튼 영역 */}
                <View style={styles.buttonSection}>
                  {/* 로그인 버튼 */}
                  <Button
                    variant="filled"
                    size="medium"
                    onPress={handleLogin}
                    disabled={!isFormValid}
                  >
                    로그인
                  </Button>

                  {/* 회원가입 링크 */}
                  <Pressable
                    style={styles.signUpButton}
                    onPress={handleSignUp}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="회원가입 페이지로 이동"
                  >
                    <Text style={styles.signUpTextNormal}>
                      아직 회원이 아니신가요?{" "}
                    </Text>
                    <Text style={styles.signUpTextBold}>회원가입</Text>
                  </Pressable>
                </View>
              </View>
            </BlurView>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
