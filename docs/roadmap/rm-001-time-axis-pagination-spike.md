# RM-001: 時間軸の横方向移動による過去データ追加取得の検証

- 状態: Approved
- 上位計画: [docs/roadmap/mvp-release-plan.md](../roadmap/mvp-release-plan.md)
- 前提ロードマップ: なし

## 目的

ダミーデータを表示した散布図で、過去方向へ時間軸を移動したときに、データを分割して追加しながら表示を連続させられるか検証する。

散布図の最終的な使いやすさや正式な技術構成は決めない。

検証用に使用した技術、数値、取得単位は、すべて仮採用または仮値として記録する。

## 期待成果

ダミーデータを使った散布図の試作品を、確認用URLから操作できる。

時間軸を過去方向へ移動すると、過去データが追加され、見ていた日時の位置を保ったまま移動を続けられる。

## 対象

- ダミーデータの用意
- 散布図の表示（横軸：日時、縦軸：気分値、絵文字を点として表示）
- 時間軸の過去方向への移動（マウスやタッチによる横方向パン）
- 取得済み範囲の端の検知
- 過去データの追加取得
- 追加取得後の表示位置維持
- 取得境界での二重表示防止
- 同一日時にある異なるログの保持
- 複数回の追加取得
- 試作品の確認用URLへのデプロイ
- PC、iPhone、Androidでの操作確認

## 対象外

- UIフレームワークの正式決定
- 散布図ライブラリの正式採用
- 本番API
- 本番カーソル形式
- DB構成
- ログ詳細表示と重なったログを選ぶUIの最終形
- パン判定値の正式決定
- 最終デザイン
- 時系列リスト
- 散布図のアクセシビリティとキーボード操作の評価

## 前提と依存関係

- MVPの時系列表示は散布図のみとする（CR-0001）
- 時系列リストはMVPから外されている
- 正式な技術構成はRM 2で決定する

## RM 1の仮技術構成

RM1-T004で、試作品を開始するために次を仮採用した。

- フロントエンド: React + TypeScript + Vite
- パッケージ管理: npm
- 散布図: Plotly.js + react-plotly.js
- 状態管理: Reactのローカルstate
- 分割取得と通信遅延の再現: 非同期ローカルモック
- 試作品の仮配置先: `prototypes/rm-001-scatter-pagination/`

RM1-T005で、RM 1専用の仮開発環境としてDocker + VS Code Dev Containersを追加した。

- Dev Container配置先: `prototypes/rm-001-scatter-pagination/.devcontainer/`
- Dockerfile: 必須
- Node.js: T005実施時点の最新LTSメジャー（Node.js 24系列）
- ベースOS: Debian stable slim（Trixie）
- 通常開発ユーザー: Node.js公式イメージの`node`ユーザー
- Docker Compose: 使用しない
- `privileged`: 使用しない
- Docker socket mount: 使用しない
- VS Code拡張: 必要最小限

T005で実際に使用したフロントエンド依存の正確な解決結果は`package.json`と`package-lock.json`へ記録する。

RM 1ではPlotly.jsの標準パンを使用し、アプリ独自のパン開始閾値や縦横移動比率は実装しない。

この構成はRM 1の検証用であり、正式採用ではない。

## 完了境界

- ダミーデータを散布図へ表示できる
- 時間軸を過去方向へ移動できる
- 取得済み範囲の端で過去データを追加取得できる
- 取得した点を既存の点へ追加できる
- 追加取得後も見ていた日時の位置が保たれる
- 取得境界で同じデータを二重表示しない
- 複数回の追加取得を繰り返せる
- 確認用URLから試作品を開ける
- PC、iPhone、Androidで利用者が目視確認している

## 関連OQ

| OQ | 議題 | RM 1での扱い |
|---|---|---|
| OQ-019 | 時系列表示の形式 | Resolved：散布図のみ |
| OQ-026 | 同一時刻・同一気分値のログ表示 | データ統合で失わないことを確認 |
| OQ-027 | 絵文字の重なり表示 | 重なりが発生するデータを扱えることを確認 |
| OQ-028 | マウスのパン開始閾値 | 独自閾値は実装せず、Plotly.js標準パンを使用 |
| OQ-029 | タッチのパン開始閾値 | 独自閾値は実装せず、Plotly.js標準パンを使用 |
| OQ-030 | パン判定の縦移動比率 | 独自判定は実装せず、Plotly.js標準パンを使用 |
| OQ-031 | 可視化ライブラリ | Plotly.js + react-plotly.jsを仮採用 |
| OQ-055 | 追加取得の開始条件 | 仮の取得開始条件で検証 |
| OQ-056 | 本番APIの分割取得方式 | モック関数で検証、本番仕様としない |
| OQ-057 | 同一日時の第2ソートキー | 仮IDを使用 |
| OQ-058 | 追加後の表示位置維持方式 | 仮の方式で検証 |

## タスク

