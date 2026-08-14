# GitHub Copilot instruction: RM1-T006 固定点を使った最小散布図を表示し、共通コード制約を正本化する

## 目的

`main`ブランチを基準に、RM1-T006「固定点を使った最小散布図を表示する」を実装する。

同時に、このタスクの議論で確定したコード制約を、今後のRMでも一貫して適用する共通コード制約として正本化する。

## 確定した内容

- React + TypeScript + Vite + npm、Plotly.js + react-plotly.jsのT005環境を継続使用する。
- 固定ログ3件程度を使い、横軸を`feltAt`、縦軸を`moodValue`、絵文字をscatterのtextとして表示する。
- 縦軸は0〜100へ固定し、縦方向のパンとZoomを無効にする。
- 横軸は過去側にも下限を設ける。T006では制約確認用の仮値として`1989-01-01T00:00:00+09:00`を使い、本番仕様とはしない。
- 横軸はページを開いた時点の現在時刻より未来へ移動できないようにする。
- 固定日時はタイムゾーンを明示したISO 8601形式とする。
- 初期表示時間範囲をPlotlyの公開callbackから取得する。
- Plotly固有オブジェクトはReact stateへ保存せず、`VisibleRange`へ変換する。
- `VisibleRange | null`だけをstateへ保持し、画面上へ確認用表示を出す。確認用表示には正式UIと誤認させる見出しを付けない。
- TypeScriptで`strict: true`を有効にする。
- 共通コード制約は`docs/engineering/code-constraints.md`を正本とする。
- コードに関係する議論・実装・PRレビューでは共通コード制約を参照する。
- タスク固有制約は共通制約への追加とし、例外には対象制約・理由・適用範囲を記録する。
- 型として正しいだけでなく、人間とAIが意図・役割・変更可能性を同じように読み取りやすい表現を優先する。
- 変数の契約を示す場合は型注釈、推論を保った構造検査には`satisfies`を使い、`satisfies readonly T[]`だけで値のreadonly性を表現しない。
- `log`など別の意味へ読める識別子を避け、対象と役割が分かる具体的な名前を使う。
- Box SelectとLasso Selectは散布図のmodebarに表示しない。
- Download as a PNGは自分の散布図だけに提供し、他人の散布図では表示しない。T006では所有者判定そのものは実装しない。

## 参照ファイル

- `docs/skills/000-workflow.md`
- `docs/ux/timeline-concept.md`
- `docs/state.md`
- `docs/README.md`
- `docs/roadmap/rm-001-time-axis-pagination-spike.md`
- `docs/tasks/rm-001/rm-001-t004-select-provisional-stack.md`
- `docs/tasks/rm-001/rm-001-t005-bootstrap-prototype.md`
- `docs/tasks/rm-001/rm-001-t006-render-fixed-scatter-point.md`
- `docs/tasks/rm-001/rm-001-t007-deploy-minimal-prototype.md`
- `docs/requirements/data-requirements.md`
- `prototypes/rm-001-scatter-pagination/package.json`
- `prototypes/rm-001-scatter-pagination/tsconfig.app.json`
- `prototypes/rm-001-scatter-pagination/src/App.tsx`
- `prototypes/rm-001-scatter-pagination/src/index.css`

## 作成するファイル

- `docs/engineering/README.md`
- `docs/engineering/code-constraints.md`
- `docs/instructions/20260814-rm1-t006-render-fixed-scatter-point.md`

## 更新するファイル

- `docs/README.md`
- `docs/skills/000-workflow.md`
- `docs/ux/timeline-concept.md`
- `docs/tasks/rm-001/rm-001-t006-render-fixed-scatter-point.md`
- `docs/CHANGELOG.md`
- `prototypes/rm-001-scatter-pagination/tsconfig.app.json`
- `prototypes/rm-001-scatter-pagination/src/App.tsx`
- `prototypes/rm-001-scatter-pagination/src/index.css`

T006の完了条件を実機で確認できた場合だけ、次も更新する。

- `docs/tasks/rm-001/rm-001-t007-deploy-minimal-prototype.md`: `Ready`へ進める。
- `docs/roadmap/rm-001-time-axis-pagination-spike.md`: T006を`Completed`、T007を`Ready`へ進める。
- `docs/state.md`: currentをT007、last_completedをT006へ進める。

## 削除するファイル

なし。

## ファイルごとの変更

### `docs/engineering/code-constraints.md`

次の章を持つ共通コード制約の正本を作る。

- 目的・適用範囲
- 型とデータ境界
- 状態とデータ更新
- 日時
- 関数と制御フロー
- React
- 外部ライブラリとの境界
- エラー処理
- 品質確認
- 例外の扱い

