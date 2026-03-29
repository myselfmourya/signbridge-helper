import { useState } from 'react';
import { Volume2, Trash2 } from 'lucide-react';

const TextToSpeech = () => {
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('en-IN');
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);

  const handleSpeak = () => {
    if (!inputText) return;
    
    // Web Speech API allows tweaking rate and pitch via the utterance object.
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === language || v.lang.startsWith(language.split('-')[0]));
    if (voice) utterance.voice = voice;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    setInputText('');
    window.speechSynthesis.cancel();
  };

  return (
    <div className="animate-fade-in text-center" style={{ padding: '1rem' }}>
      <header className="page-header" style={{ marginBottom: '3rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Text to Speech</h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Convert text to speech in multiple Indian languages</p>
      </header>
      
      <div className="glass-panel text-left" style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem' }}>
           
           <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Enter Text to Speak</h3>
           <textarea 
             className="input-field" 
             style={{ 
               minHeight: '220px', resize: 'vertical', 
               padding: '1.5rem', fontSize: '1.1rem', marginBottom: '2rem',
               background: '#f8fafc', border: '1px solid var(--border-color)', boxShadow: 'none'
             }}
             placeholder="Type your message here..."
             value={inputText}
             onChange={e => setInputText(e.target.value)}
           />
           
           <div className="grid grid-cols-2" style={{ gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                 <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Language
                 </label>
                 <select 
                   className="input-field" 
                   value={language} 
                   onChange={e => setLanguage(e.target.value)}
                   style={{ background: 'white' }}
                 >
                   <option value="en-IN">English (India)</option>
                   <option value="hi-IN">Hindi</option>
                   <option value="ta-IN">Tamil</option>
                   <option value="te-IN">Telugu</option>
                 </select>
              </div>
              
              <div className="flex-col" style={{ gap: '1rem' }}>
                 <div>
                    <label className="flex-between" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                       <span>Speech Rate: {rate.toFixed(1)}x</span>
                    </label>
                    <input 
                      type="range" min="0.5" max="2" step="0.1" 
                      value={rate} onChange={e => setRate(parseFloat(e.target.value))} 
                      style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                    />
                 </div>
                 
                 <div>
                    <label className="flex-between" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', marginTop: '1rem' }}>
                       <span>Pitch: {pitch.toFixed(1)}</span>
                    </label>
                    <input 
                      type="range" min="0" max="2" step="0.1" 
                      value={pitch} onChange={e => setPitch(parseFloat(e.target.value))} 
                      style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                    />
                 </div>
              </div>
           </div>
           
           <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />
           
           <div className="grid grid-cols-2" style={{ gridTemplateColumns: '3fr 1fr', gap: '1rem' }}>
              <button 
                className="btn btn-primary flex-center" 
                style={{ 
                  padding: '1rem', fontSize: '1.1rem', 
                  background: 'linear-gradient(135deg, #f87171, #f43f5e)', border: 'none',
                  gap: '0.5rem'
                }}
                onClick={handleSpeak}
                disabled={!inputText}
              >
                <Volume2 size={20}/> Speak Text
              </button>
              
              <button 
                className="btn btn-outline flex-center" 
                style={{ padding: '1rem', fontSize: '1.1rem' }}
                onClick={handleClear}
                disabled={!inputText}
              >
                <Trash2 size={20}/> Clear Text
              </button>
           </div>
           
           <div style={{ marginTop: '3rem' }}>
              <h4 style={{ color: '#c2410c', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>Common Phrases:</h4>
              <div className="flex" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
                 {['Thank you very much', 'Can you please repeat that?', 'I need assistance', 'Yes, I understand', 'No problem'].map(phrase => (
                    <button 
                      key={phrase}
                      className="btn"
                      style={{ padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', background: '#fff7ed', color: '#c2410c', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid #fed7aa' }}
                      onMouseOver={(e) => (e.currentTarget.style.background = '#ffedd5')}
                      onMouseOut={(e) => (e.currentTarget.style.background = '#fff7ed')}
                      onClick={() => setInputText(phrase)}
                    >
                       {phrase}
                    </button>
                 ))}
              </div>
           </div>
           
      </div>
    </div>
  );
};

export default TextToSpeech;
