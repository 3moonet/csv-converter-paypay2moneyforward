export const MESSAGES = {
  FILE: {
    LOADED: "ファイルを読み込みました",
    LOAD_ERROR: "ファイルを読み込めませんでした",
  },
  FILTER: {
    NO_FILE: "CSVファイルをアップロードしてください",
    INSUFFICIENT_DATA: "データが不足しています",
    SUCCESS: (count: number) => `✓ フィルタリング完了: ${count}行抽出`,
    ERROR: "エラーが発生しました",
  },
  DOWNLOAD: {
    NO_FILTERED_DATA: "まずフィルタリングを実行してください",
    STARTED: "✓ ダウンロード開始しました",
    ERROR: "ダウンロードエラーが発生しました",
  },
} as const;

export const DOWNLOAD_CONFIG = {
  FILENAME: "filtered_transactions.csv",
  BOM: "\uFEFF",
  MIME_TYPE: "text/csv;charset=utf-8;",
  CLICK_DELAY: 100,
} as const;
