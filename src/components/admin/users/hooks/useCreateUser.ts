import { useState } from "react";
import type { UserForm } from "../types/user.types";
import { createUserProfileApi } from "../api/userProfile.api";
import { showError, showSuccess } from "../../../../utils/toast";
import { validateUserProfile } from "../validation/validateUserProfile";
import axios from "axios";

const initialForm: UserForm = {
  name: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  role: "Viewer",
};

export const useCreateUser = () => {
  const [form, setForm] = useState<UserForm>(initialForm);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleCreateUser = async () => {
    const validationError = validateUserProfile(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (form?.password !== form?.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      setError("");

      await createUserProfileApi(form);
      showSuccess("User created successfully.");
      setForm(initialForm);
      setShowCreateForm(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err?.response?.status;

        if (status === 409) {
          setError("Mobile number already exists");
        } else {
          showError("Unable to create user. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setShowCreateForm(false);
  };

  return {
    form,
    error,
    handleChange,
    handleCreateUser,
    handleCancel,
    showCreateForm,
    setShowCreateForm,
    loading,
  };
};
