import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Package,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../services/api';
import { cn } from '../lib/utils';

export default function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Industrial',
    supplier: '',
    stock: 0,
    unit: 'Liters',
    expiryDate: '',
    price: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Fetch products failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      fetchProducts();
      setShowModal(false);
      setFormData({
        name: '', code: '', category: 'Industrial', supplier: '',
        stock: 0, unit: 'Liters', expiryDate: '', price: 0
      });
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Chemical Products</h1>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Inventory Control & Specification Management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search specifications..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 w-64 shadow-sm transition-all"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all bg-white shadow-sm">
            <Filter size={16} className="text-slate-500" />
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 text-xs font-bold uppercase tracking-widest"
          >
            <Plus size={16} />
            Add Entry
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 font-bold text-slate-500 text-[10px] uppercase tracking-widest">
                <th className="px-6 py-4">Product Specification</th>
                <th className="px-6 py-4">Classification</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4">Unit Pricing</th>
                <th className="px-6 py-4">Compliance</th>
                <th className="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={product.id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-black text-xs border border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                          {product.category[0]}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm">{product.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold font-mono tracking-widest uppercase">{product.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <div className="flex items-center justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
                          <span>Volume Control</span>
                          <span className={cn(product.stock < 20 ? "text-rose-600" : "text-emerald-600")}>
                            {product.stock} {product.unit}
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full transition-all duration-1000", product.stock < 20 ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : "bg-emerald-500")}
                            style={{ width: `${Math.min(100, (product.stock / 500) * 100)}%` }}
                          />
                        </div>
                        {product.stock < 20 && (
                          <div className="flex items-center gap-1 text-[9px] font-black text-rose-600 uppercase tracking-widest">
                            <AlertTriangle size={10} />
                            Critical Threshold
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-black text-slate-900 text-sm">${product.price.toFixed(2)}</p>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mt-0.5">PER {product.unit.slice(0,-1)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{new Date(product.expiryDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: '2-digit' })}</p>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Regulatory Clear</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 hover:bg-white hover:border-slate-200 border border-transparent rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 hover:bg-white hover:border-rose-200 border border-transparent rounded-lg text-slate-400 hover:text-rose-600 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Showing {filteredProducts.length} of {products.length} Records</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-slate-900 disabled:opacity-30 transition-all" disabled><ChevronLeft size={14} /></button>
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-slate-900 disabled:opacity-30 transition-all" disabled><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">New Chemical Registration</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Chemical Product Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Sulfuric Acid 98%"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-bold text-slate-900 transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Internal Code</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="CH-LK-000"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-mono font-bold text-slate-900 transition-all"
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Usage Category</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-bold text-slate-900 transition-all appearance-none"
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Industrial</option>
                    <option>Laboratory</option>
                    <option>Agricultural</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Entry Quantity</label>
                  <input 
                    type="number" 
                    required 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-bold text-slate-900 transition-all"
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Unit Type</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-bold text-slate-900 transition-all appearance-none"
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  >
                    <option>Liters</option>
                    <option>KG</option>
                    <option>Barrels</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Expiration Schedule</label>
                  <input 
                    type="date" 
                    required 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-bold text-slate-900 transition-all"
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 text-[10px] font-black text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all uppercase tracking-widest"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 text-[10px] font-black text-white bg-slate-900 rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all uppercase tracking-widest"
                >
                  Commit Record
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
