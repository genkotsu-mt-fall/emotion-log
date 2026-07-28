# 240: 適用済み文書変更をレビューする

## 目的

統合instructionと実際のリポジトリ差分を照合し、議論の結論が漏れなく正しく反映されたか確認する。

## 読むもの

- 対象instruction
- 変更差分
- 作成・更新・削除されたファイル
- 関連する正本文書、ADR、OQ、変更記録
- `docs/state.md`

## 確認

- 指定された全変更が存在する
- 指定外の意味変更がない
- 採番、リンク、ステータスが正しい
- 一つのADRまたはOQに複数の独立判断を詰めていない
- CHANGELOGは実際のベースライン変更だけを記録する
- stateが実際のリポジトリ状態と一致する
- 元作業への復帰情報が保持されている

## 判定

- `Accepted`
- `Accepted after fixes`
- `Rejected`
- `Manual verification required`

修正が文書適用上の局所ミスなら、同じinstructionの修正版または限定的修正指示を作る。新しいプロダクト判断が必要なら議論へ戻す。

Accepted後は`250-advance-or-resume-work.md`へ進む。
