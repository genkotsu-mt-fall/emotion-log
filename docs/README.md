# ドキュメント案内

このディレクトリには、プロダクト方針、要件、UX、意思決定、MVP計画、実装、リリースに関する文書を置く。

## 通常の作業入口

- [`state.md`](state.md): 現在地、未反映作業、中断、復帰先
- [`skills/000-next-action.md`](skills/000-next-action.md): 「次に何すればいい？」の唯一の通常入口
- [`skills/README.md`](skills/README.md): スキル構成とChatGPT用プロンプト
- [`instructions/README.md`](instructions/README.md): Codex・GitHub Copilotへ渡す指示

## 正本文書

- [`product/`](product/): Product Brief、仮説、調査計画
- [`requirements/`](requirements/): MVP要件、データ要件
- [`ux/`](ux/): UX候補と操作仕様
- [`architecture/`](architecture/): 継続的な技術判断とADR
- [`decisions/`](decisions/): 未決定事項と変更記録

## 計画と実行

- `roadmap/`: `000-mvp-release-plan.md`と個別ロードマップ。初期状態では実ファイルなし
- `tasks/`: 個別ロードマップから分解したタスク。初期状態では実ファイルなし
- `instructions/`: 文書反映、実装、修正、リリースの実行指示
- [`templates/`](templates/): 成果物の標準書式

## 変更履歴

- [`CHANGELOG.md`](CHANGELOG.md): 正本文書または採用済み判断へ反映済みの承認変更

ADR、変更記録、OQはユーザーが別ワークフローとして選ばない。ChatGPTが一議題セッションの終了時に必要性を判定し、統合instructionへ含める。
