import { useState } from "react";
import type { CSVText } from "../types/csv";
import { useMessage } from "../contexts/MessageContext/hooks";

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
  const { setMessage } = useMessage();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const result = await readFileAsText(file);

    if (result.type === "error") {
      setMessage({ content: "ファイルを読み込めませんでした", type: "error" });
      return;
    }

    setCsvData(result.content);
    setMessage({ content: "ファイルを読み込みました", type: "info" });
  };

  return {
    csvData,
    handleFileUpload,
  };
}
