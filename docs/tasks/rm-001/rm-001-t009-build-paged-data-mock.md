# RM1-T009: 分割取得モックを作る

- 状態: Completed
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: RM1-T005, RM1-T008

## 目的

散布図とは独立して、初期取得と過去方向の追加取得を再現するモック関数を作る。

## 対象

- 初期取得の関数
- 過去側の次取得の関数
- 通信遅延の再現
- 取得範囲の確認
- 最古到達の返却
- モック単体の自動テスト

## 対象外

- 散布図への接続
- 本番API仕様の決定
- 正式なカーソル形式の決定
- 取得データのID統合
- パン操作
- 取得境界検知

## 参照文書

- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- [docs/ux/data-loading.md](../../ux/data-loading.md)
- [docs/engineering/code-constraints.md](../../engineering/code-constraints.md)
- [RM1-T008](rm-001-t008-design-dummy-data.md)

## 変更対象

- `prototypes/rm-001-scatter-pagination/src/rm1PagedDataMock.ts`
- `prototypes/rm-001-scatter-pagination/src/rm1PagedDataMock.test.ts`
- `prototypes/rm-001-scatter-pagination/package.json`
- `prototypes/rm-001-scatter-pagination/package-lock.json`
- 本タスクと関連文書

## 実装・調査内容

- T008の正本16件をTypeScriptへ実装する
- 初期取得関数を作成する
- `toExclusive`を入力とする過去方向の取得関数を作成する
- 固定1000msの通信遅延を再現する
- `items / range / hasEarlier`を返す
- 取得境界の既取得IDを意図的に再掲載する
- 最古より過去を要求した場合は0件かつ`hasEarlier=false`を返す
- 未定義の`toExclusive`は通信遅延を入れずErrorでrejectする
- Vitestで固定シナリオを自動検査する

## 実施結果

### モック構成

`prototypes/rm-001-scatter-pagination/src/rm1PagedDataMock.ts`を追加した。

公開する関数は次の2つとする。

- `fetchInitialEmotionLogs()`
- `fetchEarlierEmotionLogs(toExclusive)`

RM 1用の型として、`Rm1EmotionLog`、`MockFetchRange`、`MockFetchResponse`を公開する。

正本16件はモック内部で一度だけ定義し、正本配列そのものは公開しない。各取得シナリオは返却対象のIDを持ち、IDから正本ログを参照してレスポンスを作る。

モック内部にはページ番号や現在ページの可変stateを持たせない。同じ`toExclusive`には同じ固定シナリオを返す。

### 取得レスポンス

- 初期取得: 5件、`log-001`〜`log-005`
- 追加取得1: 5件、`log-005`〜`log-009`
- 追加取得2: 5件、`log-009`〜`log-013`
- 追加取得3: 4件、`log-013`〜`log-016`

延べ受信件数は19件とする。

境界で意図的に再掲載するIDは次の3件とする。

- `log-005`
- `log-009`
- `log-013`

IDで集計した場合の期待ユニーク累計は`5 → 9 → 13 → 16`となる。

これはT014のID統合処理を実装したものではなく、T014で検証する入力条件を提供するモックである。

### 取得境界

`fetchEarlierEmotionLogs(toExclusive)`は次の固定境界を扱う。

- `2026-07-17T00:00:00+09:00`: 追加取得1
- `2026-06-17T00:00:00+09:00`: 追加取得2
- `2026-05-18T00:00:00+09:00`: 追加取得3
- `2026-04-18T00:00:00+09:00`: 最古より過去の0件レスポンス

最古より過去の固定範囲は次とする。

```text
from = 2026-03-19T00:00:00+09:00
to   = 2026-04-18T00:00:00+09:00
items = []
hasEarlier = false
```

上記以外の`toExclusive`はRM 1モックの不正な使用としてErrorでrejectし、1000msの通信遅延を入れない。

### 通信遅延

正常な取得だけ、RM 1検証用の固定1000ms遅延を入れる。

この値は本番通信仕様ではない。

### 自動テスト

`prototypes/rm-001-scatter-pagination/src/rm1PagedDataMock.test.ts`を追加し、Vitestで次を検査する。

- 初期取得の5件・range・`hasEarlier`
- 追加取得1〜3の返却ID・range・`hasEarlier`
- 境界重複`log-005`、`log-009`、`log-013`
- 最古より過去の0件レスポンス
- 延べ19件
- ユニーク累計`5 → 9 → 13 → 16`
- 未定義境界のreject
- 999msでは未完了、1000msで完了する固定遅延

遅延テストではVitestのfake timerを使用し、実時間で1秒ずつ待たない。

## エラーと境界条件

- 最古データに到達した場合の返却
- 取得境界に既取得IDが再掲載される場合
- 未定義の`toExclusive`
- 固定通信遅延の境界

## テストと確認

完了前に次を実行する。

```bash
npm run test
npm run lint
npm run build
git diff --check
```

さらに次を確認する。

- 受信件数が5、5、5、4である
- 延べ件数が19である
- ユニーク累計が`5 → 9 → 13 → 16`である
- 最古より過去で0件かつ`hasEarlier=false`になる
- 未定義境界が1000ms待たずrejectする
- `App.tsx`へモック接続を追加していない
- T014のID統合処理を実装していない

## 成果物

- 初期取得モック関数
- 過去方向の次取得モック関数
- T008の正本16件を使った固定取得シナリオ
- 固定1000msの通信遅延
- 最古到達の返却
- Vitestによる自動テスト

## 完了条件

- 散布図とは独立して初期取得と過去3回の取得を実行できる
- 最古より過去の0件レスポンスを再現できる
- 未定義境界をrejectできる
- 固定1000ms遅延を自動テストできる
- `npm run test`、`npm run lint`、`npm run build`、`git diff --check`が成功する

## 未決定議題

- OQ-056：モック関数を本番API仕様として扱わない

30日、固定範囲、1000ms、固定オフセット、仮ID、正本16件、境界重複、`items / range / hasEarlier`、`toExclusive`方式はすべてRM 1検証用であり正式仕様ではない。

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-08-15 | T008の固定条件を使った分割取得モックとVitestによる自動検査を追加しCompletedとする |
| 2026-08-15 | T008でダミーデータ条件が確定したためReadyとする |
| 2026-07-31 | Pendingとして作成 |
