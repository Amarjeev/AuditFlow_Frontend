import api from "../../../config/api.config";

export const getAuditLogsApi = async (
  jobId: string,
  action?: string,
  user?: string,
) => {
  const response = await api.get("/audit/logs", {
    params: {
      jobId,
      action,
      user,
    },
  });
  return response.data.data;
};
