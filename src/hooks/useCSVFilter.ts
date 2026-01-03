import { useState } from "react";
import type { CSVText } from "../types/csv";
import { filterCSVData } from "../utils/csvFilter";

export function useCSVFilter(csvData: CSVText) {
  const [filteredData, setFilteredData] = useState<CSVText>("");

  const filter = (): { type: "success" } | { type: "error" } => {
    if (!csvData.trim()) {
      return { type: "error" };
    }

    const result = filterCSVData(csvData);

    if (result.type === "error") {
      return { type: "error" };
    }

    setFilteredData(result.filteredCSV);
    return { type: "success" };
  };

  return {
    filteredData,
    filter,
  };
}
