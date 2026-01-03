import { useState } from "react";
import type { CSVText } from "../types/csv";
import { downloadCSV } from "../utils/csvDownload";

export function useCSVDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = (
    csvData: CSVText
  ): { type: "success" } | { type: "error" } => {
    if (!csvData.trim()) {
      return { type: "error" };
    }

    setIsDownloading(true);
    const result = downloadCSV(csvData);
    setIsDownloading(false);

    return result;
  };

  return {
    isDownloading,
    download,
  };
}
