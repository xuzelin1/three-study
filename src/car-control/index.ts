import * as THREE from'three';
import Camera from './common/camera';
import Basic from './components/Basic';
import World from './components/World';
import { GlobalConfig } from './type';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

export default class CarController extends Basic {
  static instance: CarController;

  /**
   * current global target element
   */
  targetElement!: HTMLElement;

  /**
   * global config
   */
  config!: GlobalConfig;

  /**
   * init renderer
   */
  renderer!: THREE.WebGLRenderer;

  /**
   * THREE.PerspectiveCamera
   */
  camera!: Camera;
  
  constructor(options?: GlobalConfig) {

    super();
    if (CarController.instance) {
      return CarController.instance;
    }
    CarController.instance = this;

    if (!options) {
      return;
    }
    this.config = options;
    this.targetElement = options.targetElement as HTMLElement;
    
    if (!this.targetElement) {
      return;
    }

    this.setRender();
    this.setWorld();
  }

  /**
   * init render
   */
  setRender() {
    this.camera = new Camera(this.scene);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.config.width, this.config.height);
    this.renderer.setClearColor(0x000000);
    document.body.appendChild(this.renderer.domElement);
    const controls = new FirstPersonControls(this.camera.instance, this.renderer.domElement);

    // controls.screenSpacePanning = false;
    // controls.enableKeys = false
    // controls.zoomSpeed = 0.25
    // controls.enableDamping = true
    // controls.keys = {
    //   LEFT: 'ArrowLeft', //left arrow
    //   UP: 'ArrowUp', // up arrow
    //   RIGHT: 'ArrowRight', // right arrow
    //   BOTTOM: 'ArrowDown' // down arrow
    // }

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 10, 10);
    this.scene.add(light);

    
    console.log(controls);
    
    const cameraAnimate = () => {
      // controls.update();
      this.renderer.render(this.scene, this.camera.instance);
      requestAnimationFrame(cameraAnimate);
    }
    cameraAnimate();
  }

  /**
   * init world
   */
  setWorld() {
    new World();
  }
};
