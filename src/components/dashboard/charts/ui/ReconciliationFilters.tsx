type Filters = {
  status: string;
  uploadedBy: string;
  fromDate: string;
  toDate: string;
};

type Actions = {
  setStatus: (v: string) => void;
  setUploadedBy: (v: string) => void;
  setFromDate: (v: string) => void;
  setToDate: (v: string) => void;
};

type Props = {
  filters: Filters;
  actions: Actions;
  onSubmit: () => void;
};

const ReconciliationFilters = ({
  filters,
  actions,
  onSubmit,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-6 mb-5 items-end">
      {/* From Date */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          From Date
        </label>
        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => actions.setFromDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* To Date */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          To Date
        </label>
        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => actions.setToDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => actions.setStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Status</option>
          <option value="matched">Matched</option>
          <option value="partial">Partial Match</option>
          <option value="unmatched">Unmatched</option>
          <option value="duplicates">Duplicates</option>
        </select>
      </div>

      {/* Uploaded By */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Uploaded By
        </label>
        <select
          value={filters.uploadedBy}
          onChange={(e) => actions.setUploadedBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Users</option>
          <option value="admin">Admin</option>
          <option value="analyst">Analyst</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        type="button"
        onClick={onSubmit}
        className="h-9 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Apply
      </button>
    </div>
  );
};

export default ReconciliationFilters;
