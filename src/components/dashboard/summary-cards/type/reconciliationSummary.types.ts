export type ReconciliationSummaryResponse = {
  totalRecords: number;
  matched: number;
  unmatched: number;
  duplicates: number;
  accuracy: number;
};

export type SummaryCardConfig = {
  title: string;
  value: number | string;
  variant?: SummaryCardVariant;
  trend?: {
    value: string;
    label?: string;
  };
};

export type SummaryCardVariant = "success" | "warning" | "danger" | "info";

export type SummaryCardProps = {
  title: string;
  value: number | string;
  variant?: SummaryCardVariant;
  trend?: {
    value: string;
    label?: string;
  };
};
