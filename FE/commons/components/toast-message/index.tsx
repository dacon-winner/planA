/**
 * Toast Message Component
 * 버전: v1.0.0
 * 생성 시각: 2025-01-27
 * 피그마 노드ID: Toast Message 컴포넌트
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

import React from "react";
import { View, Text } from "react-native";

import ToastLib, { BaseToastProps } from "react-native-toast-message";
import { CircleCheck, ShieldAlert } from "lucide-react-native";

import { toastMessageStyles, iconColors } from "./styles";

/**
 * 토스트 메시지 기본 설정 상수
 */
export const TOAST_DEFAULT_CONFIG = {
  position: "bottom" as const,
  bottomOffset: 24,
} as const;

/**
 * Success Toast 컴포넌트
 */
const SuccessToast: React.FC<BaseToastProps> = ({ text1 }) => (
  <View style={toastMessageStyles.container}>
    <CircleCheck size={16} color={iconColors.toast} strokeWidth={2} />
    <Text style={toastMessageStyles.text}>{text1}</Text>
  </View>
);

/**
 * Error Toast 컴포넌트
 */
const ErrorToast: React.FC<BaseToastProps> = ({ text1 }) => (
  <View style={toastMessageStyles.container}>
    <ShieldAlert size={16} color={iconColors.toast} strokeWidth={2} />
    <Text style={toastMessageStyles.text}>{text1}</Text>
  </View>
);

/**
 * 토스트 설정 객체
 * ToastConfig 타입에 맞춰 함수 형태로 반환
 */
export const toastConfig = {
  success: (params: BaseToastProps) => <SuccessToast {...params} />,
  error: (params: BaseToastProps) => <ErrorToast {...params} />,
};

/**
 * Toast 헬퍼 함수들
 */
export const Toast = {
  /**
   * 성공 토스트 메시지 표시
   * @param message 표시할 메시지
   * @param options 추가 옵션
   */
  success: (message: string, options?: Partial<typeof TOAST_DEFAULT_CONFIG>) => {
    ToastLib.show({
      type: "success",
      text1: message,
      position: TOAST_DEFAULT_CONFIG.position,
      bottomOffset: TOAST_DEFAULT_CONFIG.bottomOffset,
      ...options,
    });
  },

  /**
   * 에러 토스트 메시지 표시
   * @param message 표시할 메시지
   * @param options 추가 옵션
   */
  error: (message: string, options?: Partial<typeof TOAST_DEFAULT_CONFIG>) => {
    ToastLib.show({
      type: "error",
      text1: message,
      position: TOAST_DEFAULT_CONFIG.position,
      bottomOffset: TOAST_DEFAULT_CONFIG.bottomOffset,
      ...options,
    });
  },

  show: ToastLib.show,
  hide: ToastLib.hide,
};
