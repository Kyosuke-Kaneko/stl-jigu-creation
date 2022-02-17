import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import purple from "../../../assets/9d83bb.png";

export class ThreeConfig {
  constructor(container, canvas) {
    // シーン
    this.scene = new THREE.Scene();
    // 背景色
    this.scene.background = new THREE.TextureLoader().load(purple)

    // windowのsizeではなくcontainerにサイズを合わせる
    this.container = container;

    // カメラを作成
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    // this.scene.add(this.camera);
    // 初期位置
    this.camera.position.z = 10;
    this.camera.position.x = 10;
    this.camera.position.y = 10;

    // レンダラーを作成
    this.renderer = new THREE.WebGLRenderer({
      // canvasの指定
      canvas: canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setSize(
      // window.innerWidth , window.innerHeight
      this.container.clientWidth,
      this.container.clientHeight
    );
    // レンダラーのサイズ調整
    this.renderer.setPixelRatio(this.container.devicePixelRatio);
    // buildアニメーションに必要。クリッピングの描画。断面など
    this.renderer.localClippingEnabled = true;

    // コントローラー
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // PerspectiveCameraで有効どれくらいの距離までうごかせるか
    this.controls.minDistance = 0.1;
    this.controls.maxDistance = 5000;

    // 軸
    const axes = new THREE.AxesHelper(100);
    this.scene.add(axes);

    // ライトの作成
    const light = new THREE.AmbientLight(0x404040, 0.5); // soft white light
    this.scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(60, 60, 60);
    this.scene.add(directionalLight);
    // const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // this.scene.add(helper);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-60, -60, -60);
    this.scene.add(directionalLight2);
    // const helper2 = new THREE.DirectionalLightHelper(directionalLight2, 5);
    // this.scene.add(helper2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight3.position.set(-60, 60, 60);
    this.scene.add(directionalLight3);
    // const helper3 = new THREE.DirectionalLightHelper(directionalLight3, 5);
    // this.scene.add(helper3);

    const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight4.position.set(60, -60, -60);
    this.scene.add(directionalLight4);
    // const helper4 = new THREE.DirectionalLightHelper(directionalLight4, 5);
    // this.scene.add(helper4);

    const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight5.position.set(0, 60, -60);
    this.scene.add(directionalLight5);
    // const helper5 = new THREE.DirectionalLightHelper(directionalLight5, 5);
    // this.scene.add(helper5);
  }
}
