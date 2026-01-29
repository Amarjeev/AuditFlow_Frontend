export const formatDateTime = (
  date: string | Date,
  locale: string = "en-IN",
): string => {
  if (!date) return "-";

  return new Date(date).toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
