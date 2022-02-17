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
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

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
    init(objText) {
      document.addEventListener("mousemove", this.onMouseMove);
      // window.addEventListener('resize', this.onWindowResize);
      this.mouse = new THREE.Vector2();
      // シーンの作成
      this.scene = new THREE.Scene();

      // カメラの作成
      this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            1000
      );
      this.scene.add(this.camera);
      // 初期位置
      this.camera.position.z = 55;
      this.camera.position.x = 5;
      this.camera.position.y = 5;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });

      // ライトの作成
      this.light = new THREE.DirectionalLight('hsl(0, 100%, 100%)');
      this.scene.add(this.light);
      this.light.position.set(1, 0, 0);
      const lightHelper = new THREE.PointLightHelper(this.light);
      this.scene.add(lightHelper);

      this.scene.background = new THREE.Color(0xb2ffc8);

      // カメラコントロール
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.update();

      // 軸
      const axes = new THREE.AxesHelper(100)
      this.scene.add(axes)

      // ライト2
      let light2 = new THREE.PointLight(0xffffff, 1, 1000);
      light2.position.set(0, 300, 500);
      this.scene.add(light2);

      this.stlLoad(objText);
      this.animate();
    },
    stlLoad(objText) {
      // STLファイル
      let loader = new STLLoader();
      let mesh = new THREE.Object3D();
      
      loader.load(objText, (geometory) => {
        console.log(geometory);
        let material = new THREE.MeshLambertMaterial({
            color: 0xff5533,
            metalness: 0.25,
            roughness: 0.1,
            clearcoatRoughness: 0.25
        });
        mesh = new THREE.Mesh(geometory, material);
        this.scene.add(mesh);

        mesh.position.set(0, 0, 0);
      });
      document.getElementById("container").appendChild(this.renderer.domElement);
      this.renderer.setSize(window.innerWidth , window.innerHeight);
      this.renderer.render(this.scene, this.camera);
      // this.onWindowResize();
    },
    animate() {
      requestAnimationFrame(this.animate);
      // カメラ調整
      this.renderer.render(this.scene, this.camera);
    },
    onMouseMove(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    onWindowResize() {
      console.log(this.scene);
      // レンダラーのサイズを調整する
      let width = window.innerWidth;
      let height = window.innerheight;
      this.renderer.setSize(width, height);
      this.camera.aspect = window / height;
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
    },
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
        console.log(newBlob);
        // 作成したBlobオブジェクトを参照するためのURlを作成
        const objText = URL.createObjectURL(newBlob);
        // console.log(objText);
        await this.init(objText);
      });
      if (files) {
        reader.readAsArrayBuffer(files);
        // console.log(files);
      }
    },
  },
  mounted() {
    console.log(this.scene);
  },
};
</script>