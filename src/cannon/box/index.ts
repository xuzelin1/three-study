import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon";

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