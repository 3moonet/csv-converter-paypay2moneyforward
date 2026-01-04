import { useState } from "react";
import { MessageContextProvider } from "./contexts/MessageContext/provider";
import { useFileUpload } from "./hooks/useFileUpload";
import { useCSVFilter } from "./hooks/useCSVFilter";
import { FileUpload } from "./components/FileUpload";
import { FilterSettings } from "./components/FilterSettings";
import { FilterButton } from "./components/FilterButton";
import { DownloadButton } from "./components/DownloadButton";
import { MessageDisplay } from "./components/MessageDisplay";
import { Statistics } from "./components/Statistics";
import type { FilterSettings as FilterSettingsType } from "./types/filter";
import { DEFAULT_FILTER_SETTINGS } from "./types/filter";

function CSVFilterContent() {
  const [filterSettings, setFilterSettings] = useState<FilterSettingsType>(
    DEFAULT_FILTER_SETTINGS
  );
  const { csvData, handleFileUpload } = useFileUpload();
  const { filteredData, filter } = useCSVFilter(csvData, filterSettings);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">MoneyForward 用 PayPay CSV 変換ツール</h1>
          <p className="text-sm text-gray-600">PayPay 取引履歴を MoneyForward 形式に変換します。100行制限に合わせて自動で分割します</p>
        </div>

        <FileUpload onFileUpload={handleFileUpload} />

        <FilterButton onClick={filter} disabled={!csvData.trim()} />

        {filteredData && <DownloadButton filteredData={filteredData} />}

        <MessageDisplay />

        <Statistics csvData={csvData} filteredData={filteredData} />

        <FilterSettings
          filterSettings={filterSettings}
          setFilterSettings={setFilterSettings}
        />
      </div>
    </div>
  );
}

export default function CSVFilter() {
  return (
    <MessageContextProvider>
      <CSVFilterContent />
    </MessageContextProvider>
  );
}
