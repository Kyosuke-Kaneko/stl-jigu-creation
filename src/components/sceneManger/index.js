import { stlLoader } from "./molecules/loaders/stlLoader";
import { animation } from "./molecules/animation";
import { canvasResize } from "./molecules/canvasResize";
import { ThreeConfig } from "./molecules/threeConfig";
import { modelMethod } from "./molecules/modelMethod/index";

export const sceneManagerDesign = async (obj) => {
  const container = document.getElementById("container");
  const canvas = document.querySelector("#myCanvasDesign");
  // 基本設定
  const threeObj = await new ThreeConfig(container, canvas);

  // stl Loader
  const mesh = await stlLoader(threeObj, obj);

  // メソッド初期化
  modelMethod.init(mesh, threeObj);

  // resize
  canvasResize(threeObj);

  // アニメーション
  const anime = () => {
    requestAnimationFrame(anime);
    // animation
    animation(threeObj);
  };
  anime();
};
