import { useState } from "react";
import { Download } from "lucide-react";
import { MESSAGES } from "./constants/filterRules";
import { useFileUpload } from "./hooks/useFileUpload";
import { useCSVFilter } from "./hooks/useCSVFilter";
import { useCSVDownload } from "./hooks/useCSVDownload";

export default function CSVFilter() {
  const { csvData, handleFileUpload: handleFileUploadBase } = useFileUpload();
  const { filteredData, filter: filterBase } = useCSVFilter(csvData);
  const { isDownloading, download: downloadBase } = useCSVDownload();
  const [message, setMessage] = useState("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const result = await handleFileUploadBase(event);
    if (result?.type === "error") {
      setMessage(MESSAGES.FILE.LOAD_ERROR);
      return;
    }
    if (result?.type === "success") {
      setMessage(MESSAGES.FILE.LOADED);
    }
  };

  const filterCSV = () => {
    if (!csvData.trim()) {
      setMessage(MESSAGES.FILTER.NO_FILE);
      return;
    }

    const result = filterBase();

    if (result.type === "error") {
      setMessage(MESSAGES.FILTER.INSUFFICIENT_DATA);
      return;
    }

    setMessage(MESSAGES.FILTER.SUCCESS);
  };

  const handleDownload = () => {
    if (!filteredData.trim()) {
      setMessage(MESSAGES.DOWNLOAD.NO_FILTERED_DATA);
      return;
    }

    const result = downloadBase(filteredData);

    if (result.type === "error") {
      setMessage(MESSAGES.DOWNLOAD.ERROR);
      return;
    }

    setMessage(MESSAGES.DOWNLOAD.STARTED);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* タイトル */}
        <h1 className="text-2xl font-bold text-gray-800">CSV フィルター</h1>

        {/* ファイルアップロード */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            CSVファイルをアップロード
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="w-full text-sm text-gray-600 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 file:font-semibold cursor-pointer"
          />
        </div>

        {/* フィルタリングボタン */}
        <button
          onClick={filterCSV}
          disabled={!csvData.trim()}
          className={`w-full font-bold py-2 px-4 rounded-md transition ${
            csvData.trim()
              ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          フィルタリング実行
        </button>

        {/* ダウンロードボタン */}
        {filteredData && (
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition flex items-center justify-center gap-2"
          >
            <Download size={18} />
            {isDownloading ? "ダウンロード中..." : "CSVをダウンロード"}
          </button>
        )}

        {/* メッセージ */}
        {message && (
          <div
            className={`p-3 rounded-md text-sm font-medium text-center ${
              message.includes("✓")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-blue-100 text-blue-800 border border-blue-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* 統計 */}
        {csvData && (
          <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600">
            <p>
              入力: {csvData.split("\n").filter((l) => l.trim()).length - 1} 行
            </p>
            {filteredData && (
              <p>
                出力:{" "}
                {filteredData.split("\n").filter((l) => l.trim()).length - 1} 行
              </p>
            )}
          </div>
        )}

        {/* 除外される行の説明 */}
        <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 space-y-1">
          <p className="font-semibold text-gray-800">除外される行:</p>
          <ul className="space-y-0.5 ml-2">
            <li>• 入金金額がある行（支出でない）</li>
            <li>• PayPayポイント運用の行</li>
            <li>• PayPay残高の取引</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
