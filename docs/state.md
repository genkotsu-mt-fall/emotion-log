---
schema_version: 3
updated_at: 2026-07-28
base_branch: main
project_phase: Bootstrap

mvp_plan:
  path: null
  status: Not Started

active_work:
  type: null
  path: null
  id: null
  stage: null
  agenda: null

pending:
  application_instruction:
    path: null
    status: none
  implementation:
    task: null
    instruction: null
    pull_request: null
    status: none
  release:
    version: null
    instruction: null
    status: none

return_stack: []

next_action:
  kind: draft_mvp_roadmap_set
  reason: MVPデプロイ・リリースまでの大項目と依存関係を最初に俯瞰するため

last_completed:
  kind: workflow_redesign
  reference: docs/skills/000-next-action.md
---

# Project State

このファイルはプロジェクトの現在地、未反映作業、中断、復帰先だけを管理する。

詳細な要件、議論、選択肢、決定理由は、Product、要件、UX、OQ、ADR、変更記録、ロードマップ、タスクへ記載する。

## Current state

- フェーズ: `Bootstrap`
- MVP全体計画: 未作成
- 現在の作業: なし
- 未反映instruction: なし
- 実装レビュー待ち: なし
- 復帰待ち: なし

`docs/roadmap/`と`docs/tasks/`に実ロードマップ・実タスクがないことは意図した初期状態である。

## Next action

`docs/skills/000-next-action.md`を入口として、`100-draft-mvp-roadmap-set.md`相当の工程を実行する。

最初に個別ロードマップ一件を詳細化するのではなく、MVPデプロイ・リリースまでの大項目、順序、依存関係、完了境界を含む全体案を作る。

## Human approval rule

- ChatGPTは現在地、最小議題、成果物種別、分岐先、復帰先を判断できる
- ChatGPTはユーザー承認のない提案を決定済みとして扱わない
- CodexまたはGitHub Copilotは承認済みinstructionに従って変更できる
- タスクDone、変更記録Applied、PRマージ、本番リリース可否は人間の確認後にだけ確定する
