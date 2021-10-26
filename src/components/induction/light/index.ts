import * as THREE from'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x6e6e6e);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
// camera.position.set(0, 0, 30);
// camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 10 );
controls.update();



var light = new THREE.SpotLight(0xffffff);
light.position.set(0, 10, 10);
scene.add(light);

var greenCube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2),
new THREE.MeshLambertMaterial({color: 0x00ff00}));
greenCube.position.x = 3;
scene.add(greenCube);
var whiteCube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2),
new THREE.MeshLambertMaterial({color: 0xffffff}));
whiteCube.position.x = -3;
scene.add(whiteCube);

const normalM = new THREE.MeshNormalMaterial({});
const sphereG = new THREE.SphereGeometry(3, 20, 20);
const sphere = new THREE.Mesh(sphereG, normalM);
scene.add(sphere);

const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), normalM);
cube.position.x = -6;
scene.add(cube);

const texture = new THREE.TextureLoader().load('https://threejs.org/examples/screenshots/webgl_animation_skinning_morph.jpg');
const material = new THREE.MeshLambertMaterial({
  map: texture
});
const textCube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
textCube.position.x = -9;
scene.add(textCube);

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

  textCube.rotation.y += 0.01;
  if (textCube.rotation.y > Math.PI * 2) {
    textCube.rotation.y -= Math.PI * 2; 
  }
}

animate();

renderer.render(scene, camera);
document.body.appendChild(renderer. domElement);
