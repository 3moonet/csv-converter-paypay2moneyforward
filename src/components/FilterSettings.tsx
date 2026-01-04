import type { FilterSettings as FilterSettingsType } from "../types/filter";

type FilterSettingsProps = {
  filterSettings: FilterSettingsType;
  setFilterSettings: (settings: FilterSettingsType) => void;
};

export function FilterSettings({
  filterSettings,
  setFilterSettings,
}: FilterSettingsProps) {
  const handleToggle = (key: keyof FilterSettingsType) => {
    setFilterSettings({
      ...filterSettings,
      [key]: !filterSettings[key],
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md space-y-3">
      <p className="text-sm font-semibold text-gray-800">フィルタ設定</p>

      <div className="space-y-2">
        <ToggleSwitch
          label="出金のみ抽出"
          checked={filterSettings.enableOutgoingFilter}
          onChange={() => handleToggle("enableOutgoingFilter")}
          description="入金金額がある行を除外"
        />

        <ToggleSwitch
          label="ポイント運用を除外"
          checked={filterSettings.enablePointOperationExclude}
          onChange={() => handleToggle("enablePointOperationExclude")}
          description="PayPayポイント運用の行を除外"
        />

        <ToggleSwitch
          label="残高取引を除外"
          checked={filterSettings.enableBalanceExclude}
          onChange={() => handleToggle("enableBalanceExclude")}
          description="PayPay残高の取引を除外"
        />
      </div>
    </div>
  );
}

type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
  description?: string;
};

function ToggleSwitch({
  label,
  checked,
  onChange,
  description,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">
        <label
          className="text-sm font-medium text-gray-700 cursor-pointer"
          onClick={onChange}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? "bg-blue-600" : "bg-gray-200"}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
            transition duration-200 ease-in-out
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
