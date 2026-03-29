import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';

let gestureRecognizer: GestureRecognizer | null = null;
let isInitializing = false;

export const initializeGestureRecognizer = async () => {
  if (gestureRecognizer) return gestureRecognizer;
  if (isInitializing) {
    while (isInitializing) {
      await new Promise(r => setTimeout(r, 100));
    }
    return gestureRecognizer;
  }
  
  isInitializing = true;
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numHands: 1,
    });
    
    return gestureRecognizer;
  } finally {
    isInitializing = false;
  }
};

// Extremely robust hand-size normalized heuristic for ASL alphabet
export const detectASLAlphabet = (landmarks: {x: number, y: number, z: number}[]) => {
   if (!landmarks || landmarks.length < 21) return null;
   
   // Key landmark indexes
   // WRIST=0
   // THUMB: 1, 2, 3, 4(tip)
   // INDEX: 5, 6, 7, 8(tip)
   // MIDDLE: 9, 10, 11, 12(tip)
   // RING: 13, 14, 15, 16(tip)
   // PINKY: 17, 18, 19, 20(tip)
   
   // Raw Euclidean distance
   const dist = (i: number, j: number) => {
      const dx = landmarks[i].x - landmarks[j].x;
      const dy = landmarks[i].y - landmarks[j].y;
      return Math.sqrt(dx * dx + dy * dy);
   };
   
   // Determine baseline hand size using Wrist (0) to Middle Finger Base (9). This serves as our "1.0" unit length.
   const handSize = dist(0, 9);
   if (handSize === 0) return null; // Prevent div zero

   // Instead of absolute UP/DOWN checks which break on camera tilt or hand rotation, 
   // we define a finger as "Extended" if its TIP is mathematically further from the WRIST than its PIP joint.
   const isExtended = (tip: number, pip: number) => dist(0, tip) > dist(0, pip) * 1.15;
   
   const indexExtended = isExtended(8, 6);
   const middleExtended = isExtended(12, 10);
   const ringExtended = isExtended(16, 14);
   const pinkyExtended = isExtended(20, 18);
   
   // Normalized Distances
   const thumbToIndex = dist(4, 8) / handSize;
   const thumbToMiddle = dist(4, 12) / handSize;
   const indexToMiddle = dist(8, 12) / handSize;
   const thumbToRingBase = dist(4, 13) / handSize;
   
   // Thumb states relative to hand size
   // Tucked: Thumb tip is folded across the palm towards the bases of the other fingers
   const thumbTucked = thumbToRingBase < 1.0; 
   
   // Out: Thumb is sticking out far from the hand
   const thumbOut = dist(4, 5) / handSize > 1.2;

   // ===========================
   // ASL Detection Logic
   // ===========================

   // C shape: Fingers are curled (not fully extended) forming a semi-circle. 
   // The gap between index tip and thumb tip is roughly the size of the palm (0.45 to 2.0 units).
   const isCShape = !indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbToIndex > 0.45;
   if (isCShape) return 'C';
   
   // O shape: thumb and index (and others) pinch together. Gap is near 0.
   const isOShape = !indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbToIndex <= 0.45 && thumbToMiddle <= 0.45;
   if (isOShape) return 'O';

   // B: All fingers firmly extended straight, thumb is tucked against the palm
   if (indexExtended && middleExtended && ringExtended && pinkyExtended && thumbTucked) return 'B';

   // E: All fingers curled tightly into palm. Tips are close to wrist.
   const areTipsCloseToWrist = dist(8, 0)/handSize < 1.3 && dist(12, 0)/handSize < 1.3;
   if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && areTipsCloseToWrist && thumbTucked && thumbToIndex <= 0.45) return 'E';

   // A: Fist with thumb against the side (not tucked into palm, but pointing parallel). 
   // Index is curled. Thumb tip is further from the index base than when tucked.
   if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && !thumbTucked && !thumbOut) return 'A';

   // D: Index extended ONLY. Thumb touching middle/ring.
   if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbToMiddle < 0.5) return 'D';
   
   // F: Index tip touches thumb tip (OK sign). Middle, ring, pinky extended
   if (!indexExtended && middleExtended && ringExtended && pinkyExtended && thumbToIndex < 0.4) return 'F';
   
   // I: Only pinky extended
   if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended) return 'I';
   
   // L: Index UP, Thumb OUT (Right angle). Others curled
   if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbOut) return 'L';
   
   // W: Index, Middle, Ring UP. Pinky curled. Thumb tucked.
   if (indexExtended && middleExtended && ringExtended && !pinkyExtended && thumbTucked) return 'W';
   
   // Y: Thumb and Pinky extended, others curled
   if (!indexExtended && !middleExtended && !ringExtended && pinkyExtended && thumbOut) return 'Y';
   
   // K: Index and Middle up. Split apart. Thumb rests between them.
   if (indexExtended && middleExtended && !ringExtended && !pinkyExtended && indexToMiddle > 0.4 && thumbToIndex < 0.8) return 'K';
   
   // V: Index and Middle up. Fingers spread apart.
   if (indexExtended && middleExtended && !ringExtended && !pinkyExtended && indexToMiddle > 0.4) return 'V';
   
   // U: Index and Middle up, perfectly glued together
   if (indexExtended && middleExtended && !ringExtended && !pinkyExtended && indexToMiddle <= 0.4) return 'U';

   return null;
};

export const predictGesture = (videoElement: HTMLVideoElement, timestamp: number) => {
  if (!gestureRecognizer) return null;
  return gestureRecognizer.recognizeForVideo(videoElement, timestamp);
};
