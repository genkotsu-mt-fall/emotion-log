# GitHub Copilot Instructions

このフォルダには、議論終了後にGitHub Copilot Webへ渡したinstructionを保存する。

## 原則

- 議論中には作らない
- ユーザーが明示的に決定した後だけ作る
- 同じ作業対象への複数の指摘を一つへまとめる
- ADR、要件、UX、ロードマップ、タスク、stateなど、同じ結論に必要な変更を一つへまとめる
- Copilotへ新しい判断をさせない
- `main`へ直接変更せず、ブランチとPull Requestを作る
- Pull RequestはChatGPTと人間がレビューしてからマージする

## 命名

```text
docs/instructions/YYYYMMDD-<work-id>-<short-name>.md
```

## テンプレート

[`../templates/copilot-instruction.md`](../templates/copilot-instruction.md)を使用する。
