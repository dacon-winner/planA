import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "../commons/providers/auth/auth.provider";
import { ReactQueryProvider } from "../commons/providers/react-query/react-query.provider";
import { ModalProvider } from "../commons/providers/modal/modal.provider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    PretendardVariable: require("../assets/fonts/PretendardVariable.ttf"),
  });
  
  if (!loaded) {
    return null;
  }
  

  return (
    <AuthProvider>
      <ReactQueryProvider>
        <ModalProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ModalProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
