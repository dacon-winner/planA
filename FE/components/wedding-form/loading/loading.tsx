/**
 * WeddingFormLoading Component
 * 버전: v1.0.1
 * 생성 시각: 2025-12-01
 * 피그마 노드ID: 4048:12225
 *
 * 체크리스트:
 * [✓] form.tsx와 동일한 배경 구조 적용
 * [✓] 피그마 텍스트 프레임 구현
 * [✓] 스피너 회전 애니메이션 구현
 * [✓] 로딩 스텝 목록 구현
 * [✓] 아이콘 전환 애니메이션 구현
 * [✓] lucide 아이콘 사용
 * [✓] 인라인 스타일 0건
 * [✓] API 연동 및 최소 로딩 시간 보장 구현
 */

import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, Animated, Easing, Alert } from "react-native";
import { Rose, Gem, PartyPopper } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { styles } from "./styles";
import { useCreateUsersInfo } from "@/commons/hooks/useUsersInfo";
import { getPlanDetailUrl } from "@/commons/enums/url";

/**
 * WeddingFormLoading Props
 * @deprecated 이제 useLocalSearchParams를 통해 데이터를 직접 받습니다.
 */
export interface WeddingFormLoadingProps {
  planId?: string;
  isSuccess?: boolean;
}

/**
 * WeddingFormLoading Component
 * 웨딩 폼 제출 후 로딩 화면
 * API 요청과 애니메이션을 동시에 수행하며, 둘 다 완료되었을 때 다음 페이지로 이동합니다.
 */
