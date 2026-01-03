import { Download } from "lucide-react";
import type { CSVText } from "../types/csv";
import { useCSVDownload } from "../hooks/useCSVDownload";

type DownloadButtonProps = {
  filteredData: CSVText;
};

export function DownloadButton({ filteredData }: DownloadButtonProps) {
  const { isDownloading, download } = useCSVDownload();

  return (
    <button
      onClick={() => download(filteredData)}
      disabled={isDownloading}
      className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition flex items-center justify-center gap-2"
    >
      <Download size={18} />
      {isDownloading ? "ダウンロード中..." : "CSVをダウンロード"}
    </button>
  );
}
