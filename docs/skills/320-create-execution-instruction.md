# 320: タスク実装instructionを作る

## 使用条件

- 現在タスクが`Ready`
- 必須ADR、OQ、変更記録の反映が完了している
- 実装担当が決まっている

## 保存先

タスクと同じ番号・短縮名を使う。

```text
docs/tasks/001-003-create-root-readme.md
docs/instructions/001-003-create-root-readme.md
```

## 必須構成

- 目的
- 参照するタスクと上位ロードマップ
- 前提となるADR、要件、UX
- 対象と対象外
- 変更対象ファイル
- 実装手順または制約
- エラー、境界条件、セキュリティ、アクセシビリティ
- 必須テストとCI
- 手動確認
- 文書更新
- 完了条件
- 完了報告形式
- 禁止される追加判断

## state

instruction作成後はタスクを`In Progress`候補とし、実装完了後の次工程を`330-review-implementation-result.md`とする。

人間が実装担当へ渡していない段階では、実装済み扱いにしない。
