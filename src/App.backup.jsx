import React, { useState } from 'react';
import {
  Shield, UserCircle, AlertTriangle, Megaphone, MapPin,
  ShieldCheck, Badge, Home, FileText, Map as MapIcon,
  Settings, User, ArrowRight, EyeOff, Bell, Lock,
  LogOut, ChevronRight, Plus, Search, CheckCircle
} from 'lucide-react';

const LandingView = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center text-blue-950">
          <Shield className="w-8 h-8 mr-2" />
          <span className="font-extrabold text-xl tracking-wide">Katapatan SafeWatch</span>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-sm font-bold text-blue-900 hover:text-blue-700 decoration-2 hover:underline"
        >
          Go to Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:py-24 max-w-6xl mx-auto w-full md:grid md:grid-cols-2 md:gap-12">
        <div className="flex flex-col items-start space-y-6">
          <div className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
            Community First
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-blue-950 leading-tight">
            1-Tap Anonymous Emergency Network for Verified Neighbors.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Bridge dangerous emergency delays. Connect instantly with your barangay.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="mt-4 bg-blue-950 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center text-lg active:scale-95"
          >
            Launch App <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        <div className="mt-16 md:mt-0 relative w-full flex justify-center">
          {/* Decorative element resembling a phone UI */}
          <div className="w-[300px] h-[600px] border-[8px] border-blue-950 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col pt-8 items-center bg-gray-50">
            <div className="absolute top-0 w-32 h-6 bg-blue-950 rounded-b-xl z-10"></div>

            {/* Mock App Screen Inside */}
            <div className="w-24 h-24 bg-red-500 rounded-full mt-24 shadow-[0_0_40px_rgba(239,68,68,0.5)] flex items-center justify-center animate-pulse relative">
              <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20"></div>
              <span className="text-white font-black text-2xl relative z-10">SOS</span>
            </div>

            <div className="mt-12 bg-white w-5/6 rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            <div className="mt-4 bg-orange-50 border border-orange-200 w-5/6 rounded-xl p-4 flex items-center shadow-sm">
              <AlertTriangle className="w-5 h-5 text-orange-400 mr-2 flex-shrink-0" />
              <div className="h-4 bg-orange-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-red-50 transition-colors group">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">1-Tap SOS</h3>
              <p className="text-gray-600">Instantly alert your neighborhood and local authorities with a single tap in emergencies.</p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors group">
              <div className="w-16 h-16 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <EyeOff className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Hide Identities</h3>
              <p className="text-gray-600">Report suspicious activities entirely anonymously. Your safety and privacy remain our top priority.</p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-orange-50 transition-colors group">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Local Barangay Alerts</h3>
              <p className="text-gray-600">Receive verified, hyper-local alerts directly from your barangay officials in real-time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const LoginView = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center text-blue-950 cursor-pointer" onClick={() => onNavigate('landing')}>
          <Shield className="w-8 h-8 mr-2" />
          <span className="font-extrabold text-xl tracking-wide hidden md:block">Katapatan SafeWatch</span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2QxZDVkYiIgLz4KCTwvc3ZnPg==')]">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center">
              <UserCircle className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center text-blue-950 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-8 font-medium">Sign in to your verified account</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number or Email</label>
              <input type="text" placeholder="e.g. 0912 345 6789" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all font-medium text-gray-800" required defaultValue="anya@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all font-medium text-gray-800" required defaultValue="password123" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-950 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-900 active:scale-95 transition-all flex items-center justify-center text-lg mt-6"
            >
              {isLoading ? <span className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></span> : 'Secure Log In'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 font-medium pb-4 border-b border-gray-100">
            Don't have an account? <a href="#" className="text-blue-900 font-bold hover:underline">Apply for Verification</a>
          </div>
          <button onClick={() => onNavigate('landing')} className="w-full mt-4 text-gray-400 hover:text-gray-600 font-bold text-sm transition-colors py-2">
            Back to Home
          </button>
        </div>
      </main>
    </div>
  )
}

