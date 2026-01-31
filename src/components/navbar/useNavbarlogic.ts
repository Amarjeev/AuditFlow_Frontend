import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { MenuItem } from "./NavbarLinks";
import { logoutApi } from "../auth/api/login.api";
import { showError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

export const useNavbarLogic = () => {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {
      await logoutApi();
      navigate("/", { replace: true });
    } catch {
      showError("Logout failed");
    }
  };

  const isActive = (path?: string) => path === location.pathname;

  const isSettingsActive = (children?: MenuItem[]) =>
    children?.some((child) => child.path === location.pathname);

  return {
    open,
    setOpen,
    settingsOpen,
    setSettingsOpen,
    handleLogout,
    isActive,
    isSettingsActive,
  };
};
