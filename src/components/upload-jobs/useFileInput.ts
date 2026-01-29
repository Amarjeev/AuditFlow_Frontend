import { useRef, useState } from "react";

export const useFileInput = (
  parseCSV: (file: File) => void,
  parseExcel: (file: File) => void,
  setError: (msg: string) => void
) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    const isCSV = file.name.toLowerCase().endsWith(".csv");
    const isExcel = file.name.toLowerCase().endsWith(".xlsx");

    if (!isCSV && !isExcel) {
      setError("Only CSV or Excel (.xlsx) files are allowed");
      resetFileInput();
      return;
    }

    if (isCSV) {
      parseCSV(file);
    } else {
      parseExcel(file);
    }
    setSelectedFile(file);
  };

  return {
    fileInputRef,
    selectedFile,
    setSelectedFile,
    handleFileSelect,
    resetFileInput,
  };
};
