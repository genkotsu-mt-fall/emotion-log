# GitHub Copilot instruction: RM1-T008 ダミーデータの条件を設計する

## 目的

`main`ブランチを基準に、RM1-T008「ダミーデータの条件を設計する」の議論で確定した内容をリポジトリへ反映する。

RM 1で、初期取得と過去方向への3回の追加取得、取得境界での重複、同一日時の異なるログ、最古データ到達を再現できる固定ダミーデータ条件を文書化する。

T008では設計だけを確定する。ダミーデータのソースコード実装と分割取得モックの実装は行わない。それらは次のRM1-T009で扱う。

T008完了後はRM1-T009を`Ready`へ進める。

## 確定した内容

- RM1-T008では、ダミーログの項目、固定基準日、30日×4取得単位、正本16件、各取得レスポンス、境界重複3件、同一日時・同一気分値の異なるID、最古ログ、統合後期待件数を設計として固定する。
- RM1-T009では、T008の設計を入力として固定ダミーデータ、初期取得モック、追加取得モック、通信遅延、最古到達をソースコードへ実装する。
- T008では`prototypes/`以下を変更しない。
- 固定基準日は`2026-08-15`とする。
- 日時はRM 1内で同じ結果を再現するため`+09:00`を明記したISO 8601形式で記録する。これは正式な日時保存・タイムゾーン仕様ではない。
- 取得単位は、初期`2026-07-17T00:00:00+09:00`〜`2026-08-16T00:00:00+09:00`、追加1`2026-06-17T00:00:00+09:00`〜`2026-07-17T00:00:00+09:00`、追加2`2026-05-18T00:00:00+09:00`〜`2026-06-17T00:00:00+09:00`、追加3`2026-04-18T00:00:00+09:00`〜`2026-05-18T00:00:00+09:00`とする。
- RM 1の各取得単位の通常の時間範囲は`from <= feltAt < to`の半開区間として扱い、隣接する取得単位の時間範囲自体は重複させない。
- `log-005`、`log-009`、`log-013`の再掲載は時間範囲の重複によるものではなく、クライアント側のID統合を検証するために既取得ログを意図的に追加するテスト条件とする。
- 正本は`log-001`〜`log-016`の16件とし、同じIDの正本レコードは複数作らない。
- `log-004`と`log-005`は同じ`feltAt`・同じ`moodValue`だが異なるIDと絵文字を持たせ、同じ座標に重なる別ログを再現する。
- `moodValue=0`を`log-007`、`moodValue=100`を`log-003`で含める。
- `log-016`を最古ログとし、それより過去にはダミーログが存在しないものとする。
- 初期取得は`log-001`〜`log-005`の5件を返す。
- 追加取得1は`log-005`〜`log-009`の5件を返し、`log-005`を境界重複とする。
- 追加取得2は`log-009`〜`log-013`の5件を返し、`log-009`を境界重複とする。
- 追加取得3は`log-013`〜`log-016`の4件を返し、`log-013`を境界重複とする。
- 取得レスポンス延べ件数は19件、境界重複は3件、正本ユニークログは16件とする。
- 各取得後の統合期待件数は`5 → 9 → 13 → 16`とする。
- 30日、固定基準日、固定オフセット、仮ID、境界重複、正本16件、レスポンス延べ19件はすべてRM 1検証用であり正式仕様ではない。

正本16件の値は`docs/tasks/rm-001/rm-001-t008-design-dummy-data.md`の実施結果へ全件記録する。

## 参照ファイル

- `docs/skills/000-workflow.md`
- `docs/state.md`
- `docs/roadmap/rm-001-time-axis-pagination-spike.md`
- `docs/tasks/rm-001/rm-001-t003-define-validation-scenarios.md`
- `docs/tasks/rm-001/rm-001-t008-design-dummy-data.md`
- `docs/tasks/rm-001/rm-001-t009-build-paged-data-mock.md`
- `docs/tasks/rm-001/rm-001-t014-merge-without-duplicates.md`
- `docs/requirements/data-requirements.md`
- `docs/ux/data-loading.md`
- `docs/decisions/open-questions.md`
- `docs/CHANGELOG.md`
- `docs/instructions/README.md`
- `docs/templates/copilot-instruction.md`

## 作成するファイル

- `docs/instructions/20260815-rm1-t008-design-dummy-data.md`

## 更新するファイル

- `docs/tasks/rm-001/rm-001-t008-design-dummy-data.md`
- `docs/roadmap/rm-001-time-axis-pagination-spike.md`
- `docs/tasks/rm-001/rm-001-t009-build-paged-data-mock.md`
- `docs/state.md`
- `docs/CHANGELOG.md`

## 削除するファイル

なし。

## ファイルごとの変更

