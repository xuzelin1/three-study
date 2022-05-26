import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
// camera.position.x = 0;
// camera.position.y = 2;
// camera.position.z = 2;
// camera.lookAt(scene.position);
// // const light = new THREE.DirectionalLight(0xff0000);
// const light1 = new THREE.SpotLight()
// light1.position.set(2.5, 5, 5)
// light1.angle = Math.PI / 4
// light1.penumbra = 0.5
// light1.castShadow = true
// light1.shadow.mapSize.width = 1024
// light1.shadow.mapSize.height = 1024
// light1.shadow.camera.near = 0.5
// light1.shadow.camera.far = 20
// scene.add(light1)
// const axes = new THREE.AxesHelper(20);

// scene.add(camera, light1, axes);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff);

// const normalMaterial = new THREE.MeshNormalMaterial()
// const phongMaterial = new THREE.MeshPhongMaterial()

// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// const cubeMesh = new THREE.Mesh(cubeGeometry, normalMaterial)
// cubeMesh.position.x = -3
// cubeMesh.position.y = 3
// cubeMesh.castShadow = true
// scene.add(cubeMesh)

// console.log(THREE, CANNON)

// const world = new CANNON.World();
// world.gravity.set(0, 0, 0);

// const radius = 1;
// const sphereBody = new CANNON.Body({
//   mass: 5,
//   position: new CANNON.Vec3(0, 0, 10),
//   shape: new CANNON.Sphere(radius),
// })
// world.addBody(sphereBody)

// const groundBody = new CANNON.Body({
//   mass: 0
// });
// const groundShape = new CANNON.Plane();
// groundBody.addShape(groundShape);
// world.addBody(groundBody);

// const fixedTimeStep = 1.0 / 60.0;
// const maxSubSteps = 3;

// let lastTime: number;
// (function simloop(time){
//   requestAnimationFrame(simloop);
//   if(lastTime !== undefined){
//      var dt = (time - lastTime) / 1000;

//      console.log("Sphere z position: " + time, sphereBody.position.z);
//      world.step(fixedTimeStep, dt, maxSubSteps);
//     }
//   lastTime = time;
// })();

// const controls = new OrbitControls( camera, renderer.domElement );

// function cameraAnimate() {
// 	requestAnimationFrame( cameraAnimate );
// 	controls.update();
// 	renderer.render( scene, camera );
// }

// document.body.appendChild(renderer. domElement) ;
// renderer.render(scene, camera );

// function renderScene() {
//   requestAnimationFrame(renderScene);
//   cameraAnimate();
//   renderer.render(scene, camera);
// }

// renderScene();

var world: CANNON.World,
	mass,
	body: CANNON.Body,
	shape,
	timeStep = 1 / 60,
	camera: THREE.PerspectiveCamera,
	scene: THREE.Scene,
	renderer: THREE.Renderer,
	geometry,
	material,
	mesh: THREE.Mesh,
  controls: OrbitControls;

initThree();
initCannon();
animate();
cameraAnimate();

function initCannon() {
	world = new CANNON.World();
	world.gravity.set(0, 0, 0);
	world.broadphase = new CANNON.NaiveBroadphase();
	world.solver.iterations = 1;

	shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
	mass = 1;
	body = new CANNON.Body({
		mass: 5,
	});
	body.addShape(shape);
	body.angularVelocity.set(0, 10, 0);
	body.angularDamping = 0.5;
	world.addBody(body);

  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
  });
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -1.5707963267948966)
  world.addBody(groundBody);
}

function initThree() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		100
	);
	camera.position.z = 5;
	scene.add(camera);

	geometry = new THREE.BoxGeometry(2, 2, 2);
	material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
  
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
  
  controls = new OrbitControls( camera, renderer.domElement );
	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	updatePhysics();
	render();
}

function updatePhysics() {
	// Step the physics world
	world.step(timeStep);

	// Copy coordinates from Cannon.js to Three.js
	mesh.position.copy(body.position);
	mesh.quaternion.copy(body.quaternion);
}

function render() {
	renderer.render(scene, camera);
}


function cameraAnimate() {
	requestAnimationFrame( cameraAnimate );
	controls.update();
	renderer.render( scene, camera );
}