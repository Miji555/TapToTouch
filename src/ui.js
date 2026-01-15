export const UI = {
  menu: document.getElementById('menu'),
  hud: document.getElementById('hud'),
  pause: document.getElementById('pause'),
  gameover: document.getElementById('gameover'),

  scoreText: document.getElementById('scoreText'),
  finalScore: document.getElementById('finalScore'),
  bestScore: document.getElementById('bestScore'),

  startBtn: document.getElementById('startBtn'),
  pauseBtn: document.getElementById('pauseBtn'),
  resumeBtn: document.getElementById('resumeBtn'),
  retryBtn: document.getElementById('retryBtn'),
  homeBtn: document.getElementById('homeBtn'),
  homeBtn2: document.getElementById('homeBtn2'),
};

export function show(screen) {
  UI.menu.classList.add('hidden');
  UI.hud.classList.add('hidden');
  UI.pause.classList.add('hidden');
  UI.gameover.classList.add('hidden');

  UI[screen].classList.remove('hidden');
}
