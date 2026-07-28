# 意思決定文書

このフォルダには、未決定事項と、承認済みベースライン変更を追跡する変更記録を置く。

## 未決定事項

- `open-questions.md`
- 一OQ一つの最小議題
- 結論がない、調査が必要、将来工程を妨げる事項だけを追跡する
- 解決時は削除せず、結論、解決日、解決先を記録する

## 変更記録

- `change-records/NNNN-short-title.md`
- 一変更記録一つの独立したベースライン変更
- Product、要件、UXなど承認済み正本の意味変更を追跡する
- 誤字、タスク状態、局所実装、Draftの具体化だけでは作らない
- 全関連文書へ反映を確認するまで`Applied`にしない

OQや変更記録を作るかどうかは、通常の一議題セッション終了時にChatGPTが判定する。ユーザーが専用ワークフローを選ぶ必要はない。

品質規約:

- `docs/skills/internal/update-open-question.md`
- `docs/skills/internal/write-change-record.md`