| # | ID | タイトル | 状態 | 依存 | ファイル |
|---|---|---|---|---|---|
| 1 | RM1-T001 | RM 1の対象と対象外を固定する | Completed | — | [rm-001-t001-fix-scope.md](../tasks/rm-001/rm-001-t001-fix-scope.md) |
| 2 | RM1-T002 | 関連OQと仮値を整理する | Completed | T001 | [rm-001-t002-organize-open-questions.md](../tasks/rm-001/rm-001-t002-organize-open-questions.md) |
| 3 | RM1-T003 | 検証シナリオと判定条件を作る | Completed | T002 | [rm-001-t003-define-validation-scenarios.md](../tasks/rm-001/rm-001-t003-define-validation-scenarios.md) |
| 4 | RM1-T004 | 仮の技術構成を選ぶ | Completed | T003 | [rm-001-t004-select-provisional-stack.md](../tasks/rm-001/rm-001-t004-select-provisional-stack.md) |
| 5 | RM1-T005 | ローカルで試作品の土台を起動する | Completed | T004 | [rm-001-t005-bootstrap-prototype.md](../tasks/rm-001/rm-001-t005-bootstrap-prototype.md) |
| 6 | RM1-T006 | 固定点を使った最小散布図を表示する | Completed | T005 | [rm-001-t006-render-fixed-scatter-point.md](../tasks/rm-001/rm-001-t006-render-fixed-scatter-point.md) |
| 7 | RM1-T007 | 確認用URLへ最小デプロイする | Ready | T006 | [rm-001-t007-deploy-minimal-prototype.md](../tasks/rm-001/rm-001-t007-deploy-minimal-prototype.md) |
| 8 | RM1-T008 | ダミーデータの条件を設計する | Pending | T003 | [rm-001-t008-design-dummy-data.md](../tasks/rm-001/rm-001-t008-design-dummy-data.md) |
| 9 | RM1-T009 | 分割取得モックを作る | Pending | T005, T008 | [rm-001-t009-build-paged-data-mock.md](../tasks/rm-001/rm-001-t009-build-paged-data-mock.md) |
| 10 | RM1-T010 | 初期データを散布図へ表示する | Pending | T006, T009 | [rm-001-t010-render-initial-data.md](../tasks/rm-001/rm-001-t010-render-initial-data.md) |
| 11 | RM1-T011 | マウスとタッチのパン操作を作る | Pending | T010 | [rm-001-t011-implement-pan-input.md](../tasks/rm-001/rm-001-t011-implement-pan-input.md) |
| 12 | RM1-T012 | 過去側の取得境界を検知する | Pending | T011 | [rm-001-t012-detect-past-boundary.md](../tasks/rm-001/rm-001-t012-detect-past-boundary.md) |
| 13 | RM1-T013 | 追加取得の状態と重複実行を制御する | Pending | T012 | [rm-001-t013-control-fetch-state.md](../tasks/rm-001/rm-001-t013-control-fetch-state.md) |
| 14 | RM1-T014 | 取得データを統合して重複と欠落を防ぐ | Pending | T013 | [rm-001-t014-merge-without-duplicates.md](../tasks/rm-001/rm-001-t014-merge-without-duplicates.md) |
| 15 | RM1-T015 | 追加取得後の表示位置を維持する | Pending | T014 | [rm-001-t015-preserve-visible-range.md](../tasks/rm-001/rm-001-t015-preserve-visible-range.md) |
| 16 | RM1-T016 | 複数回取得と対象端末で検証する | Pending | T015 | [rm-001-t016-validate-repeated-fetches.md](../tasks/rm-001/rm-001-t016-validate-repeated-fetches.md) |
| 17 | RM1-T017 | 結果を記録し、OQとRM 2へ引き継ぐ | Pending | T016 | [rm-001-t017-record-results.md](../tasks/rm-001/rm-001-t017-record-results.md) |

17タスクは17個のPull Requestを必須にするものではない。検証を止めて成果と完了条件を確認できる、17個の論理的な作業単位として管理する。

## 検証条件

- 初期取得：直近30日分
- 過去方向への追加取得：30日分を3回
- 合計：120日分を4取得単位として扱う
- ログがない日、1件の日、複数件の日を含める
- 同一日時で異なるIDのログを含める
- 取得境界に同じIDのログを含める
- 通信遅延を再現する
- 最古データ到達を再現する
- PC、iPhone、Androidで確認する

30日は検証用の仮値であり、正式APIや正式初期表示の仕様ではない。

## RM 2への引き継ぎ

RM 1の検証結果をもとに、RM 2で次を正式決定する。

- フロントエンド技術
- 散布図の正式な実装方式
- 過去データ追加取得の基本方針
- 追加取得の開始条件
- 同一日時の第2ソートキー
- 追加後の表示位置維持方式

RM 1で仮採用した技術、数値、取得単位はすべて仮値として記録し、RM 2以降の正式決定の入力とする。

## 変更履歴

| 日付 | 内容 |
|---|---|
| 2026-08-14 | RM1-T006を完了。固定点の最小散布図、軸操作制約、modebar制御、初期表示時間範囲取得を確認し、T007をReadyとする。Plotly.jsを含むbundle-size warningはT007とRM 2への観察事項として残す |
| 2026-08-13 | RM1-T005を完了。Docker + Dev Containerによる仮開発環境を追加し、T006をReadyとする |
| 2026-08-10 | RM1-T004を完了。仮技術構成と試作品配置先を記録し、T005をReadyとする |
| 2026-07-31 | Approvedとして作成。RM1-T001〜T003を完了、T004をReadyとする |
