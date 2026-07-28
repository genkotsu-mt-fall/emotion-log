# 250: 次の作業へ進むか、中断元へ戻る

## 目的

完了した工程の後に、ChatGPTが次の作業を一意に選ぶ。ユーザーへ成果物種別を選ばせない。

## 優先順位

1. `return_stack`に復帰可能な作業があり、分岐理由が解消済み
   - 末尾の作業へ復帰する
2. 現在の作業項目に未決定の最小議題がある
   - 同じ作業項目の次議題を開く
3. ロードマップが具体化済みだがタスク未分解
   - `300-decompose-current-roadmap.md`
4. 現在タスクがDraft
   - `310-prepare-current-task.md`
5. 現在タスクがReady
   - `320-create-execution-instruction.md`
6. タスクが完了
   - 次タスク、または`360-finalize-current-roadmap.md`
7. ロードマップが完了
   - 次ロードマップを開く
8. MVP対象ロードマップが完了
   - `400-review-release-readiness.md`
9. リリース検証済み
   - `430-discuss-validation-agenda.md`

## state更新

- 完了したpending項目をクリアする
- `last_completed`を更新する
- 次の`active_work`と`next_action`を一件設定する
- 復帰時はreturn stackの末尾だけを取り除く

## 出力

- 完了したこと
- 次に選んだ作業
- 選定理由
- 次回の最小議題または外部操作
