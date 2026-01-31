import { useAuditLogs } from "../hooks/useAuditLogs";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../navbar/ui/AdminNavbar";
import AnalystNavbar from "../../navbar/ui/AnalystNavbar";
import { formatDateTime } from "../../../utils/formatDate";

function AuditLogs() {
  const { role } = useParams();
  const {
    logs,
    loading,
    filters,
    setFilters,
    fetchLogs,
    selectedRowLog,
    setSelectedRowLog,
  } = useAuditLogs();

  return (
    <>
      {role?.trim().toLowerCase() === "admin" ? (
        <AdminNavbar />
      ) : (
        <AnalystNavbar />
      )}

      <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Audit Logs
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Job ID */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Job ID</label>
              <input
                type="text"
                placeholder="Enter Job ID"
                value={filters.jobId}
                onChange={(e) =>
                  setFilters({ ...filters, jobId: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Action */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Action</label>
              <select
                value={filters.action}
                onChange={(e) =>
                  setFilters({ ...filters, action: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">All Actions</option>
                <option value="JOB_CREATED">Job Created</option>
                <option value="ROW_PROCESSED">Row Processed</option>
                <option value="JOB_COMPLETED_WITH_ERRORS">
                  Job Completed With Errors
                </option>
              </select>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                onClick={fetchLogs}
                disabled={!filters.jobId || loading}
                className={`
                  w-full h-10 rounded-lg text-sm font-medium text-white transition
                  ${
                    !filters.jobId || loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                `}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* Desktop Header */}
              <thead className="hidden md:table-header-group bg-gray-100 text-gray-600 border-b">
                <tr>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Action</th>
                  <th className="p-4 text-left">Performed By</th>
                  <th className="p-4 text-left">Entity</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Details</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="block md:table-row p-4 md:p-0 hover:bg-gray-50 transition"
                  >
                    {/* Time */}
                    <td className="block md:table-cell px-0 md:px-4 py-1 md:py-4">
                      <span className="md:hidden text-xs text-gray-500">
                        Time
                      </span>
                      <div className="text-xs font-medium text-gray-400 tracking-wide">
                        {formatDateTime(log.timestamp)}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="block md:table-cell px-0 md:px-4 py-1 md:py-4">
                      <span className="md:hidden text-xs text-gray-500">
                        Action
                      </span>
                      <div className="font-semibold">{log.action}</div>
                    </td>

                    {/* Performed By */}
                    <td className="block md:table-cell px-0 md:px-4 py-1 md:py-4">
                      <span className="md:hidden text-xs text-gray-500">
                        Performed By
                      </span>
                      {log.performedBy}
                    </td>

                    {/* Entity */}
                    <td className="block md:table-cell px-0 md:px-4 py-1 md:py-4">
                      <span className="md:hidden text-xs text-gray-500">
                        Entity
                      </span>
                      {log.entity} – {log.entityId}
                    </td>

                    {/* Status */}
                    <td className="block md:table-cell px-0 md:px-4 py-1 md:py-4">
                      <span className="md:hidden text-xs text-gray-500">
                        Status
                      </span>
                      {log.status && (
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            log.status === "SUCCESS"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {log.status}
                        </span>
                      )}
                    </td>

                    {/* Details */}
                    <td className="block md:table-cell px-0 md:px-4 py-1 md:py-4">
                      <span className="md:hidden text-xs text-gray-500">
                        Details
                      </span>
                      <div className="text-gray-600">
                        {log.entity === "ROW"
                          ? `Row ${log.rowNo}`
                          : log.details}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="block md:table-cell px-0 md:px-4 py-2 md:py-4">
                      <span className="md:hidden text-xs text-gray-500">
                        Actions
                      </span>

                      {log.entity === "ROW" && (
                        <button
                          onClick={() => setSelectedRowLog(log)}
                          className="mt-1 inline-flex items-center justify-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {!loading && logs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-400">
                      No audit logs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {selectedRowLog && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-3">
            <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Row {selectedRowLog.rowNo} Details
              </h2>

              <div className="space-y-2 text-sm text-gray-700">
                <div>Status: {selectedRowLog.status}</div>
                {selectedRowLog.reason && (
                  <div>Reason: {selectedRowLog.reason}</div>
                )}
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedRowLog(null)}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AuditLogs;
