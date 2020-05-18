# 2020-05-18/Mon

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
