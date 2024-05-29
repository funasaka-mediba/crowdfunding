# 課題リスト
- mongodbからProjectを取得できない。
    - 解決
    - 原因
        - Mongooseモデルを作成する際に、モデル名として"Project"を指定していますが、これはMongooseが自動的に小文字に変換し、複数形にするため、実際のコレクション名はprojectsになります。コレクション名を指定したい場合は、modelメソッドの第三引数としてコレクション名を明示的に指定できます。
        - Projectというコレクションにデータを入れていたが、正しくはprojectsに入れないといけなかった。
        - 間違えやすいので、modelメソッドの第三引数に明示しておこう。

- Projectの取得APIを修正する
    - 解決
    - DBとの接続がうまくいったので、修正しなくても解決。

- プロジェクト詳細ページでプロジェクト詳細取得APIへの無限リクエストが発生してしまう。
    - 解決
    - useEffectに依存配列を追加しないといけない。

- Returnの作り直し

- project.ts、return.tsなどtypescriptなのに型を使用していないので、書き直し。
    - ユニオン型について
        - TypeScriptでは、変数の型を複数の型で構成することができます。これは「ユニオン型」と呼ばれ、|（パイプ）記号を使って複数の型を結合します。IProject | null の意味は、project 変数が IProject 型か null 型のいずれかであることを示しています。

- テストデータを日本語で作成
    - chatgptのおかげで完了

- projectsとreturnsの紐付けが両方にパラメータをもたせていたので、returnsにprojectIDを作成することで紐づけることにした。

- backend起動方法
    - `npm run dev`
    - ログが出る。
    - TypeScriptファイルを編集しても手動ビルドの必要がない。

- frontend起動方法
    - `npm start`
