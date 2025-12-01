import axios, { AxiosError } from "axios";

type ErrorResponse = {
  message?: string;
};

const STATUS_MESSAGE_MAP: Record<number, string> = {
  400: "입력 정보를 확인해주세요.",
  401: "세션이 만료되었습니다. 다시 로그인해주세요.",
  409: "이미 사용 중인 정보입니다.",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

const DEFAULT_ERROR_MESSAGE =
  "일시적인 오류가 발생했습니다. 다시 시도해주세요.";

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage = DEFAULT_ERROR_MESSAGE
) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    const status = error.response?.status;
    if (status && STATUS_MESSAGE_MAP[status]) {
      return STATUS_MESSAGE_MAP[status];
    }

    return (
      error.response?.data?.message ??
      error.message ??
      fallbackMessage
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

export const isUnauthorizedError = (error: unknown) => {
  return (
    axios.isAxiosError(error) && (error as AxiosError).response?.status === 401
  );
};


