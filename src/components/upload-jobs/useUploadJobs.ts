import { useState } from "react";
import { useFileParser } from "./useFileParser";
import { useFileInput } from "./useFileInput";
import { useJobManager } from "./useJobManager";
import { validateFieldMapping } from "./validateFieldMapping";

export const useUploadJobs = () => {
  const [error, setError] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewRows, setPreviewRows] = useState<Record<string, unknown>[]>([]);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});

  const systemFields = ["transactionId", "referenceNumber", "amount", "date"];

  const { parseCSV, parseExcel } = useFileParser(setError, setPreviewRows);

  const {
    fileInputRef,
    selectedFile,
    setSelectedFile,
    handleFileSelect,
    resetFileInput,
  } = useFileInput(parseCSV, parseExcel, setError);

  const { jobs, createJob, cancelJob, deleteJob } = useJobManager();

  const clearSelectedFile = () => {
    setSelectedFile(null);
    resetFileInput();
    setPreviewRows([]);
    setError("");
  };

  const handleFieldMappingChange = (csvKey: string, value: string) => {
    setFieldMapping((prev) => ({
      ...prev,
      [csvKey]: value,
    }));
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select a file before uploading");
      return;
    }

    const error = validateFieldMapping(previewRows, fieldMapping);

    if (error) {
      setError(error);
      return;
    }

    createJob(selectedFile.name);
    setShowUploadModal(false);
    clearSelectedFile();
  };

  return {
    fileInputRef,
    jobs,
    showUploadModal,
    selectedFile,
    error,
    previewRows,
    setShowUploadModal,
    handleFileSelect,
    handleUpload,
    cancelJob,
    deleteJob,
    clearSelectedFile,
    systemFields,
    fieldMapping,
    handleFieldMappingChange,
  };
};
