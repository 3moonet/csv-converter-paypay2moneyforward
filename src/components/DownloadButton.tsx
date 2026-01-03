import { Download } from "lucide-react";
import type { CSVText } from "../types/csv";
import { useCSVDownload } from "../hooks/useCSVDownload";

type DownloadButtonProps = {
  filteredData: CSVText;
};

const MAX_ROWS_PER_FILE = 100;

function splitCSV(csvData: CSVText): CSVText[] {
  const lines = csvData.split("\n").filter((line) => line.trim());
  if (lines.length === 0) return [];

  const headers = lines[0];
  const dataLines = lines.slice(1);

  // データ行が100行以下の場合はそのまま返す
  if (dataLines.length <= MAX_ROWS_PER_FILE) {
    return [csvData];
  }

  // データ行を100行ごとに分割（ヘッダー行は各ファイルに含める）
  const chunks: CSVText[] = [];
  for (let i = 0; i < dataLines.length; i += MAX_ROWS_PER_FILE) {
    const chunkDataLines = dataLines.slice(i, i + MAX_ROWS_PER_FILE);
    chunks.push([headers, ...chunkDataLines].join("\n"));
  }

  return chunks;
}

export function DownloadButton({ filteredData }: DownloadButtonProps) {
  const { isDownloading, download } = useCSVDownload();
  const csvChunks = splitCSV(filteredData);

  return (
    <div className="space-y-2">
      {csvChunks.length > 1 && (
        <p className="text-sm text-gray-600 text-center">
          データが{MAX_ROWS_PER_FILE}行を超えているため、{csvChunks.length}
          個のファイルに分割されます
        </p>
      )}
      {csvChunks.map((chunk, index) => (
        <button
          key={index}
          onClick={() => download(chunk)}
          disabled={isDownloading}
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition flex items-center justify-center gap-2"
        >
          <Download size={18} />
          {isDownloading
            ? "ダウンロード中..."
            : csvChunks.length > 1
            ? `CSVをダウンロード (${index + 1}/${csvChunks.length})`
            : "CSVをダウンロード"}
        </button>
      ))}
    </div>
  );
}
