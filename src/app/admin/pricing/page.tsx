'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowLeft,
  Zap,
  DollarSign,
  Package,
  Layers,
  Save
} from 'lucide-react';
import { AdminConfirmModal } from '@/components/admin/AdminConfirmModal';

interface PricingPackage {
  _id: string;
  title: string;
  features: string[];
  currency: 'INR' | 'USD';
  price: number;
  isActive: boolean;
  isRecommended: boolean;
  order: number;
}

export default function PricingManagement() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    currency: 'INR' as 'INR' | 'USD',
    features: [''],
    isActive: true,
    isRecommended: false,
    order: 0
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'delete' | 'visibility';
    data: any;
  }>({
    isOpen: false,
    type: 'visibility',
    data: null
  });

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/user/price');
      const data = await res.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (error) {
      toast.error('Failed to load pricing packages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddField = () => setFormData({ ...formData, features: [...formData.features, ''] });
  const handleRemoveField = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingId ? '/api/admin/price/edit' : '/api/admin/price/add';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingId ? { id: editingId } : {}),
          ...formData,
          price: Number(formData.price),
          features: formData.features.filter(f => f.trim() !== '')
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? 'Package updated successfully' : 'Package added successfully');
        setIsAdding(false);
        setEditingId(null);
        setFormData({ title: '', price: '', currency: 'INR', features: [''], isActive: true, isRecommended: false, order: 0 });
        fetchPackages();
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (error) {
      toast.error('Connection error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = (pkg: PricingPackage) => {
    if (editingId === pkg._id) {
      toast.error('Finish editing this package first');
      return;
    }
    setModalState({
      isOpen: true,
      type: 'visibility',
      data: pkg
    });
  };

  const handleConfirmVisibility = async () => {
    const pkg = modalState.data;
    if (!pkg) return;

    try {
      const res = await fetch('/api/admin/price/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pkg._id, isActive: !pkg.isActive }),
      });
      if (res.ok) {
        setPackages(packages.map(p => p._id === pkg._id ? { ...p, isActive: !p.isActive } : p));
        toast.success(`Package set to ${!pkg.isActive ? 'Public' : 'Private'}`);
      }
    } catch (error) {
      toast.error('Status update failed');
    } finally {
      setModalState({ ...modalState, isOpen: false });
    }
  };

  const toggleRecommended = async (pkg: PricingPackage) => {
    try {
      const res = await fetch('/api/admin/price/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pkg._id, isRecommended: !pkg.isRecommended }),
      });
      if (res.ok) {
        setPackages(packages.map(p => p._id === pkg._id ? { ...p, isRecommended: !p.isRecommended } : p));
        toast.success(`Package ${!pkg.isRecommended ? 'Promoted' : 'Demoted'}`);
      }
    } catch (error) {
      toast.error('Recommendation update failed');
    }
  };

  const startEditing = (pkg: PricingPackage) => {
    setEditingId(pkg._id);
    setFormData({
      title: pkg.title,
      price: pkg.price.toString(),
      currency: pkg.currency,
      features: pkg.features,
      isActive: pkg.isActive,
      isRecommended: pkg.isRecommended,
      order: pkg.order
    });
    setIsAdding(true);
  };

  const deletePackage = (id: string) => {
    setModalState({
      isOpen: true,
      type: 'delete',
      data: id
    });
  };

  const handleConfirmDelete = async () => {
    const id = modalState.data;
    if (!id) return;

    try {
      const res = await fetch('/api/admin/price/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setPackages(packages.filter(p => p._id !== id));
        toast.success('Package removed from archives');
      }
    } catch (error) {
      toast.error('Deletion failed');
    } finally {
      setModalState({ ...modalState, isOpen: false });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-tertiary animate-spin opacity-50" />
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 animate-pulse">Synchronizing Tiers...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-12 pb-24 animate-in fade-in duration-700">
    
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-10"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 relative gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            {isAdding ? (editingId ? "Edit Package" : "Add New Package") : "Pricing Management"}
          </h2>
          <p className="text-stone-500 text-sm tracking-wide font-light">Curate and refine your exclusive photography service tiers.</p>
        </div>
        
        {!isAdding ? (
          <button 
            onClick={() => {
              setEditingId(null);
              setFormData({ title: '', price: '', currency: 'INR', features: [''], isActive: true, isRecommended: false, order: 0 });
              setIsAdding(true);
            }}
            className="group flex items-center space-x-3 bg-tertiary text-on-tertiary px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-tertiary/10"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Package</span>
          </button>
        ) : (
          <button 
            onClick={() => {
              setIsAdding(false);
              setEditingId(null);
              setFormData({ title: '', price: '', currency: 'INR', features: [''], isActive: true, isRecommended: false, order: 0 });
            }}
            className="flex items-center space-x-2 text-stone-500 hover:text-stone-300 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Archives</span>
          </button>
        )}
      </div>

      {isAdding ? (
        /* Form View */
        <div className="relative max-w-4xl mx-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <form onSubmit={handleSubmit} className="bg-stone-900/40 backdrop-blur-2xl p-6 sm:p-10 md:p-12 border border-outline-variant/10 shadow-2xl space-y-12 rounded-lg">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {/* Package Title */}
              <div className="col-span-1 md:col-span-2 group relative">
                <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-3 ml-1">Package Title</label>
                <input 
                  className="w-full bg-[#0e0e0e] border border-outline-variant/15 px-6 py-5 text-on-surface placeholder:text-stone-700 font-body transition-all focus:border-tertiary/40 rounded focus:outline-none" 
                  placeholder="e.g. Cinematic Wedding Collection" 
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="group relative">
                <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-3 ml-1">Currency</label>
                <div className="relative">
                  <select 
                    className="w-full bg-[#0e0e0e] border border-outline-variant/15 px-6 py-5 text-on-surface appearance-none font-body transition-all cursor-pointer focus:border-tertiary/40 rounded focus:outline-none"
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value as 'INR' | 'USD'})}
                  >
                    <option value="INR" className="bg-stone-950">Indian Rupee (INR)</option>
                    <option value="USD" className="bg-stone-950">US Dollar (USD)</option>
                  </select>
                  <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-stone-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-3 ml-1">Package Price</label>
                <input 
                  className="w-full bg-[#0e0e0e] border border-outline-variant/15 px-6 py-5 text-on-surface placeholder:text-stone-700 font-body transition-all focus:border-tertiary/40 rounded focus:outline-none" 
                  placeholder="0.00" 
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div className="col-span-1 md:col-span-1 group relative flex items-center gap-4 border-t border-outline-variant/5 pt-8">
                <div className="flex flex-col">
                  <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-1 ml-1">Recommended Package</label>
                  <p className="text-[0.6rem] text-stone-600 uppercase tracking-widest ml-1">Highlight this package to clients</p>
                </div>
                <div className="ml-auto">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      className="sr-only peer" 
                      type="checkbox"
                      checked={formData.isRecommended}
                      onChange={() => setFormData({...formData, isRecommended: !formData.isRecommended})}
                    />
                    <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-400 after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary peer-checked:after:bg-on-tertiary"></div>
                  </label>
                </div>
              </div>

              <div className="col-span-1 md:col-span-1 group relative flex items-center gap-4 border-t border-outline-variant/5 pt-8">
                <div className="flex flex-col">
                  <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-1 ml-1">Published Status</label>
                  <p className="text-[0.6rem] text-stone-600 uppercase tracking-widest ml-1">Make visible on gallery</p>
                </div>
                <div className="ml-auto">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      className="sr-only peer" 
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={() => setFormData({...formData, isActive: !formData.isActive})}
                    />
                    <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-400 after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-outline-variant/5">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="font-label text-[0.75rem] uppercase tracking-[0.2em] text-tertiary font-bold">Inclusions & Features</h3>
                  <p className="text-[0.65rem] text-stone-500 uppercase tracking-widest mt-1">Define the technical details of the package</p>
                </div>
                <button 
                  onClick={handleAddField}
                  className="flex items-center gap-2 font-label text-[0.65rem] uppercase tracking-[0.15em] text-primary hover:text-primary-fixed transition-colors" 
                  type="button"
                >
                  <Plus className="w-3 h-3" />
                  Add Feature
                </button>
              </div>
              <div className="space-y-4">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="flex-1 relative">
                      <input 
                        className="w-full bg-[#0e0e0e] border border-outline-variant/15 px-6 py-4 text-on-surface font-body transition-all border-l-2 border-l-tertiary/20 focus:border-tertiary/40 rounded focus:outline-none" 
                        placeholder={`Feature ${idx + 1}`}
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      />
                    </div>
                    {formData.features.length > 1 && (
                      <button 
                        onClick={() => handleRemoveField(idx)}
                        className="text-stone-700 hover:text-error transition-colors opacity-0 group-hover:opacity-100 duration-300" 
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 flex flex-col-reverse sm:flex-row items-center justify-end gap-6 sm:gap-8">
              <button 
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({ title: '', price: '', currency: 'INR', features: [''], isActive: true, isRecommended: false, order: 0 });
                }}
                className="w-full sm:w-auto font-label text-[0.7rem] uppercase tracking-[0.2em] text-stone-500 hover:text-on-surface transition-colors py-4 sm:py-0" 
                type="button"
              >
                Discard Draft
              </button>
              <button 
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-tertiary text-on-tertiary font-label text-[0.75rem] uppercase tracking-[0.2em] font-bold px-12 py-5 rounded-lg shadow-xl shadow-tertiary/10 hover:shadow-tertiary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3" 
                type="submit"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Save className="w-4 h-4" /> : <Package className="w-4 h-4" />)}
                <span>{editingId ? 'Update Package' : 'Save Package'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative">
          {packages.length === 0 && !isLoading ? (
             <div onClick={() => setIsAdding(true)} className="xl:col-span-2 relative group border-2 border-dashed border-outline-variant/20 p-20 flex flex-col items-center justify-center min-h-[400px] hover:border-tertiary/30 hover:bg-surface-low/20 transition-all duration-500 cursor-pointer rounded-xl">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Plus className="w-8 h-8 text-stone-600 group-hover:text-tertiary transition-colors" />
                </div>
                <h4 className="text-stone-400 font-headline font-bold tracking-widest uppercase text-xs mb-2">Create Your First Tier</h4>
                <p className="text-stone-600 text-[10px] uppercase tracking-widest tracking-wide text-center max-w-[200px]">Define a new photography service and add it to your gallery.</p>
             </div>
          ) : (
            <>
              {packages.map((pkg) => (
                <div key={pkg._id} className={`relative group overflow-hidden glass-panel border border-outline-variant/10 p-8 flex flex-col h-full hover:bg-surface-low/60 transition-all duration-700 rounded-lg ${!pkg.isActive ? 'grayscale opacity-60' : ''}`}>
                  <div className="absolute top-0 right-0 p-8">
                    <div className="flex items-center space-x-3 bg-surface-lowest/50 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">{pkg.isActive ? 'Public' : 'Private'}</span>
                      <div 
                        onClick={() => toggleStatus(pkg)}
                        className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors duration-300 ${pkg.isActive ? 'bg-tertiary' : 'bg-stone-800'}`}
                      >
                        <div className={`absolute top-0.5 w-3 h-3 bg-on-tertiary rounded-full transition-all duration-300 ${pkg.isActive ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-tertiary font-bold">Standard Series</span>
                      <div 
                        onClick={() => toggleRecommended(pkg)}
                        className={`px-2 py-1 rounded text-[8px] uppercase tracking-widest font-black cursor-pointer transition-all duration-300 ${pkg.isRecommended ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-stone-800/40 text-stone-500 border border-stone-800'}`}
                      >
                        {pkg.isRecommended ? "Curator's Choice" : "Standard Tier"}
                      </div>
                    </div>
                    <h3 className="text-3xl font-headline font-extrabold tracking-tight text-stone-100 mb-2">{pkg.title}</h3>
                  </div>

                  <div className="mb-8 flex items-baseline space-x-2">
                    <span className="text-4xl font-headline font-bold text-tertiary tracking-tighter">
                      {pkg.currency === 'INR' ? '₹' : '$'}{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-stone-600 text-[9px] uppercase tracking-widest">Base Rate</span>
                  </div>

                  <div className="flex-1 space-y-4 mb-10">
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-3.5 h-3.5 text-tertiary/70 mt-0.5" />
                        <span className="text-stone-300 text-[11px] tracking-wide font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 pt-8 border-t border-outline-variant/10">
                    <button 
                      onClick={() => startEditing(pkg)}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-surface-container-highest/30 text-stone-200 text-[9px] uppercase tracking-widest font-bold hover:bg-tertiary hover:text-on-tertiary transition-all duration-500 rounded"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Details</span>
                    </button>
                    <button 
                      onClick={() => deletePackage(pkg._id)}
                      className="p-3 bg-surface-lowest/10 text-stone-600 hover:text-error hover:bg-error-container/20 transition-all duration-300 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <div 
                onClick={() => setIsAdding(true)}
                className="relative group border border-dashed border-outline-variant/20 p-8 flex flex-col items-center justify-center h-full min-h-[350px] hover:border-tertiary/30 hover:bg-surface-low/20 transition-all duration-500 cursor-pointer rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-highest/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Plus className="w-6 h-6 text-stone-600 group-hover:text-tertiary transition-colors" />
                </div>
                <h4 className="text-stone-400 font-headline font-bold tracking-widest uppercase text-[10px] mb-2">Create New Tier</h4>
                <p className="text-stone-600 text-[10px] text-center max-w-[180px] font-light tracking-wide uppercase">Define a new photography service and add it to your gallery.</p>
              </div>
            </>
          )}
        </div>
      )}
      {!isAdding && packages.length > 0 && (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-outline-variant/10 pt-12 relative">
          <div className="space-y-1">
            <p className="text-stone-600 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-2">
              <Layers className="w-3 h-3" /> Total Active Packages
            </p>
            <p className="text-3xl font-headline font-bold text-stone-200">
              {packages.filter(p => p.isActive).length.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-stone-600 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-2">
              <DollarSign className="w-3 h-3" /> Avg. Booking Value
            </p>
            <p className="text-3xl font-headline font-bold text-stone-200">
              ₹{(packages.reduce((acc, p) => acc + p.price, 0) / (packages.length || 1)).toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-stone-600 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-2">
              <Zap className="w-3 h-3 text-tertiary" /> Most Popular Tier
            </p>
            <p className="text-3xl font-headline font-bold text-tertiary">
              {packages.find(p => p.isRecommended)?.title || packages[0]?.title || 'N/A'}
            </p>
          </div>
        </div>
      )}

      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[40%] bg-tertiary-container/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <AdminConfirmModal
        isOpen={modalState.isOpen}
        title={modalState.type === 'delete' ? "Remove Service Tier?" : "Change Visibility?"}
        message={modalState.type === 'delete' 
          ? "This action is permanent. This package will no longer be visible to your clients or accessible in the archives." 
          : `This package will be moved to ${modalState.data?.isActive ? 'Private' : 'Public'} archives.`}
        confirmText={modalState.type === 'delete' ? "Delete Package" : "Update Status"}
        variant={modalState.type === 'delete' ? 'danger' : 'primary'}
        onConfirm={modalState.type === 'delete' ? handleConfirmDelete : handleConfirmVisibility}
        onCancel={() => setModalState({ ...modalState, isOpen: false })}
      />
    </div>
  );
}