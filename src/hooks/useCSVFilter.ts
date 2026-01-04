import { useState } from "react";
import type { CSVText } from "../types/csv";
import type { FilterSettings } from "../types/filter";
import { useMessage } from "../contexts/MessageContext/hooks";

const FILTER_RULES = {
  EXCLUDE_PATTERNS: {
    POINT_OPERATION: "PayPayポイント運用",
    BALANCE: "PayPay残高",
  },
  OUTGOING_COLUMN_INDEX: 1,
  EMPTY_VALUES: ["-", ""] as readonly string[],
} as const;

function filterCSVData(csvData: CSVText, filterSettings: FilterSettings): CSVText {
  const lines = csvData.split("\n").filter((line) => line.trim());
  const headers = lines[0];
  const dataLines = lines.slice(1);

  const filteredLines = dataLines.filter((line) => {
    const columns = line.split(",");

    // 出金列フィルタ
    if (filterSettings.enableOutgoingFilter) {
      const outgoingValue = columns[FILTER_RULES.OUTGOING_COLUMN_INDEX];
      const hasOutgoing =
        outgoingValue &&
        !FILTER_RULES.EMPTY_VALUES.includes(outgoingValue.trim());
      if (!hasOutgoing) return false;
    }

    // ポイント運用除外
    if (filterSettings.enablePointOperationExclude) {
      if (line.includes(FILTER_RULES.EXCLUDE_PATTERNS.POINT_OPERATION)) {
        return false;
      }
    }

    // 残高除外
    if (filterSettings.enableBalanceExclude) {
      if (line.includes(FILTER_RULES.EXCLUDE_PATTERNS.BALANCE)) {
        return false;
      }
    }

    return true;
  });

  return [headers, ...filteredLines].join("\n");
}

export function useCSVFilter(csvData: CSVText, filterSettings: FilterSettings) {
  const [filteredData, setFilteredData] = useState<CSVText>("");
  const { setMessage } = useMessage();

  const filter = (): void => {
    if (!csvData.trim()) {
      setMessage({ content: "CSVファイルをアップロードしてください", type: "error" });
      return;
    }

    const lines = csvData.split("\n").filter((line) => line.trim());
    if (lines.length < 1) {
      setMessage({ content: "データが不足しています", type: "error" });
      return;
    }

    const filteredCSV = filterCSVData(csvData, filterSettings);
    setFilteredData(filteredCSV);
    setMessage({ content: "フィルタリング完了", type: "success" });
  };

  return {
    filteredData,
    filter,
  };
}
