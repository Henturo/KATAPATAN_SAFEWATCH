import React, { useState } from 'react';
import { Shield, UserCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginView = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
        <div className="flex items-center text-blue-950 dark:text-blue-100 cursor-pointer" onClick={() => onNavigate('landing')}>
          <Shield className="w-8 h-8 mr-2 text-blue-600" />
          <span className="font-extrabold text-xl tracking-tight hidden md:block">Katapatan SafeWatch</span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background blobs for premium feel */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-100 dark:bg-red-900/20 rounded-full blur-3xl opacity-60"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-md w-full border border-gray-50 dark:border-slate-700 transition-colors duration-300 relative z-10"
        >
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner">
              <UserCircle className="w-12 h-12" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center text-blue-950 dark:text-white mb-3">Welcome Back</h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-10 font-medium">Sign in to your verified account</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">Phone Number or Email</label>
              <input 
                type="text" 
                placeholder="e.g. 0912 345 6789" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-slate-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-gray-50 dark:bg-slate-700/50 outline-none transition-all font-medium text-gray-800 dark:text-slate-200" 
                required 
                defaultValue="jenica@example.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-slate-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-gray-50 dark:bg-slate-700/50 outline-none transition-all font-medium text-gray-800 dark:text-slate-200" 
                required 
                defaultValue="password123" 
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-950 dark:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-[0_10px_25px_rgba(23,37,84,0.2)] dark:shadow-[0_10px_25px_rgba(37,99,235,0.2)] hover:bg-blue-900 dark:hover:bg-blue-500 transition-all flex items-center justify-center text-lg mt-8"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Secure Log In <ArrowRight className="ml-2 w-5 h-5" /></>
              )}
            </motion.button>
          </form>

          <div className="mt-10 text-center text-sm text-gray-500 dark:text-slate-400 font-medium pb-4 border-b border-gray-50 dark:border-slate-700/50">
            Don't have an account? <a href="#" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Apply for Verification</a>
          </div>
          <button onClick={() => onNavigate('landing')} className="w-full mt-6 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 font-bold text-sm transition-colors py-2">
            Back to Home
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginView;