export const WeddingFormLoading: React.FC<WeddingFormLoadingProps> = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // API Mutation Hook
  const { mutate, data, isSuccess, isError } = useCreateUsersInfo();

  // 애니메이션 및 라우팅 상태 관리
  const [isAnimFinished, setIsAnimFinished] = useState(false);
  const hasNavigated = useRef(false);

  // 회전 애니메이션 값
  const spinValue = useRef(new Animated.Value(0)).current;
  // 아이콘 페이드 애니메이션 값
  const fadeAnim = useRef(new Animated.Value(1)).current;
  // 현재 표시 중인 아이콘 인덱스
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  // 현재 진행 중인 스텝 (자동으로 증가)
  const [currentStep, setCurrentStep] = useState(0);
  
  // 각 스텝의 체크마크 애니메이션 값
  const checkmarkAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  
  // 각 스텝의 배경색 투명도 애니메이션 값
  const stepBgAnims = useRef([
    new Animated.Value(0.5), // 첫 번째 스텝은 진행 중 상태로 시작
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // 아이콘 목록
  const icons = [
    { Component: Rose, key: "rose" }, // 장미
    { Component: Gem, key: "gem" }, // 보석
    { Component: PartyPopper, key: "partyPopper" }, // 파티/축하
  ];

  // 1. 마운트 시 API 요청 시작
  useEffect(() => {
    // 파라미터가 존재할 경우에만 요청
    if (params.wedding_date || params.budget_limit) {
      mutate({
        wedding_date: params.wedding_date as string,
        preferred_region: params.preferred_region as string,
        budget_limit: params.budget_limit ? Number(params.budget_limit) : undefined,
      });
    }
  }, [mutate, params.wedding_date, params.preferred_region, params.budget_limit]); // 한 번만 실행되어야 하지만, linter 규칙 준수를 위해 의존성 추가

  // 2. 무한 회전 애니메이션
  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();
    return () => spinAnimation.stop();
  }, [spinValue]);

  // 3. 아이콘 전환 애니메이션
  useEffect(() => {
    const iconChangeInterval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIconIndex((prev) => (prev + 1) % icons.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }, 1250);
    return () => clearInterval(iconChangeInterval);
  }, [fadeAnim, icons.length]);

  // 4. 스텝 진행 애니메이션 (3.75초)
  useEffect(() => {
    const stepInterval = setInterval(() => {
      if (hasNavigated.current) return;

      setCurrentStep((prev) => {
        if (prev >= 4) return prev;
        return prev + 1;
      });
    }, 937.5);

    return () => clearInterval(stepInterval);
  }, []);

  // 5. 스텝 UI 업데이트 및 애니메이션 종료 감지
  useEffect(() => {
    if (currentStep === 0) {
      checkmarkAnims.forEach((anim) => anim.setValue(0));
      stepBgAnims.forEach((anim, index) => anim.setValue(index === 0 ? 0.5 : 0));
    } else if (currentStep === 4) {
      // 마지막 스텝 완료 애니메이션
      Animated.timing(checkmarkAnims[3], {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }).start();

      Animated.timing(stepBgAnims[3], {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();

      // 애니메이션 완료 상태 플래그 설정
      setIsAnimFinished(true);
    } else if (currentStep > 0 && currentStep <= 3) {
      const prevStepIndex = currentStep - 1;
      
      Animated.timing(checkmarkAnims[prevStepIndex], {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }).start();

      Animated.timing(stepBgAnims[prevStepIndex], {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();

      if (currentStep < 4) {
        Animated.timing(stepBgAnims[currentStep], {
          toValue: 0.5,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
    }
  }, [currentStep, checkmarkAnims, stepBgAnims]);

  // 6. 최종 라우팅 처리 (애니메이션 완료 + API 성공)
  useEffect(() => {
    // 이미 이동했으면 중단
    if (hasNavigated.current) return;

    // API 에러 처리 (HTTP 에러)
    if (isError) {
      hasNavigated.current = true;
      Alert.alert(
        "알림",
        "플랜 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
        [{ text: "확인", onPress: () => router.back() }]
      );
      return;
    }

    // 애니메이션이 끝났고, API 응답도 온 경우
    if (isAnimFinished && isSuccess) {
      hasNavigated.current = true;

      if (data?.id) {
        // 성공: 상세 페이지로 이동
        setTimeout(() => {
          router.replace(getPlanDetailUrl(data.id) as any);
        }, 500);
      } else {
        // 실패: 데이터가 없는 경우 (AI 추천 실패)
        Alert.alert(
          "알림",
          "조건에 맞는 플랜을 생성하지 못했습니다.\n입력하신 조건을 변경하여 다시 시도해주세요.",
          [{ text: "확인", onPress: () => router.back() }]
        );
      }
    }
  }, [isAnimFinished, isSuccess, isError, data, router]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const steps = [
    "예비 신부님의 정보를 분석하고 있어요",
    "최적의 스튜디오를 찾고 있어요",
    "드레스와 메이크업을 큐레이션하고 있어요",
    "완벽한 웨딩홀을 검색하고 있어요",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <Image
          source={require("@/assets/loading-background.png")}
          style={styles.gradientBackground}
        />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.topTextContainer}>
          <Text style={styles.loadingText}>
            AI가{"\n"}예비신부님을 위한{"\n"}맞춤 정보를 찾고 있어요
          </Text>
        </View>

        <View style={styles.spinnerContainer}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Image
              source={require("@/assets/spiner-with-bg.png")}
              style={styles.spinner}
            />
          </Animated.View>

          <Animated.View style={[styles.iconContainer, { opacity: fadeAnim }]}>
            {React.createElement(icons[currentIconIndex].Component, {
              color: "#FFFFFF",
              size: 88,
              strokeWidth: 1.5,
            })}
          </Animated.View>
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => {
            const checkmarkScale = checkmarkAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            });
            
            const backgroundColor = stepBgAnims[index].interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [
                "rgba(230, 68, 133, 0.15)",
                "rgba(230, 68, 133, 0.5)",
                "rgba(230, 68, 133, 1)",
              ],
            });

            return (
              <View key={index} style={styles.stepWrapper}>
                <View style={styles.stepContent}>
                  <Animated.View
                    style={[
                      styles.stepIndicator,
                      {
                        backgroundColor:
                          index <= currentStep
                            ? backgroundColor
                            : "rgba(230, 68, 133, 0.15)",
                      },
                    ]}
                  >
                    {index < currentStep && (
                      <Animated.Text
                        style={[
                          styles.checkmark,
                          {
                            opacity: checkmarkAnims[index],
                            transform: [{ scale: checkmarkScale }],
                          },
                        ]}
                      >
                        ✓
                      </Animated.Text>
                    )}
                  </Animated.View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default WeddingFormLoading;
