import { useRef, useState } from "react";

type FileUploadProps = {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    setFileName(file?.name ?? null);
    onFileUpload(event);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        CSVファイルをアップロード
      </label>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className={`w-full py-3 px-4 rounded-md transition-all font-semibold border-2 ${
          fileName
            ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
            : "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }`}
      >
        {fileName ? `✓ ${fileName}` : "ファイルを選択"}
      </button>
    </div>
  );
}
