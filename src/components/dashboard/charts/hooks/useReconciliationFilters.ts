import { useState } from "react";
import { getReconciliationChartDataApi } from "../api/reconciliationChart.api";
import { showError } from "../../../../utils/toast";

type Filters = {
  status: string;
  uploadedBy: string;
  fromDate: string;
  toDate: string;
};

export type ReconciliationChartData = {
  matched: number;
  partial: number;
  unmatched: number;
  duplicate: number;
  accuracy: number;
};

export const useReconciliationFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    status: "all",
    uploadedBy: "all",
    fromDate: "",
    toDate: "",
  });

  const [data, setData] = useState<ReconciliationChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleApplyFilters = async () => {
    if (
      filters.fromDate &&
      filters.toDate &&
      new Date(filters.fromDate) > new Date(filters.toDate)
    ) {
      showError("From date cannot be later than To date.");
      return;
    }
    
    try {
      setLoading(true);

      const params = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value && value !== "all"),
      ) as Record<string, string>;

      const response = await getReconciliationChartDataApi(params);
      setData(response);
    } catch {
      showError("Unable to load reconciliation data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    filters,
    actions: {
      setStatus: (v: string) => setFilters((p) => ({ ...p, status: v })),
      setUploadedBy: (v: string) =>
        setFilters((p) => ({ ...p, uploadedBy: v })),
      setFromDate: (v: string) => setFilters((p) => ({ ...p, fromDate: v })),
      setToDate: (v: string) => setFilters((p) => ({ ...p, toDate: v })),
      handleApplyFilters,
    },
    data,
    loading,
  };
};
