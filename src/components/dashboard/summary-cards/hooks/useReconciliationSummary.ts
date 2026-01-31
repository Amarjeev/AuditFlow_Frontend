import { useEffect, useMemo, useState } from "react";
import { getReconciliationSummaryApi } from "../api/reconciliationSummary.api";
import { showError } from "../../../../utils/toast";
import type {
  ReconciliationSummaryResponse,
  SummaryCardConfig,
} from "../type/reconciliationSummary.types";

export const useReconciliationSummary = () => {
  const [data, setData] = useState<ReconciliationSummaryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await getReconciliationSummaryApi();
      setData(res);
    } catch {
      showError("Failed to fetch reconciliation summary");

      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  /* ---------------- UI CONFIG ---------------- */
  const cards = useMemo<SummaryCardConfig[]>(() => {
    if (!data) return [];

    return [
      {
        title: "Total Records",
        value: data.totalRecords,
      },
      {
        title: "Matched",
        value: data.matched,
        variant: "success",
      },
      {
        title: "Unmatched",
        value: data.unmatched,
        variant: "danger",
      },
      {
        title: "Duplicates",
        value: data.duplicates,
        variant: "warning",
      },
      {
        title: "Accuracy %",
        value: `${data.accuracy}%`,
        variant: "info",
      },
    ];
  }, [data]);

  return {
    cards,
    loading,
  };
};
