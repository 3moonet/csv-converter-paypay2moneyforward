import { useState } from "react";
import type { CSVText } from "../types/csv";

const FILTER_RULES = {
  EXCLUDE_PATTERNS: ["PayPayポイント運用", "PayPay残高"] as const,
  OUTGOING_COLUMN_INDEX: 1,
  EMPTY_VALUES: ["-", ""] as readonly string[],
} as const;

type FilterResult =
  | {
      type: "success";
      filteredCSV: CSVText;
    }
  | {
      type: "error";
    };

function filterCSVData(csvData: CSVText): FilterResult {
  const lines = csvData.split("\n").filter((line) => line.trim());

  if (lines.length < 1) {
    return {
      type: "error",
    };
  }

  const headers = lines[0];
  const dataLines = lines.slice(1);

  const filteredLines = dataLines.filter((line) => {
    const columns = line.split(",");
    const outgoingValue = columns[FILTER_RULES.OUTGOING_COLUMN_INDEX];
    const hasOutgoing =
      outgoingValue &&
      !FILTER_RULES.EMPTY_VALUES.includes(outgoingValue.trim());
    const isNotExcluded = !FILTER_RULES.EXCLUDE_PATTERNS.some((pattern) =>
      line.includes(pattern)
    );
    return hasOutgoing && isNotExcluded;
  });

  const filteredCSV = [headers, ...filteredLines].join("\n");

  return {
    type: "success",
    filteredCSV,
  };
}

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
