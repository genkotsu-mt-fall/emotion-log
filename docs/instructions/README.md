# Execution Instructions

このフォルダには、CodexまたはGitHub Copilotへ渡す完成済みの実行指示を保存する。

## 種類

- 文書反映instruction: 一議題の結論からADR、OQ、変更記録、正本文書、ロードマップ、タスク、CHANGELOG、stateを反映する
- タスク実装instruction: Readyタスクを実装する
- 修正instruction: 実装レビューの一つの修正目的を扱う
- リリースinstruction: デプロイ、移行、スモーク、ロールバック、公開記録を扱う

## 共通原則

- instruction内で新しい判断を行わない
- 作成、更新、削除、対象外、検査、完了報告を具体的にする
- 一つの独立議題または一つのタスクの範囲を越えない
- 適用後は`docs/skills/240-review-applied-changes.md`または実装レビューで差分を検証する
- 人間確認前にDone、Applied、マージ済み、リリース済みへ変更しない

## 命名

文書反映:

```text
docs/instructions/YYYYMMDD-<work-id>-<short-name>.md
```

タスク実装:

```text
docs/tasks/001-003-create-root-readme.md
docs/instructions/001-003-create-root-readme.md
```
