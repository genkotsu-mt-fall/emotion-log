# 000: 次の一手を選び、その工程を実行する

## 目的

このスキルは通常ワークフローの唯一の入口である。ユーザーは成果物種別や内部スキルを選ばず、原則として「次に何すればいい？」と依頼する。

ChatGPTはリポジトリの現在地を読み、次に必要な工程を一つだけ選び、対応する内部スキルを読んでその工程まで実行する。単にスキル番号を案内して終了しない。

## 必ず読むもの

1. `docs/state.md`
2. `docs/skills/010-project-state-model.md`
3. `docs/skills/020-single-agenda-session.md`
4. `docs/skills/030-outcome-routing-policy.md`
5. `docs/skills/040-repository-change-policy.md`
6. `docs/skills/README.md`

## 判断の優先順位

最新のユーザー発言、会話中のセッション状態、`docs/state.md`を合わせて確認し、上から最初に該当した一件だけを選ぶ。

1. `docs/state.md`が不正、参照切れ、相互矛盾を含む
   - 状態を勝手に補完せず、確認結果と修復案を提示する
2. ユーザーが現在のMVP計画議題を承認、保留、調査送り、または終了した
   - `120-apply-mvp-roadmap-decision.md`を実行する
3. ユーザーがその他の現在議題を承認、保留、調査送り、または終了した
   - `220-close-session-and-route-outcome.md`を実行する
4. `pending.application_instruction`が`applied`
   - `240-review-applied-changes.md`を実行する
5. `pending.implementation`が`review`
   - `330-review-implementation-result.md`を実行する
6. 実装修正が必要
   - `340-create-remediation-instruction.md`を実行する
7. リリース実行後で本番確認が未完了
   - `420-verify-production-release.md`を実行する
8. `mvp_plan.status`が`Not Started`
   - `100-draft-mvp-roadmap-set.md`を実行する
9. MVP計画の未決定議題がある
   - `110-discuss-mvp-roadmap-agenda.md`を実行する
10. MVP計画の全議題が閉じ、ロードマップスタブが未作成
    - `130-finalize-mvp-roadmap-set.md`を実行する
11. `active_work`がない
    - `250-advance-or-resume-work.md`を実行する
12. `active_work.stage`が`open`
    - `200-open-current-work-item.md`を実行する
13. `active_work.stage`が`discuss`
    - `210-discuss-current-agenda.md`を実行する
14. ロードマップがタスク分解可能
    - `300-decompose-current-roadmap.md`を実行する
15. タスクを実装可能にする必要がある
    - `310-prepare-current-task.md`を実行する
16. タスクが`Ready`
    - `320-create-execution-instruction.md`を実行する
17. タスクがマージ済みで完了確認待ち
    - `350-finalize-current-task.md`を実行する
18. ロードマップの全タスクが完了
    - `360-finalize-current-roadmap.md`を実行する
19. MVP対象ロードマップがすべて完了
    - `400-review-release-readiness.md`を実行する
20. リリース準備が承認済み
    - `410-create-release-instruction.md`を実行する
21. 本番リリース確認済みで検証事項がある
    - `430-discuss-validation-agenda.md`を実行する

判断できない場合は、推測で進行せず、矛盾している事実と最小の修復案を提示する。

## 一回の実行範囲

- 選択する工程は一つだけとする
- 議論工程では最小議題一件だけを扱う
- 複数の成果物更新が必要でも、同じ結論の反映であれば一つの統合instructionにまとめてよい
- 次工程を先取りして実行しない
- 人間承認が必要な境界を越えない

## 応答形式

```markdown
## 現在地

- MVP計画: ...
- 現在の作業: ...
- 状態: ...
- 復帰待ち: ...

## 今回行うこと

選択した一工程を一文で示す。

## 実行結果

選択した内部スキルの所定形式で出力する。

## 次に必要な外部操作

Codex、GitHub Copilot、人間確認などが必要な場合だけ示す。
```

議論を開始する場合は、最後を一つの質問だけで終える。
