import { useState } from "react";
import type { CSVText } from "../types/csv";

const DOWNLOAD_CONFIG = {
  FILENAME: "filtered_transactions.csv",
  BOM: "\uFEFF",
  MIME_TYPE: "text/csv;charset=utf-8;",
} as const;

type DownloadResult =
  | {
      type: "success";
    }
  | {
      type: "error";
    };

function createBlobWithBOM(csvData: CSVText): Blob {
  const csvWithBOM = DOWNLOAD_CONFIG.BOM + csvData;
  return new Blob([csvWithBOM], { type: DOWNLOAD_CONFIG.MIME_TYPE });
}

function createDownloadLink(url: string, filename: string): HTMLAnchorElement {
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  return link;
}

function triggerDownload(link: HTMLAnchorElement, url: string): void {
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function downloadCSV(csvData: CSVText): DownloadResult {
  if (!csvData.trim()) {
    return {
      type: "error",
    };
  }

  const blob = createBlobWithBOM(csvData);
  const url = URL.createObjectURL(blob);
  const link = createDownloadLink(url, DOWNLOAD_CONFIG.FILENAME);
  triggerDownload(link, url);

  return {
    type: "success",
  };
}

export function useCSVDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = (
    csvData: CSVText
  ): { type: "success" } | { type: "error" } => {
    if (!csvData.trim()) {
      return { type: "error" };
    }

    setIsDownloading(true);
    const result = downloadCSV(csvData);
    setIsDownloading(false);

    return result;
  };

  return {
    isDownloading,
    download,
  };
}
