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
  const sphere_cm = new CANNON.Material("sphere_cm");
  const sphereShape = new CANNON.Sphere(1);
  sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 5, 0),
    shape: sphereShape,
    material: sphere_cm,
  });
  world.addBody(sphereBody);

  const ground_cm = new CANNON.Material('ground_cm');
  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
    material: ground_cm,
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2);
  world.addBody(groundBody);

  const sphere_ground_cm = new CANNON.ContactMaterial(ground_cm, sphere_cm, {
    friction: 1,
    restitution: 0.3,
  })
  world.addContactMaterial(sphere_ground_cm);
}

const initThreeWorld = () => {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		100
	);
  camera.position.x = 0;
  camera.position.y = 30;
  camera.position.z = 10;
  camera.lookAt(scene.position);
  const axes = new THREE.AxesHelper(20);
  const light = new THREE.DirectionalLight(0xff0000);
	scene.add(camera, light, axes);

  const groundGeometry = new THREE.PlaneGeometry(20, 20, 32);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x7f7f7f,
    side: THREE.DoubleSide
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.set(-Math.PI / 2, 0, 0);
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
