import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "./constants";

type DataItem = {
  key: string;
  name: string;
  value: number;
};

type Props = {
  data: DataItem[];
};

const ReconciliationChart = ({ data }: Props) => {
  const accuracy = "95.5%";

  return (
    <div className="flex flex-wrap items-center gap-10">
      {/* Chart */}
      <div className="relative w-[260px] h-[260px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={82}
              outerRadius={115}
              paddingAngle={3}
              stroke="transparent"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={COLORS[entry.key]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-semibold text-gray-900">
            {accuracy}
          </span>
          <span className="text-sm text-gray-500 mt-1">
            Accuracy
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[item.key] }}
              />
              <span className="text-sm text-gray-700 w-140px">
                {item.name}
              </span>
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
