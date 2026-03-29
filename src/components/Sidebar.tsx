import { NavLink } from 'react-router-dom';
import { Home, Camera, MessageSquare, Volume2, Globe, TrendingUp, BookOpen } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/recognize', label: 'Sign Recognition', icon: <Camera size={18} /> },
    { path: '/text-to-sign', label: 'Text to Sign', icon: <MessageSquare size={18} /> },
    { path: '/text-to-speech', label: 'Text to Speech', icon: <Volume2 size={18} /> },
    { path: '/learn', label: 'Learning Center', icon: <BookOpen size={18} /> },
    { path: '/progress', label: 'My Progress', icon: <TrendingUp size={18} /> },
    { path: '/dictionary', label: 'Dictionary', icon: <BookOpen size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="flex" style={{ gap: '0.75rem', alignItems: 'center' }}>
          <span className="logo-icon flex-center">SB</span>
          <div className="flex-col">
            <span className="logo-text">SignBridge</span>
            <span className="logo-subtitle">Breaking Communication<br/>Barriers</span>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="flex" style={{ padding: '0 1rem', marginBottom: '0.5rem', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
           <Globe size={16} />
           <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Language</span>
        </div>
        <div style={{ padding: '0 1rem' }}>
          <select 
            className="input-field" 
            style={{ padding: '0.5rem', fontSize: '0.9rem', width: '100%', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }} 
            defaultValue={document.cookie.match(/googtrans=\/en\/([^;]+)/)?.[1] || "en"}
            onChange={(e) => {
               const lang = e.target.value;
               if (lang === 'en') {
                  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
               } else {
                  document.cookie = `googtrans=/en/${lang}; path=/;`;
                  document.cookie = `googtrans=/en/${lang}; domain=${window.location.hostname}; path=/;`;
               }
               window.location.reload();
            }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
