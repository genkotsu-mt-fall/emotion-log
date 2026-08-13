# RM1-T005: ローカルで試作品の土台を起動する

- 状態: Completed
- ロードマップ: [docs/roadmap/rm-001-time-axis-pagination-spike.md](../../roadmap/rm-001-time-axis-pagination-spike.md)
- 依存タスク: RM1-T004

## 目的

T004で仮採用した構成を使い、Docker + Dev Containerで再現可能なローカル開発環境と、後続検証を開始できる最小の試作品の土台を作る。

## 前提

T004で次を仮採用済みとする。

- フロントエンド: React + TypeScript + Vite
- パッケージ管理: npm
- 散布図: Plotly.js + react-plotly.js
- 状態管理: Reactローカルstate
- 分割取得と通信遅延の再現: 非同期ローカルモック
- 試作品の配置先: `prototypes/rm-001-scatter-pagination/`

この構成はRM 1の検証用であり、正式採用ではない。

## 対象

- Docker + VS Code Dev ContainersによるRM 1専用の開発環境
- React + TypeScript + Viteによる最小のフロントエンド構成
- npmによる依存管理
- ローカル起動コマンド
- 散布図を置く最小画面
- lintとビルド確認
- 開発コンテナの最小権限方針

## 対象外

- 散布図の描画
- 固定点や絵文字点の描画
- ダミーデータの用意
- 分割取得モックの実装
- パン操作
- デプロイ
- Docker Compose
- Docker-in-Docker
- 本番用Docker構成
- 正式なフロントエンド構成の決定

## 参照文書

- [RM1ロードマップ](../../roadmap/rm-001-time-axis-pagination-spike.md)
- [RM1-T004](./rm-001-t004-select-provisional-stack.md)

## 変更対象

- `prototypes/rm-001-scatter-pagination/`
- `.gitignore`
- 本タスク、ロードマップ、`docs/state.md`、`docs/CHANGELOG.md`

## 実装内容

### Dev Container

Dev ContainerはRM 1の試作品へ閉じ込めるため、次へ配置する。

- `prototypes/rm-001-scatter-pagination/.devcontainer/devcontainer.json`
- `prototypes/rm-001-scatter-pagination/.devcontainer/Dockerfile`

Dockerfileを必須とし、Docker Composeは使用しない。

### Node.jsとOS

- Node.jsはT005実施時点の最新LTSメジャーを使用する
- ベースイメージはNode.js Docker Official Imageを使用する
- Debian stable系のslimイメージを使用する
- Alpineは使用しない
- T005実施時点では`node:24-trixie-slim`を使用する
- `node:lts-*`のように将来メジャーまで自動的に変わるタグは使用しない
- digest固定はRM 1では行わない

### 開発ユーザー

Dockerfileの構築時に必要な処理はrootで行う。

通常の開発はNode.js公式イメージに存在する`node`ユーザーで行い、独自ユーザーは作成しない。

`devcontainer.json`の`remoteUser`も`node`とする。

### 最小権限とセキュリティ

- `privileged: true`を設定しない
- Docker socketをコンテナへmountしない
- 通常開発をrootで実行しない
- secret、APIキー、tokenをイメージやDev Container設定へ埋め込まない
- OSパッケージは必要最小限にする
- OSパッケージ追加では`--no-install-recommends`を使い、APTのlistを削除する
- 権限不足が発生しても、まず必要な最小権限を確認し、安易にprivilegedを有効化しない

### VS Code拡張機能

Dev Containerへ自動追加する拡張機能は最小限とする。

T005ではOxcのVS Code拡張だけを追加する。

- `oxc.oxc-vscode`

TypeScript追加拡張、Prettier、GitLens、Docker拡張などは追加しない。

### React + TypeScript + Vite

実施時点のVite公式`react-ts`テンプレートを基準にする。

各依存を個別に無理やり最新版へ上書きせず、Vite公式テンプレートが採用している組み合わせを優先する。

T005実施時点の基準は次の通り。

- React: `^19.2.8`
- React DOM: `^19.2.8`
- TypeScript: `~6.0.2`
- Vite: `^8.2.0`
- `@vitejs/plugin-react`: `^6.0.5`
- Oxlint: `^1.76.0`

Plotly関連はT004の仮採用を依存関係へ反映する。

- Plotly.js: `^3.7.0`
- react-plotly.js: `^4.1.0`

Plotlyを使った描画はT006で行う。

正確な解決結果は`package.json`と`package-lock.json`へ残す。

### Vite開発サーバー

Dev Container内のViteは次の条件で起動する。

- host: `127.0.0.1`
- port: `5173`
- strictPort: `true`

Dev Containerでは`forwardPorts`で5173をホストへ転送する。

Viteを`0.0.0.0`では待ち受けさせず、Dockerのport publishも使用しない。

Windowsホストから`http://localhost:5173/`で最小画面を開けることを確認した。

### 最小画面

Vite標準のロゴやカウンターは成果物に残さない。

散布図を後から配置するための最小画面だけを用意し、T005ではPlotlyをimportしない。

### `.gitignore`

リポジトリ直下の`gitignore`を`.gitignore`へ修正し、既存のignore内容を保持する。

## エラーと境界条件

- Dockerfileのbuild失敗
- Dev Containerを開けない
- `node`ユーザーでworkspaceへ書き込めない
- 依存パッケージのインストール失敗
- lintエラー
- ビルドエラー
- Viteのポートをホスト側から確認できない

権限エラーが発生した場合も、`privileged`やroot常用で回避しない。

## 実施結果

Dev Containerで次を確認した。

- Dockerfileのbuild: 成功
- 通常ユーザー: `node`
- Node.js 24 LTS系列: 利用可能
- npm: 利用可能
- `npm install`: 成功
- `package-lock.json`: 生成済み
- `npm audit`: 0 vulnerabilities
- `npm run lint`: 0 warnings / 0 errors
- `npm run build`: 成功
- `npm run dev`: 成功
- Vite: `127.0.0.1:5173`で起動
- Windowsホスト: `http://localhost:5173/`から表示成功
- `privileged`: 未使用
- Docker socket mount: 未使用

## 成果物

- Dockerfileを使ったRM 1専用Dev Container
- `node`ユーザーで動作する開発環境
- React + TypeScript + Viteの最小フロントエンド構成
- npmによる依存管理
- `package.json`と`package-lock.json`
- 散布図を置く最小画面
- lint、build、ローカル起動の確認結果
- 正しい名前の`.gitignore`

## 完了条件

- Dev Containerをbuildして`node`ユーザーで開発できる
- `npm install`、`npm run lint`、`npm run build`が成功する
- ポート5173から最小画面を開ける
- Plotlyの描画をT006へ残している
- 最小権限方針を崩す設定を追加していない

すべて確認後にCompletedとする。

## 未決定議題

なし。T005で必要な開発環境方針は確定した。正式な技術採用はRM 2で判断する。

## 変更履歴

| 日付 | 変更内容 |
|---|---|
| 2026-08-13 | Docker + Dev Containerによる開発環境、Node.js最新LTS + Debian stable slim、`node`ユーザー、最小権限方針を反映しCompletedとする |
| 2026-08-10 | T004完了を受け、仮採用構成と配置先を明記してReadyとする |
| 2026-07-31 | Pendingとして作成 |
