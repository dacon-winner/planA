import SignUp from "@/components/auth/sign-up/sign-up";
import { Stack } from "expo-router";

export default function SignUpScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SignUp />
    </>
  );
}
