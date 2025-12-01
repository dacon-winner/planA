/**
 * Login Component
 * 버전: v1.1.0
 * 생성 시각: 2025-12-01
 * 피그마 노드ID: 4201:4611
 *
 * 변경 사항:
 * - [x] react-hook-form & zod 적용
 * - [x] useLogin Hook 연결
 * - [x] 유효성 검사 강화
 */

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import { URL_PATHS } from "@/commons/enums/url";
import { styles } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/commons/hooks/useAuth";

// 유효성 검사 스키마 정의
const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

// 폼 데이터 타입 추론
type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Login 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 로그인 페이지
 */
export const Login: React.FC = () => {
  const router = useRouter();
  const loginMutation = useLogin();

  // react-hook-form 설정
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * 로그인 처리
   */
  const onSubmit = (data: LoginFormData) => {
    console.log("📝 [Login] Form Data 제출:", data);

    loginMutation.mutate(data, {
      onSuccess: () => {
        console.log("✅ [Login] 로그인 성공, 홈으로 이동합니다.");
        router.replace(URL_PATHS.HOME);
      },
      onError: (error: any) => {
        if (error.response?.status === 401) {
          Alert.alert(
            "로그인 실패",
            "이메일 또는 비밀번호가 올바르지 않습니다."
          );
        } else {
          Alert.alert(
            "오류 발생",
            "일시적인 오류가 발생했습니다. 다시 시도해주세요."
          );
        }
      },
    });
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
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <Input
                          label="이메일"
                          placeholder="example@plan.com"
                          value={value}
                          onChangeText={onChange}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoComplete="email"
                          size="medium"
                        />
                        {errors.email && (
                          <Text
                            style={{ color: "red", fontSize: 12, marginTop: 4 }}
                          >
                            {errors.email.message}
                          </Text>
                        )}
                      </View>
                    )}
                  />

                  {/* 비밀번호 입력 */}
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <Input
                          label="비밀번호"
                          placeholder="********************"
                          value={value}
                          onChangeText={onChange}
                          secureTextEntry
                          autoCapitalize="none"
                          autoComplete="password"
                          size="medium"
                        />
                        {errors.password && (
                          <Text
                            style={{ color: "red", fontSize: 12, marginTop: 4 }}
                          >
                            {errors.password.message}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                </View>

                {/* 버튼 영역 */}
                <View style={styles.buttonSection}>
                  {/* 로그인 버튼 */}
                  <Button
                    variant="filled"
                    size="medium"
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid || loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "로그인 중..." : "로그인"}
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
