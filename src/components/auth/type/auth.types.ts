export type UserRole = "admin" | "analyst" | "viewer";

export interface LoginPayload {
  mobile: string;
  password: string;
  role: UserRole;
}
