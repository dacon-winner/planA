import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastLib from "react-native-toast-message";
import { AuthProvider } from "../commons/providers/auth/auth.provider";
import { ReactQueryProvider } from "../commons/providers/react-query/react-query.provider";
import { ModalProvider } from "../commons/providers/modal/modal.provider";
// import { PlanStateProvider } from "../commons/providers/plan-state/plan-state.provider";
import { toastConfig } from "../commons/components/toast-message";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    "Pretendard-Thin": require("../assets/fonts/Pretendard-Thin.otf"),
    "Pretendard-ExtraLight": require("../assets/fonts/Pretendard-ExtraLight.otf"),
    "Pretendard-Light": require("../assets/fonts/Pretendard-Light.otf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.otf"),
    "Pretendard-Black": require("../assets/fonts/Pretendard-Black.otf"),
    Pretendard: require("../assets/fonts/Pretendard-Regular.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ReactQueryProvider>
          <ModalProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <ToastLib config={toastConfig} position="bottom" />
          </ModalProvider>
        </ReactQueryProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
