# RM1-T004: 仮の技術構成を選ぶ

- 状態: Completed
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: RM1-T003

## 目的

正式採用を行わず、試作品を開始する構成を一つ選ぶ。

## 対象

- 試作品で使用するフロントエンド構成の候補調査
- 散布図ライブラリの候補調査
- 候補ごとの確認項目の評価
- 仮採用する構成の選定
- 仮のフロントエンド構成の決定
- 仮の散布図ライブラリの決定
- 試作品コードを配置する仮ディレクトリの決定

## 対象外

- 正式なADRの作成
- フロントエンド構成の正式決定
- 散布図ライブラリの正式採用
- 本番API、DB構成の決定
- デプロイ先の選定

## 参照文書

- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- [docs/decisions/open-questions.md](../../decisions/open-questions.md)（OQ-028〜OQ-032）

## 変更対象

- [docs/tasks/rm-001/rm-001-t004-select-provisional-stack.md](rm-001-t004-select-provisional-stack.md)
- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- [docs/decisions/open-questions.md](../../decisions/open-questions.md)
- [docs/tasks/rm-001/rm-001-t005-bootstrap-prototype.md](rm-001-t005-bootstrap-prototype.md)
- [docs/tasks/rm-001/rm-001-t011-implement-pan-input.md](rm-001-t011-implement-pan-input.md)
- [docs/state.md](../../state.md)
- [docs/CHANGELOG.md](../../CHANGELOG.md)

## 実装・調査内容

確認項目：

- 絵文字を点として表示できる
- 横方向パンを制御できる
- 表示時間範囲を取得できる
- データ追加後に範囲を維持できる可能性がある
- PCとモバイルブラウザで動作する可能性がある

## 実施結果

### 仮採用する構成

- フロントエンド: React + TypeScript + Vite
- パッケージ管理: npm
- 散布図: Plotly.js + react-plotly.js
- 状態管理: Reactのローカルstate
- 分割取得と通信遅延の再現: 非同期ローカルモック
- 試作品の仮配置先: `prototypes/rm-001-scatter-pagination/`

React、Vite、Plotly.jsなどの正確なバージョンはT004では固定しない。T005で実際に初期化したときの`package.json`とlockfileで使用バージョンを記録する。

### 仮採用理由

- React + TypeScript + Viteは、RM 1で必要な最小の試作品を作り、ローカルstateでデータ追加や取得状態の変化を確認できる
- Plotly.jsは、日時と気分値の座標上へ絵文字を表示し、横方向パンと表示範囲取得を検証する候補として使用できる
- `react-plotly.js`を使用し、ReactからPlotly.jsを組み込む
- RM 1ではルーティング、外部状態管理、APIキャッシュの正式方式を先取りしない
- `prototypes/rm-001-scatter-pagination/`へ分離し、RM 1の検証コードと将来の本番フロントエンド構成を区別する

### 確認項目の評価

- 絵文字をデータ点として表示: 実現可能と判断。T006以降で実際の描画を確認する
- 横方向パン: Plotly.jsの標準パンを利用する。T011でマウスとタッチの操作を確認する
- 表示時間範囲の取得: Plotly.jsのイベントと軸範囲から取得する方針。T011〜T012で実証する
- データ追加後の表示位置維持: T004では未検証。T015で実証する
- PC、iPhone、Androidでの動作: T004では未検証。T016で実機確認する

### RM 1で扱わない評価

散布図のアクセシビリティとキーボード操作は、RM 1の仮採用評価では対象外とする。必要性を含む正式な扱いは、正式採用を判断するときに改めて検討する。

### パン判定値の扱い

RM 1ではPlotly.jsの標準パンを使用し、アプリ独自のパン開始判定を実装しない。

そのため、OQ-028〜OQ-030に記載していた次の候補値はRM 1では使用しない。

- マウス: 5 CSS px
- タッチ: 10 CSS px
- 横移動が縦移動の1.2倍以上

OQ-028〜OQ-030は正式解決せず、将来独自のジェスチャー制御が必要になった場合に改めて判断する。

## エラーと境界条件

- 候補が確認項目を満たさない場合の代替
- ライブラリのライセンス確認

Plotly.jsとreact-plotly.jsは、RM 1で試作品へ利用できるライセンスであることを確認した。

## テストと確認

- 確認項目をすべて評価している
- 仮採用であり正式決定でないことが明記されている
- 後続タスクで実証する項目が区別されている
- T005が追加の技術構成・配置判断なしに開始できる

## 成果物

- 候補の調査結果
- 仮採用する構成の記録
- 仮採用理由
- 試作品の仮配置先
- 後続タスクで実証する項目の整理

## 完了条件

- 試作品を開始するフロントエンド構成が一つ選ばれている
- 散布図ライブラリが一つ仮採用されている
- 試作品コードの仮配置先が記録されている
- T005が追加の配置判断なしに開始できる
- 確認項目の評価結果が記録されている
- 正式なADRを作成していない
- 仮採用であることが明記されている

すべて満たしたためCompletedとする。

## 未決定議題

- OQ-028〜OQ-030：独自のパン判定値はRM 1では使用せず、必要になった段階で正式決定する
- OQ-031：可視化ライブラリの正式採用はRM 2で決定する
- OQ-032：フロントエンド構成の正式採用はRM 2で決定する

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-08-10 | React + TypeScript + Vite + npm、Plotly.js + react-plotly.jsを仮採用し、試作品配置先を確定してCompletedとする |
| 2026-07-31 | Readyとして作成。マージ後の次作業とする |
