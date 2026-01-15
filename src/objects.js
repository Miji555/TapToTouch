import * as THREE from 'three';

export function createSword(scene) {
  const geo = new THREE.CylinderGeometry(0.05, 0.05, 2);
  const mat = new THREE.MeshBasicMaterial({ color: 0xff4444 });
  const sword = new THREE.Mesh(geo, mat);
  sword.rotation.z = Math.PI / 2;
  sword.position.z = 2;
  scene.add(sword);
  return sword;
}

export function createBlock(scene) {
  const geo = new THREE.OctahedronGeometry(0.4);
  const mat = new THREE.MeshBasicMaterial({
    color: Math.random() > 0.5 ? 0xff4444 : 0x44aaff
  });
  const block = new THREE.Mesh(geo, mat);

  block.position.set(
    (Math.random() - 0.5) * 3,
    (Math.random() - 0.5) * 2,
    -10
  );

  scene.add(block);
  return block;
}
