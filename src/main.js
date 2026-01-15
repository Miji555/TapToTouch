import { scene, camera, renderer } from './scene.js';
import { initHand, handX, handY } from './hand.js';
import { createSword, createBlock } from './objects.js';

const video = document.createElement('video');
video.style.display = 'none';
document.body.appendChild(video);
initHand(video);

const sword = createSword(scene);

let blocks = [];
let score = 0;
let flash = 0;

const ui = document.getElementById('ui');

setInterval(() => {
  blocks.push(createBlock(scene));
}, 900);

function animate() {
  requestAnimationFrame(animate);

  // sword follow hand
  sword.position.x += (handX - sword.position.x) * 0.45;
  sword.position.y += (handY - sword.position.y) * 0.45;

  blocks = blocks.filter(b => {
    b.position.z += 0.75;

    const hit =
      Math.abs(b.position.x - sword.position.x) < 0.5 &&
      Math.abs(b.position.y - sword.position.y) < 0.8 &&
      Math.abs(b.position.z - sword.position.z) < 0.6;

    if (hit) {
      scene.remove(b);
      score++;
      flash = 1;
      ui.innerText = `Score: ${score}`;
      return false;
    }

    if (b.position.z > 6) {
      scene.remove(b);
      return false;
    }

    return true;
  });

  if (flash > 0) {
    renderer.setClearColor(0x220011);
    flash -= 0.1;
  } else {
    renderer.setClearColor(0x000000);
  }

  renderer.render(scene, camera);
}

animate();
