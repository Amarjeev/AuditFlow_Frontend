type Props = {
  filters: {
    status: string;
    uploadedBy: string;
    fromDate: string;
    toDate: string;
  };
  actions: {
    setStatus: (v: string) => void;
    setUploadedBy: (v: string) => void;
    setFromDate: (v: string) => void;
    setToDate: (v: string) => void;
  };
};

const ReconciliationFilters = ({ filters, actions }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 mb-5">
      <input
        type="date"
        value={filters.fromDate}
        onChange={(e) => actions.setFromDate(e.target.value)}
      />
      <input
        type="date"
        value={filters.toDate}
        onChange={(e) => actions.setToDate(e.target.value)}
      />

      <select
        value={filters.status}
        onChange={(e) => actions.setStatus(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="matched">Matched</option>
        <option value="partial">Partial Match</option>
        <option value="unmatched">Unmatched</option>
        <option value="duplicates">Duplicates</option>
      </select>

      <select
        value={filters.uploadedBy}
        onChange={(e) => actions.setUploadedBy(e.target.value)}
      >
        <option value="all">All Users</option>
        <option value="system">System</option>
        <option value="user1">User 1</option>
        <option value="user2">User 2</option>
      </select>
    </div>
  );
};

export default ReconciliationFilters;
