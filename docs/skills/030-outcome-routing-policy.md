# 030: セッション成果物のルーティング方針

## 目的

セッション結論を、必要な成果物へ漏れなく、重複なく割り当てる。ユーザーにADR、変更記録、OQなどの種別選択を求めない。

## 判定順

一つの結論について、次をすべて判定する。択一ではない。

### 1. 未決定事項

次のいずれかなら`docs/decisions/open-questions.md`へ作成または更新する。

- 結論が出ていない
- 将来の工程を妨げる可能性がある
- 調査、プロトタイプ、期限、再開条件を追跡する必要がある

単なる会話上の質問や、その場で解決した疑問はOQにしない。

### 2. ADR

次をすべて満たすならADRを作成する。

- 技術またはアーキテクチャ上の選択である
- 複数タスクまたは将来変更へ継続的に影響する
- 選択肢、理由、トレードオフ、再検討条件を保存する価値がある
- ユーザーが結論を承認している

局所的な実装詳細、可逆で短命な選択、未決定の比較だけではADRを作らない。

### 3. 変更記録

承認済みベースラインの意味を変更する場合に作成する。

対象例:

- Product Briefの目的、対象、MVP境界
- 要件、データ要件、受け入れ条件
- UXの基本挙動
- 採用済み運用方針
- 複数の正本文書へまたがる意味変更

初期Draftの具体化、誤字修正、タスク状態変更、局所実装は原則として変更記録にしない。

### 4. 正本文書

結論が次へ影響する場合、該当文書を更新する。

- `docs/product/`
- `docs/requirements/`
- `docs/ux/`
- アーキテクチャ説明文書

ADRや変更記録だけを作り、実際の正本文書更新を忘れない。

### 5. ロードマップ・タスク

結論によって次が変わる場合に更新する。

- 対象、対象外
- 成果物
- 前提、依存関係
- 完了条件
- 実装範囲
- テスト、検証方法
- Blocker、復帰条件

### 6. CHANGELOG

次をすべて満たす場合だけ追記する。

- ユーザー承認済み
- 正本文書または採用済みADRのベースラインが実際に変わる
- 同じinstructionで反映する

OQ追加、議論履歴、Draft作成、タスク状態更新だけでは追記しない。

### 7. state

次が変わる場合に更新する。

- 現在作業
- セッション段階
- 未反映instruction
- Blocker
- 分岐先
- 復帰先
- 次の一手

### 8. instruction

リポジトリへ作成、更新、削除が一件でもあれば必要とする。同じ結論に由来する変更は一つの統合instructionへまとめる。

## 大きな議題を発見した場合

現在の議題から独立した大きな判断が必要な場合:

1. 現在議題を`Blocked`または`Deferred`として閉じる
2. 元作業を`return_stack`へ積む
3. 必要なら最小OQを一件作る
4. 新しい判断を`active_work`候補とする
5. 次回の`000-next-action.md`でChatGPTが自動的に開く

ユーザーに「ADRルートへ行くか」を選ばせない。ADRは新しい判断セッションが結論へ達した後の成果物である。

## 出力形式

```yaml
routing:
  adr:
    action: none | create | supersede | clarify
    reason: ...
  change_record:
    action: none | create | update
    reason: ...
  open_question:
    action: none | create | update | resolve | defer
    reason: ...
  product_docs: []
  requirements: []
  ux_docs: []
  roadmap: []
  task: []
  changelog:
    action: none | append
    reason: ...
  state:
    action: none | update
  instruction:
    required: true | false
```
