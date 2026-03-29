import { useState } from 'react';
import { Search, Info, CheckCircle, X, Book, Type, Hand, Smile, Activity } from 'lucide-react';
import { ASL_DICTIONARY, type SignCategory, type SignWord } from '../data/dictionary';

const Dictionary = () => {
  const [activeTab, setActiveTab] = useState<'All Signs' | SignCategory>('All Signs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<SignWord | null>(null);

  const categories: ('All Signs' | SignCategory)[] = ['All Signs', 'Alphabet', 'Greetings', 'Emotions', 'Actions'];

  const filteredWords = ASL_DICTIONARY.filter(word => {
    const matchesTab = activeTab === 'All Signs' || word.category === activeTab;
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="dictionary-page animate-fade-in pb-10">
      
      {/* HEADER */}
      <div className="text-center" style={{ marginBottom: '3rem', marginTop: '2rem' }}>
         <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Sign Dictionary</h1>
         <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Browse all ASL signs with descriptions, tips, and demonstrations</p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
         <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
               type="text" 
               className="input-field" 
               placeholder="Search any sign, letter, or word..." 
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
               style={{ paddingLeft: '3.5rem', paddingRight: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)', background: 'white', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
            />
         </div>
         
         <div className="flex-center" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(tab => (
               <button 
                  key={tab}
                  className="btn"
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                     padding: '0.6rem 1.2rem', 
                     fontSize: '0.9rem', 
                     fontWeight: activeTab === tab ? 700 : 500,
                     borderRadius: 'var(--radius-full)',
                     display: 'flex', alignItems: 'center', gap: '0.4rem',
                     background: activeTab === tab ? '#3b82f6' : 'transparent',
                     color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                     border: activeTab === tab ? 'none' : '1px solid transparent',
                     transition: 'all 0.2s'
                  }}
               >
                  {tab === 'All Signs' && <Book size={16} />}
                  {tab === 'Alphabet' && <Type size={16} />}
                  {tab === 'Greetings' && <Hand size={16} />}
                  {tab === 'Emotions' && <Smile size={16} />}
                  {tab === 'Actions' && <Activity size={16} />}
                  {tab}
               </button>
            ))}
         </div>
      </div>

      {/* GRID */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
         {filteredWords.map(word => {
            const isAlphabet = word.category === 'Alphabet';
            const avatarUrl = isAlphabet 
                ? `https://commons.wikimedia.org/wiki/Special:FilePath/Sign_language_${word.word.toUpperCase()}.svg`
                : `https://api.dicebear.com/7.x/bottts/svg?seed=SignBridge${word.word}&backgroundColor=f8fafc`;

            return (
               <div 
                  key={word.id} 
                  className="glass-card flex-col block-hover" 
                  onClick={() => setSelectedWord(word)}
                  style={{ 
                     background: 'white', borderRadius: 'var(--radius-lg)', 
                     overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer',
                     padding: '1.5rem', textAlign: 'center'
                  }}
               >
                  <div className="flex-center mx-auto" style={{ width: '120px', height: '120px', background: isAlphabet ? 'transparent' : '#f8fafc', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                     <img 
                        src={avatarUrl} 
                        alt={word.word} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=SignBridge${word.word}&backgroundColor=f1f5f9`; }}
                     />
                  </div>
                  
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{word.word}</h3>
                  <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', background: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', marginBottom: '1rem' }}>
                     {word.category.toLowerCase()}
                  </div>
                  
                  <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                     {word.description}
                  </p>
               </div>
            );
         })}
      </div>

      {filteredWords.length === 0 && (
         <div className="text-center text-muted" style={{ padding: '4rem' }}>
            <Search size={48} className="mx-auto" style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>No signs found</h3>
            <p>We couldn't find any signs matching "{searchQuery}"</p>
         </div>
      )}

      {/* DETAIL MODAL (Matching Image 1) */}
      {selectedWord && (
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="animate-fade-in" style={{ background: 'white', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
               
               {/* Modal Header */}
               <div className="flex-between" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div className="flex" style={{ alignItems: 'center', gap: '0.75rem' }}>
                     <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedWord.word}</h2>
                     <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', background: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                        {selectedWord.category.toLowerCase()}
                     </span>
                  </div>
                  <button onClick={() => setSelectedWord(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                     <X size={24} />
                  </button>
               </div>

               {/* Modal Body */}
               <div style={{ padding: '1.5rem' }}>
                  
                  <div className="flex-center" style={{ width: '100%', height: '250px', background: '#f5f3ff', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
                     {selectedWord.category === 'Alphabet' ? (
                        <img 
                           src={`https://commons.wikimedia.org/wiki/Special:FilePath/Sign_language_${selectedWord.word.toUpperCase()}.svg`}
                           alt={selectedWord.word}
                           style={{ width: '180px', height: '180px', objectFit: 'contain' }}
                           onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=SignBridge${selectedWord.word}&backgroundColor=f1f5f9`; }}
                        />
                     ) : (
                        <h1 style={{ fontSize: '6rem', color: '#8b5cf6', fontWeight: 800 }}>{selectedWord.word}</h1>
                     )}
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                     <h3 className="flex" style={{ gap: '0.5rem', fontSize: '1.1rem', fontWeight: 700, alignItems: 'center', marginBottom: '0.75rem' }}>
                        <Info size={18} color="#3b82f6" /> How to perform
                     </h3>
                     <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                        {selectedWord.description}
                     </p>
                  </div>

                  {/* Tips Alert */}
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem', marginBottom: '2rem' }}>
                     <h4 style={{ color: '#b45309', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                        💡 Pro Tips
                     </h4>
                     <p style={{ color: '#b45309', fontSize: '0.9rem' }}>{selectedWord.tips}</p>
                  </div>
                  
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                     Difficulty: <strong style={{ color: 'var(--text-primary)' }}>{selectedWord.difficulty}</strong>
                  </div>

               </div>

               {/* Modal Footer */}
               <div className="flex-between" style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: '#f8fafc', borderBottomLeftRadius: 'var(--radius-xl)', borderBottomRightRadius: 'var(--radius-xl)' }}>
                  <button className="btn hover" style={{ background: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 600 }}>
                     <CheckCircle size={18} /> Mark as Mastered
                  </button>
                  <button className="btn btn-outline hover" onClick={() => setSelectedWord(null)} style={{ padding: '0.75rem 2rem', fontWeight: 600 }}>
                     Close
                  </button>
               </div>
               
            </div>
         </div>
      )}
    </div>
  );
};

export default Dictionary;
