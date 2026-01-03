import { useState } from "react";
import { Download } from "lucide-react";
import { MESSAGES, DOWNLOAD_CONFIG } from "./constants/filterRules";
import { filterCSVData } from "./utils/csvFilter";

export default function CSVFilter() {
  const [csvData, setCsvData] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [message, setMessage] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") {
          setCsvData(text);
          setMessage(MESSAGES.FILE.LOADED);
        } else {
          setMessage(MESSAGES.FILE.LOAD_ERROR);
        }
      };
      reader.readAsText(file, "utf-8");
    }
  };

  const filterCSV = () => {
    if (!csvData.trim()) {
      setMessage(MESSAGES.FILTER.NO_FILE);
      return;
    }

    const result = filterCSVData(csvData);

    if (result.type === "error") {
      setMessage(MESSAGES.FILTER.INSUFFICIENT_DATA);
      return;
    }

    setFilteredData(result.filteredCSV);
    setMessage(MESSAGES.FILTER.SUCCESS(result.filteredCount));
  };

  const downloadCSV = () => {
    if (!filteredData.trim()) {
      setMessage(MESSAGES.DOWNLOAD.NO_FILTERED_DATA);
      return;
    }

    setIsDownloading(true);
    try {
      const csvWithBOM = DOWNLOAD_CONFIG.BOM + filteredData;
      const blob = new Blob([csvWithBOM], { type: DOWNLOAD_CONFIG.MIME_TYPE });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", DOWNLOAD_CONFIG.FILENAME);
      link.style.visibility = "hidden";

      document.body.appendChild(link);

      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setMessage(MESSAGES.DOWNLOAD.STARTED);
        setIsDownloading(false);
      }, DOWNLOAD_CONFIG.CLICK_DELAY);
    } catch {
      setMessage(MESSAGES.DOWNLOAD.ERROR);
      setIsDownloading(false);
    }
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
            onClick={downloadCSV}
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
