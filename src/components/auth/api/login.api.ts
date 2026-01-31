import { api } from "../../../config/api.config";
import type { LoginPayload } from "../type/auth.types";

export const loginApi = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data.success;
};

export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data.success;
};
