# GitHub Copilot instruction: RM1-T009 分割取得モックとHuman-led実行導線を追加する

## 目的

`main`ブランチを基準に、RM1-T009「分割取得モックを作る」の確定内容を実装する。

あわせて、`docs/aidd/evolution-strategy.md`に沿って、現在のAIDDフェーズを`docs/state.md`へ明示し、Human-led AIDDで議論終了後にChatGPTが変更ファイルとローカル反映手順まで生成する入口を`docs/skills/README.md`へ最小限追加する。

T009完了後はRM1-T010を`Ready`へ進める。

## 確定した内容

### RM1-T009

- T008の正本16件をTypeScriptで一度だけ定義する。
- 正本配列はexportしない。
- 各取得シナリオは返却対象IDを定義し、IDから正本を参照する。
- `fetchInitialEmotionLogs()`をexportする。
- `fetchEarlierEmotionLogs(toExclusive)`をexportする。
- モック内部に現在ページなどの可変ページstateを持たせない。
- 正常取得では固定1000ms待つ。
- 未定義の`toExclusive`は1000ms待たずErrorでrejectする。
- レスポンスは`items / range / hasEarlier`を持つ。
- 初期・追加1・追加2・追加3の件数は5 / 5 / 5 / 4とする。
- `log-005`、`log-009`、`log-013`を取得境界で意図的に再掲載する。
- 延べ受信件数は19件とする。
- IDで集計した期待ユニーク累計は`5 → 9 → 13 → 16`とする。
- `2026-04-18T00:00:00+09:00`よりさらに過去の取得では、`2026-03-19T00:00:00+09:00`〜`2026-04-18T00:00:00+09:00`をrangeとして0件、`hasEarlier=false`を返す。
- Vitestを導入し、fake timerで1000ms遅延を検査する。
- T009では`App.tsx`へモックを接続しない。
- T014のID統合処理を実装しない。
- 本番API、正式カーソル、正式取得期間を決定しない。

### AIDD最小更新

- `docs/state.md`に`aidd.phase: human-led`を追加する。
- `docs/state.md`から`docs/aidd/evolution-strategy.md`と`docs/skills/README.md`へ到達できるようにする。
- プロジェクトの`phase: planning`は維持し、AIDDフェーズとは別軸で扱う。
- `docs/aidd/evolution-strategy.md`では現在フェーズの正本を`docs/state.md`へ一本化する。
- `docs/skills/README.md`の「最初の依頼」は変更しない。
- 議論終了の合図は`この内容で進める`とする。
- Human-led AIDDでは、Copilot instructionだけで停止せず、変更ZIP、Copilot instructionファイル、Draft PRまでのローカル作業コマンドを生成する。
- ローカル作業コマンドは巨大なhelperファイルへまとめず、人間がdry-runなどの途中結果を確認できる単位でチャット上に分割する。
- 過去の`apply-emotion-log-update.sh`で成立した流れを参考テンプレートとするが、script本体を正本化・毎回生成しない。
- Windows、WSL、Downloadsなどの具体的なパスは恒久ルールへ固定しない。
- `docs/skills/000-workflow.md`、`docs/workflow.md`、`AGENTS.md`は変更しない。

## 参照ファイル

- `docs/skills/000-workflow.md`
- `docs/skills/README.md`
- `docs/state.md`
- `docs/aidd/evolution-strategy.md`
- `docs/engineering/code-constraints.md`
- `docs/roadmap/rm-001-time-axis-pagination-spike.md`
- `docs/tasks/rm-001/rm-001-t008-design-dummy-data.md`
- `docs/tasks/rm-001/rm-001-t009-build-paged-data-mock.md`
- `docs/tasks/rm-001/rm-001-t010-render-initial-data.md`
- `docs/ux/data-loading.md`
- `docs/CHANGELOG.md`
- `docs/instructions/README.md`
- `docs/templates/copilot-instruction.md`
- `prototypes/rm-001-scatter-pagination/package.json`
- `prototypes/rm-001-scatter-pagination/package-lock.json`

## 作成するファイル

- `prototypes/rm-001-scatter-pagination/src/rm1PagedDataMock.ts`
- `prototypes/rm-001-scatter-pagination/src/rm1PagedDataMock.test.ts`
- `docs/instructions/20260815-rm1-t009-build-paged-data-mock.md`

## 更新するファイル

- `prototypes/rm-001-scatter-pagination/package.json`
- `prototypes/rm-001-scatter-pagination/package-lock.json`
- `docs/tasks/rm-001/rm-001-t009-build-paged-data-mock.md`
- `docs/tasks/rm-001/rm-001-t010-render-initial-data.md`
- `docs/roadmap/rm-001-time-axis-pagination-spike.md`
- `docs/state.md`
- `docs/aidd/evolution-strategy.md`
- `docs/skills/README.md`
- `docs/CHANGELOG.md`

