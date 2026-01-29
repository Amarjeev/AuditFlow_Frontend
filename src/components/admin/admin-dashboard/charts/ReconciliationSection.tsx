import ReconciliationChart from "./ReconciliationChart";
import ReconciliationFilters from "./ReconciliationFilters";
import { useReconciliationFilters } from "./useReconciliationFilters";

const ReconciliationSection = () => {
  const { filters, actions, filteredData } = useReconciliationFilters();

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Reconciliation Overview
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Analyze and filter reconciliation data in real time
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gray-50/60">
        <ReconciliationFilters filters={filters} actions={actions} />
      </div>

      {/* Chart */}
      <div className="px-6 py-6">
        <ReconciliationChart data={filteredData} />
      </div>
    </section>
  );
};

export default ReconciliationSection;
