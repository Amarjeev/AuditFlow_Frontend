import { useAuditLogs } from "../hooks/useAuditLogs";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../navbar/AdminNavbar";
import AnalystNavbar from "../../navbar/AnalystNavbar";

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

      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6 flex gap-4 flex-wrap items-end">
          {/* Job ID */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Job ID</label>
            <input
              type="text"
              placeholder="Enter Job ID"
              value={filters.jobId}
              onChange={(e) =>
                setFilters({ ...filters, jobId: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm w-64"
            />
          </div>

          {/* Action */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Action</label>
            <select
              value={filters.action}
              onChange={(e) =>
                setFilters({ ...filters, action: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm"
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
          <button
            onClick={fetchLogs}
            disabled={!filters.jobId || loading}
            className={`h-10 px-6 text-sm rounded-lg text-white
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

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
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

            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-gray-500">{log.timestamp}</td>
                  <td className="p-4 font-semibold">{log.action}</td>
                  <td className="p-4">{log.performedBy}</td>
                  <td className="p-4">
                    {log.entity} – {log.entityId}
                  </td>
                  <td className="p-4">
                    {log.status && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.status}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-600">
                    {log.entity === "ROW" ? `Row ${log.rowNo}` : log.details}
                  </td>
                  <td className="p-4">
                    {log.entity === "ROW" && (
                      <button
                        onClick={() => setSelectedRowLog(log)}
                        className="text-xs px-3 py-1 bg-blue-600 text-white rounded"
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

        {/* Modal */}
        {selectedRowLog && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">
                Row {selectedRowLog.rowNo} Details
              </h2>

              <div className="space-y-2 text-sm">
                <div>Status: {selectedRowLog.status}</div>
                {selectedRowLog.reason && (
                  <div>Reason: {selectedRowLog.reason}</div>
                )}
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedRowLog(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
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
