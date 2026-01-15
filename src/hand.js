export let handX = 0;
export let handY = 0;

const SENS_X = 6;
const SENS_Y = 4;

export function initHand(video) {
  const hands = new Hands({
    locateFile: f =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

  hands.onResults(res => {
    if (res.multiHandLandmarks?.length) {
      const p = res.multiHandLandmarks[0][8];
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
