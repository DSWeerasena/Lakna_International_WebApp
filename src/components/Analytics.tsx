import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  ArrowUpRight, 
  ChevronRight,
  Filter,
  Download,
  Truck,
  ShoppingCart,
  PieChart as PieIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const REVENUE_DATA = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 5500, orders: 32 },
  { name: 'Thu', revenue: 4800, orders: 28 },
  { name: 'Fri', revenue: 7000, orders: 45 },
  { name: 'Sat', revenue: 2000, orders: 12 },
  { name: 'Sun', revenue: 1500, orders: 8 },
];

const CATEGORY_DATA = [
  { name: 'Industrial', value: 45, color: '#2563EB' },
  { name: 'Laboratory', value: 30, color: '#6366F1' },
  { name: 'Agricultural', value: 25, color: '#10B981' },
];

export default function Analytics() {
  return (
    <div className="space-y-6 pb-12">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Inventory Value', value: '$4.28M', trend: '+12.4%', color: 'indigo', icon: Target },
          { label: 'Active Shipments', value: '14', detail: '6 arriving this week', color: 'blue', icon: Truck },
          { label: 'Critical Alerts', value: '08', detail: 'Immediate action required', color: 'rose', icon: TrendingUp },
          { label: 'Pending Orders', value: '154', detail: '42 priority express', color: 'amber', icon: ShoppingCart },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 hover:border-indigo-200 transition-colors"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</span>
              <div className={cn(
                "p-2 rounded-lg",
                stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-500' :
                stat.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                stat.color === 'rose' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'
              )}>
                <stat.icon size={16} />
              </div>
            </div>
            <div>
              <div className={cn(
                "text-2xl font-black tracking-tight",
                stat.color === 'rose' ? 'text-rose-900' : 'text-slate-900'
              )}>{stat.value}</div>
              {stat.trend ? (
                <div className="text-[11px] text-emerald-600 font-bold">{stat.trend} vs last month</div>
              ) : (
                <div className="text-[11px] text-slate-400 font-medium">{stat.detail}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[450px]">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Sales & Distribution Analytics</h2>
              <div className="flex items-center gap-2 text-emerald-500 text-[11px] font-bold mt-0.5">
                <TrendingUp size={14} />
                <span>+15.3% Growth Intensity</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-100 text-[10px] font-bold rounded-full text-slate-900">7 Days</button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors">30 Days</button>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                    color: '#fff',
                    padding: '8px 12px'
                  }}
                  itemStyle={{ color: '#818cf8', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                  labelStyle={{ color: '#fff', fontSize: '11px', marginBottom: '4px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Monitoring Card */}
        <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-6 shadow-sm flex flex-col text-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">System Monitoring</h3>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          </div>
          
          <div className="space-y-5 flex-1">
            <div className="flex gap-4 border-l-2 border-amber-500 pl-4 py-1 group cursor-pointer hover:bg-slate-800 transition-colors rounded-r-lg -ml-4">
              <div className="flex-1">
                <p className="text-xs font-bold group-hover:text-amber-400 transition-colors">Low Stock Alert: Nitric Acid</p>
                <p className="text-[10px] text-slate-400 mt-1">Current: 45L | Threshold: 100L</p>
              </div>
              <span className="text-[9px] text-slate-600 font-bold">2m ago</span>
            </div>
            <div className="flex gap-4 border-l-2 border-rose-500 pl-4 py-1 group cursor-pointer hover:bg-slate-800 transition-colors rounded-r-lg -ml-4">
              <div className="flex-1">
                <p className="text-xs font-bold group-hover:text-rose-400 transition-colors">Expiry Notice: Batch #BK-90</p>
                <p className="text-[10px] text-slate-400 mt-1">Benzene batch expires in 4 days</p>
              </div>
              <span className="text-[9px] text-slate-600 font-bold">1h ago</span>
            </div>
            <div className="flex gap-4 border-l-2 border-indigo-500 pl-4 py-1 group cursor-pointer hover:bg-slate-800 transition-colors rounded-r-lg -ml-4">
              <div className="flex-1">
                <p className="text-xs font-bold group-hover:text-indigo-400 transition-colors">Shipment Delivered</p>
                <p className="text-[10px] text-slate-400 mt-1">Vessel MSK KOBE @ Colombo</p>
              </div>
              <span className="text-[9px] text-slate-600 font-bold">3h ago</span>
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-slate-800 rounded-xl text-[10px] font-black tracking-widest hover:bg-slate-700 transition-colors uppercase border border-slate-700">
            View All Intelligence
          </button>
        </div>
      </div>

      {/* Snapshot / List Row */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Inventory Snapshot</h3>
          <div className="text-[10px] text-indigo-600 font-black hover:underline cursor-pointer uppercase tracking-widest">Export Data Log</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Chemical Product</th>
                <th className="px-6 py-4">Batch ID</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-50">
              {[
                { name: 'Hydrochloric Acid (37%)', id: 'HCL-2024-001', wh: 'Colombo Hub', qty: '2,400 L', status: 'In Stock', sColor: 'emerald' },
                { name: 'Potassium Hydroxide', id: 'KOH-2024-012', wh: 'Kandy Depot', qty: '850 KG', status: 'Low Stock', sColor: 'amber' },
                { name: 'Toluene Industrial', id: 'TOL-2023-F9', wh: 'Colombo Hub', qty: '12k L', status: 'In Stock', sColor: 'emerald' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-400 text-[10px] font-bold">{item.id}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.wh}</td>
                  <td className="px-6 py-4 font-black">{item.qty}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                      item.sColor === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    )}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
