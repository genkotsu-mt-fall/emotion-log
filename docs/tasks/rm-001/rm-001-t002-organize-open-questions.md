# RM1-T002: 関連OQと仮値を整理する

- 状態: Completed
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: RM1-T001

## 目的

検証用の仮値が正式仕様として残らないようにする。

## 対象

- RM 1に関連するOQの一覧
- 各OQで使用する仮値
- 仮値を置く理由
- RM 1で確認する内容
- 正式に決めるRM

## 対象外

- OQの正式解決（OQ-019を除く）
- 仮値の正式採用

## 参照文書

- [docs/decisions/open-questions.md](../../decisions/open-questions.md)
- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- [docs/ux/pointer-interactions.md](../../ux/pointer-interactions.md)
- [docs/ux/data-loading.md](../../ux/data-loading.md)

## 変更対象

- [docs/decisions/open-questions.md](../../decisions/open-questions.md)
- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)

## 実装・調査内容

- RM 1関連OQを特定する
- 各OQの仮値と仮値を使用する理由を記録する
- RM 1で確認する内容を記録する
- 正式に決定するRMを記録する
- OQ-055〜OQ-059を新規追加する

## エラーと境界条件

- 仮値を正式仕様と誤認する
- OQ番号の重複

## テストと確認

- OQ番号が重複していない
- 各仮値に「仮」であることの明記がある
- 正式決定先のRMが記載されている

## 成果物

- RM 1ロードマップの関連OQセクション
- `docs/decisions/open-questions.md` の更新（OQ-019〜OQ-032、OQ-035の追記、OQ-055〜OQ-059の新規追加）

## 完了条件

- RM 1関連OQの一覧が文書化されている
- 仮値と仮値を使用する理由が記録されている
- RM 1で確認する内容が記録されている
- 正式に決めるRMが記録されている
- OQ-055〜OQ-059が追加されている
- OQ番号が重複していない

## 未決定議題

OQ-055〜OQ-059として新規登録した。

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-07-31 | 本PRでOQを整理し、Completedとする |
