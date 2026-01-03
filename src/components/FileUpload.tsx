type FileUploadProps = {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FileUpload({ onFileUpload }: FileUploadProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        CSVファイルをアップロード
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={onFileUpload}
        className="w-full text-sm text-gray-600 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 file:font-semibold cursor-pointer"
      />
    </div>
  );
}
