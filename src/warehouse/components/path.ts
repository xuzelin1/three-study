import * as THREE from'three';

const initialPoints: any = [
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(20, 0, 0),
	new THREE.Vector3(25, 0, 5),
	new THREE.Vector3(20, 0, 10),
	new THREE.Vector3(-20, 0, 10)
];

export default class PathInit {
  /**
   * 场景
   */
  scene;

  /**
   * 路径上的点
   */
  pathPointList: any = [];

  /**
   * 曲线
   */
  curve: THREE.CatmullRomCurve3;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    this.pathPointList = initialPoints.map((pos: any) => {
      return this.addPoint(pos);
    });

    this.curve = new THREE.CatmullRomCurve3(
      this.pathPointList.map((cube: { position: any; }) => cube.position), // 直接绑定方块的position以便后续用方块调整曲线
      false, // 曲线是否闭合
      'catmullrom', // 曲线类型
      0.35,
    );
  }

  addPoint(pos: THREE.Vector3) {
    const geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.copy(pos);
    this.scene.add(cube);
    return cube;
  }

  render() {
  
    const points = this.curve.getPoints(50); // 50等分获取曲线点数组
    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x00ff00 })
    ); // 绘制实体线条，仅用于示意曲线，后面的向量线条同理，相关代码就省略了
    
    this.scene.add(line);
  }

  changePosition (t: number){
    const position = this.curve.getPointAt(t); // t: 当前点在线条上的位置百分比，后面计算
    return position;
  }

  changeLookAt(t: number, position: THREE.Vector3) {
    const tangent = this.curve.getTangentAt(t);
    const lookAtVec = tangent.add(position); // 位置向量和切线向量相加即为所需朝向的点向量
    return lookAtVec;
  }
}




