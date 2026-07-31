# GitHub Copilot instruction: MVP公開までの全体計画を作成する

## 目的

"main"ブランチを基準に、確定済みのMVP公開計画をリポジトリへ反映する。

MVP公開までのRM 1〜RM 8を一つの全体計画として作成し、MVP要件と"docs/state.md"を更新する。

このinstructionに書かれていない新しい技術判断、仕様判断、機能追加は行わない。

## 確定した内容

### MVP公開までの順序

```
RM 1  時間軸を移動しながら過去データを追加できるか確かめる
  ↓
RM 2  作り方を正式に決め、開発の土台を作る
  ↓
RM 3  利用者を識別し、保護された機能へ接続する
  ↓
RM 4  本人の感情ログを保存し、散布図まで実データを通す
  ↓
RM 5  感情ログを記録しやすくする
  ↓
RM 6  感情ログを振り返りやすくする
  ↓
RM 7  本番公開に必要な品質と運用を整える
  ↓
RM 8  URL公開型の一般登録として本番へ公開する
```

### 公開形態

- 本番URLを知っている人は誰でもアクセスできる
- 招待コードや管理者の事前承認は必要としない
- 利用者は自分でアカウントを登録できる
- 各利用者の感情ログは本人だけが閲覧できる
- 他者への共有や感情ログの一般公開は行わない
- 検索エンジンから発見できることはMVPの到達条件に含めない
- "noindex"を設定するかは、この変更では決めない

### 表記

- 大見出しには"◆"を付ける
- 「横パン」という略称だけでは書かない
- 基本表現は「時間軸を横方向へ移動する」とする
- 操作方法の補足が必要な場合は「マウスやタッチによる横方向へのパン操作」と書く
- 順序や依存関係は、横に広い表ではなく矢印図を優先する
- 箇条書きには、意味を具体化する短い例を付ける

## 参照ファイル

- `docs/skills/000-workflow.md`
- `docs/state.md`
- `docs/templates/mvp-release-plan.md`
- `docs/templates/copilot-instruction.md`
- `docs/instructions/README.md`
- `docs/product/product-brief.md`
- `docs/requirements/mvp-requirements.md`
- `docs/requirements/data-requirements.md`
- `docs/ux/timeline-concept.md`
- `docs/ux/data-loading.md`
- `docs/architecture/adr/0001-use-web-application.md`
- `docs/decisions/open-questions.md`

## 作成するファイル

### `docs/roadmap/mvp-release-plan.md`

MVP全体計画を作成する。

文書情報：

- 状態: Approved
- 作成日: 2026-07-31
- 更新日: 2026-07-31

次の章を含める：

1. 目的
2. リリース到達条件
3. MVP公開までの流れ
4. RM 1〜RM 8
5. 依存関係と並行可能性
6. リリースクリティカルパス
7. デプロイの流れ
8. 各RMの中心
9. 全体で未決定の議題
10. 変更履歴

### `docs/instructions/20260731-mvp-plan-create-release-plan.md`

`docs/templates/copilot-instruction.md` の構成に従い、この実行instructionを保存する。

## 更新するファイル

### `docs/requirements/mvp-requirements.md`

- 版を"0.2.0"へ更新する
- 更新日"2026-07-31"を追加する
- アカウント登録要件へ次を追加する：
  - 本番URLへアクセスできる利用者は、管理者の招待や承認なしでアカウントを登録できる
  - MVPでは招待コードを必須にしない
  - アカウント登録後、管理者の手動承認を待たずに利用を開始できる
  - 検索エンジンから発見できることはMVPの要件に含めない
- 次の既存要件は変更しない：
  - 感情ログは本人だけが閲覧できる
  - 他者共有や公開ログはMVP対象外
  - 未認証利用者は感情ログへアクセスできない
- 認証方式、メールアドレス確認、パスワード再設定については決定しない

### `docs/state.md`

frontmatterを次の状態にする：

```yaml
---
version: 1
updated_at: 2026-07-31
phase: planning

current:
  id: null
  title: null
  status: idle
  path: null
  checkpoint: null

next_action:
  kind: decompose_rm_001
  reason: MVP全体計画が確定したため、RM 1を実装可能なタスクへ分解する

last_completed:
  id: mvp-release-plan
  path: docs/roadmap/mvp-release-plan.md
---
```

本文は次の状態を表す：

- フェーズ："planning"
- 現在の作業：なし
- 状態："idle"
- checkpoint：なし
- 最後に完了した成果：MVP全体計画
- 次の作業：`docs/roadmap/mvp-release-plan.md` のRM 1を実装可能なタスクへ分解する
- 次の作業では、まだRM 1の実装やCopilot向け実装instructionを作らず、最初にタスク分解案を議論する

## 削除するファイル

なし。

## ファイルごとの変更

- `docs/roadmap/mvp-release-plan.md`：確定済みのMVP全体計画を作成
- `docs/requirements/mvp-requirements.md`：URL公開型の一般登録要件を追加
- `docs/state.md`：MVP全体計画完了後の状態と次の作業を記録
- `docs/instructions/20260731-mvp-plan-create-release-plan.md`：このinstructionを保存

既存のProduct Brief、データ要件、UX文書、ADR、OQは、このPRでは内容を変更しない。

## 変更しない範囲

- アプリケーションコード
- RM 1の試作品
- タスクファイル
- Issue
- 認証方式の決定
- 技術スタックの決定
- 散布図ライブラリの決定
- API、DB、デプロイ製品の決定
- メール確認とパスワード再設定の決定
- "noindex"の決定
- MVP対象外機能
- 既存OQの解決または削除
- "main"への直接変更

## 検査

最低限、次を実行する：

- 変更したMarkdownファイルの構文確認
- リポジトリ内相対リンクの確認
- `docs/roadmap/mvp-release-plan.md` にRM 1〜RM 8が一つずつ存在することの確認
- 各RMに目的、成果または役割、含むこと、完了条件があることの確認
- RM 1とRM 2の確定内容が省略されていないことの確認
- 「横パン」だけの表現が残っていないことの確認
- URL公開型の一般登録と、感情ログの非公開が混同されていないことの確認
- `docs/state.md` がマージ後の状態を表していることの確認
- 既存のMVP対象外機能が誤って追加されていないことの確認
- `git diff --check`
- リポジトリにMarkdown lintまたはリンク検査コマンドが既にある場合は実行する

新しい検査ツールや依存関係は追加しない。

## Pull Request

- "main"の最新状態から作業ブランチを作成する
- 推奨ブランチ名："docs/mvp-release-plan"
- 変更をcommitしてpushする
- Pull Requestを作成する
- 推奨タイトル："docs: add approved MVP release plan"
- Pull Request本文へ、作成・更新ファイル、確定した公開形態、次の作業、実行した検査と結果を記載する
- "main"へ直接変更しない
- Pull Requestはマージしない

## 完了報告

次を報告する：

- 作成したファイル
- 更新したファイル
- 削除したファイル
- 各ファイルの変更概要
- 実行した検査と結果
- Pull Request URL
- 判断できず変更しなかった事項
- 既存文書で見つけたが、このinstructionの範囲外として変更しなかった問題
