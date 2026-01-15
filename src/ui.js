export const UI = {
  hpBar: document.getElementById('hp'),
  score: document.getElementById('score'),
  combo: document.getElementById('combo'),
};

export function updateUI({ hp, score, combo }) {
  UI.hpBar.style.width = hp + '%';
  UI.score.innerText = score;
  UI.combo.innerText = combo + 'x COMBO';
}
<div id="hud">
  <div id="hp-container">
    <div id="hp"></div>
  </div>
  <div>
    <h1 id="score">0</h1>
    <p id="combo">0x COMBO</p>
  </div>
  <button id="pauseBtn">⏸</button>
</div>
