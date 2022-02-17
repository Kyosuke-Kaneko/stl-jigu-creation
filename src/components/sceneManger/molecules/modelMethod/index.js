// import { changeColorModel } from "./methods/changeColorModel";
// import { screenShotModel } from "./methods/screenShotModel";
// import { build } from "./methods/build";
// import { edgeModel } from "./methods/edgeModel";
// import { supportModel } from "./methods/supportModel";
// import { holeModel } from "./methods/holeModel";
// import { lookAtModel } from "../loaders/lookAtModel/lookAtModel";
// import { visibilityModel } from "./methods/visibilityModel";
// import { jigModel } from "./methods/jigModel";

export const modelMethod = {
  mesh: null,
  threeObj: null,

  init(m, obj) {
    this.mesh = m;
    this.threeObj = obj;
  },

  changeColor(color) {
    changeColorModel(color, this.mesh);
  },

  async screenshot() {
    await screenShotModel.takeImg(this.threeObj);
    return await screenShotModel.img;
  },

  buildStart(x, y, z) {
    build.start(x, y, z, this.mesh, this.threeObj);
  },
  buildStop() {
    build.stop(this.threeObj);
  },

  createEdge(inputMatrix) {
    edgeModel.create(inputMatrix, this.threeObj);
  },

  createSupport(inputMatrix) {
    supportModel.create(inputMatrix, this.threeObj);
  },

  createHole(inputMatrix) {
    holeModel.create(inputMatrix, this.threeObj);
  },

  displayModelToggle() {
    visibilityModel.toggle(this.mesh);
  },

  createJigModel(jigModelPath) {
    jigModel.create(this.threeObj, jigModelPath);
  },
  destroyJigModel() {
    jigModel.destroy(this.threeObj);
  },

  default() {
    edgeModel.delete(this.threeObj);
    supportModel.delete(this.threeObj);
    holeModel.delete(this.threeObj);
    const mainModel = this.threeObj.scene.getObjectByName("3dModel");
    mainModel.material.map = this.threeObj.texDefault;
    lookAtModel.default(this.threeObj);
  },
};
