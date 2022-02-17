<template>
  <div id="container">
    <p>STLCanvas</p>
    <label>
      <input type="file" name="files[]" ref="file_input" @change="sendSTL" multiple>
      <!-- <span>ファイルを選択</span> -->
    </label>
    <canvas id="threeCanvas" class="my_canvas_design"></canvas>
  </div>
</template>

<script>
// メソッドのインポート
import { sceneManagerDesign } from "../components/sceneManger/index";


export default {
  name: "STLCanvas",
  props: ['uploadedSTL'],
  data() {
    return {
      cube: null,
      renderer: null,
      scene: null,
      camera: null,
      raycaster: null,
      mouse: null,
      controls: null,
      light: null,
    };
  },
  methods: {
    sendSTL(e) {
      const files = e.target.files[0] || e.dataTransfer.files[0];
      // console.log(files);
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        // ArrayBuffer バイト配列
        const newObjText = reader.result;
        // console.log(newObjText);
        // Blobオブジェクトに変換
        const newBlob = new Blob([newObjText], {
          type: "text/plan",
        });
        // console.log(newBlob);
        // 作成したBlobオブジェクトを参照するためのURlを作成
        const objText = URL.createObjectURL(newBlob);
        // console.log(objText);
        // await this.init(objText);
        await sceneManagerDesign(objText);
      });
      if (files) {
        reader.readAsArrayBuffer(files);
        // console.log(files);
      }
    },
  },
  mounted() {
    // console.log(this.scene);
  },
};
</script>
<style scoped>
#continer {
  width: 100vw;
  height: 100vh;
}
#threeCanvas {
  width: 100%;
  height: 100%;
}
</style>