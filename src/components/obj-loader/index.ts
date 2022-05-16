import * as THREE from'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2( 0xffffff, 0.015 );

var axes= new THREE.AxesHelper(20); 
scene.add(axes);

var renderer= new THREE.WebGLRenderer (); 
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);

var spotLight = new THREE.AmbientLight(0xffffff); 
// spotLight.position.set(40, 30, 10);
// spotLight.castShadow = true;
scene.add( spotLight );

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.x = 0; 
camera.position.y = 2; 
camera.position.z = 2; 
// // camera.position.x = 0; 
// // camera.position.y = 120; 
// // camera.position.z = 0; 
camera.lookAt(scene.position);

const controls = new OrbitControls( camera, renderer.domElement );
function cameraAnimate() {
	requestAnimationFrame( cameraAnimate );
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render( scene, camera );
}


const loader = new OBJLoader();

loader.load( '../../../src/assets/low-poly-fox-by-pixelmannen-obj/low-poly-fox-by-pixelmannen.obj', function ( gltf ) {
	const texture = new THREE.TextureLoader().load( "../../../src/assets/low-poly-fox-by-pixelmannen-obj/texture.png" );
	gltf.children[0].map = texture;
	scene.add( gltf );
	console.log(gltf, texture);

}, undefined, function ( error ) {

	console.error( error );

} );

document.body.appendChild(renderer. domElement) ; 
renderer.render(scene, camera );

function renderScene() {
	stats.begin();
  requestAnimationFrame(renderScene); 
  cameraAnimate();
  renderer.render(scene, camera);
	stats.end();
}

renderScene();

