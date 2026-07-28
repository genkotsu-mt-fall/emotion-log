# state更新ハンドラー

- `010-project-state-model.md`のschema_version 3に従う
- 現在地とポインターだけを記録し、議論本文を重複させない
- `active_work`、`pending`、`return_stack`、`next_action`を実変更と一致させる
- 分岐時は元作業をreturn stackへ積む
- 復帰時は末尾一件だけを戻す
- 存在しないファイルを参照しない
- 人間承認前にDone、Applied、verifiedへ進めない
