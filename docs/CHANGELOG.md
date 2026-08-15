# CHANGELOG

## Unreleased

- RM1-T007をCompleted、RM1-T008をReadyへ更新。Vercel Hobby + GitHub IntegrationをRM 1の仮デプロイ先として使用し、PC・スマートフォンからの表示とVercel Dashboardからの再デプロイを確認
- T007のデプロイ先基底URLを`https://emotion-log-dev.vercel.app`として記録し、PC・スマートフォンの確認で使用した共有用クエリパラメータや一時的な共有トークンはリポジトリへ保存しない方針を明記
- T007でPCとスマートフォンのUnicode絵文字の見た目に差があることを確認し、端末間で見た目を統一するかをOQ-060として追加。T016では端末ごとの差を観察するが、差異だけでは失敗としない
- T006から引き継いだPlotly.jsを含むbundle-size warningは、T007で表示自体が完了することを確認したうえで、定量的・明示的な体感評価を確定せずRM 2へ引き継ぐ
- エージェント共通入口としてルート`AGENTS.md`を追加し、`docs/state.md`、`docs/skills/000-workflow.md`、現在タスク、必要時のコード制約へ最短で到達する経路を定義
- `docs/aidd/evolution-strategy.md`を追加し、Human-led AIDDから段階的にSingle-agent、Agent Execution、Parallel Execution、Multi-agent Autonomousへ進める方針、モデル使用量を抑える原則、フェーズごとの自動化投資の考え方を記録
- RM1-T006をCompleted、RM1-T007をReadyへ更新。ブラウザ確認、`npm run lint`、`npm run build`、`git diff --check`を完了し、Plotly.jsを含むJavaScript chunkの500 kB超過warningをT007とRM 2への観察事項として記録
- RM1-T006の散布図で、縦軸を0〜100へ固定し、横軸を検証用の過去下限1989年からページ読込時点の現在時刻までに制約。確認用range表示の見出しを削除
- 散布図のmodebarからBox SelectとLasso Selectを除外し、PNG保存は自分の散布図だけに提供するUX方針を追加
- RM1-T006の実装方針として、固定3点の絵文字を日時×気分値の散布図へ表示し、初期表示時間範囲をアプリ側の`VisibleRange`へ変換する構成を追加
- TypeScriptの`strict: true`を有効化
- 共通コード制約を`docs/engineering/code-constraints.md`へ正本化
- 共通コード制約へ、プロジェクト固有概念を明示する命名、非自明な処理へ意図を残すコメント、型注釈・`satisfies`・`readonly`の使い分けルールを追加
- 実装方針の議論、コード変更、コードを含むPull Requestレビューで共通コード制約を参照するワークフローへ更新
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
