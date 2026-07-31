# GitHub Copilot instruction: MVPを散布図中心へ変更しRM 1をタスク分解する

## 目的

"main"ブランチの最新状態を基準に、次の二つを一つのPull Requestでリポジトリへ反映する。

1. MVPの時系列表示を「散布図＋時系列リスト」から「散布図のみ」へ変更する
2. RM 1「時間軸の横方向移動による過去データ追加取得の検証」を、17個の実行可能なタスクへ分解する

この作業は文書と計画の更新であり、試作品やプロダクトコードは実装しない。

## 確定した内容

### MVPの時系列表示

MVPの時系列表示は、時系列散布図だけにする。

時系列リストはMVPから外し、MVP後の追加候補として追跡する。

ただし、散布図だけにしても次の機能はMVPに残す。

- 散布図上の点を選択する
- 選択した一件の本文、感情日時、気分値、絵文字を確認する
- 重なった複数のログを選び分ける
- 最低限のキーボード操作で点を選択する

次はMVPから外す。

- 時系列リスト
- 散布図と時系列リストの選択同期
- 時系列リストのスクロール位置管理
- 散布図と時系列リストの表示切り替え

### RM 1の位置づけ

RM 1では、ダミーデータを表示した散布図で、過去方向へ時間軸を移動したときに、データを分割して追加しながら表示を連続させられるか検証する。

次を中心に検証する。

- 過去側の取得境界の検知
- 過去データの追加取得
- 同じデータの二重表示防止
- 同一日時にある異なるログの保持
- 追加取得後の表示位置維持
- 複数回の追加取得
- PC、iPhone、Androidでの操作

RM 1では次を正式決定しない。

- UIフレームワーク
- 散布図ライブラリ
- 本番API
- 本番カーソル形式
- DB構成
- 詳細表示の最終UI
- 重なったログを選ぶ最終UI
- パン判定値
- 最終デザイン

検証用に使用した技術、数値、取得単位は、すべて仮採用または仮値として記録する。

### RM 1のタスク構成

RM 1を次の17タスクへ分解する。

1. RM1-T001：RM 1の対象と対象外を固定する
2. RM1-T002：関連OQと仮値を整理する
3. RM1-T003：検証シナリオと判定条件を作る
4. RM1-T004：仮の技術構成を選ぶ
5. RM1-T005：ローカルで試作品の土台を起動する
6. RM1-T006：固定点を使った最小散布図を表示する
7. RM1-T007：確認用URLへ最小デプロイする
8. RM1-T008：ダミーデータの条件を設計する
9. RM1-T009：分割取得モックを作る
10. RM1-T010：初期データを散布図へ表示する
11. RM1-T011：マウスとタッチのパン操作を作る
12. RM1-T012：過去側の取得境界を検知する
13. RM1-T013：追加取得の状態と重複実行を制御する
14. RM1-T014：取得データを統合して重複と欠落を防ぐ
15. RM1-T015：追加取得後の表示位置を維持する
16. RM1-T016：複数回取得と対象端末で検証する
17. RM1-T017：結果を記録し、OQとRM 2へ引き継ぐ

17タスクは17個のPull Requestを必須にするものではない。

本Pull Requestによって、RM1-T001、RM1-T002、RM1-T003は完了する。

本Pull Requestのマージ後に扱う次の作業は、RM1-T004「仮の技術構成を選ぶ」とする。

## 参照ファイル

- `docs/skills/000-workflow.md`
- `docs/state.md`
- `docs/README.md`
- `docs/product/product-brief.md`
- `docs/product/research-plan.md`
- `docs/ux/timeline-concept.md`
- `docs/roadmap/mvp-release-plan.md`
- `docs/decisions/README.md`
- `docs/decisions/open-questions.md`
- `docs/decisions/change-records/TEMPLATE.md`
- `docs/templates/README.md`
- `docs/templates/roadmap.md`
- `docs/templates/task.md`
- `docs/templates/copilot-instruction.md`
- `docs/instructions/20260731-mvp-plan-create-release-plan.md`

`docs/instructions/20260731-mvp-plan-create-release-plan.md`は過去に実行したinstructionの記録であり、内容を変更しない。

## 作成するファイル

