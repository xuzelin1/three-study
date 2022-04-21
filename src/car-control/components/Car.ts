import * as THREE from'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Basic from "./Basic";

/**
 * the car component
 */
export default class Car extends Basic{
  instance!: THREE.Group;

  constructor() {
    super();
    this.setInstance();
  }

  setInstance() {

    var axes= new THREE.AxesHelper(20); 
    this.scene.add(axes);
    const loader = new FBXLoader();
    loader.load('src/car-control/assets/source/car.fbx', (object) => {
      console.log(object);
      this.scene.add(object);

      this.instance = object;
    });
  }
}