import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { LayoutDashboard, LayoutGrid, BarChart2, Settings, LogOut, Menu, X } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AirdropProvider } from './context/AirdropContext';
import { DashboardPage } from './pages/Dashboard';
import { AirdropListPage } from './pages/AirdropList';
import { AnalyticsPage } from './pages/Analytics';
import { SettingsPage } from './pages/Settings';
import { LoginPage } from './pages/LoginPage';
import { Button } from './components/ui/Button';

const AppContent = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logOut } = useAuth();

  const handlePageChange = (page: string) => {
    setActivePage(page);
    setIsMenuOpen(false); // Close menu on page change
  };

  const NavButton = ({ page, label, icon, isMobile = false }: { page: string, label: string, icon: React.ReactNode, isMobile?: boolean }) => (
    <button
      onClick={() => handlePageChange(page)}
      className={`flex items-center gap-3 px-4 py-3 font-bold transition-all duration-200 w-full text-left ${isMobile ? 'text-lg' : ''} ${activePage === page ? 'bg-yellow-400' : 'bg-white hover:bg-gray-100'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-space-grotesk">Listdrop</h1>
                <p className="mt-4 text-lg">Loading...</p>
            </div>
        </div>
    );
  }
  
  if (!user) {
    return <LoginPage />;
  }

  return (
      <div className="funky-bg min-h-screen font-inter text-black flex flex-col">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;700&display=swap'); body { font-family: 'Inter', sans-serif; } .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; } .funky-bg { background-color: #f7f7f7; background-image: radial-gradient(#000 0.5px, transparent 0.5px); background-size: 15px 15px; }`}</style>
        <Toaster position="bottom-right" toastOptions={{ className: 'border-[3px] border-black shadow-[4px_4px_0px_0px_#000] font-bold text-lg', success: { className: 'bg-green-400 border-[3px] border-black shadow-[4px_4px_0px_0px_#000] font-bold text-lg' }, error: { className: 'bg-red-500 text-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000] font-bold text-lg' }, }} />
        
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b-[3px] border-black p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="font-space-grotesk text-2xl font-bold transform -rotate-2"><span className="bg-yellow-400 px-2">LIST</span><span className="bg-pink-500 text-white px-2">DROP</span></div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                  <div className="flex items-center border-2 border-black">
                    <NavButton page="dashboard" label="Dashboard" icon={<LayoutDashboard />} />
                    <NavButton page="airdrops" label="Airdrops" icon={<LayoutGrid />} />
                    <NavButton page="analytics" label="Analytics" icon={<BarChart2 />} />
                    <NavButton page="settings" label="Settings" icon={<Settings />} />
                  </div>
                  <Button onClick={logOut} className="!px-3 !py-2 bg-red-500 hover:bg-red-600 text-white"><LogOut size={20} /></Button>
                </nav>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="border-2 border-black p-2 bg-white">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex justify-between items-center p-4 border-b-2 border-black">
                <h2 className="font-space-grotesk text-xl font-bold">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)} className="border-2 border-black p-2">
                    <X size={24} />
                </button>
            </div>
            <nav className="flex flex-col mt-4">
                <NavButton page="dashboard" label="Dashboard" icon={<LayoutDashboard />} isMobile={true} />
                <NavButton page="airdrops" label="Airdrops" icon={<LayoutGrid />} isMobile={true} />
                <NavButton page="analytics" label="Analytics" icon={<BarChart2 />} isMobile={true} />
                <NavButton page="settings" label="Settings" icon={<Settings />} isMobile={true} />
                <button onClick={logOut} className="flex items-center gap-3 px-4 py-3 font-bold text-lg w-full text-left text-red-500 hover:bg-gray-100">
                    <LogOut />
                    <span>Logout</span>
                </button>
            </nav>
        </div>

        <main className="max-w-7xl mx-auto flex-grow w-full px-4 sm:px-6 lg:px-8">
            {activePage === 'dashboard' && <DashboardPage />}
            {activePage === 'airdrops' && <AirdropListPage />}
            {activePage === 'analytics' && <AnalyticsPage />}
            {activePage === 'settings' && <SettingsPage />}
        </main>
        <footer className="w-full text-center p-4 mt-8 text-gray-500 font-bold">
          <p className="mb-1">Logged in as: <span className="font-mono text-xs bg-gray-200 p-1">{user.displayName || user.email}</span></p>
          <p>by Firdan Protocol with AI</p>
        </footer>
      </div>
  );
}

export default function App() {
    return (
        <AuthProvider>
            <AirdropProvider>
                <AppContent />
            </AirdropProvider>
        </AuthProvider>
    )
}
