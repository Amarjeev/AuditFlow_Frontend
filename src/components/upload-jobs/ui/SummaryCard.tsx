import type { Props } from "../type/uploadJobs.types";

export const SummaryCard = ({ label, value }: Props) => (
  <div className="rounded-xl bg-white border p-4 text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
  </div>
);
