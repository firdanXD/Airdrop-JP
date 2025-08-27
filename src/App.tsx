import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { LayoutDashboard, LayoutGrid, BarChart2, Settings, LogOut } from 'lucide-react';
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
  const { user, loading, logOut } = useAuth();

  const NavButton = ({ page, label, icon }: { page: string, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`flex items-center gap-2 px-4 py-2 font-bold border-2 border-black transition-all duration-200 ${activePage === page ? 'bg-yellow-400 shadow-[3px_3px_0px_0px_#000] -translate-y-px' : 'bg-white hover:bg-gray-100'}`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-space-grotesk">Airdrop Tracker</h1>
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
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b-[3px] border-black p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="font-space-grotesk text-2xl font-bold transform -rotate-2"><span className="bg-yellow-400 px-2">AIRDROP</span><span className="bg-pink-500 text-white px-2">JP</span></div>
                <nav className="flex items-center gap-2">
                  <div className="flex items-center border-2 border-black">
                    <NavButton page="dashboard" label="Dashboard" icon={<LayoutDashboard />} />
                    <NavButton page="airdrops" label="Airdrops" icon={<LayoutGrid />} />
                    <NavButton page="analytics" label="Analytics" icon={<BarChart2 />} />
                    <NavButton page="settings" label="Settings" icon={<Settings />} />
                  </div>
                  <Button onClick={logOut} className="!px-3 !py-2 bg-red-500 hover:bg-red-600 text-white"><LogOut size={20} /></Button>
                </nav>
            </div>
        </header>
        <main className="max-w-7xl mx-auto flex-grow w-full">
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
