import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from "./constants";
import type { Props, DataItem } from "../type/reconciliationChart.types";

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
      📊
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 mt-1 max-w-sm">{description}</p>
  </div>
);

const ReconciliationChart = ({ data, loading }: Props) => {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Loading reconciliation chart…
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="Apply filters to view reconciliation"
        description="Select a date range, status, or user and click Apply to see reconciliation insights."
      />
    );
  }

  const total = data.matched + data.partial + data.unmatched + data.duplicate;

  if (total === 0) {
    return (
      <EmptyState
        title="No data found"
        description="There are no reconciliation records for the selected filters."
      />
    );
  }

  const chartData: DataItem[] = [
    { key: "matched", name: "Matched", value: data.matched },
    { key: "partial", name: "Partial Match", value: data.partial },
    { key: "unmatched", name: "Unmatched", value: data.unmatched },
    { key: "duplicate", name: "Duplicates", value: data.duplicate },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full">
      {/* Chart */}
      <div className="relative w-full max-w-[420px] aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={3}
              stroke="transparent"
            >
              {chartData.map((item) => (
                <Cell key={item.key} fill={COLORS[item.key]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-gray-900">
            {data.accuracy}%
          </span>
          <span className="text-sm text-gray-500 mt-1">Accuracy</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full max-w-xs space-y-4">
        {chartData.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[item.key] }}
              />
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>

            <span className="text-sm font-semibold text-gray-900">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReconciliationChart;
