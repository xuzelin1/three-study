import * as THREE from'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper.js';
// import { MMDPhysics } from 'three/examples/jsm/animation/MMDPhysics.js'
const clock = new THREE.Clock();

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
camera.position.y = 50; 
camera.position.z = 80; 
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


const loader = new MMDLoader();
const helper = new MMDAnimationHelper();

loader.load( '../../../src/assets/miya/Miyaver.pmx', function ( gltf ) {
	scene.add( gltf );
	console.log(gltf);

}, undefined, function ( error ) {

	console.error( error );

} );

new MMDLoader().loadWithAnimation(
	'../../../src/assets/miya/Miyaver.pmx',
	'../../../src/assets/miya/30486ed1e37cede0feae8cb196e1b2e7.vmd',
	function ( mmd ) {

		helper.add( mmd.mesh, {
			animation: mmd.animation,
			physics: true
		} );

		scene.add( mmd.mesh );

		// new THREE.AudioLoader().load(
		// 	'audios/mmd/song.mp3',
		// 	function ( buffer ) {

		// 		const listener = new THREE.AudioListener();
		// 		const audio = new THREE.Audio( listener ).setBuffer( buffer );

		// 		listener.position.z = 1;

		// 		scene.add( audio );
		// 		scene.add( listener );

		// 	}

		// );

	}
);


document.body.appendChild(renderer. domElement) ; 
renderer.render(scene, camera );

function renderScene() {
	stats.begin();
  requestAnimationFrame(renderScene); 
  cameraAnimate();
	helper.update( clock.getDelta() );
  renderer.render(scene, camera);
	stats.end();
}

renderScene();

