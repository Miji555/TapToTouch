import * as THREE from 'three';

export const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 5, 20);

export const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.5, 5);

export const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dir = new THREE.DirectionalLight(0x66ccff, 1);
dir.position.set(0, 5, 5);
scene.add(dir);

// Grid floor
const grid = new THREE.GridHelper(40, 40, 0x1e90ff, 0x0a2a44);
grid.position.y = -1;
scene.add(grid);
