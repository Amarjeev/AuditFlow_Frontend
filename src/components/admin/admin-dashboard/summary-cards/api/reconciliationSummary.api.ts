import api from "../../../../../config/api.config";

export const getReconciliationSummaryApi = async () => {
  const response = await api.get("/reconciliation/dashboard");
  return response.data;
};
