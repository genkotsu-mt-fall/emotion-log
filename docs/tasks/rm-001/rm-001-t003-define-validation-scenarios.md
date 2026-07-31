# RM1-T003: 検証シナリオと判定条件を作る

- 状態: Completed
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: RM1-T002

## 目的

試作品完成後に、確認内容を追加判断しなくてよい状態にする。

## 対象

- 検証シナリオの定義
- 判定条件の定義
- ダミーデータの基本条件
- 確認環境の定義

## 対象外

- ダミーデータの具体的な値の設計
- 試作品の実装
- 検証の実行

## 参照文書

- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- [docs/ux/data-loading.md](../../ux/data-loading.md)
- [docs/ux/pointer-interactions.md](../../ux/pointer-interactions.md)

## 変更対象

- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)

## 実装・調査内容

- 初期取得の条件を定義する
- 過去方向への追加取得の条件を定義する
- ダミーデータに含めるべき状況を定義する
- 確認環境を定義する
- 判定条件を定義する

## エラーと境界条件

- ログがない日の扱い
- 同一日時で異なるIDのログ
- 取得境界に同じIDのログが存在する場合
- 最古データに到達した場合
- 通信遅延がある場合

## テストと確認

- 検証条件がロードマップの完了境界と矛盾していない
- 確認環境にPC、iPhone、Androidが含まれている
- 30日が仮値であることが明記されている

## 成果物

- RM 1ロードマップの検証条件セクション
- 検証条件：
  - 初期取得：直近30日分
  - 過去方向への追加取得：30日分を3回
  - 合計：120日分を4取得単位
  - ログがない日、1件の日、複数件の日を含める
  - 同一日時で異なるIDのログを含める
  - 取得境界に同じIDのログを含める
  - 通信遅延を再現する
  - 最古データ到達を再現する
  - PC、iPhone、Androidで確認する

## 完了条件

- 検証シナリオと判定条件が文書化されている
- 確認環境が明記されている
- 30日が検証用の仮値であり、正式仕様ではないことが明記されている

## 未決定議題

30日という取得単位は仮値であり、正式APIや正式初期表示の仕様ではない。

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-07-31 | 本PRで検証条件をロードマップへ記載し、Completedとする |
