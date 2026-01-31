export type ReconciliationChartParams = {
  status?: string;
  uploadedBy?: string;
  fromDate?: string;
  toDate?: string;
};

export type Filters = {
  status: string;
  uploadedBy: string;
  fromDate: string;
  toDate: string;
};

export type ReconciliationChartData = {
  matched: number;
  partial: number;
  unmatched: number;
  duplicate: number;
  accuracy: number;
};

export type DataItem = {
  key: string;
  name: string;
  value: number;
};

export type Props = {
  data: ReconciliationChartData | null;
  loading: boolean;
};
