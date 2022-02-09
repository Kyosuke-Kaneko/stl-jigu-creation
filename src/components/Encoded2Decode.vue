<script>
// エンコードするやつ
export default {
  methods: {
    uploadSTL(e) {
      const files = e.target.files || e.dataTransfer.files;
      localStorage.setItem('name', files[0].name)
      this.createImage(files[0]);
      this.imgName = files[0].name;
      // アップロードファイル名
    },
    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        const newObj = reader.result;
        // ファイルのデータURI
        this.uploadedfile = e.target.result;
        localStorage.setItem('uri',  this.uploadedfile);
        // localStorage.setItem('bytes',bytes);
        const newBlob = new Blob([newObj], {
              type: "text/plan",
        });
        // 引数のオブジェクトからURLを作成。DOM（this.uploadedfile = e.target.result）と結びつく
        this.objText = URL.createObjectURL(newBlob);
        console.log(file)
        // ページ遷移
        // this.$router.push({name: 'STLCanvas'});
      };
      // ファイルを、Data URIとして読み込む
      reader.readAsDataURL(file);
      // ファイル種別
      localStorage.setItem('type', file.type);
      
    },
  }
}
</script>
<script>
// デコードするやつ
    // この変数にアップロードファイルの情報を復元することにする
    let file = null
    // この変数にアップロードファイルをデータURI化した情報を復元することにする
    let dataUri  = localStorage.getItem('dataUri');
    // デコードするためにbytesを呼ぶ
    // バイナリに変換
    let binary = window.atob( dataUri.split( "," )[1] ) ;
    let bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
    }

    // let bytes =localStorage.getItem('bytes')
    file = new Blob([bytes], {
        type: localStorage.getItem('type'),
    })
    file.name = localStorage.getItem('name')
    console.log(file);
</script>