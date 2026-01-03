export const MESSAGES = {
  FILE: {
    LOADED: "ファイルを読み込みました",
    LOAD_ERROR: "ファイルを読み込めませんでした",
  },
  FILTER: {
    NO_FILE: "CSVファイルをアップロードしてください",
    INSUFFICIENT_DATA: "データが不足しています",
    SUCCESS: "✓ フィルタリング完了",
    ERROR: "エラーが発生しました",
  },
  DOWNLOAD: {
    NO_FILTERED_DATA: "まずフィルタリングを実行してください",
    STARTED: "✓ ダウンロード開始しました",
    ERROR: "ダウンロードエラーが発生しました",
  },
} as const;
