import { useState } from "react";
import { useParams } from "react-router-dom";
import { loginApi } from "../api/login.api";
import { showError, showSuccess } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

export type UserRole = "admin" | "analyst" | "viewer";

export type LoginPayload = {
  mobile: string;
  password: string;
  role: UserRole;
};

const useLogin = () => {
  const { role } = useParams<{ role: string }>();

  const userRole = role?.toLowerCase().trim();

  const navigate = useNavigate();

  const [form, setForm] = useState<{
    mobile: string;
    password: string;
  }>({
    mobile: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userRole) {
      showError("Invalid login link. Please access the login page correctly.");
      return;
    }

    if (!form.mobile) {
      setError("Mobile number is required.");
      return;
    }

    if (!form.password) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);
      const payload: LoginPayload = {
        mobile: form?.mobile,
        password: form?.password,
        role: userRole as UserRole,
      };

      await loginApi(payload);
      setForm({
        mobile: "",
        password: "",
      });

      showSuccess("Login successful. Welcome back!");

      if (userRole === "admin") {
        navigate(`/${userRole}/dashboard`);
      } else if (userRole === "analyst") {
        navigate(`/${userRole}/upload-jobs`);
      }

    } catch {
      setError("Unable to login. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    userRole,
    form,
    error,
    handleChange,
    handleLogin,
    loading,
  };
};

export default useLogin;
