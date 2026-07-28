# 変更記録作成ハンドラー

## 作成条件

承認済み正本文書の意味または複数領域のベースラインを変更する。

## 規則

- `docs/decisions/change-records/NNNN-short-title.md`
- 一変更記録一つの独立変更
- 変更前、変更後、理由、影響文書、承認、適用確認を記載する
- 初期Draft具体化、誤字、タスク状態、局所実装には作らない
- 正本文書、ADR、OQ、ロードマップ、タスク、CHANGELOGへの反映を同じinstructionへ含める
- 全反映を確認するまで`Applied`にしない
