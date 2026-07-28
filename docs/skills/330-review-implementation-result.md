# 330: 実装結果をレビューする

## 目的

現在タスク、実装instruction、PR差分、CI、テスト、関連文書を照合する。

## 確認

- タスク対象を満たす
- 対象外の変更をしていない
- 完了条件が証拠付きで満たされる
- テストが仕様を検証する
- エラー処理、セキュリティ、アクセシビリティが考慮される
- ADRと実装が一致する
- 文書更新が必要なら含まれる
- 実装AIが未決定事項を独断で決めていない

## 判定

- `Acceptable`
- `Acceptable after fixes`
- `Not acceptable`
- `Manual verification required`

修正が必要なら一つの独立した修正目的を選び、`340-create-remediation-instruction.md`へ進む。仕様不足なら通常議論へ戻し、元タスクをreturn stackへ保持する。
