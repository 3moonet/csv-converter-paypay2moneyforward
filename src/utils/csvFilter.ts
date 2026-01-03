const FILTER_RULES = {
  EXCLUDE_PATTERNS: ["PayPayポイント運用", "PayPay残高"] as const,
  OUTGOING_COLUMN_INDEX: 1,
  EMPTY_VALUES: ["-", ""] as readonly string[],
} as const;

type FilterResult =
  | {
      type: "success";
      filteredCSV: string;
      filteredCount: number;
      originalCount: number;
    }
  | {
      type: "error";
    };

export function filterCSVData(csvData: string): FilterResult {
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
    filteredCount: filteredLines.length,
    originalCount: dataLines.length,
  };
}
