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
