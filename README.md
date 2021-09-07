# CIRCLE GAUGE

丸いゲージです。

↓2秒に7%ずつ増えるサンプルです。
色の変更・サブポイントの追加ができます。

![result](https://github.com/imamamamai21/CircleGauge/blob/master/sumple/circlegauge.gif)

## SKILLS
### フロントエンド
 - React.js 
 - TypeScript
 - Canvas

### サーバー
 - axios

### プロジェクト
 - Create React App


## 環境設定
環境は`REACT_APP_ENVIROMENT`に設定しています
`env/`ディレクトリの中に各設定用のファイルが書かれており、それをbuild時にコピーし`.env`ファイルを作っています。
設定変更は`env/`ディレクトリ配下の各設定ファイルに書いてください。


## ディレクトリ
- env : 環境設定用ファイルが入っています
- export : index.htmlなどを自動で作成したものが入ります
- public : ベースとなるindex.htmlが入っています
- src
  - actions    : 通信系関数
  - common     : 共通系のコード
  - components : 見た目のcomponent
  - static     : 画像ファイルなど


## Local立ち上げ

### 実行
```
//　初回はライブラリinstall
npm install

// 空いている環境を立ち上げます
npm run dev
```

## htmlの書き出し方法
環境を変えてそれぞれ書き出してください。
`buildXXX/`ディレクトリにか完成htmlをつっこんでいます。
以下実行で `ディレクトリと各種ファイル`と`zip`ファイルを作成します。

```
npm run build-prd // 本番
or
npm run build-dev // Dev環境用
or
npm run build-pre // Pre環境用

```
※`export/`ディレクトリは`gitignore`に含まれております。　

## Alias設定
`./src`を登録しています。

```
// 例`./src/hoge/Hoge.tsx`にアクセス
import Hoge from 'hoge/Hoge'
```

↓設定ファイル
./tsconfig.json
