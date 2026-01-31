import { useEffect, useMemo, useState } from "react";
import { getReconciliationSummaryApi } from "../api/reconciliationSummary.api";
import type { SummaryCardVariant } from "../ui/SummaryMetricCard";
import { showError } from "../../../../utils/toast";

type ReconciliationSummaryResponse = {
  totalRecords: number;
  matched: number;
  unmatched: number;
  duplicates: number;
  accuracy: number;
};

export type SummaryCardConfig = {
  title: string;
  value: number | string;
  variant?: SummaryCardVariant;
  trend?: {
    value: string;
    label?: string;
  };
};

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
