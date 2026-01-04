# CLAUDE.md

このファイルは Claude Code がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

PayPay の取引履歴 CSV ファイルを MoneyForward で読み込める形式に変換する React Web ツール。クライアント側で完結します。

## よく使うコマンド

```bash
# 開発サーバーの起動
pnpm dev

# 型チェック
pnpm typecheck

# リント
pnpm lint

# ビルド（TypeScript コンパイル + Vite ビルド）
pnpm build

# Playwright 関連ファイルのクリーンアップ
pnpm clean:playwright
```

## アーキテクチャ

### ディレクトリ構造

```txt
src/
├── components/        # UI コンポーネント
├── contexts/          # React Context（メッセージ管理）
├── hooks/             # カスタムフック（ファイル、CSV処理）
├── types/             # TypeScript 型定義
├── App.tsx            # ルートコンポーネント
└── main.tsx           # エントリーポイント
```

### 主要な流れ

1. ユーザーがファイルをアップロード (`useFileUpload`)
2. フィルタボタンクリックで CSV 処理 (`useCSVFilter`)
   - PayPay ポイント運用、PayPay 残高 を含む行を除外
   - 出金列（索引 1）が空の行を除外
   - ヘッダー行は保持
3. フィルター済み CSV をダウンロード (`useCSVDownload`)
4. 各操作のメッセージを `MessageContext` で表示

## 技術スタック

- React 19 + TypeScript 5.9
- Vite 7（ビルドツール・開発サーバー）
- Tailwind CSS 4
- Lucide React（アイコン）
- ESLint（コード品質チェック）

## GitHub Pages デプロイ

GitHub Actions で自動デプロイ設定済み（`.github/workflows/deploy.yml`）：

- **トリガー**: main ブランチへの push または手動実行（workflow_dispatch）
- **ビルド時の BASE_URL**: `/${{ github.event.repository.name }}/` に自動設定
- **デプロイ先**: GitHub Pages
