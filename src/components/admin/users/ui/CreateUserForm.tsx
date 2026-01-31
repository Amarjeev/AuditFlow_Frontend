import type { CreateUserFormProps } from "../types/user.types";

const CreateUserForm = ({
  form,
  error,
  handleChange,
  createUser,
  handleCancel,
  loading,
}: CreateUserFormProps) => {
  return (
    <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Create New User</h2>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          name="mobile"
          placeholder="Enter a valid 10-digit Indian mobile number"
          value={form.mobile}
          onChange={handleChange}
        />

        <select
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="analyst">Analyst</option>
          <option value="viewer">Viewer</option>
        </select>

        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={handleCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700
                     hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={createUser}
          disabled={loading}
          className="relative flex items-center justify-center gap-2 rounded-lg
             bg-blue-600 px-5 py-2 text-sm font-semibold text-white
             shadow-sm transition-all duration-200
             hover:bg-blue-700
             disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>
    </div>
  );
};

export default CreateUserForm;
