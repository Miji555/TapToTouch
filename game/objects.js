export function createSword(scene) {
  const sword = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 1.2, 0.15),
    new THREE.MeshBasicMaterial({ color: 0xff4444 })
  );
  scene.add(sword);
  return sword;
}

export function createTarget(scene) {
  const target = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x44aaff })
  );
  target.position.set(
    (Math.random() - 0.5) * 6,
    Math.random() * 3,
    -20
  );
  scene.add(target);
  return target;
}
