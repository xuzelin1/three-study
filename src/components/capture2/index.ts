import * as THREE from'three';
import Stats from 'stats.js';

var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2( 0xffffff, 0.015 );

var axes= new THREE.AxesHelper(20); 
scene.add(axes);

var renderer= new THREE.WebGLRenderer (); 
renderer.setClearColor(0xEEEEEE);
renderer .setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.x = -60; 
camera.position.y = 20; 
camera.position.z = 30; 
// camera.position.x = 0; 
// camera.position.y = 120; 
// camera.position.z = 0; 
camera.lookAt(scene.position); 

const planeGeometry = new THREE.PlaneGeometry(60, 30);
const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI; 
plane.position.x = 0; 
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0x007700);
spotLight.position.set(0, 50, 0); 
spotLight.castShadow = true;
scene.add(spotLight);

for(let i = 0; i < 200; i++) {
  addCube(i);
}

document.body.appendChild(renderer. domElement) ; 
renderer.render(scene, camera );

function addCube (index: number) {
  const cubeSize = 2 || Math.ceil((Math.random()*3));
  const cubeGeometry = new THREE.CylinderGeometry(cubeSize,cubeSize,cubeSize, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({color:Math.random() * 0xffffff});
  const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

  cube.castShadow = true;
  cube.name = 'cube-' + scene.children.length;
  // cube.position.x = -30 + Math.round((Math.random()*60));
  // cube.position.y = Math.round((Math.random()*5));
  // cube.position.z = -20 + Math.round((Math.random()*40));

  cube.position.x = -28 + Math.floor(index % 20) * 3
  cube.position.y = 1;
  cube.position.z = -14 + Math.floor(index / 20) * 3
  cube.rotation.y = -0.8;

  scene.add(cube);
}

function renderScene() {
	stats.begin();
  scene.traverse(function(e) {
    if (e instanceof THREE.Mesh && e !== plane)  {
      // e.rotation.x += 0.02;
      // e.rotation.y += 0.02;
      // e.rotation.z += 0.02;

      // e.translateX(-0.02);
      e.position.x
    }
  });
  requestAnimationFrame(renderScene); 
  renderer.render(scene, camera);
	stats.end();
}

renderScene();

