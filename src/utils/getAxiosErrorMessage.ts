import type { AxiosError } from "axios";

export const getAxiosErrorMessage = (
  err: unknown,
  fallback = "Something went wrong"
): string => {
  if (err && typeof err === "object" && "response" in err) {
    const axiosError = err as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || fallback;
  }

  return fallback;
};
