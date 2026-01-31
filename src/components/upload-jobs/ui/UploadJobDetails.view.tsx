import AdminNavbar from "../../navbar/AdminNavbar";
import type { UploadJobDetailsViewProps } from "../type/uploadJobs.types";
import { SummaryCard } from "./SummaryCard";
import { StatusBadge } from "./StatusBadge";
import { useParams } from "react-router-dom";
import AnalystNavbar from "../../navbar/AnalystNavbar";


export const UploadJobDetailsView = ({ loading, data }: UploadJobDetailsViewProps) => {
  const { role } = useParams();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {role?.trim().toLowerCase() === "admin" ? (
        <AdminNavbar />
      ) : (
        <AnalystNavbar />
      )}

      {/* Page Content */}
      <div className="flex-1 px-4 sm:px-6 py-6 space-y-6">
        {/* Loading State */}
        {loading && (
          <div className="h-full flex items-center justify-center text-gray-500">
            Loading reconciliation details...
          </div>
        )}

        {/* No Data State */}
        {!loading && !data && (
          <div className="h-full flex items-center justify-center text-red-500">
            No reconciliation data found
          </div>
        )}

        {/* Data State */}
        {!loading && data && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              <SummaryCard label="Total" value={data.totalRecords} />
              <SummaryCard label="Matched" value={data.totalMatchedRecords} />
              <SummaryCard label="Partial" value={data.totalPartialRecords} />
              <SummaryCard
                label="Unmatched"
                value={data.totalUnmatchedRecords}
              />
              <SummaryCard
                label="Duplicate"
                value={data.totalDuplicateRecords}
              />
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-sm border flex flex-col overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b font-semibold text-gray-700">
                Reconciliation Results ({data.results.length})
              </div>

              {/* Scrollable Table */}
              <div className="overflow-auto max-h-[60vh]">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50 text-gray-600 border-b">
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
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 text-gray-600">
                          {r.excelRowNumber}
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {r.transactionId}
                        </td>

                        <td className="px-4 py-3">
                          <StatusBadge status={r.status} />
                        </td>

                        {/* ✅ Correct mismatch handling */}
                        <td className="px-4 py-3">
                          {r.status === "UNMATCHED" ? (
                            <span className="text-gray-500 italic">
                              No matching system record found
                            </span>
                          ) : r.mismatchedFields.length === 0 ? (
                            <span className="text-gray-400">—</span>
                          ) : (
                            <div className="space-y-1">
                              {r.mismatchedFields.map((m) => (
                                <div key={m.field} className="text-red-600">
                                  <span className="font-medium">{m.field}</span>
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
