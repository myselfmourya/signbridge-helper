import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex" style={{ height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <div className="flex-col" style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        {/* Removed sticky Header entirely to match clean screenshot layout where pages handle their own headers if needed */}
        <main className="container animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '1440px', width: '100%' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
