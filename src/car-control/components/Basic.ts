import Camera from "../common/camera";
import Scene from "../common/scene";


export default class Basic {
  /**
   * common scene
   */
  scene: THREE.Scene;

  constructor() {
    this.scene = Scene.getInstance();
  }
}