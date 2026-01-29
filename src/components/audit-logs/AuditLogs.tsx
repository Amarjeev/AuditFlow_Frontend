import React, { useState } from "react";

function AuditLogs() {
  const [filters, setFilters] = useState({
    action: "ALL",
    user: "",
  });

  const [selectedRowLog, setSelectedRowLog] = useState(null);

  const auditLogs = [
    {
      id: 1,
      timestamp: "2026-01-27 10:15 AM",
      action: "JOB_CREATED",
      performedBy: "Analyst",
      entity: "JOB",
      entityId: "JOB1706350000",
      details: "transactions.csv uploaded",
    },
    {
      id: 2,
      timestamp: "2026-01-27 10:15 AM",
      action: "ROW_PROCESSED",
      performedBy: "System",
      entity: "ROW",
      entityId: "JOB1706350000",
      rowNo: 21,
      status: "SUCCESS",
      column: null,
      value: null,
      reason: null,
    },
    {
      id: 3,
      timestamp: "2026-01-27 10:15 AM",
      action: "ROW_PROCESSED",
      performedBy: "System",
      entity: "ROW",
      entityId: "JOB1706350000",
      rowNo: 23,
      status: "FAILED",
      column: "amount",
      value: "abc",
      reason: "Invalid number format",
    },
    {
      id: 4,
      timestamp: "2026-01-27 10:16 AM",
      action: "JOB_COMPLETED_WITH_ERRORS",
      performedBy: "System",
      entity: "JOB",
      entityId: "JOB1706350000",
      details: "12 rows failed validation",
    },
  ];

  const filteredLogs = auditLogs.filter((log) => {
    if (filters.action !== "ALL" && log.action !== filters.action)
      return false;
    if (filters.user && !log.performedBy.includes(filters.user))
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
        <p className="text-gray-500">
          Row-level success & failure tracking (Admin only)
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6 flex gap-4 flex-wrap">
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

        <input
          type="text"
          placeholder="Search by user"
          value={filters.user}
          onChange={(e) =>
            setFilters({ ...filters, user: e.target.value })
          }
          className="border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Audit Logs Table */}
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
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-gray-500">
                  {log.timestamp}
                </td>
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
                  {log.entity === "ROW"
                    ? `Row ${log.rowNo}`
                    : log.details}
                </td>
                <td className="p-4">
                  {log.entity === "ROW" && (
                    <button
                      onClick={() => setSelectedRowLog(log)}
                      className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Row Details
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredLogs.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center text-gray-400"
                >
                  No audit logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Row Details Modal */}
      {selectedRowLog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              Row {selectedRowLog.rowNo} Details
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    selectedRowLog.status === "SUCCESS"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {selectedRowLog.status}
                </span>
              </div>

              {selectedRowLog.status === "FAILED" && (
                <>
                  <div>
                    <strong>Column:</strong>{" "}
                    {selectedRowLog.column}
                  </div>
                  <div>
                    <strong>Value:</strong>{" "}
                    {selectedRowLog.value}
                  </div>
                  <div>
                    <strong>Reason:</strong>{" "}
                    {selectedRowLog.reason}
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedRowLog(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditLogs;
