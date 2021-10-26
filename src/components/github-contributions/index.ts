import * as THREE from'three';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

/**
 * 初始化控制面板数据
 */
const controls = {
  cameraX: 30,
  cameraY: 50,
  cameraZ: -95,
  cameraRotationSpeedX: 0,
  cameraRotationSpeedY: 0,
  cameraRotationSpeedZ: 3,
  spotLightX: -6,
  spotLightY: 40,
  spotLightZ: -40,
}

gui.add(controls, 'cameraX', -30, 60);
gui.add(controls, 'cameraY', -10, 80);
gui.add(controls, 'cameraZ', -100, -30);
gui.add(controls, 'cameraRotationSpeedX', 0, 20);
gui.add(controls, 'cameraRotationSpeedY', 0, 20);
gui.add(controls, 'cameraRotationSpeedZ', 0, 20);
gui.add(controls, 'spotLightX', -200, 200);
gui.add(controls, 'spotLightY', -200, 200);
gui.add(controls, 'spotLightZ', -200, 200);


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
 * 初始化渲染器
 */
var renderer= new THREE.WebGLRenderer ();
renderer.setClearColor(0xEEEEEE);
renderer .setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;


/**
 * 初始化平面
 */
const planeGeometry = new THREE.PlaneGeometry(14, 104);
const planeMaterial = new THREE.MeshPhongMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

/**
 * 初始化灯光
 */
const spotLight = new THREE.DirectionalLight(0xffffff);
spotLight.position.set(0, 50, 0); 
spotLight.castShadow = true;
scene.add(spotLight);
 

for(let i = 0; i < 365; i++) {
  initCube({
    count: Math.random() * 30,
    index: i,
  });
}

/**
 * 初始化一个柱
 * @param item 当前项
 */
function initCube(item: any) {
  const cubeSize = 1;
  const colorMap = {
    0: 0xebedf0,
    1: 0x9be9a8,
    2: 0x40c463,
    3: 0x30a14e,
    4: 0x216e39,
  }
  
  let color = colorMap[0];

  if (item.count > 0 && item.count < 5) {
    color = colorMap[1];
  } else if (item.count >= 5 && item.count < 10) {
    color = colorMap[2];
  } else if (item.count >= 10 && item.count < 20) {
    color = colorMap[3];
  } else if (item.count >= 20) {
    color = colorMap[4];
  }
  
  const height = Math.ceil(item.count / 8);
  const cubeMaterial = new THREE.MeshLambertMaterial({color});
  const cubeGeometry = new THREE.CylinderGeometry(cubeSize, cubeSize, height, 4);
  const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

  cube.castShadow = true;
  cube.name = 'cube-' + scene.children.length;

  cube.position.x = -6 + Math.floor(item.index % 7) * 2
  cube.position.y = height / 2;
  cube.position.z = -51 + Math.floor(item.index / 7) * 2
  cube.rotation.y = -0.8;

  scene.add(cube);
}


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


/**
 * 渲染场景和摄像机
 */
document.body.appendChild(renderer. domElement) ; 
renderer.render(scene, camera);