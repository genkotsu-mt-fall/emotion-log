# RM1-T006: 固定点を使った最小散布図を表示する

- 状態: Completed
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: RM1-T005

## 目的

仮採用したライブラリで、固定データを使った最小の散布図を表示する。

後続のパン操作と取得境界検知へつなげるため、Plotlyから初期表示時間範囲を取得してアプリ側の値として扱えることも確認する。

## 対象

- 固定日時と固定気分値による3点程度の表示
- 絵文字そのものを散布図上の点として表示
- 横軸を日時軸として表示
- 縦軸を0〜100へ固定し、縦方向のパンとZoomを無効にする
- 横軸の過去側にT006用の仮下限を設け、現在時刻より未来へ移動できないようにする
- 初期表示時間範囲の取得
- 取得した表示時間範囲の開発確認用表示
- TypeScriptの`strict: true`
- Box SelectとLasso Selectを散布図のmodebarから非表示にする

## 対象外

- ダミーデータの動的取得
- 独自のパン処理
- `onRelayout`を使ったパン後の表示範囲更新や取得処理
- 過去側取得境界の検知
- データ追加と表示位置維持
- デプロイ
- 自分・他人の散布図を判定してDownload as a PNGの表示を切り替える処理
- 本番用EmotionLogモデルの確定
- 本番タイムゾーン保存方式の決定
- 過去側の正式な下限日時の決定
- 新しいnpm依存パッケージの追加
- テスト基盤の新設

## 参照文書

