---
version: 1
updated_at: 2026-08-15
phase: planning

current:
  id: rm-001-t008
  title: ダミーデータの条件を設計する
  status: ready
  path: docs/tasks/rm-001/rm-001-t008-design-dummy-data.md
  checkpoint: null

next_action:
  kind: design_dummy_data
  reason: RM1-T007で確認用URLへの最小デプロイ、PC・スマートフォンからの表示、再デプロイを確認したため、T009の分割取得モックが依存するダミーデータ条件をT008で設計する

last_completed:
  id: rm-001-t007
  path: docs/tasks/rm-001/rm-001-t007-deploy-minimal-prototype.md
---

# Project State

このファイルは、マージ済みの現在地と、明示的に保存した中断状態だけを記録する。

## Current

- フェーズ: `planning`
- 現在の作業:
  - ID: `rm-001-t008`
  - タイトル: ダミーデータの条件を設計する
  - 状態: `ready`
  - パス: `docs/tasks/rm-001/rm-001-t008-design-dummy-data.md`
- checkpoint: なし

## Last Completed

RM1-T007「確認用URLへ最小デプロイする」（`docs/tasks/rm-001/rm-001-t007-deploy-minimal-prototype.md`）を完了した。

RM 1の仮デプロイ先としてVercel Hobby + GitHub Integrationを使用し、`main`をProduction Branch、`prototypes/rm-001-scatter-pagination`をRoot Directoryとして公開した。

デプロイ先の基底URLとして`https://emotion-log-dev.vercel.app`を記録した。PCとスマートフォンではVercelが発行した確認用URLを開き、固定3点の散布図が表示されることを確認した。共有用トークンはリポジトリへ記録しない。Vercel Dashboardからの再デプロイも成功した。本番APIやDBには依存していない。

T006で観察したPlotly.jsを含むJavaScript bundleの500 kB超過warningは解消していない。PC・スマートフォンのどちらでも表示自体は完了したが、初回表示速度の定量値や明示的な体感評価は確定していないため、正式採用判断とともにRM 2へ引き継ぐ。

PC版とスマートフォン版で同じUnicode絵文字の見た目が異なることを確認した。T007のBlockerとはせず、端末間で絵文字の見た目を統一するかをOQ-060として管理し、T016の端末確認を判断材料としてRM 2の散布図正式実装方式を決める前に判断する。

## Next

RM1-T008「ダミーデータの条件を設計する」で、RM 1の検証シナリオを満たす取得単位、データ分布、境界条件、統合後の期待総件数を設計する。
