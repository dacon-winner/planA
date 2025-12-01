import { memo } from "react";
import { Text } from "react-native";
import { styles } from "./styles";

interface InputErrorProps {
  message?: string;
}

export const InputErrorText = memo(({ message }: InputErrorProps) => {
  if (!message) return null;

  return <Text style={styles.errorText}>{message}</Text>;
});

InputErrorText.displayName = "InputErrorText";


