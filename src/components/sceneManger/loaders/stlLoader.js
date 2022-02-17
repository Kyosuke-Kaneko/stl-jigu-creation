import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { lookAtModel } from "./lookAtModel/lookAtModel";
import purple from "../../../../assets/9d83bb.png";
import red from "../../../../assets/ff0000.png";

export const stlLoader = async (threeObj, obj) => {
  let result;
  const loader = await new STLLoader();
  await new Promise((resolve) => {
    // resultをreturnするのにasyncとPromise使う
    loader.load(obj, (STL) => {
      threeObj.texDefault = new THREE.TextureLoader().load(purple);
      const texBack = new THREE.TextureLoader().load(red);

      const mat = new THREE.MeshStandardMaterial({
        // color: 0x9d83bb,
        map: threeObj.texDefault,
        side: THREE.DoubleSide,
      });
      const planeUniforms = { backTexture: { value: texBack } };

      mat.onBeforeCompile = (shader) => {
        // @author prisoner849
        shader.uniforms.backTexture = planeUniforms.backTexture;
        shader.vertexShader =
          `
        attribute vec2 backUV;
        varying vec2 vBackUV;
        ` + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          `#include <fog_vertex>`,
          `#include <fog_vertex>
        vBackUV = backUV;
        `
        );
        shader.fragmentShader =
          `
        uniform sampler2D backTexture;
        varying vec2 vBackUV;
        ` + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <map_fragment>`,
          `
        #ifdef USE_MAP
        
        vec4 texelColor = gl_FrontFacing ? texture2D( map, vUv ) : texture2D( backTexture, vBackUV );
        texelColor = mapTexelToLinear( texelColor );
        diffuseColor *= texelColor;
        
        #endif
        `
        );
      };

      const mesh = new THREE.Mesh(STL, mat);
      mesh.name = "3dModel";
      // モデル回転
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      threeObj.scene.add(mesh);

      // boundingBox視覚化させる
      const box = new THREE.BoxHelper(mesh, 0xffff00);
      // threeObj.scene.add(box);

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
