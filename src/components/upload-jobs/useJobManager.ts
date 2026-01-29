import { useEffect, useRef, useState } from "react";

export type JobStatus =
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export interface UploadJob {
  id: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
  status: JobStatus;
}

export const useJobManager = () => {
  const [jobs, setJobs] = useState<UploadJob[]>([]);
  const processingTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const getNow = () => new Date().toLocaleString();

  const createJob = (fileName: string) => {
    const jobId = `JOB-${Date.now()}`;

    setJobs((prev) => [
      {
        id: jobId,
        fileName,
        uploadedBy: "Analyst",
        uploadedAt: getNow(),
        status: "PROCESSING",
      },
      ...prev,
    ]);

    processingTimers.current[jobId] = setTimeout(() => {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? { ...job, status: "COMPLETED" }
            : job
        )
      );
    }, 3000);
  };

  const cancelJob = (jobId: string) => {
    clearTimeout(processingTimers.current[jobId]);
    delete processingTimers.current[jobId];

    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? { ...job, status: "CANCELLED" }
          : job
      )
    );
  };

  const deleteJob = (jobId: string) => {
    clearTimeout(processingTimers.current[jobId]);
    delete processingTimers.current[jobId];

    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  useEffect(() => {
    return () => {
      Object.values(processingTimers.current).forEach(clearTimeout);
    };
  }, []);

  return { jobs, createJob, cancelJob, deleteJob };
};
