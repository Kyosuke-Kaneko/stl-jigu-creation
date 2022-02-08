<template>
  <div class="contents">
    <label v-show="!uploadedImage" class="input-item__label">STLファイルを選択
      <input type="file" @change="uploadSTL" />
    </label>
    <div class="preview-item">
      <img
        v-show="uploadedImage"
        class="preview-item-file"
        :src="uploadedImage"
        alt=""
      />
      <div v-show="uploadedImage" class="preview-item-btn" @click="remove">
        <p class="preview-item-name">{{ img_name }}</p>
        CLOSE
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      uploadedImage: '',
      img_name: '',
    };
  },
  methods: {
    uploadSTL(e) {
      const files = e.target.files || e.dataTransfer.files;
      console.log(files);
      this.createImage(files[0]);
      this.img_name = files[0].name;
    },
    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    remove() {
      this.uploadedImage = false;
    },
  },
};
</script>