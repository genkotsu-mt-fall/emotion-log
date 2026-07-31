# RM1-T001: RM 1の対象と対象外を固定する

- 状態: Completed
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: なし

## 目的

RM 1へ正式機能を混ぜず、検証範囲を固定する。

## 対象

- RM 1で検証する問い
- 対象の一覧
- 対象外の一覧
- MVPは散布図だけとする前提の明記
- 時系列リストを作らないことの明記
- 正式技術を決定しないことの明記

## 対象外

- タスクの実装
- 技術選定
- ダミーデータの具体的な内容

## 参照文書

- [docs/roadmap/mvp-release-plan.md](../../roadmap/mvp-release-plan.md)
- [docs/decisions/change-records/0001-mvp-timeline-scatter-only.md](../../decisions/change-records/0001-mvp-timeline-scatter-only.md)
- [docs/ux/timeline-concept.md](../../ux/timeline-concept.md)

## 変更対象

- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)

## 実装・調査内容

- RM 1の対象を一覧化する
- RM 1の対象外を一覧化する
- 散布図のみとする前提をロードマップへ記載する
- 時系列リストを作らないことを明記する
- 正式技術を決定しないことを明記する

## エラーと境界条件

- 対象外を対象と誤認する
- 正式決定を含めてしまう

## テストと確認

- ロードマップの対象と対象外が矛盾していない
- 時系列リストが対象に含まれていない
- 正式な技術決定が対象に含まれていない

## 成果物

- RM 1個別ロードマップ（`docs/roadmap/rm-001-time-axis-pagination-spike.md`）の対象・対象外セクション
- 変更記録CR-0001

## 完了条件

- RM 1の対象と対象外が文書化されている
- MVPは散布図だけとする前提が明記されている
- 時系列リストを作らないことが明記されている
- 正式技術を決定しないことが明記されている

## 未決定議題

なし。本タスクは範囲固定であり、未決定事項を生じさせない。

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-07-31 | 本PRでロードマップと変更記録を作成し、Completedとする |
