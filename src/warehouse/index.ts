import * as THREE from'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import createBox from './components/box';
import PathInit from './components/path';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set( 0, 50, 0 );
scene.add(camera);

const controls = new OrbitControls( camera, renderer.domElement );


const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 10, 10);
scene.add(light);

function cameraAnimate() {
	requestAnimationFrame( cameraAnimate );
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render( scene, camera );
}

/**
 * 初始化路径
 */
const path = new PathInit(scene);
path.render();

/**
 * 初始化箱子
 */
const initBox = () => {
  setInterval(() => {
    /**
     * 模拟生成 box
     */
    const width = 1 || Math.ceil(Math.random() * 2);
    const height = 1 || Math.ceil(Math.random() * 2);
    const depth = 1 || Math.ceil(Math.random() * 2);
    const box = createBox({ width, height, depth });

    scene.add(box);
  }, 500);
  /**
   * 执行 box 动画
   */
  boxAnimation();
}

// let pos = 0;
// const BOX = createBox({ width: 2, height: 2, depth: 2 });
// scene.add(BOX)

/**
 * 箱子动画
 */
const boxAnimation = () => {
  const children: any = scene.children;
  for(let e of children) {
    if (e.geometry instanceof THREE.BoxGeometry) {
      if (e.pos === undefined) {
        e.pos = 0;
      }
      e.pos += 0.001;
      if (e.pos > 1) {
        e.pos = 0;
        scene.remove(e);
      } else {
        const position = path.changePosition(e.pos);
        const lookAtVec = path.changeLookAt(e.pos, position);
        e.position.copy(position);
        e.position.y = 0.5;
        e.lookAt(lookAtVec);
      }
    }
  }

	requestAnimationFrame( boxAnimation );
  renderer.render(scene, camera);
}

const render = () => {
  cameraAnimate();
  initBox();
  renderer.render(scene, camera);
  document.body.appendChild(renderer. domElement);  
}

/**
 * 执行
 */
render();



