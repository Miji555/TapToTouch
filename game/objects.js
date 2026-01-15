export function createSword(scene) {
  const sword = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 1.2, 0.15),
    new THREE.MeshBasicMaterial({ color: 0xff4444 })
  );
  scene.add(sword);
  return sword;
}
