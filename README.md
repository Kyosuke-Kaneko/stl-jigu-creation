<div style="display:flex">
  <img src="https://img.shields.io/badge/Javascript-276DC3.svg?logo=javascript&style=plastic"><img src="https://img.shields.io/badge/-Vue.js-4FC08D.svg?logo=vue.js&style=plastic"><img src="https://img.shields.io/badge/-Three.js-000000.svg?logo=three.js&style=plastic">
</div>


# stl-jigu-creation

# 概要

## 環境構築
```
yarn install
or
npm install
```

### ローカルサーバーの立ち上げ
```
yarn serve
or
npm run  serve
```

### ビルド
```
yarn build
or 
npm run build
```
## 各ファイル・パスの説明
試しながら実装したのでファイル、パス名がぐちゃぐちゃなのはご了承ください。

### トップページ(Home.vue)
パス
```
/
```
デフォルトのままです。

### sampleページ(ThreeSample.vue)
パス
```
/sample
```
最初にVueで生成するThree.jsとしてサンプルの検証をしてました。<br>
参考サイト↓<br>
[https://codesandbox.io/s/9y3n2r8wv4?file=/src/components/TheCanvas.vue](https://codesandbox.io/s/9y3n2r8wv4?file=/src/components/TheCanvas.vue)

### aboutページ(About.vue)
パス
```
/about
```

`STLThree.vue` というコンポーネントを読み込んでます。<br>
`public` フォルダに配置した `stl` ファイルを読み込んで検証してました。
（stlファイルはgitignoreに指定しているのでご自身で配置してください。）

### fileページ(FileLoad.vue)
パス
```
/file
```

ファイルのアップロードとプレビュー機能を実装しようとしました。<br>
結局うまくいかなかったので、見る意味はないです。

### stlページ(STLCanvas.vue)
```
/stl
```

inputタグからファイルのアップロードを行えるようにしました。<br>
ファイルの分散を行い、処理の責任を減らしています。Three.jsの細かな設定は少しできました。


### その他参考サイト
[https://sbcode.net/threejs/loaders-stl/](https://sbcode.net/threejs/loaders-stl/)
[https://gupuru.hatenablog.jp/entry/2013/12/25/214357](https://gupuru.hatenablog.jp/entry/2013/12/25/214357)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).