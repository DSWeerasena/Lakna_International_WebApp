import { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Mail, 
  MoreVertical, 
  UserPlus, 
  BadgeCheck,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import api from '../services/api';
import { cn } from '../lib/utils';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Personnel Network</h1>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Institutional Roles & Authentication Directives</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10">
          <UserPlus size={16} />
          Onboard Admin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {employees.map((emp, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={emp.id} 
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-indigo-200 transition-all group relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-indigo-50" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xl border border-slate-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all uppercase">
                  {emp.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <button className="p-2 hover:bg-white rounded-lg text-slate-300 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>

              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight truncate">{emp.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <ShieldCheck size={12} className="text-indigo-500" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none bg-indigo-50/50 px-2 py-0.5 rounded-full">{emp.role}</span>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-50 space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={12} className="text-slate-300" />
                  <span className="text-[10px] font-bold uppercase truncate tracking-tight">{emp.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Security State</span>
                  <div className="flex items-center gap-1.5">
                    <BadgeCheck size={12} className={cn(emp.status === 'Active' ? "text-emerald-500" : "text-amber-500")} />
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest leading-none",
                      emp.status === 'Active' ? "text-emerald-600" : "text-amber-600"
                    )}>
                      {emp.status}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-slate-50 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all border border-slate-100/50">
                Audit Clearance Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
