type FilterButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export function FilterButton({ onClick, disabled }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-bold py-2 px-4 rounded-md transition ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
      }`}
    >
      フィルタリング実行
    </button>
  );
}
