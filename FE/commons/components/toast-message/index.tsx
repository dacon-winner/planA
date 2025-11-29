/**
 * Toast Message Component
 * 토스트 메시지 표시를 위한 컴포넌트
 */

import React from "react";
import { View, Text } from "react-native";
import ToastLib from "react-native-toast-message";
import { CircleCheck, ShieldAlert } from "lucide-react-native";
import { toastMessageStyles } from "./styles";

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
const SuccessToast = (props: any) => (
  <View style={toastMessageStyles.container}>
    <CircleCheck size={16} color="#ffffff" strokeWidth={2} />
    <Text style={toastMessageStyles.text}>{props.text1}</Text>
  </View>
);

/**
 * Error Toast 컴포넌트
 */
const ErrorToast = (props: any) => (
  <View style={toastMessageStyles.container}>
    <ShieldAlert size={16} color="#ffffff" strokeWidth={2} />
    <Text style={toastMessageStyles.text}>{props.text1}</Text>
  </View>
);

/**
 * 토스트 설정 객체
 */
export const toastConfig = {
  success: SuccessToast,
  error: ErrorToast,
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
