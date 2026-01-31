import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../config/api.config";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ["/login/admin","/login/analyst","/login/viewer", "/"];

    if (!publicPaths.includes(location.pathname)) return;

    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/token/status");
        const { role } = res.data;

        switch (role) {
          case "admin":
            navigate("/admin/dashboard", { replace: true });
            break;
          case "analyst":
            navigate("/analyst/upload-jobs", { replace: true });
            break;
             case "viewer":
            navigate("/viewer/dashboard", { replace: true });
            break;

          default:
            navigate("/", { replace: true });
        }
      } catch {
        navigate("/", { replace: true });
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);
};
