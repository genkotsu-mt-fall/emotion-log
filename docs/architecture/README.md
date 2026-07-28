# アーキテクチャ文書

このフォルダには、システム全体へ継続的に影響する技術判断と、その判断を理解するための文書を置く。

## ADR

- 保存先: `adr/NNNN-short-title.md`
- 一ADR一つの最小技術判断
- 採用済み判断を変更する場合は新しいADRで旧ADRをSupersedeする
- 局所実装、短命で可逆な選択、未決定の比較だけでは作らない

ユーザーがADR専用スキルを選ぶ必要はない。通常の議論を`docs/skills/000-next-action.md`から進め、セッション終了時にChatGPTがADR条件を判定する。

ADR作成品質は`docs/skills/internal/write-adr.md`に従う。ADRと同じ結論が要件、UX、ロードマップ、OQ、CHANGELOGへ影響する場合は、一つの統合instructionで同時に反映する。
