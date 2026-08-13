---
version: 1
updated_at: 2026-08-10
phase: planning

current:
  id: rm-001-t005
  title: ローカルで試作品の土台を起動する
  status: ready
  path: docs/tasks/rm-001/rm-001-t005-bootstrap-prototype.md
  checkpoint: null

next_action:
  kind: bootstrap_prototype
  reason: RM1-T004で仮採用したReact + TypeScript + Vite + npmと、prototypes/rm-001-scatter-pagination/の配置先を使い、ローカルで最小の試作品を起動する

last_completed:
  id: rm-001-t004
  path: docs/tasks/rm-001/rm-001-t004-select-provisional-stack.md
---

# Project State

このファイルは、マージ済みの現在地と、明示的に保存した中断状態だけを記録する。

## Current

- フェーズ: `planning`
- 現在の作業:
  - ID: `rm-001-t005`
  - タイトル: ローカルで試作品の土台を起動する
  - 状態: `ready`
  - パス: `docs/tasks/rm-001/rm-001-t005-bootstrap-prototype.md`
- checkpoint: なし

## Last Completed

RM1-T004「仮の技術構成を選ぶ」（`docs/tasks/rm-001/rm-001-t004-select-provisional-stack.md`）を完了した。

RM 1の試作品では、React + TypeScript + Vite + npm、Plotly.js + react-plotly.jsを仮採用し、試作品の配置先を`prototypes/rm-001-scatter-pagination/`とした。

RM 1ではPlotly.jsの標準パンを利用し、独自のパン開始閾値は実装しない。正式な技術採用はRM 2で行う。

## Next

RM1-T005「ローカルで試作品の土台を起動する」で、T004の仮採用構成を使い、`prototypes/rm-001-scatter-pagination/`にローカルで動作する最小の試作品を作る。

散布図の描画はT006で行う。
