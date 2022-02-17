import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { lookAtModel } from "./lookAtModel/lookAtModel";
import purple from "../../../../assets/9d83bb.png";
// threeObjは作成したsceneなどの基本設定
export const stlLoader = async (threeObj, obj) => {
  // 返す変数
  let result;
  const loader = await new STLLoader();
  await new Promise((resolve) => {
    // resultをreturnするのにasyncとPromise使う
    loader.load(obj, (geometory) => {
      // テクスチャー画像のロード
      threeObj.texDefault = new THREE.TextureLoader().load(purple);
      

      // マテリアルの作成
      const material = new THREE.MeshStandardMaterial({
        color: 0x9d83bb,
        // 多分色の設定
        map: threeObj.texDefault,
        // どの面がレンダリングされるか。Default is THREE.FrontSide.THREE.BackSide and THREE.DoubleSide.
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometory, material);
      mesh.name = "3dModel";
      // モデルの初期位置
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      threeObj.scene.add(mesh);

      // boundingBoxの視覚化。画像の中心を[0, 0, 0]と仮定したとき、画像がx, y, z軸方向にどれだけあるのか
      const box = new THREE.BoxHelper(mesh, 0xffff00);
      threeObj.scene.add(box);

      // lookAtModel初期化
      lookAtModel.init(box);
      // モデルにカメラを向ける
      lookAtModel.default(threeObj);

      resolve(mesh);
    });
  }).then((mesh) => {
    result = mesh;
  });

  return await result;
};
