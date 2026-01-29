import { useState } from "react";
import { showError, showSuccess } from "../../../utils/toast";
import { deleteJobApi } from "../api/uploadJobs.api";

export const useDeleteJob = () => {
  const [deleteLoading, setdeleteLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteJob = async (jobId: string) => {
    if (!jobId) {
      showError("Something went wrong while deleting the job");
      return;
    }

    setDeletingId(jobId);

    try {
      setdeleteLoading(true);
      await deleteJobApi(jobId);
      showSuccess("deleted Successfully")
      setDeletingId(null);
    } catch {
      showError("Unable to delete the job. Please try again.");
    } finally {
      setdeleteLoading(false);
    }
  };

  return {
    deleteLoading,
    handleDeleteJob,
    deletingId
  };
};
