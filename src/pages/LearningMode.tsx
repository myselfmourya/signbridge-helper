import { useState } from 'react';
import { createPortal } from 'react-dom';
import { getProgress, markLessonAsMastered, type UserProgressType } from '../services/progress';
import { Search, ListFilter, PlayCircle, Eye, Type, Hash, MessageSquare, Mic, X, Info, CheckCircle } from 'lucide-react';
import { ASL_DICTIONARY } from '../data/dictionary';

const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const numbers = Array.from({ length: 10 }, (_, i) => String(i));
const commonWords = [
  'Hi', 'Hello', 'Good Morning', 'Good Night', 'Please', 'Thank you', 'Sorry', 
  'Yes', 'No', 'Help', 'Friend', 'Family', 'Love', 'Happy', 'Sad', 'Eat', 
  'Drink', 'Water', 'More', 'Done', 'Learn', 'Sign', 'Language', 'Name', 
  'How are you', 'I am fine', 'What is your name', 'My name is', 'Nice to meet you',
  'Where', 'When', 'Why', 'Who', 'Which', 'Beautiful', 'Ugly', 'Hot', 'Cold',
  'Stop', 'Go', 'Wait', 'Now', 'Later', 'Today', 'Tomorrow', 'Yesterday', 
  'Deaf', 'Hearing', 'Understand', "Don't understand"
];

type LessonItem = {
  id: string;
  category: 'Alphabets' | 'Numbers' | 'Common Words' | 'Phrases';
  title: string;
  description: string;
};

// Generate full lesson data
const allLessons: LessonItem[] = [
  ...alphabets.map(char => ({
     id: `alpha_${char}`, category: 'Alphabets' as const, title: char, 
     description: `Make the sign for the letter ${char}.`
  })),
  ...numbers.map(num => ({
     id: `num_${num}`, category: 'Numbers' as const, title: num, 
     description: `Make the sign for the number ${num}.`
  })),
  ...commonWords.map(word => ({
     id: `word_${word.replace(/\s+/g, '_')}`, category: 'Common Words' as const, title: word, 
     description: `Learn the comprehensive sign for "${word}".`
  }))
];