## 削除するファイル

なし。

## ファイルごとの変更

### `rm1PagedDataMock.ts`

RM1用の型と固定16件、取得シナリオ、初期取得・過去取得関数を実装する。

通常範囲はT008と同じ半開区間の考え方を維持するが、境界重複3件は時間範囲の自然な重複ではなく、ID統合検証用の意図的な再掲載として扱う。

### `rm1PagedDataMock.test.ts`

Vitestのfake timerを使い、次を検査する。

- 初期取得
- 追加取得1〜3
- 最古より過去
- 延べ19件
- ユニーク累計`5 → 9 → 13 → 16`
- 未定義境界の即時reject
- 999msでは未完了、1000msで完了

### `package.json` / `package-lock.json`

- `"test": "vitest run"`を追加する。
- Vitest 4.1.10をdevDependencyへ追加する。
- `package-lock.json`はnpmの依存解決結果として更新する。

### T009 / T010 / roadmap / state

- T009をCompletedとする。
- T010をReadyとする。
- `state.md`のcurrentをT010、last_completedをT009とする。
- T009の要点だけをroadmapとstateへ記録し、固定16件の明細は複製しない。

### AIDD文書

- `state.md`へ現在のAIDDフェーズを追加する。
- `evolution-strategy.md`から「現在はHuman-led」という重複した現在値を外し、現在値は`state.md`参照とする。
- `skills/README.md`へHuman-ledの実行用成果物とローカル反映テンプレートを追加する。
- 最初の依頼文は変更しない。
- `000-workflow.md`は変更しない。

## 変更しない範囲

- `prototypes/rm-001-scatter-pagination/src/App.tsx`
- `prototypes/rm-001-scatter-pagination/src/main.tsx`
- `prototypes/rm-001-scatter-pagination/src/index.css`
- `docs/skills/000-workflow.md`
- `docs/workflow.md`
- `docs/README.md`
- `AGENTS.md`
- `docs/decisions/open-questions.md`
- `docs/ux/data-loading.md`
- RM1-T008
- T010の実装
- 本番API、正式カーソル、正式取得期間
- 恒久helper、Skill、CIの追加

## 検査

`prototypes/rm-001-scatter-pagination/`で次を実行する。

```bash
npm run test
npm run lint
npm run build
```

リポジトリルートで次を実行する。

```bash
git diff --check
```

さらに次を確認する。

1. 正本が`log-001`〜`log-016`の16件である。
2. T008の各値と一致する。
3. 取得件数が5 / 5 / 5 / 4である。
4. 延べ件数が19である。
5. 境界重複が`log-005`、`log-009`、`log-013`である。
6. ユニーク累計が`5 → 9 → 13 → 16`である。
7. 最古より過去で0件・`hasEarlier=false`になる。
8. 未定義境界が1000ms待たずrejectする。
9. 正常取得だけ1000ms遅延する。
10. `App.tsx`にモック接続がない。
11. T014のID統合処理がない。
12. T009=Completed、T010=Ready、`state.md` current=T010が一致する。
13. `state.md`のAIDDフェーズが`human-led`である。
14. `docs/skills/000-workflow.md`、`docs/workflow.md`、`AGENTS.md`に差分がない。

Plotly.jsの既存bundle-size warningが出る場合、それだけをT009失敗とはしない。ただし実際に出たwarningはPull Requestへ記録する。

## Pull Request

- `main`から`feat/rm1-t009-build-paged-data-mock`を作成する。
- `main`へ直接変更しない。
- Pull Requestタイトルは`RM1-T009: 分割取得モックとHuman-led実行導線を追加する`とする。
- Pull Request本文は日本語で書く。
- Draft Pull Requestとして作成する。
- T009の検査結果とAIDD最小更新の範囲を記載する。
- `docs/skills/000-workflow.md`を変更していないことを記載する。
- 本番APIや正式カーソルを決定していないことを記載する。

## 完了報告

- 作成・更新・削除したファイル
- `npm run test`、`npm run lint`、`npm run build`、`git diff --check`の結果
- 取得件数、延べ件数、ユニーク累計、境界重複の確認結果
- 最古到達・未定義境界・1000ms遅延の確認結果
- T009をCompleted、T010をReadyへ進めたか
- AIDD現在フェーズとHuman-led実行導線を反映したか
- 共通コード制約からの例外有無
- 判断できず変更しなかった事項
- Pull Request URL
