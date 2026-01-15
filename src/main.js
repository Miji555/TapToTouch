// src/main.js

import { scene, camera, renderer } from './scene.js';
import { initHand, handX, handY } from './hand.js';
import { createFloor, createSword, createNote } from './objects.js';

// --------------------
// GAME STATE
// --------------------
let state = 'MENU'; // MENU | PLAYING | PAUSED | GAMEOVER
let score = 0;
let combo = 0;
let hp = 100;

let notes = [];

// --------------------
// UI ELEMENTS
// --------------------
const menu = document.getElementById('menu');
const hud = document.getElementById('hud');
const pauseUI = document.getElementById('pause');
const gameoverUI = document.getElementById('gameover');

const scoreText = document.getElementById('scoreText') || document.getElementById('score');
const comboText = document.getElementById('combo');
const finalScore = document.getElementById('finalScore');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const retryBtn = document.getElementById('retryBtn');
const homeBtn = document.getElementById('homeBtn');
const homeBtn2 = document.getElementById('homeBtn2');

// --------------------
// CAMERA (VIDEO)
// --------------------
const video = document.getElementById('camera');
initHand(video);

// --------------------
// SCENE SETUP
// --------------------
createFloor(scene);
const sword = createSword(scene);

// --------------------
// GAME FUNCTIONS
// --------------------
function showUI(name) {
  menu.classList.add('hidden');
  hud.classList.add('hidden');
  pauseUI.classList.add('hidden');
  gameoverUI.classList.add('hidden');

  if (name === 'menu') menu.classList.remove('hidden');
  if (name === 'hud') hud.classList.remove('hidden');
  if (name === 'pause') pauseUI.classList.remove('hidden');
  if (name === 'gameover') gameoverUI.classList.remove('hidden');
}

function resetGame() {
  notes.forEach(n => scene.remove(n));
  notes = [];
  score = 0;
  combo = 0;
  hp = 100;
  updateHUD();
}

function updateHUD() {
  if (scoreText) scoreText.innerText = `Score: ${score}`;
  if (comboText) comboText.innerText = `${combo}x COMBO`;
}

// --------------------
// SPAWN NOTES
// --------------------
setInterval(() => {
  if (state === 'PLAYING') {
    const color = Math.random() > 0.5 ? 'red' : 'blue';
    notes.push(createNote(scene, color));
  }
}, 900);

// --------------------
// UI EVENTS
// --------------------
startBtn.onclick = () => {
  resetGame();
  state = 'PLAYING';
  showUI('hud');
};

pauseBtn.onclick = () => {
  state = 'PAUSED';
  showUI('pause');
};

resumeBtn.onclick = () => {
  state = 'PLAYING';
  showUI('hud');
};

retryBtn.onclick = () => {
  resetGame();
  state = 'PLAYING';
  showUI('hud');
};

homeBtn.onclick = homeBtn2.onclick = () => {
  state = 'MENU';
  showUI('menu');
};

// --------------------
// GAME OVER
// --------------------
function gameOver() {
  state = 'GAMEOVER';
  finalScore.innerText = `Score: ${score}`;
  showUI('gameover');
}

// --------------------
// MAIN LOOP
// --------------------
function animate() {
  requestAnimationFrame(animate);

  if (state === 'PLAYING') {
    // sword follows hand
    sword.position.x += (handX - sword.position.x) * 0.4;
    sword.position.y += (handY - sword.position.y) * 0.4;

    notes = notes.filter(note => {
      note.position.z += 0.6;

      const hit =
        Math.abs(note.position.x - sword.position.x) < 0.6 &&
        Math.abs(note.position.y - sword.position.y) < 0.6 &&
        Math.abs(note.position.z - sword.position.z) < 0.6;

      if (hit) {
        scene.remove(note);
        score += 10;
        combo++;
        updateHUD();
        return false;
      }

      if (note.position.z > camera.position.z + 1) {
        scene.remove(note);
        combo = 0;
        hp -= 20;
        updateHUD();

        if (hp <= 0) gameOver();
        return false;
      }

      return true;
    });
  }

  renderer.render(scene, camera);
}

// --------------------
showUI('menu');
animate();
