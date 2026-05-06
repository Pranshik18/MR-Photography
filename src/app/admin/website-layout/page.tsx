'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GripVertical, Search, Plus, ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AdminConfirmModal } from '@/Components/admin/AdminConfirmModal';

interface Project {
  _id: string;
  title: string;
  category?: string;
  heroImage: string;
}


export default function WebsiteLayoutPage() {
  const router = useRouter();
  const [featured, setFeatured] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [addSearch, setAddSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    project: Project | null;
  }>({
    isOpen: false,
    project: null
  });

  // Drag config
  const dragItem = useRef<string | null>(null);
  const dragOverItem = useRef<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [featuredRes, allRes] = await Promise.all([
          fetch('/api/admin/feature'),
          fetch('/api/user/project?all=true')
        ]);
        
        const featuredData = await featuredRes.json();
        const allData = await allRes.json();
        
        if (featuredData.success) setFeatured(featuredData.data);
        if (allData.success) setAllProjects(allData.data);
      } catch (error) {
        toast.error('Failed to load project database');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);



  const searchSuggestions = addSearch.trim() === '' ? [] : allProjects.filter(p => 
    p.title.toLowerCase().includes(addSearch.toLowerCase()) && 
    !featured.some(f => f._id === p._id)
  ).slice(0, 5); 

  const handleDragStart = (e: React.DragEvent, id: string) => {
    dragItem.current = id;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragEnter = (e: React.DragEvent, id: string) => {
    dragOverItem.current = id;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const newFeatured = [...featured];
      const sourceIdx = newFeatured.findIndex(p => p._id === dragItem.current);
      const targetIdx = newFeatured.findIndex(p => p._id === dragOverItem.current);
      
      if (sourceIdx !== -1 && targetIdx !== -1) {
        const draggedItemContent = newFeatured.splice(sourceIdx, 1)[0];
        newFeatured.splice(targetIdx, 0, draggedItemContent);
        setFeatured(newFeatured);
      }
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleRemove = (project: Project) => {
    setModalState({
      isOpen: true,
      project
    });
  };

  const confirmRemove = () => {
    if (!modalState.project) return;
    const id = modalState.project._id;
    setFeatured(prev => prev.filter(p => p._id !== id));
    setModalState({ isOpen: false, project: null });
  };

  const handleAdd = () => {
    if (!addSearch.trim()) return;
    const match = searchSuggestions[0];
    if (match && !featured.find(f => f._id === match._id)) {
      setFeatured([...featured, match]);
    }
    setAddSearch('');
  };

  const handleQuickAdd = (id: string) => {
    const match = allProjects.find(p => p._id === id);
    if (match && !featured.find(f => f._id === match._id)) {
      setFeatured([...featured, match]);
    }
  };

  const saveLayout = async () => {
    setIsSaving(true);
    try {
      const projectIds = featured.map(p => p._id);
      const res = await fetch('/api/admin/feature', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectIds }),
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'Layout synchronized successfully');
        setTimeout(() => router.push('/admin'), 1000);
      } else {
        toast.error(data.message || 'Sync failed');
      }
    } catch (error) {
      toast.error('Network error while saving');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-tertiary animate-spin opacity-50" />
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 animate-pulse">Establishing Connection...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-700 pb-16">
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-10 md:mb-16">
        <div>
          <button 
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-4 mb-3 text-tertiary hover:opacity-80 transition-opacity cursor-pointer w-fit"
          >
            <div className="h-[1px] w-12 bg-tertiary"></div>
            <ArrowLeft className="w-4 h-4 ml-[-12px]" />
            <span className="text-[0.75rem] font-medium tracking-[0.3em] uppercase">Back</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline text-on-surface">
            Website Layout <span className="text-on-surface/20">— Home Page</span>
          </h1>
        </div>

      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="space-y-12 lg:col-span-12 max-w-4xl mx-auto w-full">
          <section>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-6 md:mb-8">
              <h3 className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-on-surface/60">Featured Projects ({featured.length})</h3>
              <p className="text-[0.65rem] text-on-surface/30 italic">Drag to reorder elements on the live grid</p>
            </div>
            <div className="space-y-4">
              {featured.map((project) => (
                <div 
                  key={project._id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, project._id)}
                  onDragEnter={(e) => handleDragEnter(e, project._id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 bg-surface rounded-lg border border-transparent hover:border-tertiary/20 hover:bg-neutral-900/50 transition-all duration-200"
                >
                  <div className="cursor-grab active:cursor-grabbing text-on-surface/20 group-hover:text-tertiary/60 transition-colors sm:self-auto self-start">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="w-full sm:w-32 h-40 sm:h-20 overflow-hidden rounded-sm flex-shrink-0 bg-neutral-800">
                    <img 
                      alt={project.title} 
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none" 
                      src={project.heroImage}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <p className="text-[0.65rem] tracking-widest text-primary/60 uppercase mb-1">{project.category}</p>
                    <h4 className="font-headline font-bold text-lg tracking-tight">{project.title}</h4>
                  </div>
                  <button 
                    onClick={() => handleRemove(project)}
                    className="w-full sm:w-auto px-4 py-2 text-[0.65rem] tracking-[0.2em] font-bold uppercase text-red-500/80 hover:text-red-400 transition-colors sm:self-auto self-stretch"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              {featured.length === 0 && (
                <div className="border-2 border-dashed border-tertiary/10 rounded-lg p-8 flex flex-col items-center justify-center bg-neutral-900/20 gap-2">
                  <span className="text-[0.8rem] tracking-[0.2em] uppercase text-on-surface/40 font-bold">
                    No projects featured
                  </span>
                  <span className="text-[0.65rem] tracking-[0.1em] text-on-surface/20">
                    {featured.length === 0 ? 'Add projects from your portfolio below' : `Try a different search filter`}
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="p-6 sm:p-8 bg-neutral-900/30 rounded-lg border border-outline-variant/10">
            <h3 className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-on-surface mb-6">Add to Featured</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative z-20">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40 w-4 h-4" />
                <input 
                  value={addSearch}
                  onChange={(e) => setAddSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  className="w-full bg-surface border-none text-[0.75rem] tracking-[0.15em] pl-12 pr-4 py-4 focus:ring-1 focus:ring-tertiary uppercase font-medium rounded-sm relative z-10" 
                  placeholder="SEARCH FOR A PROJECT TO ADD..." 
                  type="text"
                />

                {addSearch.trim() !== '' && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-outline-variant/20 rounded-sm shadow-2xl overflow-y-auto max-h-60 z-50">
                    {searchSuggestions.length > 0 ? (
                      searchSuggestions.map(project => (
                        <div 
                          key={project._id}
                          onClick={() => {
                            handleQuickAdd(project._id);
                            setAddSearch('');
                          }}
                          className="px-4 py-3 flex items-center gap-4 cursor-pointer border-b border-outline-variant/10 hover:bg-tertiary/20 hover:text-tertiary transition-all last:border-0 bg-surface/95 backdrop-blur-md"
                        >
                          <img src={project.heroImage} alt={project.title} className="w-12 h-12 object-cover rounded-sm" />
                          <div>
                            <p className="text-sm font-bold text-on-surface tracking-tight">{project.title}</p>
                            <p className="text-[0.65rem] text-primary/60 uppercase tracking-widest">{project.category}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-[0.75rem] text-on-surface/50 tracking-widest uppercase bg-surface/95 backdrop-blur-md">
                        No undisplayed projects match "{addSearch}"
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button 
                onClick={handleAdd}
                className="bg-tertiary text-on-tertiary w-full md:w-auto px-8 py-4 text-[0.75rem] tracking-[0.15em] font-black uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 rounded-sm"
              >
                <Plus className="w-4 h-4" />
                Add to grid
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {allProjects.filter(p => !featured.some(f => f._id === p._id)).slice(0, 3).map(p => (
                <span 
                  key={p._id}
                  onClick={() => handleQuickAdd(p._id)} 
                  className="px-3 py-1 bg-surface text-[0.6rem] text-on-surface/40 uppercase tracking-widest border border-outline-variant/10 rounded-full cursor-pointer hover:bg-tertiary/10 hover:text-tertiary transition-colors"
                >
                  Quick Add: {p.title}
                </span>
              ))}
            </div>
          </section>

          <div className="flex justify-end pt-6">
            <button 
              onClick={saveLayout}
              disabled={isSaving}
              className={`
                px-10 py-5 rounded-sm font-label font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all min-w-[240px]
                ${isSaving ? 'bg-tertiary/50 text-[#353025]/50 cursor-not-allowed' : 'bg-tertiary text-[#353025] hover:bg-white hover:text-black shadow-[0_0_30px_rgba(206,197,182,0.15)]'}
              `}
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving Updates...' : 'Save Updates'}
            </button>
          </div>

        </div>
      </div>

      <AdminConfirmModal 
        isOpen={modalState.isOpen}
        title="Remove from Featured?"
        message={`Are you sure you want to remove "${modalState.project?.title}" from the homepage featured grid? You can add it back later from the search bar.`}
        confirmText="Remove Project"
        variant="danger"
        onConfirm={confirmRemove}
        onCancel={() => setModalState({ isOpen: false, project: null })}
      />
    </div>
  );
}
