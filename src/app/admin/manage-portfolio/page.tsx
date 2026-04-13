'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, Edit2, Trash2, Plus } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AdminConfirmModal } from '@/Components/admin/AdminConfirmModal';

const initialProjects = [
  {
    id: 1,
    title: 'Obsidian Peaks',
    subtitle: 'Personal Collection • 2024',
    status: 'Published',
    visibility: 'Public',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_xmGwLJs2Csrj9jwPKhvc7-Ml2M_b5I_DY6U_a3sasbKMQpixld7-6S2UCK5XfFe13UrADKoHaHNR-OC3Fi4MGpnfPdW8t03wiM9yIm5dDGgD57bIKMfvhdEEV6fnpnQ6m36EZcmweChoDizvxb3VdZx4AVzYKACOwDW1p09pFTnHnRZ7TTYITR4J-sBCyg4Z8XUcAUAfxM62Uizjzep6VFhMK2cM6PmmpmryMqO_75VcNvu9PUER33E5tDRoysN6coWbL5o5Rqhr'
  },
  {
    id: 2,
    title: 'The Silent Echo',
    subtitle: 'Ethereal Arts Corp • 2023',
    status: 'Draft',
    visibility: 'Private',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq_bf9ckEKrRjGAmZRVIihJVcpUtgfWLbbJU0EY5SLq5tWnD_lv6o1jPqZ_I_H2rILpAzpxJUQjDx6bnGQZqaAvrPoCIS0Zwg5sC3eNJ6UOpRC9-4nsz5fAnVAdDUCClnJ92AQO5nXw8Htz3l6ch-aI6Q-qekQ12wjGXz6_JWhCLdvRBhBjAQkxm9x1Pil2ZQDGpnGMG3mX0yePZAB72RbfHMtNTEJ19how6K1rldCqeY-cZ264s9-KP4XKAp6PQRmOWvASnfbJ6te'
  },
  {
    id: 3,
    title: 'Midnight Neon',
    subtitle: 'Vaporwave Studios • 2024',
    status: 'Published',
    visibility: 'Public',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBCaLg0V9b7muYm3VVA72Ua8oklNE1jW8w-qqk8DHQbV5ofzE9bSwvH3HgZ31vnmoXim3SqNVfEYlFlqgADapdoDQiVuRbRcbReOzp_pjaJ-jH_tMJe93aCTeRtJ8d2MUbWeyQIV8JKm0Ljk6ttKoG4yJC0a3_u9Ovp9LRp09CWQbrVXHJFJWEYtQrTFZXZHnBZrsEoqvRQNR3oe4foEeyDcxOJfrOvOZ4KbFklx8lFXxPPKtLL9dvg9usqf-_GDSmBuYuUXJzp4vZ'
  },
  {
    id: 4,
    title: 'Void Architecture',
    subtitle: 'Design Collective • 2022',
    status: 'Published',
    visibility: 'Public',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACpaYha_Gw9N4iJPaDa4gZVhtA9AG6_-lv2u2QtYu1NE2fLECmL3zY2H8tm6k8RbJbRVooHJoa3RwspzLFTgnSA_TIfB8ygRbDPwH-ua2fuzZE40QTGpU5fTcR-fxSfb2F1ACiGQs0RGxsijSVHXIpR9_poM_7IL-F-g5kyTX9vov0Sm45KdEW3C6kiKyTKgJLekAkBCnNAh-ZOwnsBijEww2BNiXwksxbSaWlDLOuiV2Waf1anBIXrToMrDQT70fD5iADUfkKR_TE'
  },
  {
    id: 5,
    title: 'Ember Light',
    subtitle: 'Cinematic Solace • 2023',
    status: 'Draft',
    visibility: 'Private',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbSXFmHz7mQPt1yb6SuDaC9r4KL7bLG6paVqy5yVDwM4I4ZsPJ7rh02lRQOz-xlmAX6wgpcQo6wc8uhtDwssHgbfyDC5wzekyjo7iluI06c6wuil4aAyu1GtCLCpCoJq6GC9vpiDTNMv1XlxXBs8jLAMedpjyw3rT1W2kWVvw5UskGshT-l3M8HGonTDtr4OVa_bYefpChcTLxClFXEWKticsle780ohsQ41QHo8fDHOYyruP73dRhZseeE5pLXrw3etks0_2S4Gra'
  }
];

type SortOption = 'newest' | 'oldest' | 'az';

const SORT_OPTIONS: Array<{ key: SortOption; label: string }> = [
  { key: 'newest', label: 'Newest First' },
  { key: 'oldest', label: 'Oldest First' },
  { key: 'az', label: 'A-Z Alphabetical' },
];

export default function ManagePortfolio() {
  return (
    <Suspense fallback={<div>Loading Portfolio...</div>}>
      <ManagePortfolioContent />
    </Suspense>
  );
}

function ManagePortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qsString = searchParams.get('q') || '';
  
  const [projectList, setProjectList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(qsString);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [openVisibilityId, setOpenVisibilityId] = useState<string | null>(null);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/user/project');
      const data = await res.json();
      if (data.success) {
        setProjectList(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!sortOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (sortMenuRef.current?.contains(target)) return;
      setSortOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [sortOpen]);

  useEffect(() => {
    if (openVisibilityId === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenVisibilityId(null);
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest?.('.visibility-menu-container')) {
        setOpenVisibilityId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [openVisibilityId]);

  useEffect(() => {
    setSearchQuery(qsString || '');
  }, [qsString]);

  const sortedProjects = useMemo(() => {
    let copy = [...projectList];

    // 1. Search Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      copy = copy.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.subtitle.toLowerCase().includes(q)
      );
    }

    // 2. Sort Modifiers
    if (sortOption === 'az') {
      copy.sort((a, b) => a.title.localeCompare(b.title));
      return copy;
    }
    
    // With dynamic data, ID is string so use dates
    copy.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOption === 'newest' ? dateB - dateA : dateA - dateB;
    });
    return copy;
  }, [projectList, sortOption, searchQuery]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.key === sortOption)?.label ?? 'Sort';

  const handleDelete = (id: string) => {
    setProjectToDelete(id);
  };

  const confirmDelete = async () => {
    if (projectToDelete !== null) {
      try {
        const res = await fetch('/api/admin/project/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: projectToDelete }),
        });
        const data = await res.json();
        if (data.success) {
          setProjectList(prev => prev.filter(p => p._id !== projectToDelete));
        } else {
          alert('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project', error);
      } finally {
        setProjectToDelete(null);
      }
    }
  };

  const handleVisibilitySelect = async (id: string, newVisibility: string) => {
    try {
      const isPublic = newVisibility === 'Public';
      const res = await fetch('/api/admin/project/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isPublic }),
      });
      const data = await res.json();
      if (data.success) {
        setProjectList(prev => prev.map(p => {
          if (p._id === id) {
            return {
              ...p, 
              isPublic: isPublic
            };
          }
          return p;
        }));
      }
    } catch (error) {
      console.error('Failed to update visibility', error);
    }
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary">Gallery Oversight</label>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-[-0.03em] text-on-surface">Manage Portfolio</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto relative z-30">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find project..." 
              className="bg-surface-container-low border-none focus:ring-1 focus:ring-tertiary/30 text-on-surface placeholder:text-outline-variant text-sm py-3 pl-12 pr-6 w-full xl:w-64 transition-all"
            />
          </div>
          
          <div className="relative" ref={sortMenuRef}>
            <button
              type="button"
              onClick={() => setSortOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={sortOpen}
              className="flex items-center gap-3 bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:ring-1 focus:ring-tertiary/30 text-on-surface text-sm py-3 pl-6 pr-4 cursor-pointer transition-all w-full sm:min-w-56 justify-between backdrop-blur-md"
            >
              <span>{activeSortLabel}</span>
              <ChevronDown className="w-4 h-4 text-outline" />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  role="menu"
                  className="absolute right-0 mt-2 w-full bg-surface-container border border-outline-variant/30 shadow-2xl overflow-hidden backdrop-blur-md"
                >
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setSortOption(option.key);
                        setSortOpen(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="col-span-full text-center py-20 text-outline-variant font-headline text-lg">
              Loading projects...
            </div>
          ) : sortedProjects.map((project: any) => (
            <motion.div 
              layout
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col glass-card border border-white/5 hover:border-tertiary/20 transition-all duration-700 shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={project.heroImage || project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest font-bold transition-colors bg-black/40 text-white rounded">
                    {project.isPublic ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              
              <div className="p-4 md:p-6 space-y-4 relative z-10 bg-surface-container-lowest/80 backdrop-blur-xs flex-grow flex flex-col">
                <div className="flex justify-between items-start flex-grow">
                  <div className="pr-4">
                    <h3 className="font-headline text-xl lg:text-2xl font-bold tracking-tight text-on-surface line-clamp-2">{project.title}</h3>
                    <p className="text-xs lg:text-sm text-outline tracking-wide mt-1 line-clamp-1">{project.subtitle || new Date(project.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => router.push(`/admin/add-project?id=${project._id}`)}
                      className="text-white hover:text-gray-200 hover:scale-110 transition-all p-1"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(project._id)}
                      className="text-red-500 hover:text-red-400 hover:scale-110 transition-all p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 lg:pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-outline">Visibility</span>
                  <div className="relative visibility-menu-container">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openVisibilityId === project._id}
                      onClick={() => setOpenVisibilityId(openVisibilityId === project._id ? null : project._id)}
                      className="text-[10px] items-center gap-1 uppercase tracking-[0.1em] font-bold flex hover:text-tertiary transition-colors outline-none"
                    >
                      {project.isPublic ? 'Public' : 'Private'}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <AnimatePresence>
                      {openVisibilityId === project._id && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -5 }} 
                          transition={{ duration: 0.15 }}
                          role="menu"
                          className="absolute right-0 bottom-full mb-2 w-32 bg-surface-container border border-outline-variant/30 shadow-2xl z-50 py-1"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              handleVisibilitySelect(project._id, 'Public');
                              setOpenVisibilityId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 transition-colors"
                          >
                            Public
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              handleVisibilitySelect(project._id, 'Private');
                              setOpenVisibilityId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 transition-colors"
                          >
                            Private
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add New Card */}
        <Link href="/admin/add-project" className="block h-full">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group relative flex flex-col items-center justify-center border-2 border-dashed border-white/5 hover:border-tertiary/40 transition-all duration-500 cursor-pointer min-h-[400px] h-full"
          >
            <div className="flex flex-col items-center gap-4 group-hover:scale-105 transition-transform duration-500">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-tertiary transition-colors duration-500">
                <Plus className="w-8 h-8 text-outline group-hover:text-[#353025]" />
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold mb-1">New project</p>
                <p className="text-xs text-outline tracking-widest opacity-60">Expand the collection</p>
              </div>
            </div>
          </motion.div>
        </Link>
      </section>

      {sortedProjects.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-outline-variant font-headline text-lg">No projects found matching your search.</p>
        </div>
      )}

      <AdminConfirmModal
        isOpen={projectToDelete !== null}
        title="Delete Project"
        message="Are you sure you want to permanently delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
}
