import SummaryMetricCard from "./SummaryMetricCard";
import { useReconciliationSummary } from "../hooks/useReconciliationSummary";

export default function ReconciliationSummarySection() {
  const { cards, loading } = useReconciliationSummary();

  if (loading) {
    return (
      <section className="space-y-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Summary Overview
        </h3>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-gray-800">
          Summary Overview
        </h3>
      </div>

      {/* Cards */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {cards.map((card) => (
          <SummaryMetricCard
            key={card.title}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}