const DashboardView = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [sosState, setSosState] = useState('idle');

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
        className={`flex md:flex-row flex-col items-center md:justify-start justify-center w-full space-y-1 md:space-y-0 md:space-x-4 md:px-6 md:py-4 py-2 rounded-xl transition-all
          ${isActive ? 'text-blue-900 md:bg-blue-50' : 'text-gray-400 md:text-gray-600 md:hover:bg-gray-50 hover:text-blue-800'}`}
      >
        <Icon size={24} className={`${isActive ? 'text-blue-900' : 'inherit'} transition-colors`} />
        <span className="text-[10px] md:text-sm font-bold">{label}</span>
      </button>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent sosState={sosState} setSosState={setSosState} handleSosClick={handleSosClick} onNavigateTab={setActiveTab} />;
      case 'reports':
        return <ReportsContent />;
      case 'map':
        return <MapContent />;
      case 'settings':
        return <SettingsContent onLogout={onLogout} />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <HomeContent sosState={sosState} setSosState={setSosState} handleSosClick={handleSosClick} onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Desktop Sidebar Left Navigation Element! */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 z-20 shadow-lg">
        <div className="p-6 flex items-center text-blue-950 border-b border-gray-100">
          <Shield className="w-10 h-10 mr-3 text-blue-900" />
          <span className="font-extrabold text-xl tracking-wide leading-tight">KATAPATAN<br />SafeWatch</span>
        </div>

        <div className="p-4 flex flex-col space-y-2 flex-1 overflow-y-auto">
          <p className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 mt-4">Menu</p>
          <NavItem id="home" icon={Home} label="Home Dashboard" />
          <NavItem id="reports" icon={FileText} label="Incident Reports" />
          <NavItem id="map" icon={MapIcon} label="Live Map" />
          <NavItem id="profile" icon={User} label="My Profile" />
        </div>

        <div className="p-4 border-t border-gray-100">
          <NavItem id="settings" icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="bg-blue-950 text-white px-4 py-4 flex items-center shadow-md z-10 md:hidden sticky top-0 truncate">
          <Shield className="w-7 h-7 mr-3 text-blue-200 flex-shrink-0" />
          <h1 className="font-bold text-lg tracking-wide truncate">KATAPATAN SafeWatch</h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto w-full relative pb-20 md:pb-0 h-full">
          <div className="w-full max-w-5xl mx-auto md:p-8 h-full border-x-0 md:border-x border-gray-200 min-h-full bg-gray-50 shadow-[0_0_40px_rgba(0,0,0,0.02)]">
            {renderContent()}
          </div>
        </main>

        {/* Mobile Bottom Navigation (Hidden on Desktop) */}
        <nav className="md:hidden absolute bottom-0 w-full bg-white border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] pb-safe z-20">
          <div className="flex justify-around items-center px-2 py-1">
            <NavItem id="home" icon={Home} label="Home" />
            <NavItem id="reports" icon={FileText} label="Reports" />
            <NavItem id="map" icon={MapIcon} label="Map" />
            <NavItem id="settings" icon={Settings} label="Settings" />
            <NavItem id="profile" icon={User} label="Profile" />
          </div>
        </nav>
      </div>
    </div>
  );
};

// ----- Sub Views Content -----

