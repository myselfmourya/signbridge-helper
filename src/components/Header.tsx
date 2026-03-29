import { Globe, Bell } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header glass-panel">
      <div className="header-search">
        {/* Placeholder for potential search or context breadcrumbs */}
        <div className="breadcrumbs">
          <span className="text-muted">SignBridge</span> / <span className="text-primary font-medium">Dashboard</span>
        </div>
      </div>
      
      <div className="header-actions flex" style={{ gap: '1rem', alignItems: 'center' }}>
        <div className="lang-selector glass-card flex-center">
          <Globe size={16} />
          <select className="lang-select">
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
        </div>
        
        <button className="btn-icon">
          <Bell size={18} />
        </button>
        
        <div className="user-profile glass-card">
          <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="User Profile" />
        </div>
      </div>
    </header>
  );
};

export default Header;
