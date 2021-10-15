import * as THREE from 'three';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

const controls = {
  rotationSpeed: 0.02,
  bouncingSpeed: 0.03,
  sphereX: 2,
  sphereY: 2,
  sphereZ: 2,
  cubeX: 0,
  cubeY: 3,
  cubeZ: 3,
}

gui.add(controls, 'rotationSpeed', 0, 0.5)
gui.add(controls, 'bouncingSpeed', 0, 0.5)
gui.add(controls, 'sphereX', 0, 5)
gui.add(controls, 'sphereY', 0, 5)
gui.add(controls, 'sphereZ', 0, 5)
gui.add(controls, 'cubeX', 0, 5)
gui.add(controls, 'cubeY', 0, 5)
gui.add(controls, 'cubeZ', 0, 5)
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setClearColor(0xEEEEEE);
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// const cameras = new THREE.ArrayCamera([...new Array(10).fill(camera)]);
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// // const points = [];
// // points.push( new THREE.Vector3( - 10, 0, 0 ) );
// // points.push( new THREE.Vector3( 0, 10, 0 ) );
// // points.push( new THREE.Vector3( 10, 0, 0 ) );

// // const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const geometry = new THREE.CylinderGeometry( 5, 5, 20, 64, 64 );
// const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
// const line = new THREE.Mesh( geometry, material );

// scene.add( line );
// scene.add( light );
// renderer.render( scene, camera );


var scene= new THREE.Scene(); 
var camera= new THREE.PerspectiveCamera(45, window.innerWidth / window .innerHeight, 0.1, 1000); 
var renderer= new THREE.WebGLRenderer (); 
renderer.setClearColor(0xEEEEEE);
renderer .setSize(window.innerWidth, window.innerHeight); 
renderer.shadowMap.enabled = true;

var axes= new THREE.AxesHelper(20); 
scene.add(axes); 

var planeGeometry = new THREE.PlaneGeometry(60, 20); 
var planeMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff}); 
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI; 
plane.position.x = 15; 
plane.position.y = 0;
plane.position.z = 0; 
scene.add(plane);

var cubeGeometry = new THREE.CylinderGeometry(4, 4, 4, 64, 64); 
var cubeMaterial = new THREE.MeshLambertMaterial({color : 0xff0000, wireframe : true}); 
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial ); 
cube.position.x = controls.cubeX;
cube.position.y = controls.cubeY;
cube.position.z = controls.cubeZ;
scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4,20,20); 
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff, wireframe : true});
var sphere= new THREE.Mesh(sphereGeometry,sphereMaterial); 
sphere.position.x = controls.sphereX; 
sphere.position.y = controls.sphereY; 
sphere.position.z = controls.sphereZ; 
scene. add (sphere) ; 


camera.position.x = -30; 
camera.position.y = 40; 
camera.position.z = 30; 
camera.lookAt(scene.position); 

plane.receiveShadow = true; 
cube.castShadow = true; 
sphere.castShadow = true;

var spotLight = new THREE.SpotLight(0xffffff); 
spotLight.position.set(40, 30, 10); 
spotLight.castShadow = true;
scene.add( spotLight );

document.body.appendChild(renderer. domElement) ; 

let step = 0;
function renderScene () {
  // sphere.position.z += zMove;
  // sphere.position.x += xMove;
  // sphere.position.y += yMove;
  // if (sphere.position.z >= 3) {
  //   zMove = 0;
  //   yMove = 0.02;
  // }
  // if (sphere.position.y >= 5) {
  //   yMove = 0;
  //   xMove = 0.02;
  // }
  // if (sphere.position.x >= 21) {
  //   xMove = 0;
  //   zMove = 0.02;
  // }
  cube.rotation.x += controls.rotationSpeed; 
  cube.rotation.y += controls.rotationSpeed; 
  cube.rotation.z += controls.rotationSpeed;

  camera.rotation.x += controls.rotationSpeed; 
  camera.rotation.y += controls.rotationSpeed; 
  camera.rotation.z += controls.rotationSpeed;

  step+=controls.bouncingSpeed; 
  sphere.position.x = 20+( 10*(Math.cos(step))); 
  sphere.position.y = 2 +( 10* Math.abs(Math.sin(step)));
  requestAnimationFrame(renderScene); 
  renderer.render(scene, camera );
}


renderScene();
renderer.render(scene, camera );