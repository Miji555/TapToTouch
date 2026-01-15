import * as THREE from 'three';

const loader = new THREE.TextureLoader();

// ---------- FLOOR ----------
export function createFloor(scene) {
  const diffuse = loader.load('/textures/floor_diffuse.jpg');
  const normal = loader.load('/textures/floor_normal.jpg');

  diffuse.wrapS = diffuse.wrapT = THREE.RepeatWrapping;
  diffuse.repeat.set(20, 20);
  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  normal.repeat.set(20, 20);

  const mat = new THREE.MeshStandardMaterial({
    map: diffuse,
    normalMap: normal,
    roughness: 0.4,
    metalness: 0.1
  });

  const geo = new THREE.PlaneGeometry(50, 50);
  const floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1;
  floor.receiveShadow = true;

  scene.add(floor);
}

// ---------- SWORD ----------
export function createSword(scene) {
  const map = loader.load('/textures/sword_diffuse.png');
  const glow = loader.load('/textures/sword_emissive.png');

  const mat = new THREE.MeshStandardMaterial({
    map,
    emissiveMap: glow,
    emissive: new THREE.Color(0xff4444),
    metalness: 0.8,
    roughness: 0.2
  });

  const geo = new THREE.BoxGeometry(0.1, 1.8, 0.1);
  const sword = new THREE.Mesh(geo, mat);
  sword.position.z = 2;
  sword.rotation.z = Math.PI / 2;

  scene.add(sword);
  return sword;
}

// ---------- NOTE / BLOCK ----------
export function createNote(scene, color = 'red') {
  const tex = loader.load(
    color === 'red'
      ? '/textures/note_red.png'
      : '/textures/note_blue.png'
  );

  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emiss
