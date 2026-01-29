import api from "../config/api.config";

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
console.log("??????????????????????????????????")
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/token/refresh"
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/token/refresh");

        return api(originalRequest);
      } catch {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
