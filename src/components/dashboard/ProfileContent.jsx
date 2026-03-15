import React, { useState } from 'react';
import { User, ShieldCheck, CheckCircle, FileText, Trash2, Plus, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileContent = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Barangay Hotline", number: "+63 912 345 6789" },
    { id: 2, name: "Maria (Mother)", number: "+63 998 765 4321" }
  ]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.number) return;
    setContacts([...contacts, { id: Date.now(), ...newContact }]);
    setNewContact({ name: "", number: "" });
    setIsAddingContact(false);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-col h-full px-4 md:px-0 max-w-4xl mx-auto pb-24">
      <div className="mb-10">
        <h2 className="font-black text-blue-950 dark:text-white text-3xl md:text-4xl tracking-tight">My Profile</h2>
        <p className="text-gray-400 dark:text-slate-500 font-medium mt-1">Manage your verified safe identity.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-gray-50 dark:border-slate-800 flex flex-col items-center text-center mb-10 relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-50/50 dark:from-blue-900/10 to-transparent"></div>
        <div className="relative mb-8 z-10">
          <div className="w-40 h-40 bg-gray-50 dark:bg-slate-800 rounded-[3.5rem] rotate-6 flex items-center justify-center border-8 border-white dark:border-slate-900 shadow-2xl transition-transform hover:rotate-0 duration-500 overflow-hidden">
             <User className="text-gray-200 dark:text-slate-700 w-24 h-24" />
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-2xl p-4 border-4 border-white dark:border-slate-900 shadow-xl z-20"
          >
            <ShieldCheck className="w-8 h-8" />
          </motion.div>
        </div>
        <h3 className="font-black text-4xl text-blue-950 dark:text-white mb-3 z-10 tracking-tight">Jenica Dematera</h3>
        <span className="text-blue-600 dark:text-blue-400 font-black text-xs bg-blue-50 dark:bg-blue-900/30 px-6 py-2 rounded-full mb-6 z-10 uppercase tracking-[0.2em]">Verified Resident</span>
        <div className="flex flex-col items-center space-y-2 z-10">
            <div className="flex items-center text-gray-500 dark:text-slate-400 font-bold text-sm">
               <MapPin className="w-4 h-4 mr-2 text-blue-600" /> Block 12, Katapatan Homes
            </div>
            <div className="flex items-center text-gray-400 dark:text-slate-500 font-medium text-xs uppercase tracking-widest">
               Barangay Banaybanay, Cabuyao
            </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Verification Details */}
        <div className="space-y-6">
          <h3 className="font-black text-blue-950 dark:text-white text-xs uppercase tracking-[0.2em] ml-2">Verification Status</h3>
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-slate-800 overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-slate-800/50 flex items-center justify-between">
              <div className="flex items-center">
                 <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-gray-400" />
                 </div>
                 <span className="font-bold text-blue-950 dark:text-slate-200">Mobile Number</span>
              </div>
              <span className="text-gray-400 dark:text-slate-500 font-black text-xs">+63 912 345 6789</span>
            </div>
            
            <div 
              onClick={() => setIsAddressModalOpen(true)}
              className="p-8 border-b border-gray-50 dark:border-slate-800/50 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center">
                 <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                 </div>
                 <span className="font-bold text-blue-950 dark:text-slate-200">Address Proof</span>
              </div>
              <span className="text-green-600 font-black text-[10px] flex items-center bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl uppercase tracking-widest">
                 <CheckCircle className="w-3 h-3 mr-2" /> Verified
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between ml-2">
            <h3 className="font-black text-blue-950 dark:text-white text-xs uppercase tracking-[0.2em]">Emergency Contacts</h3>
            <button 
              onClick={() => setIsAddingContact(!isAddingContact)} 
              className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
            >
              + Add New
            </button>
          </div>

          <AnimatePresence>
            {isAddingContact && (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddContact} 
                className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30 mb-4 overflow-hidden"
              >
                <div className="space-y-4">
                   <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={newContact.name} 
                    onChange={e => setNewContact({...newContact, name: e.target.value})} 
                    className="w-full px-5 py-3 rounded-2xl border border-blue-100 dark:border-blue-800 dark:bg-slate-800 outline-none text-sm font-bold placeholder-blue-300" 
                    required 
                   />
                   <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={newContact.number} 
                    onChange={e => setNewContact({...newContact, number: e.target.value})} 
                    className="w-full px-5 py-3 rounded-2xl border border-blue-100 dark:border-blue-800 dark:bg-slate-800 outline-none text-sm font-bold placeholder-blue-300" 
                    required 
                   />
                   <div className="flex space-x-3 pt-2">
                     <button type="submit" className="flex-1 bg-blue-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20">Save</button>
                     <button type="button" onClick={() => setIsAddingContact(false)} className="flex-1 bg-white dark:bg-slate-700 text-blue-600 dark:text-white font-black py-3 rounded-xl border border-blue-100 dark:border-slate-600 text-xs uppercase tracking-widest">Cancel</button>
                   </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-slate-800 overflow-hidden">
            {contacts.length === 0 ? (
              <div className="p-10 text-center text-gray-400 font-bold text-sm">No contacts added yet.</div>
            ) : (
              contacts.map((contact, index) => (
                <div key={contact.id} className={`flex items-center justify-between p-8 ${index !== contacts.length - 1 ? 'border-b border-gray-50 dark:border-slate-800/50' : ''} group`}>
                  <div>
                    <p className="font-black text-blue-950 dark:text-white tracking-tight text-lg leading-none mb-2">{contact.name}</p>
                    <p className="text-sm font-bold text-gray-400 dark:text-slate-500">{contact.number}</p>
                  </div>
                  <button 
                    onClick={() => removeContact(contact.id)} 
                    className="p-3 text-red-100 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-2xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Address Proof Modal */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <div className="fixed inset-0 bg-blue-950/80 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-14 w-full max-w-lg shadow-2xl relative border border-gray-100 dark:border-slate-800 text-center"
            >
              <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
                 <CheckCircle size={48} className="animate-pulse" />
              </div>
              <h3 className="text-4xl font-black text-blue-950 dark:text-white mb-4 tracking-tighter leading-none">Address<br />Verified</h3>
              <p className="text-gray-500 dark:text-slate-400 mb-10 font-medium text-lg leading-relaxed">
                Your residency has been confirmed via official utility documents.
              </p>
              
              <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 mb-10 flex items-center justify-between">
                <div className="flex items-center text-sm font-bold text-blue-950 dark:text-slate-300">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  Meralco_Oct_24.pdf
                </div>
                <span className="text-[10px] text-green-600 font-black uppercase tracking-widest">Approved</span>
              </div>

              <button 
                onClick={() => setIsAddressModalOpen(false)} 
                className="w-full bg-blue-950 dark:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-950/20 text-lg"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileContent;
