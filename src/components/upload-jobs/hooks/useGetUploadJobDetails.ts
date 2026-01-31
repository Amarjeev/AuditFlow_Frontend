import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReconciliationResultApi } from "../api/uploadJobs.api";
import type { ReconciliationResult } from "../type/uploadJobs.types";
import { showError } from "../../../utils/toast";

export const useGetUploadJobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();

  const [data, setData] = useState<ReconciliationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await getReconciliationResultApi(jobId);
        setData(response);
      } catch {
        showError("Failed to fetch reconciliation details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [jobId]);

  return { data, loading };
};
