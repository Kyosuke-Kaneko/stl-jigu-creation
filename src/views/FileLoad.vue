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
      this.createImage(files[0]);
      this.imgName = files[0].name;
      // アップロードファイル名
      localStorage.setItem('name', file[0].name)
    },
    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        const newObj = reader.result;
        this.uploadedfile = e.target.result;
        // ファイルのデータURI
        localStorage.setItem('uri',  this.uploadedfile);
        const newBlob = new Blob([newObj], {
              type: "text/plan",
        });
        this.objText = URL.createObjectURL(newBlob);
        // console.log(this.objText); 
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