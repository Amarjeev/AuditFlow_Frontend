import { api } from "../../../config/api.config";

export const uploadJobApi = async (payload: FormData) => {
  const response = await api.post("/jobs/upload", payload);
  return response.data;
};

export const getuploadJobApi = async () => {
  const response = await api.get("/jobs/upload-jobs");
  return response.data;
};

export const getReconciliationResultApi = async (jobId: string) => {
  const response = await api.get(`/jobs/upload-jobs/${jobId}`);
  return response.data;
};

export const deleteJobApi = async (jobId: string) => {
  const response = await api.post(`/jobs/delete-job/${jobId}`);
  return response.data;
};