- [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- [docs/engineering/code-constraints.md](../../engineering/code-constraints.md)
- RM1-T004の成果物
- RM1-T005の成果物
- [docs/ux/timeline-concept.md](../../ux/timeline-concept.md)

## 変更対象

- `prototypes/rm-001-scatter-pagination/src/App.tsx`
- `prototypes/rm-001-scatter-pagination/src/index.css`
- `prototypes/rm-001-scatter-pagination/tsconfig.app.json`
- 本タスクと関連文書

## 実装・調査内容

- T005で作成したDev ContainerとReact + TypeScript + Viteの土台を使用する
- 固定ログは`feltAt`、`moodValue`、`emoji`だけを持つT006用の最小データとする
- 固定日時はタイムゾーンを明示したISO 8601形式とする
- Plotlyのscatter traceを使用し、`mode: "text"`で絵文字を座標上へ表示する
- `feltAt`を横軸、`moodValue`を縦軸へ割り当てる
- 縦軸の範囲はデータ要件に合わせて0〜100とし、`fixedrange`で縦方向のパンとZoomを無効にする
- 横軸の`minallowed`には、過去方向の制約確認用として`1989-01-01T00:00:00+09:00`を仮設定する。本番の最古日時とはしない
- 横軸の`maxallowed`には、ページを開いた時点の現在時刻を設定し、それより未来へ移動できないようにする
- 初期x軸rangeはT006の確認用固定値として明示してよいが、終了日時が現在時刻より未来になる場合は現在時刻で抑える。正式な初期表示仕様とはしない
- `react-plotly.js`の公開callbackからfigureを受け取り、`layout`を`unknown`として検証する
- Plotly固有オブジェクトをstateへ保存せず、開始日時と終了日時だけを`VisibleRange`へ変換する
- `VisibleRange | null`だけをReact local stateへ保持する
- 取得した表示時間範囲を画面上の開発確認用テキストへ表示する。正式UIと誤認させる見出しは付けない
- 固定ログから計算できるPlotly dataを別stateへ保持しない
- Plotlyの`modeBarButtonsToRemove`で`select2d`と`lasso2d`を除外する
- Download as a PNGはT006では標準表示のままとし、所有者別表示切替は後続タスクへ残す
- 共通コード制約を適用し、T006固有の例外は設けない

## エラーと境界条件

- 絵文字が正しく表示されない場合
- Plotlyのfigureからx軸rangeを取り出せない場合
- x軸rangeの開始または終了が想定した日時値として扱えない場合

未取得状態は通常状態として`null`で表し、欠損値を空文字などのdefault値で隠さない。

## テストと確認

実装後に次を確認する。

- 固定した3件程度の絵文字点が散布図上に表示される
- 日時が異なる点が横方向の異なる位置へ表示される
- 気分値が異なる点が縦方向の異なる位置へ表示される
- 縦軸が0〜100で表示され、縦方向へパンまたはZoomできない
- 横軸を1989年より過去へ移動できない
- 横軸をページ読込時点の現在時刻より未来へ移動できない
- 初期表示時間範囲を画面上で確認でき、正式UIのような見出しが付いていない
- placeholder表示が残っていない
- Box Selectがmodebarに表示されない
- Lasso Selectがmodebarに表示されない
- JavaScriptまたはReactの実行時エラーが出ていない
- `npm run lint`が成功する
- `npm run build`が成功する

## 検証結果

2026-08-14に次を確認した。

- 固定した絵文字3点が散布図上に表示される
- 横軸が日時、縦軸が0〜100として表示される
- 縦方向へパンまたはZoomできない
- 横軸をページ読込時点の現在時刻より未来へ移動できない
- 横方向のPan / Zoomは引き続き利用できる
- Box SelectとLasso Selectがmodebarに表示されない
- Download as a PNGがT006では表示されたままである
- ブラウザconsoleにJavaScriptまたはReactの実行時エラーがない
- 過去側下限は、`minallowed`を確認しやすい日時へ一時的に近づけ、下限より過去へ移動できないことを確認した。その後、最終設定値を`1989-01-01T00:00:00+09:00`へ復元した
- `npm run lint`: 0 warnings / 0 errors
- `npm run build`: 成功
- `git diff --check`: 問題なし

production buildでは、Plotly.jsを含むJavaScript chunkが約4,846.04 kB、gzip後約1,453.23 kBとなり、Viteの500 kB超過warningが出た。

このwarningはT006の完了を妨げるエラーとはしない。T007の確認用URLでPC・スマートフォンから実際の初回表示を確認し、Plotly.jsの正式採用判断はRM 2へ引き継ぐ。

## 成果物

- 固定日時、固定気分値、絵文字を使った最小散布図
- Plotlyのfigureからアプリ側の`VisibleRange`へ変換する方法
- 表示時間範囲を確認できる開発用表示
- `strict: true`を有効にしたTypeScript設定
- Box SelectとLasso Selectを除外した散布図modebar設定

## 完了条件

次をすべて満たした場合にCompletedとする。

- 固定の絵文字点を表示できる
- 縦軸0〜100を維持し、縦方向へパンまたはZoomできない
- 横軸がT006用の過去下限とページ読込時点の現在時刻を越えて移動できない
- 初期表示時間範囲を取得できる
- 取得した表示時間範囲を画面上で確認できる
- Box SelectとLasso Selectがmodebarに表示されない
- `npm run lint`が成功する
- `npm run build`が成功する

## 未決定議題

なし。使用するライブラリはT004で仮採用済み。

パンによる範囲変更の取得はT011、本番の技術採用はRM 2で扱う。

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-08-14 | 実装・ブラウザ確認・lint・build・`git diff --check`を完了し、Completedとする。bundle-size warningはT007とRM 2への観察事項として残す |
| 2026-08-14 | 固定3点、表示時間範囲取得、共通コード制約を含む実装方針を確定 |
| 2026-08-14 | 散布図のmodebarからBox SelectとLasso Selectを除外する方針を追加 |
| 2026-08-14 | 縦軸0〜100固定、横軸の仮下限1989年・上限現在時刻、確認用range表示の見出し削除を追加 |
| 2026-08-13 | T005完了を受けReadyとする |
| 2026-07-31 | Pendingとして作成 |
