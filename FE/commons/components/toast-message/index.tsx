import React from 'react';
import { View, Text } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { CircleCheck, ShieldAlert } from 'lucide-react-native';
import { toastMessageStyles } from './styles';

const SuccessToast = (props: any) => (
  <BaseToast
    {...props}
    style={toastMessageStyles.container}
    contentContainerStyle={toastMessageStyles.content}
    text1Style={toastMessageStyles.text}
    renderLeadingIcon={() => (
      <CircleCheck
        size={16}
        color="#ffffff"
        strokeWidth={2}
        style={toastMessageStyles.icon}
      />
    )}
  />
);

const ErrorToast = (props: any) => (
  <BaseToast
    {...props}
    style={toastMessageStyles.container}
    contentContainerStyle={toastMessageStyles.content}
    text1Style={toastMessageStyles.text}
    renderLeadingIcon={() => (
      <ShieldAlert
        size={16}
        color="#ffffff"
        strokeWidth={2}
        style={toastMessageStyles.icon}
      />
    )}
  />
);

export const toastConfig = {
  success: SuccessToast,
  error: ErrorToast,
};
