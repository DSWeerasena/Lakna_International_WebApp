import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle,
  Truck,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../services/api';
import { cn } from '../lib/utils';

export default function OrderManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Shipped': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={10} />;
      case 'Shipped': return <Truck size={10} />;
      case 'Pending': return <Clock size={10} />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Order Fulfillment</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Lifecycle Tracking & Commercial Invoice Management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search ID / Customer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] uppercase font-black tracking-widest outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all w-64 shadow-sm shadow-slate-100"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 font-black text-[10px] uppercase tracking-widest">
            <Plus size={16} />
            Create Request
          </button>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 font-black text-slate-500 text-[10px] uppercase tracking-widest">
                <th className="px-8 py-5">Order Reference</th>
                <th className="px-8 py-5">Customer Profile</th>
                <th className="px-8 py-5">Transaction Date</th>
                <th className="px-8 py-5">Manifest Total</th>
                <th className="px-8 py-5">Logistics State</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredOrders.map((order, i) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    key={order.id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-5 align-middle">
                      <span className="font-mono font-black text-indigo-600 bg-indigo-50/50 border border-indigo-100 px-2 py-1 rounded-lg text-[10px] tracking-widest uppercase">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-8 py-5 align-middle">
                      <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{order.customer}</p>
                    </td>
                    <td className="px-8 py-5 align-middle">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                        {new Date(order.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-5 align-middle">
                      <p className="font-black text-slate-900 text-sm tracking-tight">${order.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-5 align-middle">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest leading-none",
                        getStatusStyle(order.status)
                      )}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right align-middle">
                      <div className="flex items-center justify-end gap-2">
                         <button className="p-2.5 bg-slate-50 rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all group-hover:shadow-sm">
                           <Eye size={14} />
                         </button>
                         <button className="p-2.5 bg-slate-50 rounded-xl text-slate-300 hover:text-emerald-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all group-hover:shadow-sm">
                           <Download size={14} />
                         </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Console Actions */}
        <div className="p-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                Generate Packing List
             </button>
             <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                Mass Export
             </button>
           </div>
           <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-xl border border-slate-200 text-slate-300 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all" disabled><ChevronLeft size={16} /></button>
            <button className="p-2 rounded-xl border border-slate-200 text-slate-300 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all" disabled><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
