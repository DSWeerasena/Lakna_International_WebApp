import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  Truck, 
  Users, 
  ShoppingCart, 
  Bell, 
  Settings, 
  LogOut,
  Search,
  Menu,
  BadgeCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { useAuthStore } from './store/authStore';
import Login from './components/Login';
import ProductManagement from './components/ProductManagement';
import InventoryManagement from './components/InventoryManagement';
import ShipmentManagement from './components/ShipmentManagement';
import OrderManagement from './components/OrderManagement';
import Analytics from './components/Analytics';
import EmployeeManagement from './components/EmployeeManagement';
import CustomerManagement from './components/CustomerManagement';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const notifications = [
    { id: 1, title: 'Low Stock Alert', message: 'Sulfuric Acid is down to 15L in Galle hub.', time: '10m ago', type: 'error' },
    { id: 2, title: 'Expiry Warning', message: 'Sodium Hydroxide (Batch #220) expires in 14 days.', time: '1h ago', type: 'warning' },
    { id: 3, title: 'New Shipment', message: 'Shipment #S-9021 from Hamburg is in transit.', time: '3h ago', type: 'info' },
  ];

  if (!isAuthenticated) {
    return <Login />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'shipments', label: 'Shipments', icon: Truck },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'employees', label: 'Employees', icon: BadgeCheck },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 transition-all duration-300 ease-in-out z-20 shrink-0"
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">LI</div>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-sm font-bold tracking-tight uppercase">Lakna Intl</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Chemical ERP</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {sidebarOpen && <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 px-2">Navigation</div>}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group text-left",
                activeTab === item.id 
                  ? "bg-slate-800 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon size={18} className={cn("shrink-0", activeTab === item.id ? "text-indigo-400" : "group-hover:text-white")} />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold ring-2 ring-slate-800">
              {(user?.name || 'A').split(' ').map(n => n[0]).join('')}
            </div>
            {sidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold truncate">{user?.name || 'S. Kumara'}</span>
                <span className="text-[10px] text-slate-500 uppercase truncate">{user?.role || 'Senior Manager'}</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-1">
             <button onClick={logout} className="flex items-center gap-3 text-slate-500 hover:text-rose-400 text-xs font-bold transition-colors py-2">
               <LogOut size={14} />
               {sidebarOpen && <span className="uppercase tracking-widest">Logout</span>}
             </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed to show dynamic user name */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            >
              <Menu size={20} className="text-slate-600" />
            </button>
            <div className="relative max-w-md w-64 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search chemicals, batches, or order IDs..." 
                className="w-full pl-11 pr-4 py-2 bg-slate-100 border border-transparent rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white focus:border-slate-200 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Bell size={20} className="text-slate-500" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)} 
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden text-white"
                    >
                      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                        <h3 className="text-xs font-bold uppercase tracking-wider">System Notifications</h3>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">3 New</span>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.map((n) => (
                          <div key={n.id} className="p-4 hover:bg-slate-800 transition-colors border-b border-slate-800 group cursor-pointer">
                            <div className="flex gap-3">
                               <div className={cn(
                                 "w-1 h-full min-h-[40px] rounded-full shrink-0",
                                 n.type === 'error' ? 'bg-rose-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-indigo-500'
                               )} />
                               <div className="flex-1">
                                 <p className="text-xs font-bold group-hover:text-indigo-400 transition-colors">{n.title}</p>
                                 <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{n.message}</p>
                                 <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase tracking-widest">{n.time}</p>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-3 bg-slate-800 text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors border-t border-slate-800 uppercase tracking-widest">
                        View All Records
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">{user?.role || 'User'}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
                {(user?.name || 'A').split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-7xl mx-auto min-h-full">
            {activeTab === 'dashboard' && <Analytics />}
            {activeTab === 'products' && <ProductManagement />}
            {activeTab === 'inventory' && <InventoryManagement />}
            {activeTab === 'shipments' && <ShipmentManagement />}
            {activeTab === 'orders' && <OrderManagement />}
            {activeTab === 'employees' && <EmployeeManagement />}
            {activeTab === 'customers' && <CustomerManagement />}
          </div>
        </div>
      </main>
    </div>
  );
}