const LearningMode = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Alphabets' | 'Numbers' | 'Common Words' | 'Phrases'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [progress, setProgress] = useState<UserProgressType>(() => getProgress());
  
  const filteredLessons = allLessons.filter(lesson => {
    const matchesTab = activeTab === 'All' || lesson.category === activeTab;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getDictionaryData = (title: string) => {
     return ASL_DICTIONARY.find(w => w.word.toLowerCase() === title.toLowerCase());
  };

  const renderItem = (lesson: LessonItem) => {
    let previewContent = null;
    
    if (lesson.category === 'Alphabets') {
       const avatarUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/Sign_language_${lesson.title}.svg`;
       previewContent = <img src={avatarUrl} alt={lesson.title} style={{ height: '140px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=SignBridge${lesson.title}&backgroundColor=f1f5f9`; }}/>;
    } else {
       previewContent = <h2 style={{ fontSize: lesson.category === 'Numbers' ? '4.5rem' : '2.5rem', color: 'var(--accent-primary)', textAlign: 'center', padding: '0 1rem' }}>{lesson.title}</h2>;
    }

    const dictData = getDictionaryData(lesson.title);
    const displayDesc = dictData ? dictData.description : lesson.description;

    return (
      <div key={lesson.id} className="glass-card flex-col animate-fade-in" style={{ background: 'white', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <div style={{ padding: '0.4rem 0.8rem', display: 'inline-block', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 700, borderRadius: 'var(--radius-full)', margin: '1rem 1rem 0', width: 'fit-content' }}>
           beginner
        </div>
        
        <div className="flex-center" style={{ height: '180px', background: 'transparent' }}>
            {previewContent}
        </div>
        
        <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-color)', background: '#fafafa' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{lesson.title}</h4>
            <p className="text-secondary" style={{ fontSize: '0.9rem', minHeight: '3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {displayDesc}
            </p>
            
            <div className="flex-between" style={{ marginTop: '1.5rem' }}>
                <button 
                   className="btn btn-outline hover" 
                   onClick={() => setSelectedLesson(lesson)}
                   style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', flex: 1, marginRight: '0.5rem', display: 'flex', gap: '0.4rem' }}>
                   <Eye size={14}/> View Details
                </button>
                <button className="btn btn-primary hover" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', flex: 1, display: 'flex', gap: '0.4rem' }}>
                   <PlayCircle size={14}/> Practice
                </button>
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="learning-page animate-fade-in pb-10">
      <header className="page-header text-center" style={{ marginBottom: '3rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Learning Center</h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Master American Sign Language from beginner to advanced</p>
      </header>
      
      {/* Metrics Row */}
      {progress && (
      <div className="grid grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
         <div className="glass-card" style={{ padding: '1.5rem', background: 'white' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
               <h4 className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <Type size={16} /> Alphabets
               </h4>
               <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{Math.round((progress.categories.Alphabets.current / alphabets.length) * 100) || 0}%</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{progress.categories.Alphabets.current}/{alphabets.length}</div>
            <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
               <div style={{ width: `${(progress.categories.Alphabets.current / alphabets.length) * 100}%`, height: '100%', background: '#3b82f6', borderRadius: '3px' }}></div>
            </div>
         </div>
         
         <div className="glass-card" style={{ padding: '1.5rem', background: 'white' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
               <h4 className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <Hash size={16} /> Numbers
               </h4>
               <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{Math.round((progress.categories.Numbers.current / numbers.length) * 100) || 0}%</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{progress.categories.Numbers.current}/{numbers.length}</div>
            <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
               <div style={{ width: `${(progress.categories.Numbers.current / numbers.length) * 100}%`, height: '100%', background: '#a855f7', borderRadius: '3px' }}></div>
            </div>
         </div>
         
         <div className="glass-card" style={{ padding: '1.5rem', background: 'white' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
               <h4 className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <MessageSquare size={16} /> Common Words
               </h4>
               <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{Math.round((progress.categories['Common Words'].current / commonWords.length) * 100) || 0}%</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{progress.categories['Common Words'].current}/{commonWords.length}</div>
            <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
               <div style={{ width: `${(progress.categories['Common Words'].current / commonWords.length) * 100}%`, height: '100%', background: '#10b981', borderRadius: '3px' }}></div>
            </div>
         </div>
         
         <div className="glass-card" style={{ padding: '1.5rem', background: 'white' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
               <h4 className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <Mic size={16} /> Phrases
               </h4>
               <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{Math.round((progress.categories.Phrases.current / 5) * 100) || 0}%</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{progress.categories.Phrases.current}/5</div>
            <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
               <div style={{ width: `${(progress.categories.Phrases.current / 5) * 100}%`, height: '100%', background: '#f59e0b', borderRadius: '3px' }}></div>
            </div>
         </div>
      </div>
      )}
      
      {/* Filter Bar */}
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem', background: 'white', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
         <div style={{ position: 'relative', flex: 1, minWidth: '250px', maxWidth: '350px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
               type="text" 
               className="input-field" 
               placeholder="Search lessons..." 
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
               style={{ paddingLeft: '3rem', border: '1px solid var(--border-color)', background: '#f8fafc', boxShadow: 'none' }}
            />
         </div>
         
         <div className="flex" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All', 'Alphabets', 'Numbers', 'Common Words', 'Phrases'].map(tab => (
               <button 
                  key={tab}
                  className="btn btn-outline"
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  style={{ 
                     padding: '0.5rem 1rem', 
                     fontSize: '0.9rem', 
                     borderRadius: 'var(--radius-md)',
                     background: activeTab === tab ? '#f8fafc' : 'transparent',
                     borderColor: activeTab === tab ? 'var(--border-color)' : 'transparent',
                     color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                     boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none',
                     display: 'flex', gap: '0.4rem', alignItems: 'center'
                  }}
               >
                  {tab === 'All' && <ListFilter size={16} />} 
                  {tab === 'Alphabets' && <Type size={16} />}
                  {tab === 'Numbers' && <Hash size={16} />}
                  {tab === 'Common Words' && <MessageSquare size={16} />}
                  {tab === 'Phrases' && <Mic size={16} />}
                  {tab}
               </button>
            ))}
         </div>
      </div>
      
      {/* Lessons Grid */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
         {filteredLessons.slice(0, 24).map(item => renderItem(item))}
      </div>
      
      {filteredLessons.length > 24 && (
         <div className="text-center" style={{ marginTop: '2rem' }}>
            <button className="btn btn-outline hover">Load More</button>
         </div>
      )}
      
      {filteredLessons.length === 0 && (
         <div className="text-center text-muted" style={{ padding: '3rem' }}>
            <p>No lessons found matching your search.</p>
         </div>
      )}


      {/* DETAIL MODAL  */}
      {selectedLesson && createPortal((() => {
         const dictData = getDictionaryData(selectedLesson.title);
         const displayDesc = dictData ? dictData.description : selectedLesson.description;
         const displayTips = dictData ? dictData.tips : `Practice forming the sign for ${selectedLesson.title}. Use the camera to verify accuracy.`;

         return (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
               <div className="animate-fade-in" style={{ background: 'white', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                  
                  {/* Header */}
                  <div className="flex-between" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                     <div className="flex" style={{ alignItems: 'center', gap: '0.75rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedLesson.title}</h2>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', background: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                           beginner
                        </span>
                     </div>
                     <button onClick={() => setSelectedLesson(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <X size={24} />
                     </button>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.5rem' }}>
                     <div className="flex-center" style={{ width: '100%', height: '250px', background: '#f5f3ff', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
                        {selectedLesson.category === 'Alphabets' ? (
                           <img 
                              src={`https://commons.wikimedia.org/wiki/Special:FilePath/Sign_language_${selectedLesson.title.toUpperCase()}.svg`}
                              alt={selectedLesson.title}
                              style={{ width: '180px', height: '180px', objectFit: 'contain' }}
                              onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=SignBridge${selectedLesson.title}&backgroundColor=f1f5f9`; }}
                           />
                        ) : (
                           <h1 style={{ fontSize: '5rem', color: '#8b5cf6', fontWeight: 800, textAlign: 'center' }}>{selectedLesson.title}</h1>
                        )}
                     </div>

                     <div style={{ marginBottom: '2rem' }}>
                        <h3 className="flex" style={{ gap: '0.5rem', fontSize: '1.1rem', fontWeight: 700, alignItems: 'center', marginBottom: '0.75rem' }}>
                           <Info size={18} color="#3b82f6" /> How to Sign:
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                           {displayDesc}
                        </p>
                     </div>

                     <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem', marginBottom: '1rem' }}>
                        <h4 style={{ color: '#b45309', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                           💡 Tips
                        </h4>
                        <p style={{ color: '#b45309', fontSize: '0.9rem' }}>{displayTips}</p>
                     </div>
                  </div>

                   {/* Footer */}
                   <div className="flex-between" style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: '#f8fafc', borderBottomLeftRadius: 'var(--radius-xl)', borderBottomRightRadius: 'var(--radius-xl)' }}>
                      {!progress?.masteredLessons?.includes(selectedLesson.id) ? (
                         <button 
                            className="btn hover" 
                            onClick={() => {
                               setProgress(markLessonAsMastered(selectedLesson.id, selectedLesson.category, selectedLesson.title));
                            }}
                            style={{ background: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 600 }}>
                            <CheckCircle size={18} /> Mark as Mastered
                         </button>
                      ) : (
                         <div style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={20} fill="#10b981" color="white" /> Mastered!
                         </div>
                      )}
                      
                      <button className="btn btn-outline hover" onClick={() => setSelectedLesson(null)} style={{ padding: '0.75rem 2rem', fontWeight: 600 }}>
                         Close
                      </button>
                   </div>
                  
               </div>
            </div>
         );
      })(), document.body)}

    </div>
  );
};

export default LearningMode;
