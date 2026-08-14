---
version: 1
updated_at: 2026-08-14
phase: planning

current:
  id: rm-001-t007
  title: 確認用URLへ最小デプロイする
  status: ready
  path: docs/tasks/rm-001/rm-001-t007-deploy-minimal-prototype.md
  checkpoint: null

next_action:
  kind: deploy_minimal_prototype
  reason: RM1-T006で固定点を使った最小散布図を実装し、ブラウザ確認、lint、production buildを完了したため、確認用URLへ最小デプロイする

last_completed:
  id: rm-001-t006
  path: docs/tasks/rm-001/rm-001-t006-render-fixed-scatter-point.md
---

# Project State

このファイルは、マージ済みの現在地と、明示的に保存した中断状態だけを記録する。

## Current

- フェーズ: `planning`
- 現在の作業:
  - ID: `rm-001-t007`
  - タイトル: 確認用URLへ最小デプロイする
  - 状態: `ready`
  - パス: `docs/tasks/rm-001/rm-001-t007-deploy-minimal-prototype.md`
- checkpoint: なし

## Last Completed

RM1-T006「固定点を使った最小散布図を表示する」（`docs/tasks/rm-001/rm-001-t006-render-fixed-scatter-point.md`）を完了した。

Plotly.js + react-plotly.jsで、固定日時、固定気分値、絵文字を使った最小散布図を表示した。

縦軸は0〜100へ固定し、横軸はT006用の仮下限からページ読込時点の現在時刻までに制約した。Box SelectとLasso Selectはmodebarから除外し、Download as a PNGはT006では表示したままとした。

Plotlyの初期x軸rangeを、Plotly固有オブジェクトをstateへ残さずアプリ側の`VisibleRange`へ変換できることを確認した。

ブラウザ確認、`npm run lint`、`npm run build`、`git diff --check`を完了した。production buildではPlotly.jsを含むJavaScript chunkの500 kB超過warningが出ており、T007の確認用URLで初回表示を観察し、正式採用判断はRM 2へ引き継ぐ。

## Next

RM1-T007「確認用URLへ最小デプロイする」で、固定点までの試作品を確認用URLへ公開し、PC・スマートフォンから開けることと再デプロイできることを確認する。
