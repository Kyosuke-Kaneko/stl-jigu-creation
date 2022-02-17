export const lookAtModel = {
  box: null,

  init(box) {
    this.box = box;
  },

  async default(threeObj) {
    // コントローラーのターゲットをboundingBox用ヘルパーにする
    // モデルを取り囲む円の中心
    threeObj.controls.target.set(
      this.box.geometry.boundingSphere.center.x,
      this.box.geometry.boundingSphere.center.y,
      this.box.geometry.boundingSphere.center.z
    );
    threeObj.controls.update();

    // modelを画角内に収めるため簡単に調整（計算コストかかるが正確にも出せる）
    const adjustNumber = 3;
    threeObj.camera.position.set(
      this.box.geometry.boundingSphere.radius / adjustNumber,
      this.box.geometry.boundingSphere.radius +
        this.box.geometry.boundingSphere.center.y,
      this.box.geometry.boundingSphere.radius * adjustNumber +
        this.box.geometry.boundingSphere.center.z
    );
    threeObj.camera.updateProjectionMatrix();
  },
};
