export type JobStatus = "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface UploadJob {
  _id: string;
  fileName: string;
  createdAt: string;
  uploadedByRole: string;
  status: JobStatus;
}

export type ReconciliationResult = {
  totalRecords: number;
  totalMatchedRecords: number;
  totalUnmatchedRecords: number;
  totalPartialRecords: number;
  totalDuplicateRecords: number;
  results: {
    _id: string;
    excelRowNumber: number;
    transactionId: string;
    status: string;
    mismatchedFields: {
      field: string;
      uploadedValue: string | number | boolean | null;
      systemValue: string | number | boolean | null;
      reason: string;
    }[];
  }[];
};


export type Props = {
  label: string;
  value: number;
};


export type UploadJobDetailsViewProps = {
  loading: boolean;
  data: ReconciliationResult | null;
};

