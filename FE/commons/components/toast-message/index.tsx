import React from 'react';
import { View, Text } from 'react-native';
import ToastLib from 'react-native-toast-message';
import { CircleCheck, ShieldAlert } from 'lucide-react-native';
import { toastMessageStyles } from './styles';

// 토스트 메시지 기본 설정 상수
export const TOAST_DEFAULT_CONFIG = {
  position: 'bottom' as const,
  bottomOffset: 24,
} as const;

const SuccessToast = ({ text1 }: any) => (
  <View style={toastMessageStyles.container}>
    <CircleCheck
      size={16}
      color="#ffffff"
      strokeWidth={2}
    />
    <Text style={toastMessageStyles.text}>{text1}</Text>
  </View>
);

const ErrorToast = ({ text1 }: any) => (
  <View style={toastMessageStyles.container}>
    <ShieldAlert
      size={16}
      color="#ffffff"
      strokeWidth={2}
    />
    <Text style={toastMessageStyles.text}>{text1}</Text>
  </View>
);

export const toastConfig = {
  success: SuccessToast,
  error: ErrorToast,
};

// Toast.success, Toast.error 헬퍼 함수
export const Toast = {
  success: (message: string, options?: Partial<typeof TOAST_DEFAULT_CONFIG>) => {
    ToastLib.show({
      type: 'success',
      text1: message,
      position: TOAST_DEFAULT_CONFIG.position,
      bottomOffset: TOAST_DEFAULT_CONFIG.bottomOffset,
      ...options,
    });
  },
  error: (message: string, options?: Partial<typeof TOAST_DEFAULT_CONFIG>) => {
    ToastLib.show({
      type: 'error',
      text1: message,
      position: TOAST_DEFAULT_CONFIG.position,
      bottomOffset: TOAST_DEFAULT_CONFIG.bottomOffset,
      ...options,
    });
  },
  show: ToastLib.show,
  hide: ToastLib.hide,
};
