# RM1-T005: ローカルで試作品の土台を起動する

- 状態: Ready
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: RM1-T004

## 目的

T004で仮採用した構成を使い、ローカルで動作する試作品の土台を作る。

## 前提

T004で次を仮採用済みとする。

- フロントエンド: React + TypeScript + Vite
- パッケージ管理: npm
- 散布図: Plotly.js + react-plotly.js
- 状態管理: Reactのローカルstate
- 分割取得と通信遅延の再現: 非同期ローカルモック
- 試作品の配置先: `prototypes/rm-001-scatter-pagination/`

正確な依存パッケージのバージョンは、このタスクで実際に初期化した`package.json`とlockfileに記録する。

## 対象

- React + TypeScript + Viteによる最小のフロントエンド構成
- npmによる依存管理
- ローカル起動コマンド
- 散布図を置く画面
- ビルド確認

## 対象外

- 散布図の描画
- ダミーデータの用意
- 分割取得モックの実装
- デプロイ
- 正式なフロントエンド構成の決定

## 参照文書

- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- [RM1-T004の成果物](rm-001-t004-select-provisional-stack.md)

## 変更対象

- `prototypes/rm-001-scatter-pagination/`

## 実装・調査内容

- `prototypes/rm-001-scatter-pagination/`にフロントエンドプロジェクトを初期化する
- React + TypeScript + Viteを使用する
- npmを使用する
- ローカル起動コマンドを設定する
- 散布図を配置する画面を作成する
- ビルドを確認する
- 実際に使用した依存パッケージのバージョンを`package.json`とlockfileへ残す

Plotly.js + react-plotly.jsを使った散布図の描画はT006で行う。

## エラーと境界条件

- 依存パッケージのインストール失敗
- ビルドエラー

## テストと確認

- ローカルURLから空の試作品画面を開ける
- ビルドが成功する
- 試作品が`prototypes/rm-001-scatter-pagination/`に配置されている

## 成果物

- 最小のフロントエンド構成
- ローカル起動コマンド
- 散布図を置く画面
- `package.json`とlockfile
- ビルド確認結果

## 完了条件

ローカルURLから空の試作品画面を開ける。

## 未決定議題

なし。使用する構成と配置先はT004で仮採用済み。

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-08-10 | T004完了を受け、仮採用構成と配置先を明記してReadyとする |
| 2026-07-31 | Pendingとして作成 |
