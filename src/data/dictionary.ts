export type SignCategory = 'Alphabet' | 'Greetings' | 'Emotions' | 'Actions';

export interface SignWord {
  id: string;
  word: string;
  category: SignCategory;
  description: string;
  tips: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const ASL_DICTIONARY: SignWord[] = [
  // ALPHABET (26)
  { id: 'a', word: 'A', category: 'Alphabet', description: 'Make a fist with thumb resting on the side.', tips: 'Keep thumb visible on the side of the fist', difficulty: 'Beginner' },
  { id: 'b', word: 'B', category: 'Alphabet', description: 'Hold all fingers straight up together, thumb crossed over palm.', tips: 'Keep fingers tightly together.', difficulty: 'Beginner' },
  { id: 'c', word: 'C', category: 'Alphabet', description: 'Curve hand to form a C shape.', tips: 'Make a clear half-circle.', difficulty: 'Beginner' },
  { id: 'd', word: 'D', category: 'Alphabet', description: 'Touch thumb to middle, ring, and pinky fingers, with index finger straight up.', tips: 'Ensure index is perfectly straight.', difficulty: 'Beginner' },
  { id: 'e', word: 'E', category: 'Alphabet', description: 'Curl all fingers down to touch thumb.', tips: 'Fingers should look claw-like over the thumb.', difficulty: 'Beginner' },
  { id: 'f', word: 'F', category: 'Alphabet', description: 'Form a circle with thumb and index finger, other fingers straight up.', tips: 'Classic OK sign shape.', difficulty: 'Beginner' },
  { id: 'g', word: 'G', category: 'Alphabet', description: 'Point index finger and thumb horizontally.', tips: 'Like holding a small object.', difficulty: 'Beginner' },
  { id: 'h', word: 'H', category: 'Alphabet', description: 'Extend index and middle fingers horizontally side-by-side.', tips: 'Keep them glued together.', difficulty: 'Beginner' },
  { id: 'i', word: 'I', category: 'Alphabet', description: 'Extend pinky finger straight up, other fingers closed.', tips: 'Keep the pinky strictly vertical.', difficulty: 'Beginner' },
  { id: 'j', word: 'J', category: 'Alphabet', description: 'Make I shape and draw a J in the air.', tips: 'Trace the letter with your pinky.', difficulty: 'Beginner' },
  { id: 'k', word: 'K', category: 'Alphabet', description: 'Extend index and middle fingers in V shape, thumb touches middle finger base.', tips: 'Noticeable split between index and middle.', difficulty: 'Beginner' },
  { id: 'l', word: 'L', category: 'Alphabet', description: 'Extend index finger and thumb perpendicular to each other.', tips: 'Make a clear L shape.', difficulty: 'Beginner' },
  { id: 'm', word: 'M', category: 'Alphabet', description: 'Tuck thumb under three fingers.', tips: 'Thumb should rest between ring and pinky.', difficulty: 'Beginner' },
  { id: 'n', word: 'N', category: 'Alphabet', description: 'Tuck thumb under two fingers.', tips: 'Thumb should rest between middle and ring.', difficulty: 'Beginner' },
  { id: 'o', word: 'O', category: 'Alphabet', description: 'Form circle with all fingertips touching thumb.', tips: 'Making a spyglass shape.', difficulty: 'Beginner' },
  { id: 'p', word: 'P', category: 'Alphabet', description: 'Like K, but pointed downwards.', tips: 'Keep middle finger pointing to ground.', difficulty: 'Beginner' },
  { id: 'q', word: 'Q', category: 'Alphabet', description: 'Like G, but pointed downwards.', tips: 'Index and thumb pointing down.', difficulty: 'Beginner' },
  { id: 'r', word: 'R', category: 'Alphabet', description: 'Cross middle finger over index finger.', tips: 'Like crossing fingers for good luck.', difficulty: 'Beginner' },
  { id: 's', word: 'S', category: 'Alphabet', description: 'Make a fist with thumb wrapped across the front of fingers.', tips: 'Thumb goes across the knuckles.', difficulty: 'Beginner' },
  { id: 't', word: 'T', category: 'Alphabet', description: 'Make a fist with thumb between index and middle fingers.', tips: 'Thumb only crosses index.', difficulty: 'Beginner' },
  { id: 'u', word: 'U', category: 'Alphabet', description: 'Index and middle fingers straight up and squeezed together.', tips: 'Do not separate them.', difficulty: 'Beginner' },
  { id: 'v', word: 'V', category: 'Alphabet', description: 'Index and middle fingers up and separated (peace sign).', tips: 'Clear gap needed.', difficulty: 'Beginner' },
  { id: 'w', word: 'W', category: 'Alphabet', description: 'Index, middle, and ring fingers up and separated.', tips: 'Pinky is held down by thumb.', difficulty: 'Beginner' },
  { id: 'x', word: 'X', category: 'Alphabet', description: 'Make a fist but hook the index finger.', tips: 'Looks like a pirate hook.', difficulty: 'Beginner' },
  { id: 'y', word: 'Y', category: 'Alphabet', description: 'Extend thumb and pinky, curl other fingers.', tips: 'Hang loose sign.', difficulty: 'Beginner' },
  { id: 'z', word: 'Z', category: 'Alphabet', description: 'Use index finger to draw Z in the air.', tips: 'Trace large clear zig-zags.', difficulty: 'Beginner' },

  // GREETINGS
  { id: 'hello', word: 'Hello', category: 'Greetings', description: 'Salute outward from forehead.', tips: 'Smooth, crisp outbound motion.', difficulty: 'Beginner' },
  { id: 'goodbye', word: 'Goodbye', category: 'Greetings', description: 'Open hand, fold fingers down repeatedly.', tips: 'Like a standard wave.', difficulty: 'Beginner' },
  { id: 'morning', word: 'Morning', category: 'Greetings', description: 'Non-dominant arm flat, dominant hand rises up like sun.', tips: 'Imagine the sun rising over the horizon.', difficulty: 'Beginner' },
  { id: 'night', word: 'Night', category: 'Greetings', description: 'Non-dominant arm flat, dominant hand cups over it.', tips: 'Imagine the sun setting over the horizon.', difficulty: 'Beginner' },
  { id: 'please', word: 'Please', category: 'Greetings', description: 'Rub flat hand in circle on chest.', tips: 'Clockwise outward motion.', difficulty: 'Beginner' },
  { id: 'thank_you', word: 'Thank you', category: 'Greetings', description: 'Fingertips start at chin and move outward.', tips: 'Slight head nod adds politeness.', difficulty: 'Beginner' },
  { id: 'sorry', word: 'Sorry', category: 'Greetings', description: 'Rub A-fist in circle on chest.', tips: 'Maintain an apologetic facial expression.', difficulty: 'Beginner' },
  { id: 'welcome', word: 'Welcome', category: 'Greetings', description: 'Sweep hand inward toward your body.', tips: 'Like inviting someone inside.', difficulty: 'Intermediate' },
  { id: 'how_are_you', word: 'How are you?', category: 'Greetings', description: 'Point hands together, roll them outward, point to person.', tips: 'Combine HOW + YOU smoothly.', difficulty: 'Intermediate' },

  // EMOTIONS
  { id: 'happy', word: 'Happy', category: 'Emotions', description: 'Flat hands brush upward on chest repeatedly.', tips: 'Smile broadly while performing.', difficulty: 'Beginner' },
  { id: 'sad', word: 'Sad', category: 'Emotions', description: 'Hold both hands in front of face and pull them downward.', tips: 'Visually pull your facial expression down.', difficulty: 'Beginner' },
  { id: 'angry', word: 'Angry', category: 'Emotions', description: 'Claw hands violently pull upward from stomach/chest.', tips: 'Use aggressive facial expression.', difficulty: 'Intermediate' },
  { id: 'scared', word: 'Scared', category: 'Emotions', description: 'Hands fly inward toward chest, fingers shaking.', tips: 'Eyes wide, body flinching back.', difficulty: 'Intermediate' },
  { id: 'tired', word: 'Tired', category: 'Emotions', description: 'Bent hands touch chest, then shoulders slump and hands roll down.', tips: 'Let your body physically slump.', difficulty: 'Beginner' },
  { id: 'love', word: 'Love', category: 'Emotions', description: 'Cross arms over chest with closed fists.', tips: 'Like giving yourself a tight hug.', difficulty: 'Beginner' },
  { id: 'excited', word: 'Excited', category: 'Emotions', description: 'Middle fingers brush upward alternating on chest rapidly.', tips: 'Bounce slightly!', difficulty: 'Intermediate' },

  // ACTIONS
  { id: 'eat', word: 'Eat', category: 'Actions', description: 'Tap pinched fingers against mouth.', tips: 'Tap twice for eat, once for food.', difficulty: 'Beginner' },
  { id: 'drink', word: 'Drink', category: 'Actions', description: 'Mime holding a cup and tipping it to mouth.', tips: 'Form a clear C shape for the cup.', difficulty: 'Beginner' },
  { id: 'sleep', word: 'Sleep', category: 'Actions', description: 'Hand draws down face, closing fingers into a pinch, while eyes close.', tips: 'Let your head nod down as you pull.', difficulty: 'Beginner' },
  { id: 'work', word: 'Work', category: 'Actions', description: 'Tap S-fist wrists together twice.', tips: 'Dominant hand taps on top.', difficulty: 'Intermediate' },
  { id: 'play', word: 'Play', category: 'Actions', description: 'Shake Y-hands rapidly twist back and forth.', tips: 'Keep arms relaxed.', difficulty: 'Beginner' },
  { id: 'help', word: 'Help', category: 'Actions', description: 'A-fist dominant resting on flat non-dominant palm, lift both up.', tips: 'Direction indicates who is helping who.', difficulty: 'Intermediate' },
  { id: 'stop', word: 'Stop', category: 'Actions', description: 'Sharply chop dominant hand into flat non-dominant palm.', tips: 'Make it a firm, crisp stop.', difficulty: 'Beginner' },
  { id: 'learn', word: 'Learn', category: 'Actions', description: 'Grab from flat palm and pull up to forehead.', tips: 'Imagine taking knowledge and putting it in brain.', difficulty: 'Advanced' }
];
