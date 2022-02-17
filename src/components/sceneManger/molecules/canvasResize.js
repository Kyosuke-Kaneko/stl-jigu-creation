export const canvasResize = (threeObj) => {
  // レスポンシブ
  window.addEventListener("resize", () => {
    threeObj.renderer.setSize(
      threeObj.container.clientWidth,
      threeObj.container.clientHeight
    );
    threeObj.camera.aspect =
      threeObj.container.clientWidth / threeObj.container.clientHeight;

    threeObj.camera.updateProjectionMatrix();
  });
};
