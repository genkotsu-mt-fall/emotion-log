# 400: MVPリリース準備をレビューする

## 目的

個別タスクではなく、対象コミット全体を本番へ公開可能か判定する。

## 確認領域

- MVP必須ロードマップと受け入れ条件
- CI、ビルド、E2E、手動受け入れ
- 認証、認可、Secret
- DBマイグレーション、バックアップ、復元
- データ損失、削除、保持
- 監視、ログ、アラート
- 対応ブラウザと実機確認
- プライバシーと利用者向け表示
- 既知不具合と許容判断
- デプロイ、スモークテスト、ロールバック
- バージョン、タグ、CHANGELOG、GitHub Release

## 判定

- `Ready for release candidate`
- `Ready after fixes`
- `Not ready`
- `Manual approval required`

不足があればChatGPTがタスク、通常議題、OQのどこへ戻すか判定する。ユーザーにルート選択を求めない。
