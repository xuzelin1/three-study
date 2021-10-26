import * as THREE from'three';

function init() {
  const scene = new THREE.Scene();

  // const camera = new THREE.OrthographicCamera(-1, 3, 1.5, -1.5, 1, 10);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10);
  camera.position.set(0, 30, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  const axes = new THREE.AxesHelper();
  scene.add(axes);


  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x6e6e6e);

  const box = new THREE.BoxGeometry(1, 1, 1);
  const baseMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
  const cube = new THREE.Mesh(box, baseMaterial);
  // scene.add(cube);

  const planeG = new THREE.PlaneGeometry(2, 4);
  const plane = new THREE.Mesh(planeG, baseMaterial);
  // scene.add(plane);

  const sphereG = new THREE.SphereGeometry(1, 12, 18);
  const sphere = new THREE.Mesh(sphereG, baseMaterial);
  // scene.add(sphere);

  const lamberM = new THREE.MeshLambertMaterial({
    emissive: 0xff0000,
  });
  const boxG = new THREE.BoxGeometry(1, 1, 1);
  const box2 = new THREE.Mesh(boxG, lamberM);
  scene.add(box2);

  /**
   * 初始化灯光
   */
  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(0, 50, 0); 
  spotLight.castShadow = true;
  scene.add(spotLight);

  /**
   * 渲染场景和摄像机
   */
  document.body.appendChild(renderer.domElement) ; 
  renderer.render(scene, camera);
}

init();