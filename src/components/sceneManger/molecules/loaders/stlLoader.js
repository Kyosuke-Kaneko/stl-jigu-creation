import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// import { lookAtModel } from "./lookAtModel/lookAtModel";
import purple from "../../../../assets/9d83bb.png";
import red from "../../../../assets/ff0000.png";

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
      const texBack = new THREE.TextureLoader().load(red);

      // マテリアルの作成
      const material = new THREE.MeshStandardMaterial({
        // color: 0x9d83bb,
        // 多分色の設定
        map: threeObj.texDefault,
        // どの面がレンダリングされるか。Default is THREE.FrontSide.THREE.BackSide and THREE.DoubleSide.
        side: THREE.DoubleSide,
      });
      // MEMO:調査
      const planeUniforms = { backTexture: { value: texBack } };

      // シェイダーの設定（えらーがおきるのでコメントアウト）
      // material.onBeforeCompile = (shader) => {
      //   // @author prisoner849
      //   shader.uniforms.backTexture = planeUniforms.backTexture;
      //   // 位置、色、テクスチャ座標などの属性を操作できますが、新しい頂点を生成することはできない。
      //   shader.vertexShader =
      //     `
      //   attribute vec2 backUV;
      //   varying vec2 vBackUV;
      //   ` + shader.vertexShader;
      //   shader.vertexShader = shader.vertexShader.replace(
      //     `#include <fog_vertex>`,
      //     `#include <fog_vertex>
      //   vBackUV = backUV;
      //   `
      //   );
      //   shader.fragmentShader =
      //     `
      //   uniform sampler2D backTexture;
      //   varying vec2 vBackUV;
      //   ` + shader.fragmentShader;
      //   shader.fragmentShader = shader.fragmentShader.replace(
      //     `#include <map_fragment>`,
      //     `
      //   #ifdef USE_MAP
        
      //   vec4 texelColor = gl_FrontFacing ? texture2D( map, vUv ) : texture2D( backTexture, vBackUV );
      //   texelColor = mapTexelToLinear( texelColor );
      //   diffuseColor *= texelColor;
        
      //   #endif
      //   `
      //   );
      // };

      const mesh = new THREE.Mesh(geometory, material);
      mesh.name = "3dModel";
      // モデル回転
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      threeObj.scene.add(mesh);

      // boundingBox視覚化させる。画像の中心を[0, 0, 0]と仮定したとき、画像がx, y, z軸方向にどれだけあるのか
      const box = new THREE.BoxHelper(mesh, 0xffff00);
      threeObj.scene.add(box);

      // lookAtModel初期化
      // lookAtModel.init(box);
      // モデルにカメラを向ける
      // lookAtModel.default(threeObj);

      resolve(mesh);
    });
  }).then((mesh) => {
    result = mesh;
  });

  return await result;
};
