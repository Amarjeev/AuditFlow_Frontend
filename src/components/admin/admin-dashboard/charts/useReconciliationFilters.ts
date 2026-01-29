import { useState, useMemo } from "react";
import { RAW_DATA } from "./constants";

export const useReconciliationFilters = () => {
  const [status, setStatus] = useState("all");
  const [uploadedBy, setUploadedBy] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredData = useMemo(() => {
    if (status === "all") return RAW_DATA;
    return RAW_DATA.filter((item) => item.key === status);
  }, [status]);

  return {
    filters: {
      status,
      uploadedBy,
      fromDate,
      toDate,
    },
    actions: {
      setStatus,
      setUploadedBy,
      setFromDate,
      setToDate,
    },
    filteredData,
  };
};
