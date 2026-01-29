export const StatusBadge = ({ status }: { status: string }) => {
  const styles =
    status === "MATCHED"
      ? "bg-green-50 text-green-700"
      : status === "PARTIAL"
      ? "bg-yellow-50 text-yellow-700"
      : status === "DUPLICATE"
      ? "bg-blue-50 text-blue-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};
