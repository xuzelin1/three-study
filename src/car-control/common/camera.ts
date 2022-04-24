import * as THREE from'three';
import CarController from '../index';
import { GlobalConfig } from "../type";

export default class Camera {
  /**
   * THREE.PerspectiveCamera
   */
  instance: THREE.PerspectiveCamera;

  /**
   * car controller instance
   */
  carController: CarController;

  /**
   * global config
   */
  config: GlobalConfig;

  constructor(scene: THREE.Scene) {
    this.carController = new CarController();
    this.config = this.carController.config;

    this.instance = new THREE.PerspectiveCamera(
      75,
      this.config.width / this.config.height,
      0.1,
      1000
    );
    this.instance.position.set(0, 10, 50);
    const helper = new THREE.CameraHelper(this.instance);
    scene.add(helper);
  }
}