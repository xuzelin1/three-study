import * as THREE from'three';

interface BoxConfiguration {
  width: number;
  height: number;
  depth: number;
  color?: number;
}
export default ({
  width = 1,
  height = 1,
  depth = 1,
  color = 0xd0ac87,
}: BoxConfiguration) => {
  const boxGeometry = new THREE.BoxGeometry(width, height, depth);
  const boxMaterial = new THREE.MeshLambertMaterial({color: color});

  const box = new THREE.Mesh(boxGeometry, boxMaterial);

  return box;
}