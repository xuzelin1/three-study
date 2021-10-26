import * as THREE from'three';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

/**
 * 初始化控制面板数据
 */
 const controls = {
  cameraX: 0,
  cameraY: 100,
  cameraZ: 0,
  cameraRotationSpeedX: 0,
  cameraRotationSpeedY: 0,
  cameraRotationSpeedZ: 0,
  spotLightX: 0,
  spotLightY: 0,
  spotLightZ: 0,
}

gui.add(controls, 'cameraX', -30, 60);
gui.add(controls, 'cameraY', -10, 80);
gui.add(controls, 'cameraZ', -100, 130);
gui.add(controls, 'cameraRotationSpeedX', 0, 20);
gui.add(controls, 'cameraRotationSpeedY', 0, 20);
gui.add(controls, 'cameraRotationSpeedZ', 0, 20);

/**
 * 初始化场景
 */
 const scene = new THREE.Scene();

 /**
  * 初始化摄像机
  */
 const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
 camera.position.x = controls.cameraX;
 camera.position.y = controls.cameraY;
 camera.position.z = controls.cameraZ;
 camera.rotation.x = controls.cameraRotationSpeedX; 
 camera.rotation.y = controls.cameraRotationSpeedY; 
 camera.rotation.z = controls.cameraRotationSpeedZ;

 camera.lookAt(scene.position);

 /**
 * 初始化灯光
 */
  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(0, 50, 0); 
  spotLight.castShadow = true;
  scene.add(spotLight);
 
 /**
  * 初始化渲染器
  */
var renderer= new THREE.WebGLRenderer ();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

 
const shapeGeometry = new THREE.ShapeGeometry(drawShape());
const planeMaterial = new THREE.MeshBasicMaterial({color:0x000000});
const shape = new THREE.Mesh(shapeGeometry, planeMaterial);
shape.position.x = 0;
shape.position.y = 0;
shape.position.z = 0;
scene.add(shape);


/**
 * 渲染场景和摄像机
 */
 document.body.appendChild(renderer. domElement) ; 
 renderer.render(scene, camera);

 /**
 * 数据变化更新
 */
function renderScene () {
  camera.position.x = controls.cameraX;
  camera.position.y = controls.cameraY;
  camera.position.z = controls.cameraZ;
  
  // camera.rotation.x = controls.cameraRotationSpeedX;
  // camera.rotation.y = controls.cameraRotationSpeedY;
  camera.rotation.z = controls.cameraRotationSpeedZ;
  
  spotLight.position.set(controls.spotLightX, controls.spotLightY, controls.spotLightZ); 

  requestAnimationFrame(renderScene); 
  renderer.render(scene, camera );
}
renderScene();

function drawShape(): THREE.Shape { 
  // create a basic shape 
  var shape= new THREE.Shape(); 
  // startpoint 
  shape.moveTo(10, 10); 
  // straight line upwards 
  shape.lineTo(10, 40); 
  // the top of the figure, curve to the right 
  shape.bezierCurveTo(15, 25, 25, 25, 30, 40); 
  // spline back down 
  shape.splineThru ( 
  [new THREE. Vector2 (32, 30), 
  new THREE.Vector2(28, 20), 
  new THREE.Vector2(30, 10), 
  ]) 
  // curve at the bottom 
  shape.quadraticCurveTo(20, 15, 10, 10); 
  // add ' eye ’ hole one 
  var holel = new THREE.Path(); 
  holel.absellipse(16, 24, 2, 3, 0, Math.PI* 2, true, 1); 
  shape.holes.push(holel); 
  // add ’ eye hole 2' 
  var hole2 = new THREE.Path(); 
  hole2.absellipse(23, 24, 2, 3, 0, Math.PI* 2, true, 1); 
  shape.holes. push(hole2); 
  // add ’mouth ’ 
  var hole3 = new THREE.Path (); 
  hole3.absarc(20, 16, 2, 0, Math.PI, true);
  shape.holes .push(hole3); 
  return shape;
}