import type { Props } from "../type/uploadJobs.types";

export const SummaryCard = ({ label, value }: Props) => (
  <div
    className="
      rounded-xl border bg-white
      p-3 sm:p-4
      text-center
      shadow-sm
    "
  >
    <p className="text-xs sm:text-sm text-gray-500">{label}</p>

    <p className="mt-1 text-xl sm:text-2xl font-semibold text-gray-800">
      {value}
    </p>
  </div>
);
