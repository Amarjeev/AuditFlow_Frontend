import { useEffect, useState, useCallback } from "react";
import { useFileParser } from "./useFileParser";
import { useFileInput } from "./useFileInput";
import { validateFieldMapping } from "../validation/validateFieldMapping";
import { uploadJobApi } from "../api/uploadJobs.api";
import { getAxiosErrorMessage } from "../../../utils/getAxiosErrorMessage";
import { getuploadJobApi } from "../api/uploadJobs.api";
import { showError } from "../../../utils/toast";
import { useDeleteJob } from "./useDeleteJob";

export type JobStatus = "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface UploadJob {
  _id: string;
  fileName: string;
  createdAt: string;
  uploadedByRole: string;
  status: JobStatus;
}

export const useUploadJobs = () => {
  const [error, setError] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewRows, setPreviewRows] = useState<Record<string, unknown>[]>([]);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});
  const [jobs, setJobs] = useState<UploadJob[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const systemFields = ["transactionId", "referenceNumber", "amount", "date"];

  const { parseCSV, parseExcel } = useFileParser(setError, setPreviewRows);
  const { deleteLoading, handleDeleteJob, deletingId } = useDeleteJob();

  const {
    fileInputRef,
    selectedFile,
    setSelectedFile,
    handleFileSelect,
    resetFileInput,
  } = useFileInput(parseCSV, parseExcel, setError);

  // const { createJob, cancelJob, deleteJob } = useJobManager();

  const clearSelectedFile = () => {
    setSelectedFile(null);
    resetFileInput();
    setPreviewRows([]);
    setError("");
  };

  const handleFieldMappingChange = (csvKey: string, systemField: string) => {
    setFieldMapping((prev) => {
      const updated = { ...prev };

      // Remove any existing mapping that uses this csvKey
      Object.keys(updated).forEach((sf) => {
        if (updated[sf] === csvKey) {
          delete updated[sf];
        }
      });

      if (!systemField) return updated;

      updated[systemField] = csvKey;
      return updated;
    });
  };

  const fetchJobs = useCallback(async () => {
    try {
      const response = await getuploadJobApi();
      setJobs(response);
    } catch {
      showError("Something went wrong while fetching, try again!");
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file before uploading");
      return;
    }

    const error = validateFieldMapping(previewRows, fieldMapping);

    if (error) {
      setError(error);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("mapping", JSON.stringify(fieldMapping));

    try {
      setIsUploading(true);
      setError("");

      const response = await uploadJobApi(formData);

      setJobs((prev) => [response.job, ...prev]);

      setShowUploadModal(false);
      clearSelectedFile();
      setFieldMapping({});
    } catch (err) {
      setError(
        getAxiosErrorMessage(err || "File upload failed. Please try again."),
      );
    } finally {
      setIsUploading(false);
    }
  };

  return {
    fileInputRef,
    jobs,
    setJobs,
    showUploadModal,
    selectedFile,
    error,
    previewRows,
    setShowUploadModal,
    handleFileSelect,
    handleUpload,
    deleteLoading,
    deletingId,
    handleDeleteJob,
    clearSelectedFile,
    systemFields,
    fieldMapping,
    handleFieldMappingChange,
    isUploading,
    refetchJobs: fetchJobs,
  };
};
