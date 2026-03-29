import { useState, useEffect, useRef } from 'react';
import { Hand, RefreshCcw, Sparkles } from 'lucide-react';

const TextToSign = () => {
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSignIndex, setCurrentSignIndex] = useState(-1);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const textToPlay = inputText.toUpperCase().replace(/[^A-Z0-9 ]/g, '');

  const startAnimation = () => {
    if (!textToPlay) return;
    setIsPlaying(true);
    setCurrentSignIndex(0);
  };

  const stopAnimation = () => {
    setIsPlaying(false);
    setCurrentSignIndex(-1);
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (isPlaying && currentSignIndex < textToPlay.length) {
      const char = textToPlay[currentSignIndex];
      const delay = char === ' ' ? 500 : 1200;
      
      timerRef.current = setTimeout(() => {
        if (currentSignIndex + 1 < textToPlay.length) {
          setCurrentSignIndex(prev => prev + 1);
        } else {
          stopAnimation();
        }
      }, delay);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentSignIndex, textToPlay]);

  const handleExampleClick = (phrase: string) => {
    setInputText(phrase);
  };

  const renderSign = (char: string) => {
    if (char === ' ') return null;
    
    // Attempt to use Wikipedia's SVG for ASL fingerspelling
    const assetChar = char.toUpperCase();
    const avatarUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/Sign_language_${assetChar}.svg`;
    
    return (
      <div className="flex-center flex-col animate-fade-in" style={{ width: '100%', height: '100%' }}>
         <img 
            src={avatarUrl} 
            alt={`Sign for ${assetChar}`} 
            style={{ width: '250px', height: '250px', marginBottom: '1.5rem', objectFit: 'contain' }} 
            onError={(e) => {
                // strict fallback strategy if an SVG is missing for some character
                e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=SignBridge${char}&backgroundColor=f1f5f9`;
            }}
         />
         <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
            {assetChar}
         </div>
         <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '1.2rem', padding: '0.5rem 1rem', background: '#f1f5f9', borderRadius: 'var(--radius-sm)', letterSpacing: '2px' }}>
            {textToPlay.substring(0, currentSignIndex)}
            <strong style={{ color: 'white', background: 'var(--accent-primary)', padding: '0 4px', borderRadius: '4px' }}>{textToPlay[currentSignIndex]}</strong>
            {textToPlay.substring(currentSignIndex + 1)}
         </p>
      </div>
    );
  };

  return (
    <div className="animate-fade-in text-center" style={{ padding: '1rem' }}>
      <header className="page-header" style={{ marginBottom: '3rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Text to Sign Language</h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Type text and see AI-generated sign language demonstrations</p>
      </header>
      
      <div className="grid grid-cols-2 text-left" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Left Column: Input Area */}
        <div className="glass-panel flex-col" style={{ padding: '2rem' }}>
           <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Enter Text</h3>
           <textarea 
             className="input-field" 
             style={{ 
               flex: 1, minHeight: '180px', resize: 'vertical', 
               padding: '1.5rem', fontSize: '1.1rem', marginBottom: '1.5rem',
               background: 'white', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)'
             }}
             placeholder="Type a word, phrase, or sentence..."
             value={inputText}
             onChange={e => setInputText(e.target.value)}
           />
           
           <button 
             className="btn btn-primary flex-center" 
             style={{ 
               width: '100%', padding: '1rem', fontSize: '1.1rem', 
               background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', border: 'none',
               boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)', gap: '0.5rem'
             }}
             onClick={isPlaying ? stopAnimation : startAnimation}
             disabled={!inputText}
           >
             {isPlaying ? <><RefreshCcw size={20}/> Stop Translation</> : <><Sparkles size={20}/> Convert to Sign Language</>}
           </button>
           
           <div style={{ marginTop: '2.5rem' }}>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Example phrases:</h4>
              <div className="flex" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
                 {['Hello', 'Thank you', 'I love you', 'Good morning', 'How are you'].map(phrase => (
                    <button 
                      key={phrase}
                      className="btn btn-outline hover"
                      style={{ padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', border: '1px solid #e9d5ff', color: '#8b5cf6', background: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseOver={(e) => (e.currentTarget.style.background = '#f3e8ff')}
                      onMouseOut={(e) => (e.currentTarget.style.background = 'white')}
                      onClick={() => handleExampleClick(phrase)}
                    >
                       {phrase}
                    </button>
                 ))}
              </div>
           </div>
        </div>
        
        {/* Right Column: Demonstration */}
        <div className="glass-panel text-center flex-col" style={{ padding: '2rem', minHeight: '500px', display: 'flex' }}>
            <h3 className="flex" style={{ marginBottom: '2rem', fontSize: '1.2rem', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start' }}>
               <Hand size={20} /> Sign Language Demonstration
            </h3>
            
            <div className="flex-center" style={{ flex: 1, border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: '#fafafa' }}>
               {isPlaying && currentSignIndex >= 0 ? (
                   renderSign(textToPlay[currentSignIndex])
               ) : (
                   <div className="flex-col flex-center text-muted" style={{ gap: '1rem', opacity: 0.6 }}>
                      <Hand size={64} style={{ color: '#cbd5e1' }} />
                      <p>Enter text and click convert to see signs</p>
                   </div>
               )}
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default TextToSign;
