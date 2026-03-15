import React, { useState, useEffect } from 'react';
import { Shield, Home, FileText, Map as MapIcon, User, Settings, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import HomeContent from '../components/dashboard/HomeContent';
import ReportsContent from '../components/dashboard/ReportsContent';
import MapContent from '../components/dashboard/MapContent';
import ProfileContent from '../components/dashboard/ProfileContent';
import SettingsContent from '../components/dashboard/SettingsContent';

const DashboardView = ({ onLogout, isDarkMode, setIsDarkMode }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [sosState, setSosState] = useState('idle');
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setReports(data);
      } else {
        setReports([
          { id: 1, type: "Theft", color: "orange", title: "Stolen Bicycle - Main Gate, Katapatan Homes", time: "2 hours ago", desc: "A red mountain bike was taken from the front porch at around 2 PM. Please be on the lookout.", lat: 14.2468, lng: 121.1352 },
          { id: 2, type: "Vandalism", color: "blue", title: "Graffiti on Park Wall - Barangay Hall, Banaybanay", time: "5 hours ago", desc: "Someone spray painted the new retaining wall at the community park last night.", lat: 14.2455, lng: 121.1360 },
          { id: 3, type: "Hazard", color: "red", title: "Fallen Tree Branch - Basketball Court, Katapatan Homes", time: "1 day ago", desc: "Large branch blocking the southbound lane. Drive carefully.", lat: 14.2470, lng: 121.1345 }
        ]);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      // Fallback
      setReports([
        { id: 1, type: "Theft", color: "orange", title: "Stolen Bicycle - Main Gate, Katapatan Homes", time: "2 hours ago", desc: "A red mountain bike was taken from the front porch at around 2 PM. Please be on the lookout.", lat: 14.2468, lng: 121.1352 },
        { id: 2, type: "Vandalism", color: "blue", title: "Graffiti on Park Wall - Barangay Hall, Banaybanay", time: "5 hours ago", desc: "Someone spray painted the new retaining wall at the community park last night.", lat: 14.2455, lng: 121.1360 },
        { id: 3, type: "Hazard", color: "red", title: "Fallen Tree Branch - Basketball Court, Katapatan Homes", time: "1 day ago", desc: "Large branch blocking the southbound lane. Drive carefully.", lat: 14.2470, lng: 121.1345 }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch reports on mount
  useEffect(() => {
    fetchReports();
  }, []);

  const handleSosClick = () => {
    if (sosState !== 'idle') return;
    setSosState('sending');
    setTimeout(() => {
      setSosState('success');
    }, 2000);
  };

  const NavItem = ({ id, icon: Icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex md:flex-row flex-col items-center md:justify-start justify-center w-full space-y-1 md:space-y-0 md:space-x-4 md:px-6 md:py-4 py-2 rounded-2xl transition-all duration-300 group
          ${isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-900/40 translate-x-1' 
            : 'text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400'}`}
      >
        <Icon size={24} className={`${isActive ? 'text-white' : 'group-hover:scale-110'} transition-all`} />
        <span className="text-[10px] md:text-sm font-bold tracking-tight">{label}</span>
      </button>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent sosState={sosState} setSosState={setSosState} handleSosClick={handleSosClick} onNavigateTab={setActiveTab} />;
      case 'reports':
        return <ReportsContent reports={reports} setReports={setReports} />;
      case 'map':
        return <MapContent reports={reports} isDarkMode={isDarkMode} onRefresh={fetchReports} isLoading={isLoading} />;
      case 'profile':
        return <ProfileContent />;
      case 'settings':
        return <SettingsContent onLogout={onLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default:
        return <HomeContent sosState={sosState} setSosState={setSosState} handleSosClick={handleSosClick} onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen font-sans overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 z-20 shadow-[10px_0_30px_rgba(0,0,0,0.02)] transition-colors duration-500">
        <div className="p-8 flex items-center text-blue-950 dark:text-blue-100">
          <Shield className="w-10 h-10 mr-3 text-blue-600 dark:text-blue-400" />
          <span className="font-extrabold text-xl tracking-tighter leading-none">KATAPATAN<br /><span className="text-blue-600">SafeWatch</span></span>
        </div>

        <div className="p-6 flex flex-col space-y-2 flex-1 overflow-y-auto">
          <p className="px-4 text-[11px] font-black text-gray-300 dark:text-slate-600 uppercase tracking-widest mb-4">Main Navigation</p>
          <NavItem id="home" icon={Home} label="Home Dashboard" />
          <NavItem id="reports" icon={FileText} label="Incident Reports" />
          <NavItem id="map" icon={MapIcon} label="Live Community Map" />
          <NavItem id="profile" icon={User} label="My Profile" />
          <NavItem id="settings" icon={Settings} label="Settings" />
        </div>

        <div className="p-8 border-t border-gray-50 dark:border-slate-800/50">
          <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">JD</div>
            <div>
              <p className="text-xs font-black text-gray-800 dark:text-white leading-none">Jenica Dematera</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Resident</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
        {/* Mobile Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 flex items-center shadow-sm z-10 md:hidden sticky top-0 border-b border-gray-100 dark:border-slate-800">
          <Shield className="w-7 h-7 mr-3 text-blue-600 flex-shrink-0" />
          <h1 className="font-extrabold text-lg tracking-tight text-blue-950 dark:text-white truncate">KATAPATAN <span className="text-blue-600">SafeWatch</span></h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto w-full relative pb-24 md:pb-0 h-full">
          <div className="w-full max-w-6xl mx-auto md:p-10 min-h-full">
            {renderContent()}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-100 dark:border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-safe z-30 transition-colors duration-500">
          <div className="flex justify-around items-center px-2 py-2">
            <NavItem id="home" icon={Home} label="Home" />
            <NavItem id="reports" icon={FileText} label="Reports" />
            <NavItem id="map" icon={MapIcon} label="Map" />
            <NavItem id="profile" icon={User} label="Profile" />
            <NavItem id="settings" icon={Settings} label="Settings" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardView;
