# 2020-05-18/Mon

## 目次

<!-- vim-markdown-toc GFM -->

- [file-loader の出力パスを指定したときに build.watch がループするのを止めたい](#file-loader-出力指定-buildwatch-止)
  - [build.watch はなぜループするか](#buildwatch-)
  - [妥協](#妥協)
- [プロパティ記述順序](#記述順序)
- [CSScomb](#csscomb)
  - [導入](#導入)
  - [使ってみる](#使)
- [main タグについて](#main-)

<!-- vim-markdown-toc -->

## file-loader の出力パスを指定したときに build.watch がループするのを止めたい

出力パスは `./images/[name].[ext]` としたい。

以下のようにすると、ビルドに成功するものの build.watch がループする。

```js
// webpack.config.js
{
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      }
    },
  ]
}
```

### build.watch はなぜループするか

build.watch コマンドは、`webpack --watch` である。

```json
// package.json
"build.watch": "webpack --mode=development --watch"
```

webpack についていろいろ調べてみたが、なぜループが起こっているのか、全くわからなかった。

- [webpack sass file-loader のサンプル](https://github.com/ics-creative/170330_webpack/tree/master/tutorial-sass-image-file)
- [Watch and WatchOptions | webpack](https://webpack.js.org/configuration/watch/)
- [file-loader | webpack](https://webpack.js.org/loaders/file-loader/)

### 妥協

画像ファイルを `images/` フォルダに入れるのを諦めると、ループが止まり watch がうまくいくようになった。

```js
{
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      }
    },
  ]
}
```

## プロパティ記述順序

- [この記事](https://qiita.com/mgn/items/6154ccd2e23b2e65c769) を参考に行う。

順番

1. 視覚整形モデル
2. ボックスモデル
3. 背景
4. フォントとテキスト、色
5. 表
6. Flexible Box
7. 生成内容・ユーザーインターフェース
8. アニメーション
9. その他

しかし、プロパティ記述順序は一般的にどうするのが良いと言われているのだろうか？

[この記事](https://qiita.com/yamanoku/items/9d10af70eb5b3f483146)より、

- アルファベット順: 意味を知っていなくてもやりやすく、維持しやすい。一方で、関連のあるプロパティ同士 (position と top, left など) が離れてしまう。[google](https://google.github.io/styleguide/htmlcssguide.html#CSS_Style_Rules) はこれを採用している。
- Mozilla や W3C で使われている CSS ガイドラインの順（上のやつ）

[CSScomb](https://www.npmjs.com/package/csscomb) というやつが自動でしてくれるらしい。すべてを修正するのは面倒なので、今回はこれを利用する。

## CSScomb

### 導入

```sh
% npm install csscomb --save-dev
// https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json
% vim .csscomb.json
```

- [CSScomb 公式](https://www.npmjs.com/package/csscomb)
- [csscomb + webpack の設定](https://tsudoi.org/weblog/4607/)
- [scss ファイルを自動修正する](https://www.d-wood.com/blog/2016/03/30_7866.html)

### 使ってみる

まずは `main.scss` だけに使用した。

```sh
% node_modules/.bin/csscomb stylesheets/main.scss
```

プロパティの記述順序が変わったので、成功してそう。

そして、全ての .scss ファイルに対して使用した。

```sh
% node_modules/.bin/csscomb stylesheets/**/*.scss
```

## main タグについて

```html
<div class="main-container">
  <div class="content-container">
    <div class="main-content-container">
      <div class="main-content">
```

この `main-container` は `main` タグで置き換えた方がよい。

`<main>` は、文書の `<body>` の主要な内容を表す。

- [`<main>` - HTML](https://developer.mozilla.org/ja/docs/Web/HTML/Element/main)
- https://creive.me/archives/8814/

同様に `<article>` を利用したい。
