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
        <h1 className="text-2xl font-bold text-gray-800">CSV フィルター</h1>

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
