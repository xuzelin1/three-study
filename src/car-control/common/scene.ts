import * as THREE from'three';

/**
 * THREE.Scene
 */
export default class Scene {
  static scene: THREE.Scene;

  static getInstance() {
    if (this.scene) {
      return this.scene;
    }
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    return this.scene;
  }
}