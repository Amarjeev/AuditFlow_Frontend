import api from "../../../../config/api.config";
import type { ReconciliationChartParams } from "../type/reconciliationChart.types";

export const getReconciliationChartDataApi = async (
  params?: ReconciliationChartParams,
) => {
  const response = await api.get("/reconciliation/chart", { params });
  return response.data;
};
