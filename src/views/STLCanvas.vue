<template>
  <div id="container">
    <p>STLCanvas</p>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// const STL = 'Sample01_ServoHorn01.stl'
// const STL = 'Sample01_ServoHorn01.stl'

  // console.log(uploadedSTL);
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
    init: function () {
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

      this.stlLoad();
        // 通常のマテリアル 
        // ジオメトリの作成
        // const geometry = new THREE.BoxGeometry(1, 1, 1)
        // // マテリアルの作成
        // const material = new THREE.MeshStandardMaterial({
        //     side: THREE.FrontSide,
        //     color: 'hsl(0, 100%, 50%)',
        //     wireframe: false
        // })
        // // メッシュの作成
        // const cube = new THREE.Mesh(geometry, material)
        // cube.position.set(0.5, 0.5, 0.5);
        // this.scene.add(cube)
    },
    stlLoad: function () {
      // STLファイル
      let loader = new STLLoader();
      let mesh = new THREE.Object3D();
      
      loader.load(STL, (geometory) => {
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
    animate: function () {
      requestAnimationFrame(this.animate);
      // カメラ調整
      // console.log(this.camera.position)
      this.renderer.render(this.scene, this.camera);
    },
    onMouseMove: function (event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    onWindowResize: function () {
      console.log(this.scene);
      // レンダラーのサイズを調整する
      let width = window.innerWidth;
      let height = window.innerheight;
      this.renderer.setSize(width, height);
      this.camera.aspect = window / height;
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    // this.init();
    console.log(this.scene);
    // this.animate();
    // この変数にアップロードファイルの情報を復元することにする
    let file = null
    // この変数にアップロードファイルをデータURI化した情報を復元することにする
    let uri  = localStorage.getItem('uri')
    console.log(uri);
    // アップロードファイルを復元する。
    let binary = atob(
        uri.slice(value.answer.file.indexOf(',') + 1) 
    )
    let bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
    }
    file = new Blob([bytes], {
        type: localStorage.getItem('type'),
    })
    console.log(file);
    file.name = localStorage.getItem('name')
  },
  computed: {
    getSTL() {
      console.log(uploadedSTL);
      STL = uploadedSTL;
      // this.init();
      return 
    }
  }
};
</script>