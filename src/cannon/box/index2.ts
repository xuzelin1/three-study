import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const axes = new THREE.AxesHelper(20);
const controls = new OrbitControls(camera, renderer.domElement);

let ground;
let box;

initThree();
initCannon();
cameraAnimate();


function initThree() {
  scene.add(camera);
  scene.add(axes);
  camera.position.x = 10;
  camera.position.y = 10;
  camera.position.z = 10;
  renderer.setSize(window.innerWidth, window.innerHeight);

  const groundGeometry = new THREE.PlaneGeometry(20, 20, 32);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x7f7f7f,
  });
  ground = new THREE.Mesh(groundGeometry, groundMaterial);
  scene.add(ground);
  ground.rotation.x = -Math.PI * 0.5;

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  document.body.appendChild(renderer.domElement);
}

function cameraAnimate() {
	requestAnimationFrame( cameraAnimate );
	controls.update();
	renderer.render( scene, camera );
}

function initCannon() {
  const world = new CANNON.World();
  world.gravity.set(0, -20, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  const shape = new CANNON.Shape();
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 0, 0),
  });

  return world;
}

