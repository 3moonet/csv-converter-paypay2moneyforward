import type { FilterSettings } from "../types/filter";

type FilterInfoProps = {
  filterSettings: FilterSettings;
};

export function FilterInfo({ filterSettings }: FilterInfoProps) {
  const activeFilters = [];

  if (filterSettings.enableOutgoingFilter) {
    activeFilters.push("入金金額がある行（支出でない）");
  }

  if (filterSettings.enablePointOperationExclude) {
    activeFilters.push("PayPayポイント運用の行");
  }

  if (filterSettings.enableBalanceExclude) {
    activeFilters.push("PayPay残高の取引");
  }

  if (activeFilters.length === 0) {
    return (
      <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600">
        <p className="text-gray-500 italic">
          フィルタが無効です。すべての行が出力されます。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 space-y-1">
      <p className="font-semibold text-gray-800">除外される行:</p>
      <ul className="space-y-0.5 ml-2">
        {activeFilters.map((filter, index) => (
          <li key={index}>• {filter}</li>
        ))}
      </ul>
    </div>
  );
}
