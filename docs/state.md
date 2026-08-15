---
version: 1
updated_at: 2026-08-15
phase: planning

current:
  id: rm-001-t009
  title: 分割取得モックを作る
  status: ready
  path: docs/tasks/rm-001/rm-001-t009-build-paged-data-mock.md
  checkpoint: null

next_action:
  kind: build_paged_data_mock
  reason: RM1-T008で正本16件、4取得単位、境界重複3件、統合後期待件数5→9→13→16、最古ログを固定したため、T009でこの条件を使った分割取得モックを実装する

last_completed:
  id: rm-001-t008
  path: docs/tasks/rm-001/rm-001-t008-design-dummy-data.md
---

# Project State

このファイルは、マージ済みの現在地と、明示的に保存した中断状態だけを記録する。

## Current

- フェーズ: `planning`
- 現在の作業:
  - ID: `rm-001-t009`
  - タイトル: 分割取得モックを作る
  - 状態: `ready`
  - パス: `docs/tasks/rm-001/rm-001-t009-build-paged-data-mock.md`
- checkpoint: なし

## Last Completed

RM1-T008「ダミーデータの条件を設計する」（`docs/tasks/rm-001/rm-001-t008-design-dummy-data.md`）を完了した。

RM 1の検証用ダミーデータとして、120日を30日×4取得単位で扱い、正本16件を固定した。

取得境界で`log-005`、`log-009`、`log-013`の3件を意図的に再返却する条件を設け、取得レスポンス延べ19件に対して、ID統合後の期待件数を`5 → 9 → 13 → 16`とした。

`log-016`を最古ログとし、それより過去にはダミーログが存在しないものとした。

30日、固定基準日、固定オフセット、仮ID、正本件数、境界重複条件はすべてRM 1検証用であり、正式API仕様ではない。

## Next

RM1-T009「分割取得モックを作る」で、T008の固定データ条件を使い、散布図とは独立して初期取得、過去3回の追加取得、通信遅延、取得範囲、最古到達を再現するモックを実装する。
