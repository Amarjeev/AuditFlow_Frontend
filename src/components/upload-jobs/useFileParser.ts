import Papa from "papaparse";
import * as XLSX from "xlsx";

/* ---------- Types ---------- */
type ExcelRow = Record<string, unknown>;

/* ---------- Helpers ---------- */
const excelSerialToDate = (serial: number): string => {
  const utcDays = Math.floor(serial - 25569);
  const date = new Date(utcDays * 86400 * 1000);
  return date.toISOString().split("T")[0];
};

/* ---------- Hook ---------- */
export const useFileParser = (
  setError: (msg: string) => void,
  setPreviewRows: (rows: ExcelRow[]) => void,
) => {
  /* ---------------- CSV PARSER ---------------- */
  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        if (!data.length) {
          setError("CSV file is empty");
          return;
        }

        setPreviewRows(data.slice(0, 10) as ExcelRow[]);
      },
      error: () => setError("Failed to parse CSV file"),
    });
  };

  /* ---------------- EXCEL PARSER ---------------- */
  const parseExcel = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target?.result, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rawData = XLSX.utils.sheet_to_json<ExcelRow>(sheet);

        if (!rawData.length) {
          setError("Excel file is empty");
          return;
        }

        const formattedData = rawData.map((row) => {
          const updatedRow: ExcelRow = { ...row };

          Object.keys(updatedRow).forEach((key) => {
            const value = updatedRow[key];

            if (
              typeof value === "number" &&
              key.toLowerCase().includes("date")
            ) {
              updatedRow[key] = excelSerialToDate(value);
            }
          });

          return updatedRow;
        });

        setPreviewRows(formattedData.slice(0, 20));
      } catch {
        setError("Failed to parse Excel file");
      }
    };

    reader.readAsBinaryString(file);
  };

  return { parseCSV, parseExcel };
};
