import { useState, useEffect } from 'react';
import { 
  Warehouse, 
  MapPin, 
  PieChart as PieIcon, 
  ArrowRightLeft,
  ChevronRight,
  Package,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import api from '../services/api';
import { cn } from '../lib/utils';

export default function InventoryManagement() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [stock, setStock] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wRes, sRes] = await Promise.all([
          api.get('/inventory/warehouses'),
          api.get('/inventory/stock')
        ]);
        setWarehouses(wRes.data);
        setStock(sRes.data);
      } catch (error) {
        console.error('Failed to fetch inventory data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Warehouse Network</h1>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Strategic Stock Distribution & Logistic Monitoring</p>
      </div>

      {/* Warehouse Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {warehouses.map((wh, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={wh.id} 
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all">
                <Warehouse size={24} />
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
                <Activity size={10} />
                <span className="text-[9px] font-black uppercase tracking-widest leading-none">Operational</span>
              </div>
            </div>
            
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{wh.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <MapPin size={12} className="text-slate-300" />
              <span>{wh.location}</span>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span>Storage Utilization</span>
                <span className="text-slate-900">65% Load</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[65%] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]"></div>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                 <div className="flex -space-x-1.5">
                   {[1,2,3].map(item => (
                     <div key={item} className="w-7 h-7 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-slate-300">
                       <Package size={12} />
                     </div>
                   ))}
                 </div>
                 <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                   Manage Facility <ChevronRight size={14} />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stock Movement Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <PieIcon className="text-indigo-600" size={16} />
                  Allocation Analysis
                </h2>
                <div className="text-[9px] font-black text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-full uppercase tracking-widest">Live Sync</div>
             </div>
             <div className="space-y-3 flex-1">
                {stock.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 hover:bg-slate-50 hover:border-slate-200 transition-all group">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:text-indigo-500 shadow-sm border border-slate-100 transition-colors">
                         <Package size={14} />
                       </div>
                       <div>
                         <p className="text-xs font-black text-slate-900 leading-none">Chemical Entry #{item.productId}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.warehouse} Zone</p>
                       </div>
                     </div>
                     <span className="font-black text-slate-900 text-xs">{item.quantity} kg</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-white overflow-hidden relative group flex flex-col justify-center">
             <div className="absolute -right-8 -top-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl transition-all group-hover:bg-indigo-500/20" />
             <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-500/20">
                  <ArrowRightLeft size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight">Inter-Hub Logistics</h2>
                <p className="text-slate-400 mt-2 text-xs leading-relaxed uppercase tracking-widest font-medium">
                  Autonomous Rebalancing Between Western & Southern Nodes.
                </p>
                <button className="mt-8 w-full py-4 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-50 transition-all group">
                  Initiate Transfer Order
                  <ArrowRightLeft size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
      </div>
    </div>
  );
}
