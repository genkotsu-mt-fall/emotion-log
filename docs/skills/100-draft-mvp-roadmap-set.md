# 100: MVPリリースまでのロードマップセット案を作る

## 使用条件

- `docs/state.md`の`mvp_plan.status`が`Not Started`
- 実ロードマップと実タスクがまだ存在しない

## 目的

最初のロードマップ一件だけを考えるのではなく、現在の正本文書からMVPデプロイ・リリースまでに必要な成果の大項目を俯瞰し、議論開始用のDraftを作る。

## 読むもの

- `docs/product/`
- `docs/requirements/`
- `docs/ux/`
- `docs/architecture/`
- `docs/decisions/open-questions.md`
- `docs/CHANGELOG.md`
- `docs/templates/mvp-release-plan.md`

## 作成方針

- 技術実装の細部ではなく、完了時に成立する成果のまとまりで分ける
- MVPの公開URL、本番環境、データ移行、監視、リリース確認まで含める
- 調査や技術判断だけを大項目にしない。成果へ必要なら各ロードマップの前提またはタスク候補とする
- 並行可能性、依存関係、リリースクリティカルパスを示す
- 未決定事項を推測で確定しない
- 各大項目の詳細はスタブ段階に留める

## 出力

1. `docs/roadmap/000-mvp-release-plan.md`のDraft全文
2. 大項目一覧と依存関係
3. 各大項目について最初に確認すべき最小議題候補
4. 作成用の統合instruction
5. `docs/state.md`更新案

stateの次状態:

```yaml
project_phase: Planning
mvp_plan:
  path: docs/roadmap/000-mvp-release-plan.md
  status: Draft
active_work:
  type: mvp_plan
  path: docs/roadmap/000-mvp-release-plan.md
  id: MVP-PLAN
  stage: discuss
  agenda: <最初の最小議題>
```

Draftを作成しただけで個別ロードマップを確定しない。
