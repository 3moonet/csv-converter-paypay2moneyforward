import { useState } from "react";
import type { CSVText } from "../types/csv";
import { useMessage } from "../contexts/MessageContext/hooks";

const DOWNLOAD_CONFIG = {
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

function padZero(value: number): string {
  return value.toString().padStart(2, "0");
}

function generateFilename(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = padZero(now.getUTCMonth() + 1);
  const date = padZero(now.getUTCDate());
  const hours = padZero(now.getUTCHours());
  const minutes = padZero(now.getUTCMinutes());
  const seconds = padZero(now.getUTCSeconds());
  return `filtered_transactions_${year}${month}${date}${hours}${minutes}${seconds}.csv`;
}

function downloadCSV(csvData: CSVText): void {
  const blob = createBlobWithBOM(csvData);
  const url = URL.createObjectURL(blob);
  const filename = generateFilename();
  const link = createDownloadLink(url, filename);
  triggerDownload(link);
  URL.revokeObjectURL(url);
}

export function useCSVDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { setMessage } = useMessage();

  const download = (csvData: CSVText): void => {
    if (!csvData.trim()) {
      setMessage({ content: "まずフィルタリングを実行してください", type: "info" });
      return;
    }

    setIsDownloading(true);
    downloadCSV(csvData);
    setIsDownloading(false);
    setMessage({ content: "ダウンロード開始しました", type: "success" });
  };

  return {
    isDownloading,
    download,
  };
}
