import type {
  SummaryCardVariant,
  SummaryCardProps,
} from "../type/reconciliationSummary.types";

const variantStyles: Record<
  SummaryCardVariant,
  {
    text: string;
    bar: string;
    trend: string;
    glow: string;
  }
> = {
  success: {
    text: "text-green-600",
    bar: "bg-green-500",
    trend: "text-green-600",
    glow: "hover:shadow-green-200/40",
  },
  warning: {
    text: "text-yellow-600",
    bar: "bg-yellow-500",
    trend: "text-yellow-600",
    glow: "hover:shadow-yellow-200/40",
  },
  danger: {
    text: "text-red-600",
    bar: "bg-red-500",
    trend: "text-red-600",
    glow: "hover:shadow-red-200/40",
  },
  info: {
    text: "text-blue-600",
    bar: "bg-blue-500",
    trend: "text-blue-600",
    glow: "hover:shadow-blue-200/40",
  },
};

export default function SummaryMetricCard({
  title,
  value,
  variant = "info",
  trend,
}: SummaryCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        border border-gray-200 bg-white p-4
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-md ${styles.glow}
      `}
    >
      {/* Accent bar */}
      <div
        className={`absolute left-0 top-0 h-full w-1 transition-all duration-300
        group-hover:w-1.5 ${styles.bar}`}
      />

      {/* Title */}
      <p className="text-sm font-medium tracking-wide text-gray-500">{title}</p>

      {/* Value */}
      <h2
        className={`mt-2 text-3xl font-semibold tracking-tight ${styles.text}`}
      >
        {value}
      </h2>

      {/* Trend */}
      {trend && (
        <p className={`mt-1 text-sm ${styles.trend}`}>
          {trend.value}
          {trend.label && (
            <span className="ml-1 text-gray-400">{trend.label}</span>
          )}
        </p>
      )}
    </div>
  );
}
