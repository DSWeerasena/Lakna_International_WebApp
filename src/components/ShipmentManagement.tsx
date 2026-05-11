import { useState, useEffect } from 'react';
import { 
  Truck, 
  Globe, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import api from '../services/api';
import { cn } from '../lib/utils';

export default function ShipmentManagement() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shipRes, supRes] = await Promise.all([
          api.get('/shipments'),
          api.get('/shipments/suppliers')
        ]);
        setShipments(shipRes.data);
        setSuppliers(supRes.data);
      } catch (error) {
        console.error('Failed to fetch shipment data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Transit': return <Truck size={14} />;
      case 'Delivered': return <CheckCircle2 size={14} />;
      case 'Pending': return <Clock size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Supply Chain Pipeline</h1>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Cross-Border Logistics & Multi-Vendor Tracking</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10">
          <PlusIcon size={16} />
          Create Import Order
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Active Shipments Column */}
        <div className="xl:col-span-8 space-y-4">
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Active Vessel Transfers</h2>
               <span className="text-[9px] font-black px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-widest leading-none">{shipments.length} Active</span>
             </div>
             <div className="divide-y divide-slate-50">
               {shipments.map((ship, i) => (
                 <motion.div 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.05 }}
                   key={ship.id} 
                   className="p-5 flex items-center justify-between hover:bg-slate-50 transition-all group"
                 >
                   <div className="flex items-center gap-5">
                     <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all border border-slate-200 group-hover:border-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-600/20">
                       <Truck size={22} />
                     </div>
                     <div>
                       <div className="flex items-center gap-2">
                         <span className="font-black text-slate-900 text-sm uppercase tracking-tight leading-none">{ship.trackingNumber}</span>
                         <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-full border flex items-center gap-1 uppercase tracking-widest leading-none", getStatusClass(ship.status))}>
                           {getStatusIcon(ship.status)}
                           {ship.status}
                         </span>
                       </div>
                       <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-tight leading-none">{ship.items}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-10">
                     <div className="text-right hidden sm:block">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1 mb-1">
                          <Calendar size={10} />
                          ETA Window
                        </p>
                        <div className="text-[11px] font-black text-slate-900 mt-0.5 uppercase">
                          {new Date(ship.eta).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                     </div>
                     <button className="p-2 hover:bg-white rounded-lg text-slate-300 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-200">
                       <ExternalLink size={16} />
                     </button>
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
        </div>

        {/* Info Column */}
        <div className="xl:col-span-4 space-y-4">
           {/* Supplier Bench */}
           <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl shadow-slate-900/10">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tier-1 Suppliers</h2>
                 <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              </div>
              <div className="space-y-4">
                {suppliers.map((sup, i) => (
                  <div key={sup.id} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all border border-white/5 font-black text-xs">
                        {sup.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-black group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{sup.name}</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{sup.country}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-700 group-hover:text-white transition-all" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">
                Global Vendor Registry
              </button>
           </div>

           {/* Metrics Mini-Grid */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-500 p-5 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-80">Arrivals Today</p>
                 <div className="flex items-end justify-between mt-3">
                    <p className="text-3xl font-black leading-none">02</p>
                    <div className="p-1.5 bg-white/20 rounded-lg"><ClipboardList size={14} /></div>
                 </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Clearances</p>
                 <div className="flex items-end justify-between mt-3">
                    <p className="text-3xl font-black text-slate-900 leading-none">08</p>
                    <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><CheckCircle2 size={14} /></div>
                 </div>
              </div>
           </div>

           {/* Alert Card */}
           <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-20 h-20 bg-rose-50 rounded-bl-full transition-all group-hover:w-24 group-hover:h-24" />
              <div className="relative z-10">
                <h3 className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <AlertCircle size={14} />
                  Operational Alert
                </h3>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  2 shipments from <span className="font-bold text-slate-900">Orientations Polymers</span> are stalled at Colombo Port. Action required for priority fulfillment.
                </p>
                <div className="mt-4 text-[9px] font-black text-rose-600 hover:underline cursor-pointer uppercase tracking-widest">Acknowledge Intelligence</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
