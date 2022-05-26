import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon";

let world: CANNON.World;
let sphereBody: CANNON.Body;
let sphere: THREE.Mesh;
let scene: THREE.Scene;
let controls: OrbitControls;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;


const initCannonWorld = () => {
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  world.broadphase = new CANNON.NaiveBroadphase();

  const sphereShape = new CANNON.Sphere(1);
  const sphereBody = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, 10, 0),
    shape: sphereShape,
  })

  world.addBody(sphereBody);
}

const initCannonPlaneAndBall = () => {
  const sphereShape = new CANNON.Sphere(1);
  sphereBody = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, 10, 0),
    shape: sphereShape,
  });
  world.addBody(sphereBody);

  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  world.addBody(groundBody);
}

const initThreeWorld = () => {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		100
	);
	camera.position.z = 5;
  const axes = new THREE.AxesHelper(20);
	scene.add(camera, axes);

  const groundGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  scene.add(ground);

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 })
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere)

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);

  controls = new OrbitControls( camera, renderer.domElement );
	document.body.appendChild(renderer.domElement);
}

function cameraAnimate() {
	requestAnimationFrame( cameraAnimate );
	controls.update();
	renderer.render( scene, camera );
}

function update(){
  requestAnimationFrame(update);
  world.step(1 / 60);
  if (sphere) {
    sphere.position.copy(sphereBody.position);
    sphere.quaternion.copy(sphereBody.quaternion);
  } 
}


initCannonWorld();
initCannonPlaneAndBall();
initThreeWorld();

update();
cameraAnimate();
