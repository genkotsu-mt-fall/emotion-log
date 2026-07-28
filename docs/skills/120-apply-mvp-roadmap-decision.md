# 120: MVPロードマップ議題の結論を反映準備する

## 入力

- 閉じた一議題のセッションまとめ
- `docs/roadmap/000-mvp-release-plan.md`
- 成果物ルーティング結果

## 目的

承認済みの一結論だけをMVP計画へ反映する変更セットへ変換する。

## 手順

1. 結論と未承認提案を分離する
2. MVP計画で変更する箇所を特定する
3. OQ、ADR候補、正本文書、CHANGELOGの要否を再確認する
4. 別判断が必要なら元作業をreturn stackへ積む
5. 変更がある場合は`230-create-application-instruction.md`を組み立て規約として同じ応答内で完成済みinstructionまで作る

## 次状態

- 計画議題が残る: `active_work.stage: discuss`
- 全議題が閉じた: `mvp_plan.status: Ready`、次は`130-finalize-mvp-roadmap-set.md`
- 別判断で中断: `active_work`を新しい判断へ、元のMVP計画を`return_stack`へ

直接ファイルを更新済みとは扱わない。

## ユーザーに見える完了形

この工程を閉じるために、ユーザーへ別途`230`の実行を求めない。変更が必要ならCodexまたはCopilotへそのまま渡せるinstructionを同じ応答で提示する。
