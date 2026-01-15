import { scene, camera, renderer } from './scene.js';
import { initHand, handX, handY } from './hand.js';
import { createSword, createTarget } from './objects.js';

const video = document.createElement('video');
video.style.display = 'none';
document.body.appendChild(video);
initHand(video);

const sword = createSword(scene);

let targets = [];
let score = 0;

const scoreDiv = document.createElement('div');
scoreDiv.style.position = 'fixed';
scoreDiv.style.top = '40px';
scoreDiv.style.left = '50%';
scoreDiv.style.transform = 'translateX(-50%)';
scoreDiv.style.color = 'white';
scoreDiv.style.fontFamily = 'sans-serif';
scoreDiv.innerText = 'Score: 0';
document.body.appendChild(scoreDiv);

// spawn target ทุก 1 วินาที
setInterval(() => {
  targets.push(createTarget(scene));
}, 1000);

function animate() {
  requestAnimationFrame(animate);

  // ขยับดาบตามมือ
  sword.position.x += (handX - sword.position.x) * 0.3;
  sword.position.y += (handY - sword.position.y) * 0.3;

  // ขยับเป้า + ตรวจชน
  targets = targets.filter(t => {
    t.position.z += 0.4;

    const hit =
      Math.abs(t.position.x - sword.position.x) < 0.5 &&
      Math.abs(t.position.y - sword.position.y) < 0.8 &&
      Math.abs(t.position.z - sword.position.z) < 0.5;

    if (hit) {
      scene.remove(t);
      score++;
      scoreDiv.innerText = `Score: ${score}`;
      return false;
    }

    if (t.position.z > 5) {
      scene.remove(t);
      return false;
    }

    return true;
  });

  renderer.render(scene, camera);
}

animate();
