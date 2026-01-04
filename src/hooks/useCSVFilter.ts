import { useState } from "react";
import type { CSVText } from "../types/csv";
import { useMessage } from "../contexts/MessageContext/hooks";

const FILTER_RULES = {
  EXCLUDE_PATTERNS: ["PayPayポイント運用", "PayPay残高"] as const,
  OUTGOING_COLUMN_INDEX: 1,
  EMPTY_VALUES: ["-", ""] as readonly string[],
} as const;

function filterCSVData(csvData: CSVText): CSVText {
  const lines = csvData.split("\n").filter((line) => line.trim());
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

  return [headers, ...filteredLines].join("\n");
}

export function useCSVFilter(csvData: CSVText) {
  const [filteredData, setFilteredData] = useState<CSVText>("");
  const { setMessage } = useMessage();

  const filter = (): void => {
    if (!csvData.trim()) {
      setMessage({ content: "CSVファイルをアップロードしてください", type: "info" });
      return;
    }

    const lines = csvData.split("\n").filter((line) => line.trim());
    if (lines.length < 1) {
      setMessage({ content: "データが不足しています", type: "info" });
      return;
    }

    const filteredCSV = filterCSVData(csvData);
    setFilteredData(filteredCSV);
    setMessage({ content: "フィルタリング完了", type: "success" });
  };

  return {
    filteredData,
    filter,
  };
}
