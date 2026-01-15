// src/main.js

import { scene, camera, renderer } from './scene.js';
import { initHand, handX, handY } from './hand.js';
import { createSword, createBlock } from './objects.js';
import { UI, show } from './ui.js';

// --------------------
// GAME STATE
// --------------------
let state = 'MENU'; // MENU | PLAYING | PAUSED | GAMEOVER
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;

UI.bestScore.innerText = `Best Score: ${bestScore}`;

// --------------------
// CAMERA (VIDEO)
// --------------------
const video = document.getElementById('camera');
initHand(video);

// --------------------
// GAME OBJECTS
// --------------------
const sword = createSword(scene);
let blocks = [];

// --------------------
// GAME CONTROL
// --------------------
function resetGame() {
  blocks.forEach(b => scene.remove(b));
  blocks = [];
  score = 0;
  UI.scoreText.innerText = 'Score: 0';
}

// spawn block
setInterval(() => {
  if (state === 'PLAYING') {
    blocks.push(createBlock(scene));
  }
}, 900);

// --------------------
// UI EVENTS
// --------------------
UI.startBtn.onclick = () => {
  resetGame();
  state = 'PLAYING';
  show('hud');
};

UI.pauseBtn.onclick = () => {
  state = 'PAUSED';
  show('pause');
};

UI.resumeBtn.onclick = () => {
  state = 'PLAYING';
  show('hud');
};

UI.retryBtn.onclick = () => {
  resetGame();
  state = 'PLAYING';
  show('hud');
};

UI.homeBtn.onclick = UI.homeBtn2.onclick = () => {
  state = 'MENU';
  show('menu');
};

// --------------------
// GAME OVER
// --------------------
function gameOver() {
  state = 'GAMEOVER';
  UI.finalScore.innerText = `Score: ${score}`;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
    UI.bestScore.innerText = `Best Score: ${bestScore}`;
  }

  show('gameover');
}

// --------------------
// MAIN LOOP
// --------------------
function animate() {
  requestAnimationFrame(animate);

  if (state === 'PLAYING') {
    // sword follow hand
    sword.position.x += (handX - sword.position.x) * 0.4;
    sword.position.y += (handY - sword.position.y) * 0.4;

    blocks = blocks.filter(b => {
      b.position.z += 0.7;

      const hit =
        Math.abs(b.position.x - sword.position.x) < 0.5 &&
        Math.abs(b.position.y - sword.position.y) < 0.8 &&
        Math.abs(b.position.z - sword.position.z) < 0.6;

      if (hit) {
        scene.remove(b);
        score++;
        UI.scoreText.innerText = `Score: ${score}`;
        return false;
      }

      if (b.position.z > 6) {
        scene.remove(b);
        gameOver();
        return false;
      }

      return true;
    });
  }

  renderer.render(scene, camera);
}

// --------------------
show('menu');
animate();
