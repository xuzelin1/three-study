import * as THREE from'three';

const scene = new THREE.Scene();

var renderer= new THREE.WebGLRenderer (); 
renderer.setClearColor(0xEEEEEE);
renderer .setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.x = -30; 
camera.position.y = 40; 
camera.position.z = 30; 
camera.lookAt(scene.position); 

const planeGeometry = new THREE.PlaneGeometry(60, 40);
const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI; 
plane.position.x = 0; 
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(40, 30, 10); 
spotLight.castShadow = true;
scene.add(spotLight);

for(let i = 0; i < 200; i++) {
  addCube();
}

document.body.appendChild(renderer. domElement) ; 
renderer.render(scene, camera );

function addCube (){
  const cubeSize = Math.ceil((Math.random()*3));
  const cubeGeometry = new THREE.CylinderGeometry(cubeSize,cubeSize,cubeSize,4);
  const cubeMaterial = new THREE.MeshLambertMaterial({color:Math.random() * 0xffffff});
  const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

  cube.castShadow = true;
  cube.name = 'cube-' + scene.children.length;
  cube.position.x = -30 + Math.round((Math.random()*60));
  cube.position.y = Math.round((Math.random()*5));
  cube.position.z = -20 + Math.round((Math.random()*40));
  scene.add(cube);
}

function renderScene() {
  scene.traverse(function(e) {
    if (e instanceof THREE.Mesh && e !== plane)  {
      e.rotation.x += 0.02;
      e.rotation.y += 0.02;
      e.rotation.z += 0.02;
    }
  });
  requestAnimationFrame(renderScene); 
  renderer.render(scene, camera);
}

renderScene();

