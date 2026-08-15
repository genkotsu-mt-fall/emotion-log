# RM1-T007: 確認用URLへ最小デプロイする

- 状態: Completed
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: RM1-T006

## 目的

固定点までの試作品を確認用URLへ公開し、PC・スマートフォンから確認できるようにする。

## 対象

- T004で選んだ構成のビルド成果物を公開できるデプロイ先の仮選定
- 確認用URLへのデプロイ
- PCとスマートフォンからのアクセス確認
- 再デプロイの確認

## 対象外

- 本番APIやDBへの依存
- カスタムドメイン設定
- 認証付きデプロイ
- 正式なホスティング構成の決定
- Plotly.js bundleの最適化
- 端末間で絵文字の見た目を統一する実装

## 参照文書

- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- RM1-T006の成果物
- [docs/decisions/open-questions.md](../../decisions/open-questions.md)

## 変更対象

- Vercel上のRM 1用デプロイ設定
- 本タスクと関連文書の実施結果

リポジトリへVercel固有の設定ファイルは追加しなかった。

## 実装・調査内容

- T004で選んだ構成のビルド成果物を公開できるデプロイ先の仮選定
- デプロイ設定
- PCからのアクセス確認
- スマートフォンからのアクセス確認
- 再デプロイの確認
- 初回表示と端末ごとの絵文字表示の観察

## 実施結果

### 仮デプロイ先

RM 1の確認用デプロイ先として、Vercel Hobby + GitHub Integrationを仮採用した。

設定:

- Production Branch: `main`
- Root Directory: `prototypes/rm-001-scatter-pagination`
- Framework: Vite
- Build Command: 既存の`npm run build`
- Output Directory: `dist`
- 環境変数: 追加なし
- `vercel.json`: 追加なし

この構成はRM 1の検証用であり、正式なホスティング構成ではない。

### デプロイ先URL

リポジトリへ記録する基底URL:

`https://emotion-log-dev.vercel.app`

PC・スマートフォンからの確認ではVercelが発行した共有用URLを使用した。共有用クエリパラメータや一時的な共有トークンは安定したプロジェクト設定ではないため、リポジトリへ記録しない。

### 確認結果

- 初回デプロイ: 成功
- PCブラウザからVercelの確認用URLを開き、固定3点の散布図が表示されることを確認
- スマートフォンからVercelの確認用URLを開き、固定3点の散布図が表示されることを確認
- Vercel Dashboardから再デプロイし、成功することを確認
- 本番APIやDBに依存していないことを確認

### Plotly.js bundleの観察

PC・スマートフォンのどちらでも確認用URLから表示自体は完了した。

初回表示速度について定量計測は行っておらず、利用者による明示的な体感評価も確定していない。

T006で観察したPlotly.jsを含むJavaScript chunk約4,846.04 kB、gzip後約1,453.23 kBのwarningは解消していない。

bundle最適化はT007では行わず、Plotly.jsの正式採用判断とともにRM 2への入力とする。

### 絵文字表示の観察

PC版とスマートフォン版で、同じUnicode絵文字の見た目が異なることを確認した。

現在の試作品はPlotlyのtextとしてUnicode絵文字を渡しており、端末やOSなどの描画環境による見た目の差を許容している。

この差異だけをT007の失敗とは扱わない。

端末間で絵文字の見た目を統一するかはOQ-060として分離し、T016で端末ごとの差を観察したうえで、RM 2の散布図正式実装方式を決める前に判断する。

## エラーと境界条件

- デプロイ失敗
- スマートフォンから開けない
- 再デプロイが反映されない

いずれもT007完了時点では発生していない。

## テストと確認

- [x] PCから確認用URLを開ける
- [x] スマートフォンから確認用URLを開ける
- [x] 再デプロイできる
- [x] 本番APIやDBへ依存していない
- [x] 確認用URLで初回表示が完了することをPC・スマートフォンで観察した
- [x] PCとスマートフォンで絵文字の見た目に差があることを観察した

初回表示速度の定量値や明示的な体感評価は記録していない。

## 成果物

- Vercelへデプロイされた試作品
- Vercel + GitHub IntegrationによるRM 1用デプロイ手順
- PC・スマートフォン・再デプロイの確認結果
- bundle-sizeと絵文字表示差の観察結果

## 完了条件

- [x] PCとスマートフォンから開ける
- [x] 再デプロイできる
- [x] 本番APIやDBへ依存していない

## 未決定議題

正式なホスティング構成は決めていない。

Plotly.jsを含むbundleの大きさは、T007で表示不能のBlockerとはならなかったが、最適化や正式採用判断は行っていない。RM 2へ引き継ぐ。

端末間で絵文字の見た目を統一するかはOQ-060で扱う。

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-08-15 | Vercel Hobby + GitHub Integrationを仮採用し、PC・スマートフォンからの表示と再デプロイを確認してCompletedとする。bundle-size warningと端末間の絵文字表示差を後続判断へ引き継ぐ |
| 2026-08-14 | T006完了を受けReadyとする。T006で観察したbundle-size warningを実機確認の観察事項として引き継ぐ |
| 2026-07-31 | Pendingとして作成 |
