'use client';

import { Plus, Edit2, Tag, Layers, Settings, Mail, MessageSquare, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

export default function Dashboard() {
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { searchQuery } = useAdmin();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); 
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const endpoint = debouncedQuery 
          ? `/api/admin/project?q=${encodeURIComponent(debouncedQuery)}` 
          : '/api/admin/dashboard';
        
        const response = await fetch(endpoint);
        const data = await response.json();
        
        if (data.success) {
          const results = debouncedQuery ? data.data.slice(0, 3) : data.data;
          setRecentProjects(results);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [debouncedQuery]);

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto">
      <header className="mb-10 md:mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-tertiary mb-4 block">Overview</span>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface">
            Welcome Back <span className="block md:inline"></span>
          </h2>
        </div>
        <Link
          href="/admin/add-project"
          className="bg-tertiary text-[#353025] w-full md:w-auto px-6 py-3 rounded-lg font-headline font-bold text-sm tracking-tight flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(206,197,182,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </Link>
      </header>

      <section>
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-xl font-headline font-bold text-on-surface tracking-tight">
            {debouncedQuery ? 'Filtered Projects' : 'Recent Projects'}
          </h3>
          <Link href="/admin/manage-portfolio" className="text-[10px] uppercase tracking-[0.15em] text-tertiary hover:text-on-surface transition-colors">View All Archive</Link>
        </div>

        {loading ? (
          <div className="text-center py-10 text-neutral-500">Loading recent projects...</div>
        ) : recentProjects.length === 0 ? (
          <div className="text-center py-10 text-neutral-500">No projects found. Add one!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {recentProjects.length > 0 && (
              <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest">
                <Link href="/admin/manage-portfolio" className="block w-full h-full relative">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img 
                      src={recentProjects[0].heroImage || recentProjects[0].image} 
                      alt={recentProjects[0].title}
                      className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 bg-gradient-to-t from-black/80 to-transparent z-10">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="bg-tertiary text-[#353025] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2 inline-block">
                          {recentProjects[0].isPublic ? 'Published' : recentProjects[0].status || 'Draft'}
                        </span>
                        <h4 className="text-2xl font-headline font-bold text-white tracking-tight group-hover:text-tertiary transition-colors">{recentProjects[0].title}</h4>
                        <p className="text-xs text-neutral-300 mt-1">{new Date(recentProjects[0].updatedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="bg-white/10 group-hover:bg-tertiary backdrop-blur-md p-3 rounded-full transition-colors flex-shrink-0">
                        <Edit2 className="w-5 h-5 text-white group-hover:text-[#353025] transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="md:col-span-4 flex flex-col gap-8">
              {recentProjects.slice(1).map((project) => (
                <Link key={project._id || project.id} href="/admin/manage-portfolio" className="group relative overflow-hidden flex flex-col cursor-pointer">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-lowest">
                    <img 
                      src={project.heroImage || project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 z-10 pointer-events-none">
                      <span className={`
                        text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded backdrop-blur-md
                        ${(project.isPublic ? 'Published' : project.status) === 'Published' ? 'bg-tertiary text-[#353025]' : 'bg-surface-container-highest/80 text-white'}
                      `}>
                        {project.isPublic ? 'Published' : project.status || 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-end">
                    <div>
                      <h4 className="text-lg font-headline font-bold text-on-surface tracking-tight group-hover:text-tertiary transition-colors">{project.title}</h4>
                      <p className="text-xs text-neutral-500 mt-1">{new Date(project.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant/20 group-hover:bg-tertiary group-hover:border-tertiary p-2 rounded-full transition-colors flex-shrink-0">
                      <Edit2 className="w-4 h-4 text-on-surface-variant group-hover:text-[#353025] transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mt-14 md:mt-20">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-xl font-headline font-bold text-on-surface tracking-tight">Administrative Modules</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link href="/admin/manage-portfolio" className="group bg-surface-container-lowest border border-outline-variant/10 hover:border-tertiary/40 rounded-lg p-8 flex flex-col items-start transition-all">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:bg-tertiary transition-colors">
              <ImageIcon className="w-6 h-6 text-outline group-hover:text-[#353025]" />
            </div>
            <h4 className="text-lg font-headline font-bold text-on-surface tracking-tight">Portfolio</h4>
            <p className="text-xs text-neutral-500 mt-2">Manage your photography pieces</p>
          </Link>
          <Link href="/admin/inquire" className="group bg-surface-container-lowest border border-outline-variant/10 hover:border-tertiary/40 rounded-lg p-8 flex flex-col items-start transition-all">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:bg-tertiary transition-colors">
              <Mail className="w-6 h-6 text-outline group-hover:text-[#353025]" />
            </div>
            <h4 className="text-lg font-headline font-bold text-on-surface tracking-tight">Inquiries</h4>
            <p className="text-xs text-neutral-500 mt-2">Manage contact form requests</p>
          </Link>
          <Link href="/admin/pricing" className="group bg-surface-container-lowest border border-outline-variant/10 hover:border-tertiary/40 rounded-lg p-8 flex flex-col items-start transition-all">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:bg-tertiary transition-colors">
              <Tag className="w-6 h-6 text-outline group-hover:text-[#353025]" />
            </div>
            <h4 className="text-lg font-headline font-bold text-on-surface tracking-tight">Pricing</h4>
            <p className="text-xs text-neutral-500 mt-2">Manage pricing and packages</p>
          </Link>
          <Link href="/admin/review" className="group bg-surface-container-lowest border border-outline-variant/10 hover:border-tertiary/40 rounded-lg p-8 flex flex-col items-start transition-all">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:bg-tertiary transition-colors">
              <MessageSquare className="w-6 h-6 text-outline group-hover:text-[#353025]" />
            </div>
            <h4 className="text-lg font-headline font-bold text-on-surface tracking-tight">Reviews</h4>
            <p className="text-xs text-neutral-500 mt-2">Manage client testimonials</p>
          </Link>
          <Link href="/admin/website-layout" className="group bg-surface-container-lowest border border-outline-variant/10 hover:border-tertiary/40 rounded-lg p-8 flex flex-col items-start transition-all">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:bg-tertiary transition-colors">
              <Layers className="w-6 h-6 text-outline group-hover:text-[#353025]" />
            </div>
            <h4 className="text-lg font-headline font-bold text-on-surface tracking-tight">Website Layout</h4>
            <p className="text-xs text-neutral-500 mt-2">Reorder and customize featured work</p>
          </Link>
          <Link href="/admin/settings" className="group bg-surface-container-lowest border border-outline-variant/10 hover:border-tertiary/40 rounded-lg p-8 flex flex-col items-start transition-all">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:bg-tertiary transition-colors">
              <Settings className="w-6 h-6 text-outline group-hover:text-[#353025]" />
            </div>
            <h4 className="text-lg font-headline font-bold text-on-surface tracking-tight">Settings</h4>
            <p className="text-xs text-neutral-500 mt-2">Manage profile, security, and preferences</p>
          </Link>
        </div>
      </section>

      <section className="mt-14 md:mt-20">
        <div className="bg-surface-container-lowest p-6 md:p-12 border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-headline font-extrabold text-on-surface tracking-tighter mb-2 italic">Ready to curate the next collection?</h3>
              <p className="text-neutral-500 max-w-lg">Drag and drop your high-resolution files to start a new journey. The Nocturnal Gallery platform optimizes for depth and contrast automatically.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link href="/admin/manage-portfolio" className="text-center w-full sm:w-auto px-8 py-4 bg-surface-container-highest text-on-surface font-headline font-bold text-xs uppercase tracking-[0.2em] hover:bg-surface-bright transition-colors">Manage All</Link>
              <Link 
                href="/admin/add-project"
                className="text-center w-full sm:w-auto px-8 py-4 bg-tertiary text-[#353025] font-headline font-bold text-xs uppercase tracking-[0.2em] shadow-[0_10px_40px_-10px_rgba(206,197,182,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Upload Files
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



