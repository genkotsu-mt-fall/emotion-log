# ドキュメント案内

このディレクトリを、プロダクト企画からMVP開発・リリースまでの正本として使う。

## 通常の入口

- [`state.md`](state.md): マージ済みの現在地と中断状態
- [`skills/000-workflow.md`](skills/000-workflow.md): ChatGPTが従う唯一のワークフロー
- [`skills/README.md`](skills/README.md): ChatGPTへの依頼例
- [`workflow.md`](workflow.md): ユーザー視点の進め方
- [`instructions/README.md`](instructions/README.md): GitHub Copilot Webへ渡す指示書

## 正本文書

- [`product/`](product/): プロダクト方針、仮説、調査計画
- [`requirements/`](requirements/): MVP要件、データ要件
- [`ux/`](ux/): 操作、表示、状態、読み込み
- [`architecture/`](architecture/): アーキテクチャ説明とADR
- [`decisions/`](decisions/): 未決定事項と変更記録

## 計画と実行

- `roadmap/`: MVP全体計画と個別ロードマップ
- `tasks/`: 実装可能な単位へ分解したタスク
- `instructions/`: Copilotへ渡した完成済みinstruction
- `discussions/`: 後日再開する場合だけ置くcheckpoint
- [`templates/`](templates/): 成果物の標準書式

## 運用原則

次に扱う作業対象は一つだけ選ぶ。

ただし、その作業対象についてユーザーが複数の指摘をした場合は、すべてまとめて成果物全体へ反映する。一つの指摘ごとに議論やinstructionを分割しない。
