# 010: プロジェクト状態モデル

## 目的

`docs/state.md`を、ChatGPTが現在地、未反映作業、中断、復帰先を一意に判断するためのポインターとして使う。

詳細な議論、選択肢、決定理由はstateへ書かず、ロードマップ、タスク、OQ、ADR、変更記録、要件、UXへ置く。

## 必須フィールド

```yaml
schema_version: 3
updated_at: YYYY-MM-DD
base_branch: main
project_phase: Bootstrap | Planning | Delivery | Release | Validation

mvp_plan:
  path: null | docs/roadmap/000-mvp-release-plan.md
  status: Not Started | Draft | Discussing | Ready | Active | Done

active_work:
  type: null | mvp_plan | roadmap | task | decision | open_question | release | validation
  path: null | <repository path>
  id: null | <stable identifier>
  stage: null | open | discuss | close | instruction | apply | review | implement | finalize
  agenda: null | <one minimal question>

pending:
  application_instruction:
    path: null | docs/instructions/<file>.md
    status: none | ready | applied | accepted | rejected
  implementation:
    task: null | docs/tasks/<file>.md
    instruction: null | docs/instructions/<file>.md
    pull_request: null | <PR identifier>
    status: none | in_progress | review | fixes_required | approved | merged
  release:
    version: null | <version>
    instruction: null | docs/instructions/<file>.md
    status: none | ready | deployed | verified | failed

return_stack: []

next_action:
  kind: <machine-readable action>
  reason: <one sentence>

last_completed:
  kind: null | <action>
  reference: null | <path or identifier>
```

## `return_stack`

別の判断が現在の作業を妨げた場合、元の作業を破棄せず積む。

```yaml
return_stack:
  - type: roadmap
    path: docs/roadmap/002-example.md
    id: RM-002
    stage: discuss
    agenda: <元の最小議題>
    reason: <中断理由>
```

分岐作業が完了したら末尾から一件取り出して復帰する。複数階層の分岐を許可するが、同じ対象を重複して積まない。

## 状態更新の原則

- リポジトリ変更が必要な状態更新は統合instructionに含める
- ChatGPTは会話上の提案だけでstateを更新済みと扱わない
- `pending.application_instruction.status: applied`は、ユーザーまたは差分から適用を確認できる場合だけ設定する
- `Done`、`merged`、`verified`は人間または検証証拠の確認後にだけ設定する
- `next_action`は常に一件だけにする

## 整合性条件

- `active_work.path`がある場合、そのファイルが存在する
- `pending.*.path`がある場合、そのファイルが存在する
- `mvp_plan.status != Not Started`なら`mvp_plan.path`が存在する
- `active_work.type: task`なら対応ロードマップを追跡できる
- `return_stack`の各項目は復帰可能な対象を指す
- 同じ作業を`active_work`と`return_stack`へ同時に置かない
