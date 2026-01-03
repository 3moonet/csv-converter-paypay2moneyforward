import type { CSVText } from "../types/csv";

type StatisticsProps = {
  csvData: CSVText;
  filteredData: CSVText | null;
};

export function Statistics({ csvData, filteredData }: StatisticsProps) {
  if (!csvData) {
    return null;
  }

  const inputRows = csvData.split("\n").filter((l) => l.trim()).length - 1;
  const outputRows = filteredData
    ? filteredData.split("\n").filter((l) => l.trim()).length - 1
    : null;

  return (
    <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600">
      <p>入力: {inputRows} 行</p>
      {outputRows !== null && <p>出力: {outputRows} 行</p>}
    </div>
  );
}
