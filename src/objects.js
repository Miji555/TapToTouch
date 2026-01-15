export function createSword(scene) {
  const sword = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 1.6, 0.15),
    new THREE.MeshBasicMaterial({ color: 0xff3366 })
  );
  sword.position.z = 1;
  scene.add(sword);
  return sword;
}

export function createBlock(scene) {
  const block = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.6, 0.6),
    new THREE.MeshBasicMaterial({ color: 0x33ccff })
  );

  const lanes = [-2, 0, 2];
  block.position.set(
    lanes[Math.floor(Math.random() * lanes.length)],
    0.5,
    -25
  );

  scene.add(block);
  return block;
}
