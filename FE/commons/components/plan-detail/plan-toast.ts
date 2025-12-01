import { Toast } from "@/commons/components/toast-message";

type PlanToastVariant = "success" | "error" | "info";

interface PlanToastOptions {
  variant?: PlanToastVariant;
  message: string;
}

export const showPlanToast = ({
  variant = "info",
  message,
}: PlanToastOptions) => {
  switch (variant) {
    case "success":
      Toast.success(message);
      break;
    case "error":
      Toast.error(message);
      break;
    default:
      Toast.show({
        type: "info",
        text1: message,
      });
  }
};


