import { useState } from "react";
import type { CSVText } from "../types/csv";
import { readFileAsText } from "../utils/fileReader";

export function useFileUpload() {
  const [csvData, setCsvData] = useState<CSVText>("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<{ type: "success" } | { type: "error" } | undefined> => {
    const file = event.target.files?.[0];
    if (!file) {
      return undefined;
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
