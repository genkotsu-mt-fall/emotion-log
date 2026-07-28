# 420: 本番リリースを確認する

## 目的

リリースinstruction、実行記録、本番環境、公開記録を照合する。

## 確認

- 本番が対象コミットを実行している
- 必須スモークテストが成功
- マイグレーションが成功
- データ整合性に異常がない
- 重大なエラーやアラートがない
- タグ、GitHub Release、CHANGELOGが一致
- ロールバック不要、または適切に実施済み

## 判定

- `Release verified`
- `Release verified with follow-up`
- `Rollback required`
- `Verification failed`

成功後はstateを`Validation`へ進める。問題があれば緊急タスクまたは通常議題へ自動ルーティングする。
