import { useState } from "react";
import { getAuditLogsApi } from "../api/auditLogs.api";
import type { AuditLog } from "../types/auditLog.types";

export const useAuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    jobId: "",
    action: "ALL",
    user: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<null | typeof filters>(
    null,
  );

  const [selectedRowLog, setSelectedRowLog] = useState<AuditLog | null>(null);

  const fetchLogs = async () => {
    if (!filters.jobId) return;

    setLoading(true);
    try {
      const data = await getAuditLogsApi(
        filters.jobId,
        filters.action,
        filters.user,
      );
      setLogs(data);
      setAppliedFilters(filters);
    } catch (error) {
      console.error("Failed to fetch audit logs", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    logs,
    loading,
    filters,
    setFilters,
    fetchLogs,
    selectedRowLog,
    setSelectedRowLog,
    appliedFilters,
  };
};
