# 230: 文書反映用instructionの組み立て規約

## 位置付け

このスキルは通常、`120`または`220`から内部的に参照する。ユーザーが個別に選ぶ必要はない。

## 目的

閉じた一議題のルーティング結果から、CodexまたはGitHub Copilotが判断を追加せずに適用できる一つの完成済みinstructionを作る。

## 参照する内部ハンドラー

必要なものだけを読む。

- `internal/write-adr.md`
- `internal/write-change-record.md`
- `internal/update-open-question.md`
- `internal/update-product-docs.md`
- `internal/update-requirements.md`
- `internal/update-ux-docs.md`
- `internal/update-roadmap.md`
- `internal/update-task.md`
- `internal/update-changelog.md`
- `internal/update-state.md`

## instructionの保存先

```text
docs/instructions/YYYYMMDD-<work-id>-<short-name>.md
```

タスク実装指示の命名は`320-create-execution-instruction.md`に従う。

## 必須構成

1. 目的
2. 承認済み結論
3. 参照ファイル
4. 作成ファイル
5. 更新ファイル
6. 削除ファイル
7. ファイルごとの具体的変更
8. 対象外
9. 整合性条件
10. 検査コマンドまたは確認項目
11. 完了報告形式
12. 適用後のstate完成形

## 制約

- instruction内で新しい判断を行わない
- プレースホルダーを残さない。ただし外部環境固有値は取得方法を明記してよい
- ADR、OQ、変更記録、正本文書、CHANGELOG、stateの相互参照を具体的に書く
- 削除を含む場合は対象と理由を明記する
- 一議題の反映範囲を越えない

出力後、stateはinstruction適用待ちを示す。
