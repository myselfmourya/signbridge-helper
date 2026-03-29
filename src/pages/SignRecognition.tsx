import { useEffect, useRef, useState, useCallback } from 'react';
import { initializeGestureRecognizer, predictGesture, detectASLAlphabet } from '../services/mediapipe';
import { speakText, copyToClipboard } from '../services/speech';
import { Volume2, Copy, Camera as CameraIcon, AlertCircle, Trash2 } from 'lucide-react';

// Map MediaPipe default gestures to ASL letters or commonly understood phrases
const GESTURE_MAP: Record<string, string> = {
  'Closed_Fist': 'A',
  'Open_Palm': '5',
  'Pointing_Up': 'D',
  'Thumb_Up': 'Good',
  'Thumb_Down': 'Bad',
  'Victory': 'V',
  'ILoveYou': 'I love you'
};

const SignRecognition = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const isActiveRef = useRef(false);
  const [textBuffer, setTextBuffer] = useState('');
  const requestRef = useRef<number | undefined>(undefined);
  const lastVideoTime = useRef(-1);
  const historyPool = useRef<string[]>([]);
  const lastAppendedTime = useRef(0);
  const lastAppendedGesture = useRef<string | null>(null);

  const stopCamera = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    isActiveRef.current = false;
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeGestureRecognizer();
        setIsInitializing(false);
      } catch (err) {
        console.error("Failed to initialize MediaPipe", err);
      }
    };
    init();
    
    return () => stopCamera();
  }, [stopCamera]);

  const appendText = useCallback(async (newWord: string) => {
    setTextBuffer(prev => {
      const separator = (newWord.length === 1 && prev.length > 0 && prev[prev.length - 1] !== ' ') ? '' : ' ';
      return (prev + separator + newWord).trim();
    });
  }, []);

  const predictWebcam = useCallback(async () => {
    if (!videoRef.current || !isActiveRef.current) return;

    const startTimeMs = performance.now();
    if (videoRef.current.currentTime !== lastVideoTime.current) {
      lastVideoTime.current = videoRef.current.currentTime;
      const results = predictGesture(videoRef.current, startTimeMs);
      
      if (results && results.landmarks && results.landmarks.length > 0) {
        let mappedGesture: string | null = null;
        
        mappedGesture = detectASLAlphabet(results.landmarks[0]);
        
        if (!mappedGesture && results.gestures && results.gestures.length > 0) {
          const gesture = results.gestures[0][0];
          if (gesture.categoryName !== 'None' && gesture.score > 0.6) {
             mappedGesture = GESTURE_MAP[gesture.categoryName] || gesture.categoryName;
          }
        }
        
        if (mappedGesture) {
            historyPool.current.push(mappedGesture);
            if (historyPool.current.length > 30) {
               historyPool.current.shift();
            }
            
            const now = Date.now();
            if (now - lastAppendedTime.current > 2500) {
                const counts: Record<string, number> = {};
                let maxCount = 0;
                let topGesture = '';
                
                for (const g of historyPool.current) {
                    counts[g] = (counts[g] || 0) + 1;
                    if (counts[g] > maxCount) {
                        maxCount = counts[g];
                        topGesture = g;
                    }
                }
                
                if (maxCount >= 18) {
                    if (topGesture !== lastAppendedGesture.current || now - lastAppendedTime.current > 5000) {
                       appendText(topGesture);
                       lastAppendedGesture.current = topGesture;
                       lastAppendedTime.current = now;
                       historyPool.current = []; 
                    }
                }
            }
        } else {
            if (historyPool.current.length > 0) historyPool.current.shift();
            lastAppendedGesture.current = null;
        }
      }
    }
    // eslint-disable-next-line
    requestRef.current = requestAnimationFrame(() => predictWebcam());
  }, [appendText]);

  const startCamera = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720, facingMode: 'user' } 
      });
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener('loadeddata', predictWebcam);
      setIsActive(true);
      isActiveRef.current = true;
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Camera access denied or unavailable.");
    }
  }, [predictWebcam]);

  const toggleCamera = useCallback(() => {
    if (isActive) stopCamera();
    else startCamera();
  }, [isActive, stopCamera, startCamera]);


  return (
    <div className="animate-fade-in" style={{ padding: '0 1rem' }}>
      <div className="grid grid-cols-2" style={{ gridTemplateColumns: 'minmax(350px, 1fr) minmax(400px, 1fr)', gap: '2rem' }}>
        
        {/* Left Col: Camera Feed */}
        <div className="flex-col" style={{ gap: '1.5rem' }}>
           <div className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 className="flex" style={{ gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <CameraIcon size={20} /> Camera Feed
              </h3>
              
              <div 
                 className="flex-center flex-col" 
                 style={{ 
                    width: '100%', height: '320px', backgroundColor: '#0f172a', 
                    borderRadius: 'var(--radius-md)', position: 'relative', overflow: 'hidden', padding: 0 
                 }}
              >
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    style={{ 
                      width: '100%', height: '100%', objectFit: 'cover', 
                      transform: 'scaleX(-1)', display: isActive ? 'block' : 'none' 
                    }}
                  />
                  {!isActive && (
                      <div className="flex-col flex-center" style={{ color: 'var(--text-muted)', gap: '1rem' }}>
                         <CameraIcon size={48} opacity={0.5} />
                         <span style={{ fontWeight: 500 }}>{isInitializing ? 'Initializing AI Models...' : 'Camera not active'}</span>
                      </div>
                  )}
              </div>
              
              <button 
                className={`btn ${isActive ? 'btn-outline' : 'btn-primary'}`} 
                style={{ width: '100%', marginTop: '1.5rem', padding: '0.85rem' }} 
                onClick={toggleCamera}
                disabled={isInitializing}
              >
                 <CameraIcon size={18} /> {isActive ? 'Stop Camera' : 'Start Camera'}
              </button>
           </div>
           
           <div className="glass-panel text-sm" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', background: '#f8fafc', color: 'var(--text-secondary)' }}>
              <AlertCircle size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              <div>
                 <strong>Tips for best results:</strong> Good lighting, hand centered in frame, hold each sign steady for 2-3 seconds before next sign.
              </div>
           </div>
        </div>

        {/* Right Col: Recognized Text */}
        <div className="glass-panel flex-col" style={{ background: 'white', padding: '1.5rem' }}>
           <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3>Recognized Text</h3>
           </div>
           
           <textarea 
             className="input-field" 
             style={{ 
               flex: 1, minHeight: '200px', resize: 'none', 
               fontSize: '1.1rem', padding: '1.5rem', marginBottom: '1rem',
               background: '#f8fafc', border: '1px solid var(--border-color)'
             }}
             placeholder="Recognized signs will appear here automatically during live recognition. You can also edit manually."
             value={textBuffer}
             onChange={e => setTextBuffer(e.target.value)}
           />
           
           <div className="grid grid-cols-3" style={{ gridTemplateColumns: '1fr 1fr auto', gap: '1rem', marginBottom: '2rem' }}>
              <button className="btn btn-outline" onClick={() => copyToClipboard(textBuffer)} disabled={!textBuffer}>
                 <Copy size={16} /> Copy
              </button>
              <button className="btn btn-outline" onClick={() => speakText(textBuffer, 'en')} disabled={!textBuffer}>
                 <Volume2 size={16} /> Speak
              </button>
              <button className="btn btn-icon" onClick={() => setTextBuffer('')} disabled={!textBuffer} title="Clear Text">
                 <Trash2 size={18} />
              </button>
           </div>
           
           <div className="instructions-panel" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>How to use:</h4>
              <ol style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                 <li>Click <strong>Start Camera</strong> to activate your webcam</li>
                 <li>Position your hand clearly in the center of the frame</li>
                 <li>AI detects your sign and adds it automatically to the text box</li>
                 <li>Hold each sign for ~2 seconds</li>
                 <li>Click <strong>Speak</strong> to hear the full sentence</li>
              </ol>
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default SignRecognition;
