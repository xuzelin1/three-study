import * as THREE from'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    controls: OrbitControls,
    light: THREE.DirectionalLight,
    axes: THREE.AxesHelper,
    sphere: THREE.Mesh,
    ground: THREE.Mesh,
    sphereBody: any,
    groundBody: any,
    groundShape: any,
    ground_cm: any,
    sphere_cm: any,
    sphereShape: any,
    world: CANNON.World;

initThree();
initCannon();
animate();

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 10;
  camera.position.y = 10;
  camera.position.z = 10;
  camera.lookAt(scene.position);
  light = new THREE.DirectionalLight(0xff0000);
  axes = new THREE.AxesHelper(20);
  scene.add(camera, light, axes);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  controls = new OrbitControls(camera, renderer.domElement);

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  const groundGeometry = new THREE.PlaneGeometry(20, 20, 32);
  const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f0f0 });
  ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI * 0.5;
  scene.add(ground);

  document.body.appendChild(renderer. domElement);
}

function initCannon() {
  world = new CANNON.World();
  world.gravity = new CANNON.Vec3(0, -9.82, 0);

  const sphere_cm = new CANNON.Material('sphere_cm');
  sphereBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(1),
    material: sphere_cm,
  });
  sphereBody.position.set(0, 10, 0);
  world.addBody(sphereBody);

  const ground_cm = new CANNON.Material('sphere_cm');
  groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
    material: ground_cm,
  });
  groundBody.quaternion.setFromEuler(-Math.PI * 0.5, 0, 0);
  world.addBody(groundBody);

  const sphere_ground_cm = new CANNON.ContactMaterial(ground_cm, sphere_cm, {
    friction: 1,
    restitution: 0.3,
  })
  world.addContactMaterial(sphere_ground_cm);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  world.step(1 / 60);


  sphere.position.copy(sphereBody.position);
  sphere.quaternion.copy(sphereBody.quaternion);
  renderer.render(scene, camera);
}