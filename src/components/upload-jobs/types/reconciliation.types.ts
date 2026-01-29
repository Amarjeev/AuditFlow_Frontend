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
