import { useState } from "react";
import type { CSVText } from "../types/csv";

type ReadFileResult =
  | {
      type: "success";
      content: CSVText;
    }
  | {
      type: "error";
    };

function readFileAsText(file: File): Promise<ReadFileResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        resolve({ type: "success", content: text });
      } else {
        resolve({ type: "error" });
      }
    };

    reader.onerror = () => {
      resolve({ type: "error" });
    };

    reader.readAsText(file, "utf-8");
  });
}

export function useFileUpload() {
  const [csvData, setCsvData] = useState<CSVText>("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<{ type: "success" } | { type: "error" } | void> => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const result = await readFileAsText(file);

    if (result.type === "error") {
      return { type: "error" };
    }

    setCsvData(result.content);
    return { type: "success" };
  };

  return {
    csvData,
    handleFileUpload,
  };
}
