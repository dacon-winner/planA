import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

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
  

  return <Stack />;
}
