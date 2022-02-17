import { stlLoader } from "./molecules/loaders/stlLoader";
import { animation } from "./molecules/animation";
import { canvasResize } from "./molecules/canvasResize";
import { ThreeConfig } from "./molecules/threeConfig";
import { modelMethod } from "./molecules/modelMethod/index";

export const sceneManagerDesign = async (obj) => {
  const container = document.getElementById("container");
  const canvas = document.getElementById("threeCanvas");
  // 基本設定(シーン、カメラ、レンダラー、コントローラー、ライトの作成)
  const threeObj = await new ThreeConfig(container, canvas);
  // console.log(threeObj)

  // stl Loader（STLLoaderを利用したmeshの作成）
  const mesh = await stlLoader(threeObj, obj);

  // メソッド初期化（編集できるメソッドの追加）
  // コメントアウトしてもOK
  // modelMethod.init(mesh, threeObj);

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
