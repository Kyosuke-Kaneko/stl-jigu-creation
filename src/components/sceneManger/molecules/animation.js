// import { build } from "./modelMethod/methods/build";

export const animation = (threeObj) => {
  // アニメーション記載
  threeObj.controls.update();
  // シーンとカメラのレンダリング
  threeObj.renderer.render(threeObj.scene, threeObj.camera);

  // if (build.buildAnimation) {
  //   build.update();
  // }
};
