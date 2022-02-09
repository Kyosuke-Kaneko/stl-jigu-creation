<template>
    <div class="preview-item">
      <img
        v-show="imageData"
        class="preview-item-file"
        :src="uploadedImage"
        alt=""
      />
      <div v-show="imageData" class="preview-item-btn" @click="remove">
        <p class="preview-item-name">{{ imgName }}</p>
        CLOSE
      </div>
    </div>
</template>
<script>
export default {
  name: 'previewImage',
  props: ['uploadedImage', 'imgName'],
  data() {
    return {
      imageData: "",
    }
  },
  methods: {
    remove() {
      // this.uploadedImage = false;
      this.imageData = false;
      console.log("remove")
      this.$emit('removeImage')
    },
  },
  computed:{
    uploadedImage:function () {
      return this.imageData = this.uploadedImage;
    }
  }
}
</script>
<style scoped>

</style>