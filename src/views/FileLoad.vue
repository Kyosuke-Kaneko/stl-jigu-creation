<template>
  <div class="contents">
    <!-- <form action="/generate" method="post" enctype="multipart/form-data" ref="form"> -->
      <label v-on:removeImage="removeImage" v-show="!uploadedfile" class="input-item__label">STLファイルを選択
        <input type="file" @change="uploadSTL" />
      </label>
    <!-- </form> -->
    <!-- <PreviewImage :uploadedfile="this.uploadedfile" :imgName="this.imgName"></PreviewImage> -->
  </div>
</template>

<script>
// import PreviewImage from "../components/PreviewImage"
export default {
  data() {
    return {
      uploadedfile: '',
      imgName: '',
      objText: ''
    };
  },
  components: { 
    // eslint-disable 
    // PreviewImage,
    // eslint-disable
    },
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
        console.log(newObj);
        // ファイルのデータURI
        this.uploadedfile = e.target.result;
        // console.log(this.uploadedfile)
        localStorage.setItem('dataUri',  this.uploadedfile);
        // localStorage.setItem('bytes',bytes);
        const newBlob = new Blob([newObj], {
              type: "text/plan",
        });
        // クライアント(ブラウザ) のメモリに保存された blobに アクセス可能な一意のURLを生成。DOM（this.uploadedfile = e.target.result）と結びつく
        this.objText = URL.createObjectURL(newBlob);
        localStorage.setItem('blobUri',  this.objText);
        // console.log(this.objText)
        // ページ遷移
        // this.$router.push({name: 'STLCanvas'});
      };
      // ファイルを、Data URIとして読み込む
      reader.readAsDataURL(file);
      // ファイル種別
      localStorage.setItem('type', file.type);
      
    },
    removeImage() {
      console.log("start")
      // false
      this.uploadedfile = false;
    }
  },
};
</script>