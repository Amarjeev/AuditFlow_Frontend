export type AuditLog = {
  id: string;
  timestamp: string;
  action: string;
  performedBy: "Analyst" | "System" | "Admin";
  entity: "JOB" | "ROW";
  entityId: string;

  rowNo?: number;
  status?: "SUCCESS" | "FAILED" | "MATCHED" | "UNMATCHED" | "PARTIAL" | "DUPLICATE";
  details?: string;
  reason?: string;
};
