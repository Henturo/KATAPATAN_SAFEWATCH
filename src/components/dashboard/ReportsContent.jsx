import React, { useState } from 'react';
import { Plus, Search, MapPin, X, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const ReportsContent = ({ reports, setReports }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'Theft', location: '', desc: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location) return;
    
    setIsSubmitting(true);
    
    const reportData = {
      type: formData.type,
      color: formData.type === 'Hazard' ? 'red' : formData.type === 'Theft' ? 'orange' : 'blue',
      title: formData.title,
      description: formData.desc || "No description provided.",
      location: formData.location,
      lat: 14.2464 + (Math.random() - 0.5) * 0.005,
      lng: 121.1356 + (Math.random() - 0.5) * 0.005
    };

    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([reportData])
        .select();

      if (error) throw error;
      
      if (data) {
        setReports([data[0], ...reports]);
      }
      setIsModalOpen(false);
      setFormData({ title: '', type: 'Theft', location: '', desc: '' });
    } catch (err) {
      console.error('Error submitting report:', err);
      // Fallback for demo
      const fallbackReport = { 
        id: Date.now(), 
        ...reportData, 
        title: `${reportData.title} - ${reportData.location}`,
        time: "Just now" 
      };
      setReports([fallbackReport, ...reports]);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full px-4 md:px-0 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-black text-blue-950 dark:text-white text-3xl md:text-4xl tracking-tight">Incident Reports</h2>
          <p className="text-gray-400 dark:text-slate-500 font-medium mt-1">Real-time safety updates from your community.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl md:px-6 md:py-4 flex items-center shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-6 h-6 md:mr-2" />
          <span className="hidden md:inline font-black uppercase tracking-wider text-sm">New Report</span>
        </motion.button>
      </div>

      {/* Modern Search Bar */}
      <div className="group bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 flex items-center px-6 py-5 mb-10 sticky top-4 z-10 transition-all focus-within:ring-4 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/20 focus-within:border-blue-300 dark:focus-within:border-blue-600 focus-within:shadow-xl">
        <Search className="text-gray-400 group-focus-within:text-blue-600 w-6 h-6 mr-4 transition-colors" />
        <input 
          type="text" 
          placeholder="Search reports, areas, or incident types..." 
          className="w-full outline-none font-bold bg-transparent text-blue-950 dark:text-white placeholder-gray-300 dark:placeholder-slate-600" 
        />
      </div>

      <div className="space-y-6 pb-20">
        <AnimatePresence>
          {reports.map((report) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={report.id} 
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-slate-800 flex flex-col transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`bg-${report.color}-50 dark:bg-${report.color}-900/20 text-${report.color}-600 dark:text-${report.color}-400 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest`}>
                  {report.type}
                </span>
                <span className="text-[10px] font-black text-gray-300 dark:text-slate-600 uppercase tracking-widest">{report.time}</span>
              </div>
              <h3 className="font-black text-blue-950 dark:text-white text-2xl mb-3 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{report.title}</h3>
              <p className="text-gray-500 dark:text-slate-400 text-lg mb-8 line-clamp-3 leading-relaxed font-medium">{report.desc}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-slate-800/50 mt-auto">
                <div className="flex items-center text-sm font-black text-blue-950 dark:text-slate-300 px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
                   <MapPin className="w-4 h-4 mr-2 text-blue-600" /> Katapatan Homes
                </div>
                <button className="text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest hover:underline">View on Map</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Report Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-8 md:p-12 w-full max-w-2xl flex flex-col relative border border-gray-100 dark:border-slate-800"
            >
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-8 right-8 text-gray-400 hover:text-blue-950 dark:hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="mb-10">
                <h2 className="text-4xl font-black text-blue-950 dark:text-white tracking-tighter mb-2">Create Report</h2>
                <p className="text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your identity is hidden by default.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Title</label>
                    <input 
                      required type="text" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      className="w-full px-6 py-4 rounded-2xl border border-gray-50 dark:border-slate-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 bg-gray-50 dark:bg-slate-800/50 dark:text-white outline-none font-bold placeholder-gray-300" 
                      placeholder="E.g. Broken streetlight" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Category</label>
                    <select 
                      value={formData.type} 
                      onChange={e => setFormData({...formData, type: e.target.value})} 
                      className="w-full px-6 py-4 rounded-2xl border border-gray-50 dark:border-slate-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 bg-gray-50 dark:bg-slate-800/50 dark:text-white outline-none font-bold"
                    >
                      <option value="Theft">Theft</option>
                      <option value="Hazard">Hazard</option>
                      <option value="Vandalism">Vandalism</option>
                      <option value="Suspicious">Suspicious Activity</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Location</label>
                  <input 
                    required type="text" 
                    value={formData.location} 
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-50 dark:border-slate-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 bg-gray-50 dark:bg-slate-800/50 dark:text-white outline-none font-bold placeholder-gray-300" 
                    placeholder="E.g. Phase 1 Gate" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Details</label>
                  <textarea 
                    value={formData.desc} 
                    onChange={e => setFormData({...formData, desc: e.target.value})} 
                    className="w-full px-6 py-4 rounded-2xl border border-gray-50 dark:border-slate-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 bg-gray-50 dark:bg-slate-800/50 dark:text-white outline-none font-bold h-32 resize-none placeholder-gray-300" 
                    placeholder="Tell us what's happening..."
                  ></textarea>
                </div>

                <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                   <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                   <p className="text-xs font-bold text-blue-900 dark:text-blue-200">This report will be shared with the Barangay Officials and verified neighbors in your vicinity.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl mt-4 active:scale-95 transition-all shadow-xl shadow-blue-500/25 uppercase tracking-widest text-sm flex items-center justify-center"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Broadcast Report'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportsContent;
