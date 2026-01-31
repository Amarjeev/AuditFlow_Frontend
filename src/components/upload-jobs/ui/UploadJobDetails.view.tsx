import { useParams } from "react-router-dom";
import AdminNavbar from "../../navbar/ui/AdminNavbar";
import AnalystNavbar from "../../navbar/ui/AnalystNavbar";
import type { UploadJobDetailsViewProps } from "../type/uploadJobs.types";
import { SummaryCard } from "./SummaryCard";
import { StatusBadge } from "./StatusBadge";

export const UploadJobDetailsView = ({
  loading,
  data,
}: UploadJobDetailsViewProps) => {
  const { role } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      {role?.trim().toLowerCase() === "admin" ? (
        <AdminNavbar />
      ) : (
        <AnalystNavbar />
      )}

      <div className="flex-1 px-3 sm:px-6 py-4 sm:py-6 space-y-6">
        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center text-gray-500">
            Loading reconciliation details...
          </div>
        )}

        {/* No Data */}
        {!loading && !data && (
          <div className="flex items-center justify-center text-red-500">
            No reconciliation data found
          </div>
        )}

        {/* Data */}
        {!loading && data && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
              <SummaryCard label="Total" value={data.totalRecords} />
              <SummaryCard label="Matched" value={data.totalMatchedRecords} />
              <SummaryCard label="Partial" value={data.totalPartialRecords} />
              <SummaryCard label="Unmatched" value={data.totalUnmatchedRecords} />
              <SummaryCard label="Duplicate" value={data.totalDuplicateRecords} />
            </div>

            {/* Responsive Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="px-4 py-3 border-b font-semibold text-gray-700">
                Reconciliation Results ({data.results.length})
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  {/* Desktop Header */}
                  <thead className="hidden md:table-header-group bg-gray-50 text-gray-600 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left">Row</th>
                      <th className="px-4 py-3 text-left">Transaction ID</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Mismatch Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.results.map((r) => (
                      <tr
                        key={r._id}
                        className="
                          border-b
                          md:table-row
                          block md:table-row
                          p-3 md:p-0
                        "
                      >
                        {/* Row Number */}
                        <td className="block md:table-cell px-0 md:px-4 py-1 md:py-3">
                          <span className="md:hidden text-xs text-gray-500">
                            Row
                          </span>
                          <div className="font-medium text-gray-700">
                            {r.excelRowNumber}
                          </div>
                        </td>

                        {/* Transaction ID */}
                        <td className="block md:table-cell px-0 md:px-4 py-1 md:py-3">
                          <span className="md:hidden text-xs text-gray-500">
                            Transaction ID
                          </span>
                          <div className="font-medium">
                            {r.transactionId}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="block md:table-cell px-0 md:px-4 py-1 md:py-3">
                          <span className="md:hidden text-xs text-gray-500">
                            Status
                          </span>
                          <StatusBadge status={r.status} />
                        </td>

                        {/* Mismatch */}
                        <td className="block md:table-cell px-0 md:px-4 py-2 md:py-3">
                          <span className="md:hidden text-xs text-gray-500">
                            Mismatch Details
                          </span>

                          {r.status === "UNMATCHED" ? (
                            <span className="text-gray-500 italic">
                              No matching system record found
                            </span>
                          ) : r.mismatchedFields.length === 0 ? (
                            <span className="text-gray-400">—</span>
                          ) : (
                            <div className="space-y-1">
                              {r.mismatchedFields.map((m) => (
                                <div
                                  key={m.field}
                                  className="text-red-600 text-xs sm:text-sm"
                                >
                                  <span className="font-medium">
                                    {m.field}
                                  </span>
                                  : {m.uploadedValue} → {m.systemValue}
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
