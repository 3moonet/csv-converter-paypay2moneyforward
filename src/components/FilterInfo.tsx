export function FilterInfo() {
  return (
    <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-600 space-y-1">
      <p className="font-semibold text-gray-800">除外される行:</p>
      <ul className="space-y-0.5 ml-2">
        <li>• 入金金額がある行（支出でない）</li>
        <li>• PayPayポイント運用の行</li>
        <li>• PayPay残高の取引</li>
      </ul>
    </div>
  );
}
