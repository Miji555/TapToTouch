export let score = 0;
export let combo = 0;
export let hp = 100;

export function hit() {
  combo++;
  score += 10 * combo;
}

export function miss() {
  combo = 0;
  hp -= 10;
}

export function reset() {
  score = 0;
  combo = 0;
  hp = 100;
}
