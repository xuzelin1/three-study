import * as THREE from'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(scene.position);
const light = new THREE.DirectionalLight(0xff0000);
const axes = new THREE.AxesHelper(20); 

scene.add(camera, light, axes);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);


const controls = new OrbitControls( camera, renderer.domElement );

function cameraAnimate() {
	requestAnimationFrame( cameraAnimate );
	controls.update();
	renderer.render( scene, camera );
}

document.body.appendChild(renderer. domElement) ; 
renderer.render(scene, camera );

function renderScene() {
  requestAnimationFrame(renderScene); 
  cameraAnimate();
  renderer.render(scene, camera);
}

renderScene();