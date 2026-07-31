# ChatGPT用入口

通常は`000-workflow.md`だけを使用する。

## 最初の依頼

```text
このリポジトリのmainブランチを基準にしてください。
`docs/skills/000-workflow.md`と`docs/state.md`を読み、次に扱う作業対象を一つ選んで、議論を始めてください。
まだGitHub Copilot向けinstructionは作らないでください。
```

以後は、同じチャットで普通に複数の指摘をまとめて伝えてよい。

議論を閉じるときだけ、次のように依頼する。

```text
この内容で決定。GitHub Copilot Web向けinstructionを作って。
```

CopilotがPull Requestを作成した後は、PRを指定してレビューを依頼する。
