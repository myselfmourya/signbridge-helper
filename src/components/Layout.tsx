import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
  // Start open on desktop (>=1025px), closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 1024);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Backdrop for mobile drawer */}
      <div 
        className={`sidebar-backdrop ${isSidebarOpen ? 'show' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div className="main-wrapper">
        <header className="app-header">
           <div className="app-header-logo">
             <button 
               className="sidebar-toggle-btn"
               onClick={toggleSidebar}
               aria-label="Toggle sidebar menu"
             >
               <span></span>
               <span></span>
               <span></span>
             </button>
             <span className="logo-icon flex-center" style={{ width: 32, height: 32, fontSize: '1rem' }}>SB</span>
             <span className="logo-text" style={{ fontSize: '1.1rem' }}>SignBridge</span>
           </div>
        </header>
        
        <main className="main-content animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

