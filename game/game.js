import { scene, camera, renderer } from './scene.js';
import { initHand, handX, handY } from './hand.js';
import { createSword } from './objects.js';

const video = document.createElement('video');
video.style.display = 'none';
document.body.appendChild(video);

initHand(video);

const sword = createSword(scene);

function animate() {
  requestAnimationFrame(animate);

  sword.position.x += (handX - sword.position.x) * 0.3;
  sword.position.y += (handY - sword.position.y) * 0.3;

  renderer.render(scene, camera);
}

animate();
