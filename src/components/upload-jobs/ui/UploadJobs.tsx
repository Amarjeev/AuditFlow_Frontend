import { UploadCloud, Trash2, Eye, RefreshCw } from "lucide-react";
import { useUploadJobs } from "../hooks/useUploadJobs";
import { formatDateTime } from "../../../utils/formatDate";
import AdminNavbar from "../../navbar/AdminNavbar";
import { useNavigate } from "react-router-dom";

const UploadJobs = () => {
  const navigate = useNavigate();

  const {
    fileInputRef,
    jobs,
    setJobs,
    showUploadModal,
    selectedFile,
    error,
    setShowUploadModal,
    handleFileSelect,
    handleUpload,
    deleteLoading,
    deletingId,
    handleDeleteJob,
    clearSelectedFile,
    previewRows,
    systemFields,
    fieldMapping,
    handleFieldMappingChange,
    isUploading,
    refetchJobs,
  } = useUploadJobs();

  const statusStyles = (status: string) => {
    switch (status) {
      case "PROCESSING":
        return "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200";
      case "COMPLETED":
        return "bg-green-50 text-green-700 ring-1 ring-green-200";
      case "FAILED":
        return "bg-red-50 text-red-700 ring-1 ring-red-200";
      default:
        return "bg-gray-50 text-gray-600 ring-1 ring-gray-200";
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-6 py-8">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Upload Jobs
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage bulk job uploads
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* 🔄 Refresh */}
            <button
              onClick={refetchJobs}
              className="
        inline-flex items-center gap-2
        rounded-xl
        bg-gray-100
        px-4 py-2.5
        text-sm font-medium text-gray-700
        hover:bg-gray-200
        transition
      "
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            {/* ⬆️ New Upload */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="
        inline-flex items-center gap-2
        rounded-xl
        bg-linear-to-r from-blue-600 to-indigo-600
        px-5 py-2.5
        text-sm font-medium text-white
        shadow
        hover:opacity-90
        transition
      "
            >
              <UploadCloud size={16} />
              New Upload
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl bg-white shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Job ID</th>
                <th className="px-6 py-4 text-left font-medium">File</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-left font-medium">Uploaded</th>
                <th className="px-6 py-4 text-left font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-14 text-center text-gray-500"
                  >
                    No upload jobs yet 🚀
                  </td>
                </tr>
              )}

              {jobs?.map((j) => (
                <tr
                  key={j?._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {j?._id}
                  </td>

                  <td className="px-6 py-4 text-gray-700 truncate max-w-xs">
                    {j?.fileName}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles(
                        j?.status,
                      )}`}
                    >
                      {j?.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {" "}
                    {formatDateTime(j?.createdAt)}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    {j?.status === "COMPLETED" && (
                      <button
                        onClick={() => navigate(`/upload-jobs/${j?._id}`)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition"
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                    )}

                    <button
                      onClick={async () => {
                        await handleDeleteJob(j?._id);

                        setJobs((prev) =>
                          prev.filter((item) => item?._id !== j?._id),
                        );
                      }}
                      disabled={deleteLoading && deletingId === j?._id}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium
    transition-all duration-200
    ${
      deletingId === j?._id
        ? "bg-red-100 text-red-600 cursor-not-allowed"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  `}
                    >
                      <Trash2
                        size={14}
                        className={deletingId === j?._id ? "animate-pulse" : ""}
                      />
                      {deletingId === j?._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800">
                Upload Job File
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                CSV or XLSX files supported
              </p>

              {error && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* File Picker */}
              <div className="mt-6 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
                <p className="mb-3 text-sm text-gray-600 truncate">
                  {selectedFile
                    ? selectedFile.name
                    : "Drag & drop or select a file"}
                </p>

                <div className="flex justify-center gap-3">
                  {!selectedFile && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      Select File
                    </button>
                  )}

                  {selectedFile && (
                    <button
                      onClick={clearSelectedFile}
                      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Preview */}
              {previewRows.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Preview (first 20 rows)
                  </p>

                  <div className="max-h-64 overflow-auto rounded-xl border bg-gray-50">
                    <table className="w-full text-xs">
                      <thead>
                        {/* Mapping Dropdown Row */}
                        <tr className="bg-white border-b">
                          {Object.keys(previewRows[0]).map((key) => (
                            <th key={key} className="px-3 py-2">
                              <select
                                value={
                                  Object.entries(fieldMapping).find(
                                    ([, csv]) => csv === key,
                                  )?.[0] || ""
                                }
                                onChange={(e) =>
                                  handleFieldMappingChange(key, e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              >
                                <option value="">Select field</option>

                                {systemFields.map((field) => (
                                  <option key={field} value={field}>
                                    {field}
                                  </option>
                                ))}
                              </select>
                            </th>
                          ))}
                        </tr>

                        {/* Excel Header Row */}
                        <tr className="bg-gray-100">
                          {Object.keys(previewRows[0]).map((key) => (
                            <th
                              key={key}
                              className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider
             text-gray-600 border-b border-gray-200
             max-w-160px truncate whitespace-nowrap"
                              title={key}
                            >
                              {key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {previewRows.map((row, idx) => (
                          <tr key={idx} className="border-t">
                            {Object.values(row).map((val, i) => (
                              <td key={i} className="px-3 py-2 text-gray-700">
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="
    flex items-center justify-center gap-2
    rounded-xl
    bg-linear-to-r from-blue-600 to-indigo-600
    px-4 py-2 text-sm font-medium text-white
    transition-all duration-200
    hover:opacity-90
    disabled:opacity-70
  "
                >
                  {isUploading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadJobs;
