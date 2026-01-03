type ReadFileResult =
  | {
      type: "success";
      content: string;
    }
  | {
      type: "error";
    };

export function readFileAsText(file: File): Promise<ReadFileResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        resolve({
          type: "success",
          content: text,
        });
      } else {
        resolve({
          type: "error",
        });
      }
    };

    reader.onerror = () => {
      resolve({
        type: "error",
      });
    };

    reader.readAsText(file, "utf-8");
  });
}
