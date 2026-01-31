import api from "../../../../config/api.config";
import type { UserForm } from "../types/user.types";

export const createUserProfileApi = async (payload: UserForm) => {
  const response = await api.post("/user/profile-create", payload);
  return response.data;
};

export const getUsersProfileApi = async () => {
  const response = await api.get("/user/profiles");
  return response.data;
};

export const deleteUserProfileApi = async (id: string) => {
  const response = await api.post(`/user/delete/${id}`);
  return response.data;
};
