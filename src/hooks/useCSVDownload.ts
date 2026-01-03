import { useState } from "react";
import type { CSVText } from "../types/csv";
import { useMessage } from "../contexts/MessageContext/hooks";

const DOWNLOAD_CONFIG = {
  FILENAME: "filtered_transactions.csv",
  BOM: "\uFEFF",
  MIME_TYPE: "text/csv;charset=utf-8;",
} as const;

function createBlobWithBOM(csvData: CSVText): Blob {
  const csvWithBOM = DOWNLOAD_CONFIG.BOM + csvData;
  return new Blob([csvWithBOM], { type: DOWNLOAD_CONFIG.MIME_TYPE });
}

function createDownloadLink(url: string, filename: string): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.visibility = "hidden";
  return link;
}

function triggerDownload(link: HTMLAnchorElement): void {
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadCSV(csvData: CSVText): void {
  const blob = createBlobWithBOM(csvData);
  const url = URL.createObjectURL(blob);
  const link = createDownloadLink(url, DOWNLOAD_CONFIG.FILENAME);
  triggerDownload(link);
  URL.revokeObjectURL(url);
}

export function useCSVDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { setMessage } = useMessage();

  const download = (csvData: CSVText): void => {
    if (!csvData.trim()) {
      setMessage("まずフィルタリングを実行してください");
      return;
    }

    setIsDownloading(true);
    downloadCSV(csvData);
    setIsDownloading(false);
    setMessage("✓ ダウンロード開始しました");
  };

  return {
    isDownloading,
    download,
  };
}
