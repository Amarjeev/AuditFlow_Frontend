import api from "../../../../../config/api.config";

type ReconciliationChartParams = {
  status?: string;
  uploadedBy?: string;
  fromDate?: string;
  toDate?: string;
};

export const getReconciliationChartDataApi = async (
  params?: ReconciliationChartParams,
) => {
  const response = await api.get("/reconciliation/chart", { params });
  return response.data;
};
