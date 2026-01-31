import ReconciliationChart from "./ReconciliationChart";
import ReconciliationFilters from "./ReconciliationFilters";
import { useReconciliationFilters } from "../hooks/useReconciliationFilters";

const ReconciliationSection = () => {
  const { filters, actions, data, loading } = useReconciliationFilters();

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
      {/* Filters */}
      <div className="px-6 py-4 bg-gray-50/60 border-b">
        <ReconciliationFilters
          filters={filters}
          actions={actions}
          onSubmit={actions.handleApplyFilters}
        />
      </div>

      {/* Chart (FILL SPACE) */}
      <div className="px-6 py-6 flex-1 min-h-[420px]">
        <ReconciliationChart data={data} loading={loading} />
      </div>
    </section>
  );
};

export default ReconciliationSection;
