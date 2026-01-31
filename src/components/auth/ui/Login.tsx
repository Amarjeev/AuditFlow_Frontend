import useLoginLogic from "../hook/useLogin";

function Login() {
  const { userRole, form, error, handleChange, handleLogin, loading } =
    useLoginLogic();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">AuditFlow</h1>
          <p className="text-gray-500 mt-1">{userRole} Access Portal</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mobile Number
            </label>

            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              pattern="[6-9][0-9]{9}"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm
               focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 10-digit mobile number"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`
    w-full py-3 rounded-xl font-semibold text-white
    bg-blue-600 hover:bg-blue-700
    transition-all duration-300 ease-out
    active:scale-95
    disabled:opacity-70 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `}
          >
            {loading && (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}

            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-8">
          © 2026 AuditFlow
        </p>
      </div>
    </div>
  );
}

export default Login;
