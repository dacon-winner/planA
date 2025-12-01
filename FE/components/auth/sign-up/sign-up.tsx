/**
 * SignUp Component
 * 버전: v1.1.0
 * 생성 시각: 2025-12-01
 * 피그마 노드ID: 4201:4552
 *
 * 변경 사항:
 * - [x] react-hook-form & zod 적용
 * - [x] useSignUp Hook 연결
 * - [x] 유효성 검사 강화
 */

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { Input } from "@/commons/components/input";
import { RadioGroup } from "@/commons/components/radio";
import { Button } from "@/commons/components/button";
import { URL_PATHS } from "@/commons/enums/url"; // URL_PATHS import 추가 필요
import { styles } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/commons/hooks/useAuth";
import { useRouter } from "expo-router"; // useRouter import 추가 필요
import { getApiErrorMessage } from "@/commons/utils";
import { InputErrorText } from "./input-error";

// 유효성 검사 스키마 정의
const signUpSchema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요."),
    gender: z.string(), // 기본값 설정으로 필수 체크는 생략 가능하지만 명시
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "영문, 숫자, 특수문자를 모두 포함해야 합니다."
      ),
    passwordConfirm: z.string().min(1, "비밀번호를 확인해주세요."),
    phone: z
      .string()
      .regex(/^010-\d{4}-\d{4}$/, "010-0000-0000 형식으로 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

// 폼 데이터 타입 추론
type SignUpFormData = z.infer<typeof signUpSchema>;

/**
 * SignUp 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 회원가입 페이지
 */
export const SignUp: React.FC = () => {
  // useRouter Hook 사용
  const router = useRouter();
  // useSignUp Hook 사용
  const signUpMutation = useSignUp();

  // react-hook-form 설정
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange", // 입력 시 실시간 검증
    defaultValues: {
      name: "",
      gender: "female",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
    },
  });

  /**
   * 회원가입 처리
   */
  const onSubmit = (data: SignUpFormData) => {
    console.log("📝 [SignUp] Form Data 제출:", data);

    signUpMutation.mutate(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        gender: data.gender.toUpperCase(), // 서버 요구사항: 'MALE' or 'FEMALE'
        phone: data.phone,
      },
      {
        onSuccess: () => {
          console.log("✅ [SignUp] 회원가입 성공, 폼 작성 페이지로 이동합니다.");
          router.replace(URL_PATHS.FORM);
        },
        onError: (error) => {
          const message = getApiErrorMessage(
            error,
            "일시적인 오류가 발생했습니다. 다시 시도해주세요."
          );
          Alert.alert("회원가입 실패", message);
        },
      }
    );
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        bounces={false}
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
                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <Input
                            label="이름"
                            placeholder="이름을 입력해주세요."
                            value={value}
                            onChangeText={onChange}
                            autoComplete="name"
                            size="medium"
                          />
                          <InputErrorText message={errors.name?.message} />
                        </View>
                      )}
                    />

                    {/* 성별 선택 */}
                    <View style={styles.genderContainer}>
                      <Text style={styles.genderLabel}>성별</Text>
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                          <RadioGroup
                            value={value || ""}
                            onChange={onChange}
                            options={genderOptions}
                            direction="horizontal"
                          />
                        )}
                      />
                    </View>

                    {/* 이메일 입력 */}
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <Input
                            label="이메일"
                            placeholder="이메일을 입력해주세요."
                            value={value}
                            onChangeText={onChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            size="medium"
                          />
                          <InputErrorText message={errors.email?.message} />
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
                            placeholder="비밀번호를 입력해주세요."
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                            autoCapitalize="none"
                            autoComplete="password"
                            size="medium"
                          />
                          <InputErrorText message={errors.password?.message} />
                        </View>
                      )}
                    />

                    {/* 비밀번호 확인 입력 */}
                    <Controller
                      control={control}
                      name="passwordConfirm"
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <Input
                            label="비밀번호 확인"
                            placeholder="비밀번호를 한 번 더 입력해주세요."
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                            autoCapitalize="none"
                            autoComplete="password"
                            size="medium"
                          />
                          <InputErrorText
                            message={errors.passwordConfirm?.message}
                          />
                        </View>
                      )}
                    />

                    {/* 연락처 입력 */}
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field: { onChange, value } }) => (
                        <View>
                          <Input
                            label="연락처"
                            placeholder="010-1234-5678"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="phone-pad"
                            autoComplete="tel"
                            size="medium"
                          />
                          <InputErrorText message={errors.phone?.message} />
                        </View>
                      )}
                    />
                  </View>

                  {/* 버튼 영역 */}
                  <View style={styles.buttonSection}>
                    {/* 회원가입 버튼 */}
                    <Button
                      variant="filled"
                      size="medium"
                      onPress={handleSubmit(onSubmit)}
                      disabled={!isValid || signUpMutation.isPending}
                    >
                      {signUpMutation.isPending ? "가입 중..." : "회원가입"}
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
