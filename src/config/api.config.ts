import axios from "axios";

const isLocal = window.location.hostname === "localhost";

export const API_BASE_URL = isLocal
  ? "http://localhost:5000/api/v1"
  : "https://auditflow-backend-8ddq.onrender.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
