// src/hand.js

export let handX = 0;
export let handY = 0;

const SENS_X = 6; // ปรับความกว้างการเคลื่อนไหว
const SENS_Y = 4; // ปรับความสูงการเคลื่อนไหว

export function initHand(video) {
  const hands = new Hands({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

  hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      // ใช้นิ้วชี้ (index finger tip)
      const p = results.multiHandLandmarks[0][8];

      // ❗ flip แกน X เพื่อให้ตรงกับทิศมือจริง
      handX = -(p.x - 0.5) * SENS_X;
      handY = -(p.y - 0.5) * SENS_Y;
    }
  });

  const camera = new Camera(video, {
    onFrame: async () => {
      await hands.send({ image: video });
    },
    width: 640,
    height: 480
  });

  camera.start();
}
