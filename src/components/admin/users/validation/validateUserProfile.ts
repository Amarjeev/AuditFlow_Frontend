import type { UserForm } from "../types/user.types";

export const validateUserProfile = (form: UserForm): string | null => {
  if (!form.name.trim()) {
    return "Name is required";
  }

  if (form.name.length < 3 || form.name.length > 20) {
    return "Name must be between 3 and 20 characters";
  }

  if (!/^[A-Za-z\s]+$/.test(form.name)) {
    return "Name must contain only letters";
  }

  if (!form.mobile.trim()) {
    return "Mobile number is required";
  }

  if (!/^[6-9]\d{9}$/.test(form.mobile)) {
    return "Enter a valid 10-digit Indian mobile number";
  }

  if (!form.password?.trim()) {
    return "Password is required";
  }

  if (form.password.trim().length < 6 || form.password.trim().length > 20) {
    return "Password must be between 6 and 20 characters";
  }

  const validRoles = ["admin", "analyst", "viewer"];

  if (!validRoles.includes(form.role.toLowerCase())) {
    return "Role must be admin, analyst, or viewer";
  }

  return null;
};
