import SignUp from "@/components/auth/sign-up/sign-up";
import { Stack } from "expo-router";

export default function SignUpScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "회원가입",
          headerBackTitle: " ",
          headerTransparent: true,
          headerTintColor: "#524a4e",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerShadowVisible: false,
        }}
      />
      <SignUp />
    </>
  );
}
