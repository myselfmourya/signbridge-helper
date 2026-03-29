import { useState } from 'react';
import { Award, CheckCircle, TrendingUp, Trophy, BookOpen, List, Calendar, ChevronRight } from 'lucide-react';
import { getProgress, type UserProgressType } from '../services/progress';

const MyProgress = () => {
  const [progress] = useState<UserProgressType>(() => getProgress());

  if (!progress) return null;

  const overallPercent = Math.round((progress.overallScore / progress.totalSigns) * 100) || 0;

  const renderProgressBar = (current: number, total: number, color: string) => {
     const percent = Math.round((current / total) * 100) || 0;
     return (
        <div style={{ width: '100%', height: '14px', background: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
           <div 
             style={{ 
               width: `${Math.max(percent, 5)}%`, 
               height: '100%', 
               background: color, 
               borderRadius: '10px',
               transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
             }} 
           />
        </div>
     );
  };

  return (
    <div className="progress-page animate-fade-in pb-10" style={{ padding: '0 1rem' }}>

      {/* HEADER */}
      <div className="text-center" style={{ marginBottom: '3rem', marginTop: '2rem' }}>
         <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>My Progress</h1>
         <p className="text-secondary" style={{ fontSize: '1.2rem' }}>Track your sign language mastery journey</p>
      </div>

      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
         
         {/* Overall Progress */}
         <div style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', borderRadius: 'var(--radius-xl)', padding: '2rem', color: 'white', boxShadow: '0 20px 25px -5px rgba(59,130,246,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}><TrendingUp size={120} /></div>
            <h3 className="flex" style={{ fontSize: '1.1rem', fontWeight: 700, alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', opacity: 0.9 }}>
               <TrendingUp size={20} /> Overall Mastery
            </h3>
            <div className="flex" style={{ alignItems: 'baseline', gap: '0.5rem' }}>
               <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-2px' }}>{overallPercent}%</div>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '0.75rem' }}>
               <div style={{ width: `${overallPercent}%`, height: '100%', background: 'white', borderRadius: '4px', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}></div>
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, fontWeight: 500 }}>{progress.overallScore} of {progress.totalSigns} signs mastered</div>
         </div>

         {/* Signs Mastered */}
         <div style={{ background: 'linear-gradient(135deg, #d946ef, #fb7185)', borderRadius: 'var(--radius-xl)', padding: '2rem', color: 'white', boxShadow: '0 20px 25px -5px rgba(217,70,239,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}><CheckCircle size={120} /></div>
            <h3 className="flex" style={{ fontSize: '1.1rem', fontWeight: 700, alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', opacity: 0.9 }}>
               <CheckCircle size={20} /> Signs Mastered
            </h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1rem', letterSpacing: '-2px' }}>{progress.overallScore}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, fontWeight: 500 }}>Keep up the great work!</div>
         </div>

         {/* Practice Sessions */}
         <div style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', borderRadius: 'var(--radius-xl)', padding: '2rem', color: 'white', boxShadow: '0 20px 25px -5px rgba(245,158,11,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}><Award size={120} /></div>
            <h3 className="flex" style={{ fontSize: '1.1rem', fontWeight: 700, alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', opacity: 0.9 }}>
               <Award size={20} /> Practice Sessions
            </h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1rem', letterSpacing: '-2px' }}>{progress.practiceSessions}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, fontWeight: 500 }}>Lifetime sessions across all devices</div>
         </div>

         {/* Achievements */}
         <div style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', borderRadius: 'var(--radius-xl)', padding: '2rem', color: 'white', boxShadow: '0 20px 25px -5px rgba(16,185,129,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}><Trophy size={120} /></div>
            <h3 className="flex" style={{ fontSize: '1.1rem', fontWeight: 700, alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', opacity: 0.9 }}>
               <Trophy size={20} /> Achievements
            </h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1rem', letterSpacing: '-2px' }}>{progress.achievements}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, fontWeight: 500 }}>Badges earned in Learning Center</div>
         </div>

      </div>

      <div className="grid grid-cols-2" style={{ gridTemplateColumns: 'minmax(400px, 1fr) minmax(350px, 1fr)', gap: '2rem' }}>
         {/* DETAILED STATS BY CATEGORY */}
         <div className="glass-panel" style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2.5rem' }}>
            <h2 className="flex" style={{ fontSize: '1.3rem', fontWeight: 800, gap: '0.75rem', alignItems: 'center', marginBottom: '2.5rem', color: 'var(--text-primary)' }}>
               <List size={24} color="#6366f1" /> Progress by Category
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
               {/* Alphabet */}
               <div>
                  <div className="flex-between" style={{ marginBottom: '0.75rem', fontWeight: 700, fontSize: '1.1rem' }}>
                     <span className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%' }}></span> Alphabet
                     </span>
                     <span className="text-secondary">{progress.categories.Alphabets.current} / {progress.categories.Alphabets.total}</span>
                  </div>
                  {renderProgressBar(progress.categories.Alphabets.current, progress.categories.Alphabets.total, 'linear-gradient(90deg, #60a5fa, #3b82f6)')}
               </div>

               {/* Number */}
               <div>
                  <div className="flex-between" style={{ marginBottom: '0.75rem', fontWeight: 700, fontSize: '1.1rem' }}>
                     <span className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '12px', height: '12px', background: '#a855f7', borderRadius: '50%' }}></span> Numbers
                     </span>
                     <span className="text-secondary">{progress.categories.Numbers.current} / {progress.categories.Numbers.total}</span>
                  </div>
                  {renderProgressBar(progress.categories.Numbers.current, progress.categories.Numbers.total, 'linear-gradient(90deg, #c084fc, #a855f7)')}
               </div>

               {/* Common Word */}
               <div>
                  <div className="flex-between" style={{ marginBottom: '0.75rem', fontWeight: 700, fontSize: '1.1rem' }}>
                     <span className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }}></span> Common Words
                     </span>
                     <span className="text-secondary">{progress.categories['Common Words'].current} / {progress.categories['Common Words'].total}</span>
                  </div>
                  {renderProgressBar(progress.categories['Common Words'].current, progress.categories['Common Words'].total, 'linear-gradient(90deg, #34d399, #10b981)')}
               </div>

               {/* Phrase */}
               <div>
                  <div className="flex-between" style={{ marginBottom: '0.75rem', fontWeight: 700, fontSize: '1.1rem' }}>
                     <span className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%' }}></span> Phrases
                     </span>
                     <span className="text-secondary">{progress.categories.Phrases.current} / {progress.categories.Phrases.total}</span>
                  </div>
                  {renderProgressBar(progress.categories.Phrases.current, progress.categories.Phrases.total, 'linear-gradient(90deg, #fbbf24, #f59e0b)')}
               </div>
            </div>
         </div>

         {/* RECENT ACTIVITY */}
         <div className="glass-panel" style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2.5rem' }}>
            <h2 className="flex" style={{ fontSize: '1.3rem', fontWeight: 800, gap: '0.75rem', alignItems: 'center', marginBottom: '2.5rem', color: 'var(--text-primary)' }}>
               <Calendar size={24} color="#ec4899" /> Recent Sessions
            </h2>
            
            {progress.recentActivities.length > 0 ? (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {progress.recentActivities.map(activity => (
                     <div key={activity.id} className="flex-between" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', background: '#f8fafc', transition: 'all 0.2s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.borderColor = '#cbd5e1'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
                        <div className="flex" style={{ gap: '1rem', alignItems: 'center' }}>
                           <div className="flex-center" style={{ width: '48px', height: '48px', background: 'white', borderRadius: '50%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#6366f1' }}>
                              <BookOpen size={20} />
                           </div>
                           <div>
                              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{activity.title}</h4>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activity.date}</p>
                           </div>
                        </div>
                        <div className="flex" style={{ alignItems: 'center', gap: '1rem' }}>
                           <div className="text-right">
                              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{activity.score}%</div>
                              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 600 }}>Score</div>
                           </div>
                           <ChevronRight size={20} color="var(--text-muted)" />
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="text-center text-muted flex-col flex-center" style={{ padding: '4rem 0' }}>
                  <BookOpen size={64} style={{ opacity: 0.2, marginBottom: '1.5rem', color: '#6366f1' }} />
                  <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>No practice sessions yet.<br/>Start learning to build your stats!</p>
               </div>
            )}
         </div>
      </div>

    </div>
  );
};

export default MyProgress;
