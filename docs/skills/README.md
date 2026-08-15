# ChatGPT用入口

通常は`000-workflow.md`だけを使用する。

## 最初の依頼

```text
このリポジトリのmainブランチを基準にしてください。
`docs/skills/000-workflow.md`と`docs/state.md`を読み、次に扱う作業対象を一つ選んで、議論を始めてください。
まだGitHub Copilot向けinstructionは作らないでください。
```

以後は、同じチャットで普通に複数の指摘をまとめて伝えてよい。

## 議論を閉じる

次のように依頼する。

```text
この内容で進める
```

`docs/state.md`のAIDDフェーズが`human-led`の場合、ChatGPTはGitHub Copilot Web向けinstructionの作成だけで停止せず、Human-led AIDDの実行用成果物まで生成する。

原則として次を生成する。

- リポジトリ相対パスを保った変更ファイル一式のZIP
- GitHub Copilot Web向けinstructionのMarkdownファイル
- ローカル反映からDraft Pull Request作成までのコマンド

ローカル作業コマンドは一つのhelperファイルへまとめず、人間が途中結果を確認できる単位でチャット上に分割して提示する。

### ローカル反映コマンドの参考テンプレート

過去に使用した`apply-emotion-log-update.sh`で成立した流れを参考テンプレートとする。ただし、script本体を正本とはせず、毎回ファイルとして生成したりリポジトリへ保存したりしない。

生成するコマンドでは原則として次を維持する。

- `git rev-parse --show-toplevel`でリポジトリルートを取得する
- ZIPは一時ディレクトリへ展開する
- `rsync -rcvn --itemize-changes`でdry-runする
- 人間の確認後に`rsync -rcv --itemize-changes`で実反映する
- 反映後に`git status`、`git diff --check`、`git diff`を確認する
- IssueやPull Requestの本文は`/tmp/*.md`へ作成し、`gh`の`--body-file`で渡す
- Draft Pull Request作成後はいったん停止し、URLをChatGPTへ共有してレビューする

Windows、WSL、Downloadsなどの具体的なパス解決は、その時点の実行環境に合わせて生成し、恒久ルールにはしない。

Copilotまたはローカル作業でPull Requestを作成した後は、PRを指定してレビューを依頼する。
