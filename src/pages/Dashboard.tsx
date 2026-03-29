import { ArrowRight, PlayCircle, BookOpen, Users, Globe, Camera as CameraIcon, Volume2, Sparkles, Hand } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const heroFeatures = [
    {
      title: 'Sign Recognition',
      pill: 'Advanced Detection',
      desc: 'Real-time camera recognition converts your gestures into text instantly with 95% accuracy',
      icon: <CameraIcon size={40} color="white" />,
      color: 'linear-gradient(135deg, #c084fc, #a855f7)',
      stat1Label: 'ACCURACY', stat1Value: '95%',
      stat2Label: 'SPEED', stat2Value: 'Real-time',
      path: '/recognition'
    },
    {
      title: 'Text to Sign',
      pill: 'Visual Demonstration',
      desc: 'Watch avatars demonstrate any text in perfect American Sign Language',
      icon: <Hand size={40} color="white" />,
      color: 'linear-gradient(135deg, #f472b6, #ec4899)',
      stat1Label: 'LIBRARY', stat1Value: '1000+',
      stat2Label: 'LANGUAGE', stat2Value: 'ASL',
      path: '/text-to-sign'
    },
    {
      title: 'Learning Center',
      pill: 'Structured Courses',
      desc: 'Master from basic alphabets to complex phrases with real-time feedback',
      icon: <BookOpen size={40} color="white" />,
      color: 'linear-gradient(135deg, #34d399, #10b981)',
      stat1Label: 'LESSONS', stat1Value: '63+',
      stat2Label: 'LEVELS', stat2Value: 'Beginner',
      path: '/learning'
    },
    {
      title: 'Sign Dictionary',
      pill: 'Interactive Lexicon',
      desc: 'Search our massive interactive dictionary for instant sign references and pro tips',
      icon: <Globe size={40} color="white" />,
      color: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
      stat1Label: 'WORDS', stat1Value: '50+',
      stat2Label: 'ACCESS', stat2Value: 'Instant',
      path: '/dictionary'
    }
  ];

  const currentFeature = heroFeatures[activeFeature];

  // Auto-rotate the widget every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % heroFeatures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroFeatures.length]);

  return (
    <div className="dashboard-content animate-fade-in">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section">
         
         <div style={{ zIndex: 2 }}>


            <h1 className="hero-title">
               Break Down<br/>
               <span style={{ color: '#fef08a' }}>Communication</span><br/>
               Barriers
            </h1>

            <p className="hero-subtitle">
               Master American Sign Language natively. Connect hearts, bridge gaps, transform lives.
            </p>

            <div className="flex hero-buttons" style={{ gap: '1rem', marginBottom: '3rem' }}>
               <button className="btn hover" style={{ background: 'white', color: '#7c3aed', padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', fontSize: '1.1rem' }}>
                  <PlayCircle size={20} /> Start Learning Free
               </button>
               <button className="btn hover" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>
                  <CameraIcon size={20} /> Try Live Demo
               </button>
            </div>
            
            <div className="flex hero-stats-row" style={{ gap: '3rem' }}>
               <div className="text-center">
                  <div className="flex-center mx-auto" style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', marginBottom: '0.5rem' }}>
                     <BookOpen size={20} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>63+</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Lessons</div>
               </div>
               <div className="text-center">
                  <div className="flex-center mx-auto" style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', marginBottom: '0.5rem' }}>
                     <Globe size={20} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>4</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Languages</div>
               </div>
               <div className="text-center">
                  <div className="flex-center mx-auto" style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', marginBottom: '0.5rem' }}>
                     <Users size={20} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>1000+</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Learners</div>
               </div>
            </div>
         </div>

         {/* Hero Widget */}
         <div className="hero-widget">
            <div style={{ position: 'absolute', top: '-1rem', left: '-1rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
               <span style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></span> {currentFeature.stat2Value}
            </div>
           
            <div style={{ 
               width: '80px', height: '80px', margin: '1rem auto 1.5rem', 
               background: currentFeature.color, 
               borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
               {currentFeature.icon}
            </div>
            
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
               {currentFeature.pill}
            </div>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>{currentFeature.title}</h2>
            <p style={{ opacity: 0.9, lineHeight: 1.5, marginBottom: '2rem', fontSize: '0.95rem', minHeight: '45px' }}>
               {currentFeature.desc}
            </p>
            
            <div className="flex-between" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', padding: '1rem 0', marginBottom: '1.5rem' }}>
               <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>{currentFeature.stat1Label}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{currentFeature.stat1Value}</div>
               </div>
               <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>{currentFeature.stat2Label}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{currentFeature.stat2Value}</div>
               </div>
            </div>

            <button 
               className="btn hover" 
               onClick={() => navigate(currentFeature.path)}
               style={{ width: '100%', background: 'white', color: '#8b5cf6', padding: '0.85rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
               Explore Now <ArrowRight size={18} />
            </button>
            
            <div className="flex-center" style={{ gap: '0.5rem', marginTop: '1.5rem' }}>
               {heroFeatures.map((_, idx) => (
                  <span 
                     key={idx}
                     onClick={() => setActiveFeature(idx)}
                     style={{ 
                        width: activeFeature === idx ? '20px' : '6px', 
                        height: '6px', 
                        background: activeFeature === idx ? 'white' : 'rgba(255,255,255,0.4)', 
                        borderRadius: '3px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                     }}>
                  </span>
               ))}
            </div>
            

         </div>
      </section>

      {/* 3. RECOMMENDED LESSONS */}
      <section style={{ 
         background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)', 
         borderRadius: 'var(--radius-lg)', 
         padding: '1.5rem 2.5rem', 
         color: 'white',
         marginBottom: '2rem'
      }}>
         <h3 className="flex" style={{ gap: '0.5rem', fontSize: '1.2rem', fontWeight: 700, alignItems: 'center', marginBottom: '0.25rem' }}>
            <Sparkles size={20} /> Smart Recommended Lessons
         </h3>
         <p style={{ opacity: 0.9, fontSize: '0.95rem', marginBottom: '2rem' }}>Personalized suggestions based on your learning history</p>
         
         <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center', color: 'var(--text-primary)' }}>
            <div className="flex-center mx-auto" style={{ width: '64px', height: '64px', background: '#f5f3ff', borderRadius: 'var(--radius-md)', color: '#8b5cf6', marginBottom: '1.5rem' }}>
               <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Get Your Personalized Plan</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>We will analyze your progress and suggest what to practice next</p>
            <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
               <Sparkles size={18} /> Analyze My Progress
            </button>
         </div>
      </section>

      {/* 4. EXPLORE FEATURES GRID */}
      <section className="text-center" style={{ padding: '2rem 0' }}>
         <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#8b5cf6', marginBottom: '0.5rem' }}>Explore Our Features</h2>
         <p className="text-secondary" style={{ marginBottom: '3rem' }}>Click on any feature to discover its power</p>
         
         <div className="grid features-grid" style={{ gap: '2rem', textAlign: 'left', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="glass-card flex-col block-hover" style={{ padding: '2.5rem', background: 'white', borderRadius: 'var(--radius-xl)' }}>
               <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div className="flex-center" style={{ width: '64px', height: '64px', background: '#3b82f6', borderRadius: '1rem', color: 'white' }}>
                     <CameraIcon size={32} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#60a5fa', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>New</span>
               </div>
               <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Sign Recognition</h3>
               <p className="text-secondary" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>Real-time camera recognition converts your gestures into text instantly with 95% accuracy</p>
               <div className="flex-between">
                  <div className="flex" style={{ gap: '0.5rem' }}>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>95%</span>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>Real-time</span>
                  </div>
                  <button style={{ color: '#3b82f6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                     Explore <ArrowRight size={16} />
                  </button>
               </div>
            </div>

            <div className="glass-card flex-col block-hover" style={{ padding: '2.5rem', background: 'white', borderRadius: 'var(--radius-xl)' }}>
               <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div className="flex-center" style={{ width: '64px', height: '64px', background: '#a855f7', borderRadius: '1rem', color: 'white' }}>
                     <Hand size={32} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#8b5cf6', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>New</span>
               </div>
               <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Text to Sign</h3>
               <p className="text-secondary" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>Watch an avatar demonstrate any text in sign language with detailed instructions</p>
               <div className="flex-between">
                  <div className="flex" style={{ gap: '0.5rem' }}>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>1000+</span>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>ASL</span>
                  </div>
                  <button style={{ color: '#8b5cf6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                     Explore <ArrowRight size={16} />
                  </button>
               </div>
            </div>

            <div className="glass-card flex-col block-hover" style={{ padding: '2.5rem', background: 'white', borderRadius: 'var(--radius-xl)' }}>
               <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div className="flex-center" style={{ width: '64px', height: '64px', background: '#ef4444', borderRadius: '1rem', color: 'white' }}>
                     <Volume2 size={32} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#fb7185', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>New</span>
               </div>
               <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Text to Speech</h3>
               <p className="text-secondary" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>Convert text to natural speech in 4 Indian languages instantly</p>
               <div className="flex-between">
                  <div className="flex" style={{ gap: '0.5rem' }}>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>4</span>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>Natural</span>
                  </div>
                  <button style={{ color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                     Explore <ArrowRight size={16} />
                  </button>
               </div>
            </div>

            <div className="glass-card flex-col block-hover" style={{ padding: '2.5rem', background: 'white', borderRadius: 'var(--radius-xl)' }}>
               <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div className="flex-center" style={{ width: '64px', height: '64px', background: '#10b981', borderRadius: '1rem', color: 'white' }}>
                     <BookOpen size={32} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#34d399', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>New</span>
               </div>
               <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Learning Center</h3>
               <p className="text-secondary" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>63+ lessons from alphabets to advanced phrases with progress tracking</p>
               <div className="flex-between">
                  <div className="flex" style={{ gap: '0.5rem' }}>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>63+</span>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>3</span>
                  </div>
                  <button style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                     Explore <ArrowRight size={16} />
                  </button>
               </div>
            </div>
         </div>
      </section>
      
      {/* 5. BOTTOM CTA */}
      <section style={{ 
         background: 'linear-gradient(135deg, #4f46e5, #a855f7, #ec4899)', 
         borderRadius: 'var(--radius-xl)', 
         padding: '4rem 2rem', 
         color: 'white',
         textAlign: 'center',
         marginTop: '2rem',
         marginBottom: '6rem'
      }}>
         <div className="flex-center mx-auto" style={{ marginBottom: '1.5rem' }}>
            <Sparkles size={48} />
         </div>
         <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px' }}>Ready to Transform Lives?</h2>
         <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Join our community and start making a difference today. Every sign learned is a barrier broken.
         </p>
         
         <div className="flex-center bottom-cta-buttons" style={{ gap: '1rem', marginBottom: '2.5rem' }}>
             <button className="btn hover" style={{ background: 'white', color: '#6366f1', padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', fontSize: '1.1rem', display: 'flex', gap: '0.5rem' }}>
                <Sparkles size={20} /> Begin Your Journey
             </button>
             <button className="btn hover" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.4)', fontSize: '1.1rem', display: 'flex', gap: '0.5rem' }}>
                <CameraIcon size={20} /> Try Live Demo
             </button>
         </div>
         
         <div className="flex-center" style={{ gap: '1rem' }}>
            <div className="flex" style={{ marginLeft: '10px' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', border: '2px solid white', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={14}/></div>
               <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', border: '2px solid white', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={14}/></div>
               <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', border: '2px solid white', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={14}/></div>
               <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', border: '2px solid white', marginLeft: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontWeight: 'bold', fontSize: '10px' }}>1k+</div>
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Join 1000+ learners already making an impact</span>
         </div>
      </section>

    </div>
  );
};

export default Dashboard;