- `docs/roadmap/rm-001-time-axis-pagination-spike.md`：RM 1個別ロードマップ
- `docs/tasks/rm-001/rm-001-t001-fix-scope.md`
- `docs/tasks/rm-001/rm-001-t002-organize-open-questions.md`
- `docs/tasks/rm-001/rm-001-t003-define-validation-scenarios.md`
- `docs/tasks/rm-001/rm-001-t004-select-provisional-stack.md`
- `docs/tasks/rm-001/rm-001-t005-bootstrap-prototype.md`
- `docs/tasks/rm-001/rm-001-t006-render-fixed-scatter-point.md`
- `docs/tasks/rm-001/rm-001-t007-deploy-minimal-prototype.md`
- `docs/tasks/rm-001/rm-001-t008-design-dummy-data.md`
- `docs/tasks/rm-001/rm-001-t009-build-paged-data-mock.md`
- `docs/tasks/rm-001/rm-001-t010-render-initial-data.md`
- `docs/tasks/rm-001/rm-001-t011-implement-pan-input.md`
- `docs/tasks/rm-001/rm-001-t012-detect-past-boundary.md`
- `docs/tasks/rm-001/rm-001-t013-control-fetch-state.md`
- `docs/tasks/rm-001/rm-001-t014-merge-without-duplicates.md`
- `docs/tasks/rm-001/rm-001-t015-preserve-visible-range.md`
- `docs/tasks/rm-001/rm-001-t016-validate-repeated-fetches.md`
- `docs/tasks/rm-001/rm-001-t017-record-results.md`
- `docs/decisions/change-records/0001-mvp-timeline-scatter-only.md`：変更記録
- `docs/instructions/20260731-rm1-decompose-scatter-only.md`：本instruction

## 更新するファイル

- `docs/product/product-brief.md`
- `docs/ux/timeline-concept.md`
- `docs/roadmap/mvp-release-plan.md`
- `docs/decisions/open-questions.md`
- `docs/requirements/mvp-requirements.md`
- `docs/state.md`

## 削除するファイル

なし。

## ファイルごとの変更

### `docs/product/product-brief.md`

- 版を0.2.0へ更新
- 更新日2026-07-31を記載
- MVPの範囲から「時系列リストによる補助表示」を削除
- 時系列散布表示、散布図上のログ選択、選択ログの詳細確認、重なったログの選び分け、時間軸の移動、追加読み込み、PC・iPhone・Android対応を明記

### `docs/ux/timeline-concept.md`

- 版を0.2.0へ更新、更新日2026-07-31、状態をApprovedへ変更
- 第一候補を散布図のみのMVP構成へ変更
- 画面構成から選択期間の時系列リストを削除
- 検証項目を更新

### `docs/roadmap/mvp-release-plan.md`

- RM 1の対象外に時系列リスト、ログ詳細表示の最終UI、重なったログを選ぶ最終UIを追加
- RM 4の対象外から時系列リストを削除
- RM 6を散布図中心へ整合

### `docs/decisions/open-questions.md`

- 版を0.3.0へ更新、更新日2026-07-31
- OQ-019をResolvedへ変更
- OQ-020〜025に正式決定期限とRM 1の仮値についての追記
- OQ-026〜027に決定期限とMVP必須の追記
- OQ-028〜030に仮使用と正式決定期限の追記
- OQ-031に確認事項の追加とRM 1での仮採用の追記
- OQ-032にRM 1の仮採用についての追記
- OQ-035にRM 1でのモック使用の追記
- OQ-055〜059を新規追加

### `docs/requirements/mvp-requirements.md`

- 振り返りセクションの時系列表示の記述を散布図中心へ整合

### `docs/state.md`

- マージ後の状態としてRM1-T004を次作業に設定

## 変更しない範囲

- アプリケーションコード
- パッケージ設定、CI設定、デプロイ設定、DB、API、認証
- 感情ログCRUD
- `docs/product/research-plan.md`の表示候補比較
- `docs/instructions/20260731-mvp-plan-create-release-plan.md`
- OQ-001〜OQ-018
- OQ-033、OQ-034、OQ-036〜OQ-054の意味
- 旧OQ IDの移行表

## 検査

### 文書整合性

- 「時系列リスト」をリポジトリ内で検索し、activeなMVP必須機能として残っていないことを確認する
- 残る場合は、表示方式の比較説明、MVP後の候補、過去instructionの記録、調査計画のいずれかだけであることを確認する
- 「散布図とリスト」「散布図と時系列リスト」「リストの選択連携」「選択期間の時系列リスト」も検索する

### OQ

- OQ-001〜OQ-059のIDが重複していない
- OQ-019に結論、解決日、解決先がある
- OQ-055〜OQ-059が一件一議題になっている
- 旧ID移行表が壊れていない

### ロードマップとタスク

- RM1-T001〜RM1-T017が欠けていない
- タスク番号が重複していない
- 各タスクから上位ロードマップへ移動できる
- 上位ロードマップから各タスクへ移動できる
- T001〜T003がCompleted、T004がReady、T005〜T017がPending
- `docs/state.md`がT004を次作業としている

### MarkdownとGit

- Markdownリンクの相対パス確認
- 見出し構造の確認
- `git diff --check`

## Pull Request

- `main`の最新状態から作業ブランチを作成する
- ブランチ名: `docs/rm1-scatter-only-task-plan`
- `main`へ直接変更しない
- 変更をcommitしてpushする
- Pull Requestを作成する
- PRタイトル: `docs: define RM 1 tasks and simplify MVP timeline`

## 完了報告

- 作成したファイル
- 更新したファイル
- 削除したファイル
- 実行した検査と結果
- Pull Request URL
- 「時系列リスト」の検索結果と残した記述の理由
- マージ後に扱う次の作業がRM1-T004であること
