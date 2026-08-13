# CHANGELOG

## Unreleased

- RM1-T005で、`prototypes/rm-001-scatter-pagination/`にDocker + Dev Containerによる再現可能な開発環境を追加
- RM1-T005の開発コンテナをNode.js 24 LTS系列 + Debian Trixie slim、通常開発を`node`ユーザーとする構成へ確定
- RM1-T005では`privileged`とDocker socket mountを使用せず、OSパッケージとVS Code拡張を必要最小限にする方針を採用
- RM1-T005で、Vite公式`react-ts`テンプレートを基準にReact + TypeScript + Viteの最小試作品を作成
- RM1-T005でPlotly.js + react-plotly.jsを依存関係へ追加し、描画はRM1-T006へ分離
- リポジトリ直下の`gitignore`を`.gitignore`へ修正
- RM1-T005をCompleted、RM1-T006をReadyへ更新
- RM1-T004で、RM 1の試作品にReact + TypeScript + Vite + npm、Plotly.js + react-plotly.jsを仮採用
- RM 1の試作品配置先を`prototypes/rm-001-scatter-pagination/`に確定
- RM 1ではPlotly.jsの標準パンを使用し、独自のパン開始閾値と縦横移動比率を実装しない方針へ変更
- RM 1の仮採用評価では散布図のアクセシビリティとキーボード操作を対象外とし、正式採用判断へ持ち越し
- RM1-T004をCompleted、RM1-T005をReadyへ更新
- ChatGPTワークフローを、`docs/skills/000-workflow.md`を唯一の入口とする構成へ簡略化
- 次に扱う作業対象は一つだけ選び、同じ作業対象への複数の指摘はまとめて反映するルールへ変更
- 議論、Copilot向けinstruction作成、Pull Requestレビュー、中断保存の境界を明確化
- `docs/state.md`を、マージ済み状態と明示的なcheckpointだけを保持する最小構成へ変更
