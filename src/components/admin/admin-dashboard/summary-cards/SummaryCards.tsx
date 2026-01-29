import SummaryCard from "./SummaryCard";

export default function SummaryCards() {
  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-gray-800">
          Summary Overview
        </h3>
      </div>

      {/* Cards */}
      <div
        className="
          grid gap-4
          grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
        "
      >
        <SummaryCard title="Total Records" value={50230} />

        <SummaryCard
          title="Matched"
          value={48000}
          variant="success"
          trend={{ value: "+2.1%", label: "vs last run" }}
        />

        <SummaryCard
          title="Unmatched"
          value={1200}
          variant="danger"
          trend={{ value: "-0.8%" }}
        />

        <SummaryCard title="Duplicates" value={30} variant="warning" />

        <SummaryCard title="Accuracy %" value="95.5%" variant="info" />
      </div>
    </section>
  );
}
