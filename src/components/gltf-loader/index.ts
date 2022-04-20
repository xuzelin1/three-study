import * as THREE from'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2( 0xffffff, 0.015 );

var axes= new THREE.AxesHelper(20); 
scene.add(axes);

var renderer= new THREE.WebGLRenderer (); 
renderer.setClearColor(0x1c232e);
renderer.setSize(window.innerWidth, window.innerHeight);

// var spotLight = new THREE.PointLight(0xffffff); 
// spotLight.position.set(0, 10, 0);
// spotLight.castShadow = true;
// scene.add( spotLight );

const width = 10;
const height = 10;
const intensity = 2;
const rectLight1 = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
const rectLight2 = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
const rectLight3 = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
const rectLight4 = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight1.position.set( 5, 0, 0 );
rectLight2.position.set( -5, 0, 0 );
rectLight3.position.set( 0, 0, 5 );
rectLight4.position.set( 0, 0, -5 );
rectLight1.lookAt(0, 0, 0);
rectLight2.lookAt(0, 0, 0);
rectLight3.lookAt(0, 0, 0);
rectLight4.lookAt(0, 0, 0);
scene.add(
	rectLight1,
	rectLight2,
	rectLight3,
	rectLight4,
)

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


const loader = new GLTFLoader();

loader.load( '../../../src/assets/detailed_draft_xyz_homework/scene.gltf', function ( gltf ) {

	console.log(gltf, gltf.scene);
	gltf.scene.scale.set( 0.01, 0.01, 0.01 );
	scene.add( gltf.scene );
	

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