const HomeContent = ({ sosState, setSosState, handleSosClick, onNavigateTab }) => (
  <div className="flex flex-col pt-2 md:pt-0 relative max-w-md mx-auto md:max-w-none animate-in fade-in duration-300">
    {/* User Greeting */}
    <div className="bg-white px-4 py-4 md:py-6 flex items-center mx-3 md:mx-0 mt-2 md:mt-0 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <UserCircle className="w-12 h-12 text-gray-400 mr-4" />
      <div>
        <p className="text-gray-500 text-sm font-medium mb-0.5">Verified Resident</p>
        <h2 className="font-black text-gray-800 text-xl md:text-2xl leading-none">Welcome back, Anya!</h2>
      </div>
    </div>

    {/* Active Alerts Banner */}
    <div className="mx-3 md:mx-0 mt-4 md:mt-6 bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center shadow-sm">
      <div className="bg-orange-100 p-2 rounded-full mr-4 flex-shrink-0 animate-pulse">
        <AlertTriangle className="w-6 h-6 text-orange-500" />
      </div>
      <div>
        <p className="text-sm md:text-base text-gray-800 font-medium">
          Active Alerts - Banaybanay<br className="md:hidden" />
          <span className="hidden md:inline">: </span>
          <span className="font-bold text-red-600 text-base md:text-lg block md:inline mt-1 md:mt-0">2 High Priority</span>
        </p>
      </div>
    </div>

    {/* SOS Button Area */}
    <div className="flex flex-col items-center justify-center mt-12 mb-10 md:my-16">
      <p className="text-gray-500 font-bold mb-8 tracking-widest text-sm uppercase">Emergency Help: TAP to ACTIVATE</p>

      <button
        onClick={handleSosClick}
        disabled={sosState !== 'idle'}
        className={`
            relative flex items-center justify-center
            w-56 h-56 md:w-64 md:h-64 rounded-full text-white font-black tracking-widest
            transition-all duration-300 shadow-2xl
            ${sosState === 'idle' ? 'bg-red-600 hover:bg-red-700 active:scale-95 cursor-pointer' : ''}
            ${sosState === 'sending' ? 'bg-red-500 scale-95 cursor-wait' : ''}
            ${sosState === 'success' ? 'bg-gray-400 cursor-not-allowed' : ''}
          `}
      >
        {sosState === 'idle' && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-40 animate-slow-pulse shadow-[0_0_40px_rgba(239,68,68,0.6)] mix-blend-multiply md:scale-[1.2] scale-[1.25]"></div>
            <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-slow-pulse delay-75 shadow-[0_0_60px_rgba(239,68,68,0.4)] md:scale-[1.4] scale-[1.5]"></div>
          </>
        )}

        {sosState === 'sending' && (
          <div className="absolute inset-0 rounded-full bg-red-400 opacity-60 animate-ping -z-10"></div>
        )}

        <span className={`relative z-10 ${sosState === 'sending' ? 'text-3xl' : 'text-6xl md:text-7xl'}`}>
          {sosState === 'sending' ? 'SENDING...' : 'SOS'}
        </span>

        {sosState === 'sending' && (
          <span className="absolute inset-x-0 bottom-12 mx-auto w-10 h-10 rounded-full border-4 border-t-white border-red-400 animate-spin opacity-80"></span>
        )}
      </button>
    </div>

    {/* SOS Success Modal/Overlay */}
    {sosState === 'success' && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/70 backdrop-blur-md transition-opacity duration-300">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 w-full max-w-md flex flex-col items-center text-center transform scale-100 transition-transform duration-300 animate-in zoom-in-95">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner relative">
            <ShieldCheck size={48} className="animate-bounce" />
            <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <h2 className="text-3xl font-black text-blue-950 mb-4 leading-tight">Emergency Alert<br />Activated!</h2>
          <p className="text-gray-600 mb-8 font-medium text-base md:text-lg">
            Verified neighbors and barangay notified. Help is on the way.
          </p>
          <button
            onClick={() => setSosState('idle')}
            className="w-full bg-blue-950 text-white font-bold py-5 px-6 rounded-2xl shadow-[0_8px_20px_0_rgba(23,37,84,0.3)] hover:bg-blue-900 active:scale-95 transition-all text-xl"
          >
            Dismiss
          </button>
        </div>
      </div>
    )}

    {/* Quick Action Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-3 md:px-0 mb-8 md:mb-12">
      <button onClick={() => onNavigateTab?.('reports')} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-all active:scale-95 group focus:outline-none">
        <div className="bg-orange-100 p-4 rounded-full group-hover:scale-110 transition-transform">
          <Megaphone className="w-7 h-7 text-orange-600" />
        </div>
        <span className="text-[14px] font-bold text-gray-800 text-center leading-tight">Report<br className="md:hidden" /> Incident</span>
      </button>
      <button onClick={() => onNavigateTab?.('map')} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-all active:scale-95 group focus:outline-none">
        <div className="bg-blue-100 p-4 rounded-full group-hover:scale-110 transition-transform">
          <MapPin className="w-7 h-7 text-blue-600" />
        </div>
        <span className="text-[14px] font-bold text-gray-800 text-center leading-tight">Live<br className="md:hidden" /> Community Map</span>
      </button>
      <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-all active:scale-95 group focus:outline-none">
        <div className="bg-green-100 p-4 rounded-full group-hover:scale-110 transition-transform">
          <ShieldCheck className="w-7 h-7 text-green-600" />
        </div>
        <span className="text-[14px] font-bold text-gray-800 text-center leading-tight">Local<br className="md:hidden" /> Safe Zones</span>
      </button>
      <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-all active:scale-95 group focus:outline-none">
        <div className="bg-gray-100 p-4 rounded-full group-hover:scale-110 transition-transform">
          <Badge className="w-7 h-7 text-gray-700" />
        </div>
        <span className="text-[14px] font-bold text-gray-800 text-center leading-tight">Contact<br className="md:hidden" /> Authorities</span>
      </button>
    </div>

    {/* Recent Updates */}
    <div className="px-3 md:px-0 mb-6">
      <h3 className="font-bold text-blue-950 mb-4 text-xl px-1 inline-flex border-b-4 border-violet-500 pb-1 rounded">Recent Updates</h3>
      <div className="space-y-4 mt-2">
        {[
          { title: "Suspicious Activity - Phase 1, Katapatan Homes", time: "14m ago" },
          { title: "Street Flooding - Block 4, Banaybanay", time: "32m ago" },
        ].map((update, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 border border-gray-200 flex items-center justify-center group-hover:border-blue-300 group-hover:bg-blue-50 transition-colors">
                <Bell className="text-gray-400 group-hover:text-blue-500 w-5 h-5 transition-colors" />
              </div>
              <span className="text-base font-bold text-gray-800">{update.title}</span>
            </div>
            <span className="text-xs text-gray-500 font-black uppercase tracking-wider">{update.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ReportsContent = () => (
  <div className="flex flex-col pt-6 md:pt-0 relative h-full px-4 md:px-0 max-w-md mx-auto md:max-w-none animate-in fade-in duration-300">
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-black text-blue-950 text-2xl md:text-3xl">Incident Reports</h2>
      <button className="bg-blue-950 hover:bg-blue-900 text-white p-3 rounded-full md:rounded-xl md:px-6 md:py-3 md:flex md:items-center shadow-[0_4px_14px_rgba(23,37,84,0.39)] transition-all active:scale-95">
        <Plus className="w-6 h-6 md:mr-2" />
        <span className="hidden md:inline font-bold">New Report</span>
      </button>
    </div>

    {/* Search Bar */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center px-4 py-4 mb-8 sticky top-0 md:relative z-10 transition-shadow focus-within:ring-2 ring-blue-900/20 focus-within:border-blue-300">
      <Search className="text-gray-400 w-6 h-6 mr-3" />
      <input type="text" placeholder="Search community reports..." className="w-full outline-none font-medium bg-transparent text-gray-800 placeholder-gray-400" />
    </div>

    <div className="flex-1 overflow-y-auto space-y-4 pb-12">
      {[
        { type: "Theft", color: "orange", title: "Stolen Bicycle - Main Gate, Katapatan Homes", time: "2 hours ago", desc: "A red mountain bike was taken from the front porch at around 2 PM. Please be on the lookout." },
        { type: "Vandalism", color: "blue", title: "Graffiti on Park Wall - Barangay Hall, Banaybanay", time: "5 hours ago", desc: "Someone spray painted the new retaining wall at the community park last night." },
        { type: "Hazard", color: "red", title: "Fallen Tree Branch - Basketball Court, Katapatan Homes", time: "1 day ago", desc: "Large branch blocking the southbound lane. Drive carefully." }
      ].map((report, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <span className={`bg-${report.color}-100 text-${report.color}-700 text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider`}>
              {report.type}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{report.time}</span>
          </div>
          <h3 className="font-black text-gray-800 text-xl mb-2">{report.title}</h3>
          <p className="text-gray-600 text-base mb-6 line-clamp-2 leading-relaxed">{report.desc}</p>
          <div className="flex items-center text-sm font-bold text-gray-500 mt-auto bg-gray-50 self-start px-3 py-1.5 rounded-lg">
            <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> Katapatan Homes Area
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MapContent = () => (
  <div className="flex flex-col pt-6 md:pt-0 relative h-full px-4 md:px-0 w-full max-w-md mx-auto md:max-w-none pb-4 animate-in fade-in duration-300">
    <h2 className="font-black text-blue-950 text-2xl md:text-3xl mb-6">Live Community Map</h2>
    <div className="flex-1 bg-blue-50/50 rounded-3xl border-2 border-dashed border-blue-200 flex items-center justify-center relative overflow-hidden shadow-inner group min-h-[500px]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2QxZDVkYiIgLz4KCTwvc3ZnPg==')] opacity-30"></div>

      <div className="flex flex-col items-center bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-100 text-center relative z-10 mx-6 hover:scale-105 transition-transform duration-500">
        <div className="bg-blue-100 p-4 rounded-full mb-5">
          <MapIcon className="w-12 h-12 text-blue-900" />
        </div>
        <p className="font-black text-xl text-gray-800 mb-2">Katapatan & Banaybanay Map</p>
        <p className="text-base text-gray-500 font-medium">Local community map placeholder activated.</p>
        <button className="mt-6 bg-blue-950 text-white font-bold py-2 px-6 rounded-full text-sm">Refresh Map</button>
      </div>

      {/* Mock Interactive Pins */}
      <div className="absolute top-1/4 left-1/4 animate-bounce delay-100 cursor-pointer hover:scale-125 transition-transform">
        <MapPin className="text-red-500 w-10 h-10 drop-shadow-md filter" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-bounce delay-300 cursor-pointer hover:scale-125 transition-transform">
        <MapPin className="text-orange-500 w-10 h-10 drop-shadow-md filter" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-bounce delay-700 cursor-pointer hover:scale-125 transition-transform">
        <MapPin className="text-blue-500 w-10 h-10 drop-shadow-md filter" />
      </div>
      <div className="absolute bottom-1/4 right-1/3 animate-pulse cursor-pointer hover:scale-125 transition-transform">
        <ShieldCheck className="text-green-500 w-10 h-10 drop-shadow-md filter" />
      </div>
    </div>
  </div>
);

const ProfileContent = () => (
  <div className="flex flex-col pt-6 md:pt-0 relative h-full px-4 md:px-0 max-w-md mx-auto md:max-w-none animate-in fade-in duration-300">
    <h2 className="font-black text-blue-950 text-2xl md:text-3xl mb-6">My Profile</h2>

    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center mb-8 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-blue-50 to-white"></div>
      <div className="relative mb-6 z-10">
        <div className="w-32 h-32 bg-gray-100 rounded-[2rem] rotate-3 flex items-center justify-center border-4 border-white shadow-xl hover:rotate-0 transition-transform duration-300">
          <div className="w-full h-full -rotate-3 bg-gray-100 rounded-[1.8rem] flex items-center justify-center hover:rotate-0 transition-transform duration-300 overflow-hidden">
            <User className="text-gray-400 w-16 h-16" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 border-4 border-white shadow-sm z-20">
          <ShieldCheck className="w-6 h-6" />
        </div>
      </div>
      <h3 className="font-black text-3xl text-gray-900 mb-2 z-10">Jenica Dematera</h3>
      <p className="text-blue-700 font-bold text-sm bg-blue-100 px-4 py-1.5 rounded-full mb-4 z-10 uppercase tracking-widest">Verified Resident</p>
      <p className="text-gray-500 font-medium text-base z-10 text-center">Block 12, Katapatan Homes<br />Barangay Banaybanay, Cabuyao City</p>
    </div>

    <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-3 px-2">Verification & Trust Details</h3>
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
        <span className="font-bold text-gray-700">Mobile Number</span>
        <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-lg">+63 912 345 6789</span>
      </div>
      <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
        <span className="font-bold text-gray-700">Emergency Contacts</span>
        <span className="text-blue-900 font-bold flex items-center bg-blue-50 px-3 py-1 rounded-lg">2 Added <ChevronRight className="w-4 h-4 ml-1" /></span>
      </div>
      <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
        <span className="font-bold text-gray-700">Address Proof</span>
        <span className="text-green-700 font-black flex items-center bg-green-50 px-3 py-1 rounded-lg"><CheckCircle className="w-4 h-4 mr-1.5" /> Verified</span>
      </div>
      <div className="flex items-center justify-between p-5 hover:bg-gray-50 cursor-pointer">
        <span className="font-bold text-gray-700">Connected LGU</span>
        <span className="text-blue-900 font-bold flex items-center bg-blue-50 px-3 py-1 rounded-lg">Barangay Banaybanay LGU</span>
      </div>
    </div>
  </div>
);

const SettingsContent = ({ onLogout }) => (
  <div className="flex flex-col pt-6 md:pt-0 relative h-full px-4 md:px-0 pb-8 max-w-md mx-auto md:max-w-none animate-in fade-in duration-300">
    <h2 className="font-black text-blue-950 text-2xl md:text-3xl mb-6">Settings</h2>

    <div className="space-y-8">
      <div>
        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-3 px-2">App Preferences</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <label className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-4">
                <Bell className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <span className="font-bold text-gray-800 block text-base">Push Notifications</span>
                <span className="text-xs text-gray-500 font-medium">Alerts for severe emergencies</span>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6 mr-2 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-blue-600 outline-none transform translate-x-6 transition-transform" defaultChecked />
              <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer"></label>
            </div>
          </label>
          <label className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-4">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <span className="font-bold text-gray-800 block text-base">Anonymous Mode</span>
                <span className="text-xs text-gray-500 font-medium">Hide name when reporting</span>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6 mr-2 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="toggle" id="toggle2" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 outline-none transition-transform" />
              <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-3 px-2">Account Actions</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left group">
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-gray-400 mr-4 group-hover:text-blue-900 transition-colors" />
              <span className="font-bold text-gray-700">Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={onLogout} className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-colors text-left group">
            <div className="flex items-center text-red-600">
              <LogOut className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-black">Log Out Completely</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  if (currentView === 'landing') {
    return <LandingView onNavigate={setCurrentView} />;
  }
  if (currentView === 'login') {
    return <LoginView onNavigate={setCurrentView} />;
  }
  return <DashboardView onLogout={() => setCurrentView('landing')} />;
}
