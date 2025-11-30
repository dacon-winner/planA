/**
 * WeddingFormLoading Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-30
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
 */

import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, Animated, Easing } from "react-native";
import { Rose, Gem, PartyPopper } from "lucide-react-native";
import { useRouter } from "expo-router";
import { styles } from "./styles";

/**
 * WeddingFormLoading Props
 */
export interface WeddingFormLoadingProps {
  /** 생성된 플랜 ID */
  planId?: string;
  /** API 성공 여부 (true: 성공, false: 실패) */
  isSuccess?: boolean;
}

/**
 * WeddingFormLoading Component
 * 웨딩 폼 제출 후 로딩 화면
 * 피그마 노드ID: 4048:12225
 */
export const WeddingFormLoading: React.FC<WeddingFormLoadingProps> = ({
  planId,
  isSuccess = true,
}) => {
  const router = useRouter();

  // 회전 애니메이션 값
  const spinValue = useRef(new Animated.Value(0)).current;
  // 아이콘 페이드 애니메이션 값
  const fadeAnim = useRef(new Animated.Value(1)).current;
  // 현재 표시 중인 아이콘 인덱스
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  // 현재 진행 중인 스텝 (자동으로 증가)
  const [currentStep, setCurrentStep] = useState(0);
  // 이미 라우팅 완료 여부 (중복 라우팅 방지)
  const hasNavigated = useRef(false);
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

  // 아이콘 목록 (피그마 노드ID: 4058:12430, 4058:12575, 4058:12578)
  const icons = [
    { Component: Rose, key: "rose" }, // 장미
    { Component: Gem, key: "gem" }, // 보석
    { Component: PartyPopper, key: "partyPopper" }, // 파티/축하
  ];

  useEffect(() => {
    // 무한 회전 애니메이션
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500, // 1.5초에 한 바퀴
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    return () => {
      spinAnimation.stop();
    };
  }, [spinValue]);

  useEffect(() => {
    // 아이콘 전환 애니메이션
    const iconChangeInterval = setInterval(() => {
      // 페이드 아웃
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        // 다음 아이콘으로 변경
        setCurrentIconIndex((prev) => (prev + 1) % icons.length);
        // 페이드 인
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }, 1250); // 1.25초마다 아이콘 변경

    return () => {
      clearInterval(iconChangeInterval);
    };
  }, [fadeAnim, icons.length]);

  useEffect(() => {
    // 스텝 진행 애니메이션 (3.75초 동안 4개 스텝 완료 + 마지막 스텝 완료 애니메이션)
    // 4개 스텝 진행: 0.9375초 * 4 = 3.75초
    // 마지막 스텝 완료 애니메이션 보여주기: 0.5초 추가
    const stepInterval = setInterval(() => {
      // 이미 라우팅 완료되었으면 스텝 순환 중지
      if (hasNavigated.current) return;

      setCurrentStep((prev) => {
        // 4에 도달하면 더 이상 순환하지 않음
        if (prev >= 4) return prev;
        return prev + 1;
      });
    }, 937.5); // 0.9375초마다 스텝 변경

    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 0) {
      // 초기화: 모든 애니메이션 리셋
      checkmarkAnims.forEach((anim) => {
        anim.setValue(0);
      });
      stepBgAnims.forEach((anim, index) => {
        anim.setValue(index === 0 ? 0.5 : 0); // 첫 번째 스텝은 진행 중
      });
    } else if (currentStep === 4) {
      // 마지막 스텝(3) 완료 애니메이션
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

      // 스텝 완료 후 0.5초 대기 후 라우팅 (중복 방지)
      const navigationTimer = setTimeout(() => {
        if (hasNavigated.current) return; // 이미 라우팅 완료됨

        if (isSuccess) {
          // API 성공 시 plans/[id] 페이지로 이동
          // TODO: 실제 API에서 받은 planId 사용
          hasNavigated.current = true; // 라우팅 완료 표시
          const targetPlanId = planId || "demo-plan-123";
          router.push(`/(tabs)/plans/${targetPlanId}`);
        } else {
          // TODO: 실패 시 모달 표시 (나중에 구현)
          console.log("API 실패: 모달 표시 예정");
        }
      }, 500);

      return () => {
        clearTimeout(navigationTimer);
      };
    } else if (currentStep > 0 && currentStep <= 3) {
      // 이전 스텝 완료: 체크마크와 배경색 동시에 채워짐
      const prevStepIndex = currentStep - 1;

      // 체크마크 애니메이션
      Animated.timing(checkmarkAnims[prevStepIndex], {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.back(1.2)), // 살짝 튀는 효과
        useNativeDriver: true,
      }).start();

      // 배경색 애니메이션 (체크마크와 동시에)
      Animated.timing(stepBgAnims[prevStepIndex], {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();

      // 현재 진행 중인 스텝의 배경색 (약간 채워진 상태)
      if (currentStep < 4) {
        Animated.timing(stepBgAnims[currentStep], {
          toValue: 0.5, // 진행 중일 때는 50% 투명도
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
    }
  }, [currentStep, checkmarkAnims, stepBgAnims, isSuccess, planId, router]);

  // 0 -> 360도 회전
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // 로딩 스텝 목록
  const steps = [
    "예비 신부님의 정보를 분석하고 있어요",
    "최적의 스튜디오를 찾고 있어요",
    "드레스와 메이크업을 큐레이션하고 있어요",
    "완벽한 웨딩홀을 검색하고 있어요",
  ];

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <View style={styles.backgroundWrapper}>
        <Image
          source={require("@/assets/loading-background.png")}
          style={styles.gradientBackground}
        />
      </View>

      {/* Content Wrapper - Flexbox 구조 */}
      <View style={styles.contentWrapper}>
        {/* Top Text Content */}
        <View style={styles.topTextContainer}>
          <Text style={styles.loadingText}>
            AI가{"\n"}예비신부님을 위한{"\n"}맞춤 정보를 찾고 있어요
          </Text>
        </View>

        {/* Spinner Container */}
        <View style={styles.spinnerContainer}>
          {/* 회전하는 스피너 */}
          <Animated.View
            style={{
              transform: [{ rotate: spin }],
            }}
          >
            <Image
              source={require("@/assets/spiner-with-bg.png")}
              style={styles.spinner}
            />
          </Animated.View>

          {/* 중앙 아이콘 (회전하지 않음) */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            {React.createElement(icons[currentIconIndex].Component, {
              color: "#FFFFFF",
              size: 88,
              strokeWidth: 1.5,
            })}
          </Animated.View>
        </View>

        {/* Bottom Steps Container */}
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => {
            // 체크마크 스케일 및 투명도 애니메이션
            const checkmarkScale = checkmarkAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            });
            const checkmarkOpacity = checkmarkAnims[index];

            // 배경색 투명도 애니메이션
            const bgOpacity = stepBgAnims[index];
            const backgroundColor = bgOpacity.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [
                "rgba(230, 68, 133, 0.15)", // inactive 상태
                "rgba(230, 68, 133, 0.5)", // 진행 중 상태
                "rgba(230, 68, 133, 1)", // 완료 상태
              ],
            });

            return (
              <View key={index} style={styles.stepWrapper}>
                <View style={styles.stepContent}>
                  {/* Step Indicator */}
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
                            opacity: checkmarkOpacity,
                            transform: [{ scale: checkmarkScale }],
                          },
                        ]}
                      >
                        ✓
                      </Animated.Text>
                    )}
                  </Animated.View>
                  {/* Step Text */}
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
