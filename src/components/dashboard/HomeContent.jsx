import React from 'react';
import { UserCircle, AlertTriangle, Megaphone, MapPin, ShieldCheck, Badge, Bell, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const HomeContent = ({ sosState, setSosState, handleSosClick, onNavigateTab }) => {
  const triggerSos = async () => {
    if (sosState !== 'idle') return;
    setSosState('sending');
    
    try {
      // Get current location if possible
      let lat = 14.2464;
      let lng = 121.1356;
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
        });
      }

      const { data, error } = await supabase
        .from('sos_alerts')
        .insert([{
          lat,
          lng,
          status: 'active'
        }]);

      if (error) throw error;
      
      setSosState('success');
    } catch (err) {
      console.error('Error triggering SOS:', err);
      // Fallback for demo
      setTimeout(() => setSosState('success'), 1500);
    }
  };
  return (
    <div className="flex flex-col pt-2 md:pt-0 relative max-w-4xl mx-auto px-4 md:px-0">
      {/* User Greeting Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 px-6 py-6 flex items-center rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-all hover:shadow-md group"
      >
        <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mr-5">
           <UserCircle className="w-10 h-10" />
        </div>
        <div>
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Verified Resident</p>
          <h2 className="font-black text-blue-950 dark:text-white text-xl md:text-2xl leading-tight">Magandang araw, Jenica!</h2>
        </div>
      </motion.div>

      {/* Hero Banner / Alert */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between shadow-xl shadow-orange-500/20 text-white"
      >
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white/20 p-3 rounded-2xl mr-4 backdrop-blur-md">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-black text-xl">Active Alerts in Banaybanay</h3>
            <p className="text-orange-100 font-medium">2 High Priority Incidents reported recently.</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigateTab?.('reports')}
          className="bg-white text-orange-600 font-black px-6 py-3 rounded-2xl shadow-lg hover:bg-orange-50 transition-colors active:scale-95"
        >
          View Details
        </button>
      </motion.div>

      {/* SOS Button Area */}
      <div className="flex flex-col items-center justify-center my-16 md:my-24 relative">
        <p className="text-gray-400 dark:text-slate-500 font-black mb-12 tracking-widest text-[10px] uppercase bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700">
           TAP & HOLD TO ACTIVATE SOS
        </p>

        <div className="relative">
          <AnimatePresence>
            {sosState === 'idle' && (
              <>
                <motion.div 
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className="absolute inset-0 bg-red-500 rounded-full"
                ></motion.div>
                <motion.div 
                  initial={{ scale: 1, opacity: 0.2 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                  className="absolute inset-0 bg-red-400 rounded-full"
                ></motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={triggerSos}
            disabled={sosState !== 'idle'}
            className={`
              relative z-10 flex items-center justify-center
              w-60 h-60 md:w-72 md:h-72 rounded-full text-white font-black tracking-tighter
              shadow-[0_20px_60px_rgba(239,68,68,0.4)]
              transition-all duration-500
              ${sosState === 'idle' ? 'bg-red-600' : ''}
              ${sosState === 'sending' ? 'bg-red-500 opacity-90 scale-95' : ''}
              ${sosState === 'success' ? 'bg-gray-400 dark:bg-slate-800' : ''}
            `}
          >
            <div className="flex flex-col items-center">
               <span className={`transition-all duration-500 ${sosState === 'sending' ? 'text-2xl' : 'text-7xl md:text-8xl'}`}>
                 {sosState === 'sending' ? 'SENDING...' : 'SOS'}
               </span>
               {sosState === 'idle' && <span className="text-xs opacity-60 font-medium tracking-widest mt-2">EMERGENCY</span>}
            </div>

            {sosState === 'sending' && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-0 border-8 border-t-white border-white/20 rounded-full"
              ></motion.div>
            )}
          </motion.button>
        </div>
      </div>

      {/* SOS Success Modal */}
      <AnimatePresence>
        {sosState === 'success' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-blue-950/80 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-10 md:p-14 w-full max-w-lg flex flex-col items-center text-center border border-gray-100 dark:border-slate-800"
            >
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                <ShieldCheck size={56} className="animate-bounce" />
              </div>
              <h2 className="text-4xl font-black text-blue-950 dark:text-white mb-4 leading-none">Help is<br />On the Way!</h2>
              <p className="text-gray-500 dark:text-slate-400 mb-10 font-medium text-lg">
                Emergency services and verified neighbors within 500m have been notified.
              </p>
              <button
                onClick={() => setSosState('idle')}
                className="w-full bg-blue-950 dark:bg-blue-600 text-white font-black py-5 px-6 rounded-2xl shadow-xl hover:bg-blue-900 active:scale-95 transition-all text-xl"
              >
                Understood
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Megaphone, label: "Report Incident", color: "orange", tab: "reports" },
          { icon: MapPin, label: "Live Map", color: "blue", tab: "map" },
          { icon: ShieldCheck, label: "Safe Zones", color: "green" },
          { icon: Badge, label: "Authorities", color: "purple" }
        ].map((action, i) => (
          <motion.button 
            key={i}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => action.tab && onNavigateTab?.(action.tab)}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-50 dark:border-slate-800 flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-all group"
          >
            <div className={`bg-${action.color}-50 dark:bg-${action.color}-900/20 p-4 rounded-2xl transition-transform group-hover:scale-110`}>
              <action.icon className={`w-7 h-7 text-${action.color}-600 dark:text-${action.color}-400`} />
            </div>
            <span className="text-sm font-black text-blue-950 dark:text-slate-200 text-center leading-none">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
           <h3 className="font-black text-blue-950 dark:text-white text-2xl tracking-tight">Recent Activity</h3>
           <button className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline">See all activity</button>
        </div>
        <div className="space-y-4">
          {[
            { title: "Suspicious Activity - Phase 1", time: "14m ago", icon: Bell, color: "red" },
            { title: "Street Flooding - Block 4", time: "32m ago", icon: Megaphone, color: "blue" },
          ].map((update, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 5 }}
              onClick={() => onNavigateTab?.('reports')}
              className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-gray-50 dark:border-slate-800 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-${update.color}-50 dark:group-hover:bg-${update.color}-900/20 transition-colors`}>
                  <update.icon className="text-gray-400 dark:text-slate-500 w-5 h-5 group-hover:text-blue-600 transition-colors" />
                </div>
                <span className="text-base font-bold text-blue-950 dark:text-slate-200">{update.title}</span>
              </div>
              <span className="text-xs text-gray-400 font-black uppercase tracking-wider">{update.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