議論で確定した全コード制約を反映する。特に、プロジェクト固有概念を明示する命名ルール、コードだけでは判断しにくい意図・境界条件を補うコメントルール、型注釈・`satisfies`・`readonly`の使い分けを含める。`log`を単独の識別子として使わず、EmotionLogなら`emotionLog`、ログ出力器なら`logger`など、対象と役割が読み手に伝わる名前を使用する。

### `docs/skills/000-workflow.md`

コード変更・実装方針・リファクタリング・コードPRレビューでは`docs/engineering/code-constraints.md`を必ず読む運用を追加する。

共通制約本文は各instructionへ複製せず正本を参照する。

### `docs/ux/timeline-concept.md`

散布図のツールバー仕様と軸操作範囲を追加する。

- Box Selectは常に表示しない。
- Lasso Selectは常に表示しない。
- Download as a PNGは自分の散布図だけ表示する。
- 他人の散布図ではDownload as a PNGを表示しない。
- PNGボタンの非表示は画像取得を禁止するセキュリティ機能ではなく、アプリから画像保存機能を提供しないUI仕様として扱う。

T006では自分・他人を判定する所有者ロジックは実装しない。

軸操作範囲として、縦軸は0〜100へ固定し、横軸は現在時刻より未来へ移動できないこと、過去側にも下限を持つことを記録する。過去側の正式値は未決定とし、T006の`1989-01-01T00:00:00+09:00`は検証用の仮値であることを明記する。

### `prototypes/rm-001-scatter-pagination/tsconfig.app.json`

`strict: true`を追加する。

### `prototypes/rm-001-scatter-pagination/src/App.tsx`

placeholderを最小散布図へ置き換える。

固定EmotionLog 3件程度、`VisibleRange`、Plotly境界の型ガード、初期表示範囲の確認表示を実装する。縦軸は`fixedrange`で0〜100へ固定し、横軸は`minallowed`にT006用の仮下限、`maxallowed`にページ読込時点の現在時刻を設定する。初期表示終了が現在時刻より未来の場合は現在時刻で抑える。確認用range表示には見出しを付けない。固定コレクションは、値をreadonlyとして扱う契約が直接読める型注釈を使用する。`log`を単独の変数名・引数名にせず、`emotionLog`など対象が明確な名前を使う。非自明な型ガード・変換関数・T006固有の仮値には、意図や境界が分かる短いコメントを付ける。

PlotlyのmodebarからBox Select（`select2d`）とLasso Select（`lasso2d`）を除外する。Download as a PNGはT006では標準表示のままとし、所有者別の表示切替は実装しない。

### `prototypes/rm-001-scatter-pagination/src/index.css`

散布図と表示範囲確認パネルに必要な最小スタイルへ変更する。

## 変更しない範囲

- T007のデプロイ実装
- ダミーデータの動的取得
- 独自パン処理と`onRelayout`によるパン後の表示範囲更新
- 過去側境界検知
- 追加取得
- 表示位置維持
- 本番技術構成
- 本番API・DB・タイムゾーン保存方式
- 新しいnpm依存
- テスト基盤の新設
- 自分・他人を判定する所有者ロジック
- PNG保存ボタンの所有者別表示切替
- 最終デザイン
- 過去側の正式な下限日時の決定

## 検査

`prototypes/rm-001-scatter-pagination/`で次を実行する。

```bash
npm run lint
npm run build
```

ブラウザで次を確認する。

- 固定絵文字3点程度が表示される。
- 日時差が横位置へ、気分値差が縦位置へ反映される。
- 縦軸が0〜100であり、縦方向へパンまたはZoomできない。
- 横軸を1989年より過去へ移動できない。
- 横軸をページ読込時点の現在時刻より未来へ移動できない。
- 初期表示時間範囲が見出しなしの確認用テキストとして表示される。
- placeholderが残っていない。
- Box Selectがmodebarに表示されない。
- Lasso Selectがmodebarに表示されない。
- 実行時エラーがない。
- `log`など別の意味へ解釈できる名前を避け、`emotionLog`、`logger`、`debugMessage`など対象と役割が分かる命名になっている。
- 型注釈、`satisfies`、`readonly`が、それぞれ変数の契約・構造検査・変更不可性という意図に沿って使い分けられている。
- 非自明な関数や外部ライブラリ境界に、意図・前提・`null`の意味を補うコメントがある。

検査失敗時はT006をCompletedへ進めない。

## Pull Request

- `main`から`feat/rm1-t006-render-fixed-scatter-point`を作成する。
- `main`へ直接変更しない。
- Pull Requestタイトルは`RM1-T006: 固定点を使った最小散布図を表示する`とする。
- Pull Request本文は日本語で書く。
- 実行した検査と結果、対象外、共通コード制約からの例外有無を記載する。

## 完了報告

- 作成・更新・削除したファイル
- `npm run lint`の結果
- `npm run build`の結果
- ブラウザ確認結果
- T006の完了条件を満たしたか
- 共通コード制約からの例外
- 判断できず変更しなかった事項
- Pull Request URL
