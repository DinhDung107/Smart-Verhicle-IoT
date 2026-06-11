import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Layout = ({ isAuthenticated, onLogout }: LayoutProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-[#F0EAE1] overflow-hidden text-[#3A1212]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header onLogout={onLogout} />
        
        {/* Main Content Area with organic background texture */}
        <main className="flex-1 overflow-y-auto p-12 z-10 relative">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Subtle decorative circles for organic feel */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#C84B31]/5 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-full h-96 rounded-full bg-[#5D8265]/5 blur-3xl pointer-events-none z-0"></div>
      </div>
    </div>
  );
};

export default Layout;
