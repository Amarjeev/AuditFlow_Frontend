import { useState, useCallback, useEffect } from "react";
import {
  getUsersProfileApi,
  deleteUserProfileApi,
} from "../api/userProfile.api";
import { showError, showSuccess } from "../../../../utils/toast";
import type { User } from "../types/user.types";

export const useDeleteUsersProfile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string>("");

  const handleFetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUsersProfileApi();
      setUsers(response);
    } catch {
      showError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchProfile();
  }, [handleFetchProfile]);

  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      setDeletingId(id);
      setLoading(true);

      await deleteUserProfileApi(id);

      setUsers((prev) => prev.filter((user) => user._id !== id));
      setDeletingId("");
      showSuccess("User deleted successfully");
    } catch {
      showError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    handleFetchProfile,
    handleDeleteUser,
    deletingId,
  };
};
