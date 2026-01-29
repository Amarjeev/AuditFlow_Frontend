import { api } from "../../config/api.config";
import type { LoginPayload } from "./useLoginLogic";

export const loginApi = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data.success;
};
