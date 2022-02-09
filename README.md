<img src="https://img.shields.io/badge/Javascript-276DC3.svg?logo=javascript&style=plastic">
<img src="https://img.shields.io/badge/-Vue.js-4FC08D.svg?logo=vue.js&style=plastic">
<img src="https://img.shields.io/badge/-Three.js-000000.svg?logo=three.js&style=plastic">


# stl-jigu-creation

# 概要

## 環境構築
```
yarn install
```

### ローカルサーバーの立ち上げ
```
yarn serve
```

### ビルド
```
yarn build
```
## 各ファイル・パスの説明
### トップページ<br>
パス
```
/
```
デフォルトのままです。

### sampleページ
パス
```
/sample
```
最初にVueで生成するThree.jsとしてサンプルの検証をしてました。<br>
参考サイト↓
[https://codesandbox.io/s/9y3n2r8wv4?file=/src/components/TheCanvas.vue](https://codesandbox.io/s/9y3n2r8wv4?file=/src/components/TheCanvas.vue)

### aboutページ
パス
```
/about
```

`STLThree.vue` というコンポーネントを読み込んでます。<br>
`public` フォルダに配置した `stl` ファイルを読み込んで検証してました。
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### その他参考サイト
[https://sbcode.net/threejs/loaders-stl/](https://sbcode.net/threejs/loaders-stl/)
[https://gupuru.hatenablog.jp/entry/2013/12/25/214357](https://gupuru.hatenablog.jp/entry/2013/12/25/214357)