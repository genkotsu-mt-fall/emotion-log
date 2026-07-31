# CR-0001: MVPの時系列表示を散布図のみへ変更

- 状態: Applied
- 作成日: 2026-07-31
- 更新日: 2026-07-31
- 関連する作業・判断: MVPの時系列表示を散布図中心へ変更し、時系列リストをMVPから外す
- 関連するOQ: OQ-019、OQ-026、OQ-027、OQ-031、OQ-059
- 関連するADR: なし

## 1. 概要

MVPの時系列表示を「散布図＋時系列リスト」の複合構成から「散布図のみ」へ変更し、時系列リストをMVP後の追加候補として追跡する。

## 2. 背景と確認済み事実

- MVPの中心的な成立性は、散布図と過去データ追加取得にある
- 散布図とリストの状態同期、リストの追加読み込み、モバイル配置はMVPの中心課題ではない
- 散布図だけでも、ログ選択、詳細確認、重なり選択、キーボード操作は実現できる

## 3. 変更前の正本

- MVPは散布図と時系列リストの複合構成
- `docs/product/product-brief.md` v0.1.0：「時系列リストによる補助表示」をMVPに含める
- `docs/ux/timeline-concept.md` v0.1.0：複合構成を第一候補とし、選択期間の時系列リストを画面構成に含める

## 4. 承認済みの変更

- MVPは散布図を中心表示とする
- 時系列リストはMVPから外す
- 選択ログの詳細表示はMVPに残す
- 重なったログの選び分けはMVPに残す
- 最低限のキーボード操作はMVPに残す
- 時系列リストはMVP後の追加候補として追跡する（OQ-059）

## 5. 対象

- `docs/product/product-brief.md`
- `docs/ux/timeline-concept.md`
- `docs/roadmap/mvp-release-plan.md`
- `docs/decisions/open-questions.md`
- `docs/requirements/mvp-requirements.md`
- `docs/state.md`

## 6. 対象外

- アプリケーションコード
- `docs/product/research-plan.md`の表示候補比較
- 過去instructionの記録

## 7. 影響文書

| 文書 | 変更内容 | 反映状態 |
|---|---|---|
| `docs/product/product-brief.md` | MVPの範囲から時系列リストを削除、散布図中心の表現へ更新 | Applied |
| `docs/ux/timeline-concept.md` | 第一候補を散布図のみへ変更、画面構成からリストを削除、検証項目を更新 | Applied |
| `docs/roadmap/mvp-release-plan.md` | RM 1の対象外を追記、RM 6を散布図中心へ整合 | Applied |
| `docs/decisions/open-questions.md` | OQ-019をResolved、OQ-059を新規追加 | Applied |
| `docs/requirements/mvp-requirements.md` | 振り返り表示の記述を散布図中心へ整合 | Applied |
| `docs/state.md` | マージ後の状態へ更新 | Applied |

## 8. 決定

- 承認者: genkotsu-mt-fall
- 承認日: 2026-07-31
- 理由:
  - MVPの中心的な成立性である散布図と過去データ追加取得へ実装と検証を集中する
  - 散布図とリストの状態同期、リストの追加読み込み、モバイル配置をMVPから外す

## 9. 後続作業

- RM 1を17タスクへ分解し、タスクファイルを作成する
- RM1-T001〜T003を本PRで完了とする
- RM1-T004「仮の技術構成を選ぶ」をマージ後の次作業とする

## 10. 反映確認

- [x] 正本文書
- [x] OQ
- [ ] ADR（該当なし）
- [x] ロードマップ・タスク
- [ ] CHANGELOG（本変更では新規作成しない。既存CHANGELOGは運用記録であり、本変更記録の対象外とする）
- [x] state
- [x] 文書間整合性

## 11. 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-07-31 | 作成し、同一PRで全文書へ反映したためAppliedとする |
