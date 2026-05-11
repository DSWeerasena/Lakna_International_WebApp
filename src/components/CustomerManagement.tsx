import { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  Briefcase, 
  Building2,
  ChevronRight,
  Search,
  UserCheck,
  MoreVertical,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import api from '../services/api';
import { cn } from '../lib/utils';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/orders/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Corporate Registry</h1>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Strategic Partnerships & B2B Distribution Channels</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10">
          <Plus size={16} />
          Register Partner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {customers.map((customer, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={customer.id} 
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-indigo-200 transition-all group flex items-start justify-between relative overflow-hidden"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all border border-slate-200 group-hover:border-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-600/20">
                <Building2 size={24} />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight truncate">{customer.name}</h3>
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                     <MapPin size={12} className="text-indigo-500" />
                     {customer.location}
                   </div>
                   <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none border-l border-slate-100 pl-3">
                     <Briefcase size={12} className="text-emerald-500" />
                     {customer.type}
                   </div>
                </div>
                <div className="pt-3 flex items-center gap-2">
                   <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1 leading-none">
                     <UserCheck size={10} /> Verified Channel
                   </span>
                   <span className="text-[9px] text-slate-300 font-bold uppercase tracking-tight italic">Relational Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end justify-between self-stretch">
               <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreVertical size={16} />
               </button>
               <button className="text-indigo-600 text-[10px] font-black flex items-center gap-1 group/btn uppercase tracking-widest leading-none">
                  Intel <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-all" />
               </button>
            </div>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
        >
           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20 shadow-sm mb-3 transition-all border border-slate-100">
             <Plus size={20} />
           </div>
           <p className="text-[10px] font-black text-slate-500 group-hover:text-indigo-600 uppercase tracking-widest leading-none">Integrate New Entity</p>
           <p className="text-[9px] text-slate-400 mt-1.5 uppercase font-medium">Scalable B2B Node Expansion</p>
        </motion.div>
      </div>
    </div>
  );
}