### `docs/tasks/rm-001/rm-001-t008-design-dummy-data.md`

このファイルをダミーデータ設計詳細の正本とする。状態を`Ready`から`Completed`へ変更し、`## 実施結果`へ固定基準日、4取得単位、半開区間の扱い、正本16件、特殊な検証条件、各取得レスポンス、境界重複3件、延べ19件、期待総件数`5 → 9 → 13 → 16`、最古ログ、本番仕様との境界を記録する。境界重複3件は時間範囲の重複によるものではなく、ID統合検証用の意図的なテスト条件であることを明記する。

### `docs/roadmap/rm-001-time-axis-pagination-spike.md`

RM1-T008を`Completed`、RM1-T009を`Ready`へ変更する。検証条件付近に、固定基準日、正本16件、延べ19件、境界重複3件、期待件数`5 → 9 → 13 → 16`の要約を追加し、詳細はT008を参照させる。16件の明細は複製しない。

### `docs/tasks/rm-001/rm-001-t009-build-paged-data-mock.md`

状態を`Pending`から`Ready`へ変更する。参照文書の「RM1-T008の成果物」を`[RM1-T008](rm-001-t008-design-dummy-data.md)`へ変更する。T008の詳細を複製しない。

### `docs/state.md`

Pull Requestマージ後の状態として、`current`をRM1-T009、`last_completed`をRM1-T008へ進める。T008完了内容は、120日を30日×4取得単位、正本16件、延べ19件、境界重複3件、期待件数`5 → 9 → 13 → 16`、最古ログという要点だけ記載する。`Next`はT009の分割取得モック実装とする。

### `docs/CHANGELOG.md`

`Unreleased`へ、T008完了・T009 Ready化、30日×4取得単位、正本16件、境界重複3件、延べ19件、期待件数`5 → 9 → 13 → 16`、すべてRM 1検証用であることを追加する。16件の明細は複製しない。

### `docs/instructions/20260815-rm1-t008-design-dummy-data.md`

このinstructionの内容を保存する。

## 変更しない範囲

- `prototypes/rm-001-scatter-pagination/`以下の全ソースコード
- ダミーデータのTypeScript実装
- 分割取得モック関数
- 通信遅延の実装
- 最古到達の返却型
- 本番API仕様
- 正式カーソル形式
- 正式な取得期間
- 正式な初期表示期間
- 正式な日時保存・タイムゾーン方式
- 正式な第2ソートキー
- `docs/decisions/open-questions.md`
- `docs/ux/data-loading.md`
- `docs/requirements/data-requirements.md`
- `docs/tasks/rm-001/rm-001-t003-define-validation-scenarios.md`

今回のT008設計によってOQ-056やOQ-057をResolvedにしない。

## 検査

コード変更は行わないため、`npm run lint`や`npm run build`をT008完了条件として要求しない。

次を確認する。

1. `git diff --check`が成功する。
2. 更新したMarkdownの相対リンク先が存在する。
3. T008の正本データが16件であり、IDが`log-001`から`log-016`まで重複なく存在する。
4. 取得レスポンス件数が5、5、5、4で合計19件になる。
5. 重複IDが`log-005`、`log-009`、`log-013`の3件である。
6. 統合期待件数が`5 → 9 → 13 → 16`になる。
7. `log-004`と`log-005`の`feltAt`と`moodValue`が同じで、IDが異なる。
8. `log-016`が最古ログとして明記されている。
9. T008がCompleted、T009がReadyで、ロードマップ・各タスク・`state.md`の状態が一致している。
10. `state.md`がPull Requestマージ後の状態を表している。
11. `prototypes/`以下に差分がない。
12. `open-questions.md`、`data-loading.md`、`data-requirements.md`、T003に差分がない。

## Pull Request

- `main`から`docs/rm1-t008-design-dummy-data`ブランチを作成する。
- `main`へ直接変更しない。
- 変更をcommitしてpushする。
- Pull Requestを作成する。
- Pull Requestタイトルは`RM1-T008: ダミーデータの条件を設計する`とする。
- Pull Request本文は日本語で書く。
- 実行した検査と結果を記載する。
- ソースコードを変更していないことを記載する。
- 30日、固定基準日、16件、境界重複はRM 1検証用であり正式仕様ではないことを記載する。
- 対象外としてT009のモック実装を行っていないことを記載する。

## 完了報告

- 作成したファイル
- 更新したファイル
- 削除したファイル
- `git diff --check`の結果
- Markdownリンク確認結果
- ダミーデータ件数・重複件数・期待累計の確認結果
- T008をCompletedへ進めたか
- T009をReadyへ進めたか
- ソースコードに差分がないこと
- 判断できず変更しなかった事項
- Pull Request URL
