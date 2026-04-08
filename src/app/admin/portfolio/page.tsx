 'use client';

import { motion } from 'motion/react';
import { Search, ChevronDown, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const projects = [
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
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

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

  const sortedProjects = useMemo(() => {
    const copy = [...projects];
    if (sortOption === 'az') {
      copy.sort((a, b) => a.title.localeCompare(b.title));
      return copy;
    }
    // With static seed data, treat higher id as newer.
    copy.sort((a, b) => (sortOption === 'newest' ? b.id - a.id : a.id - b.id));
    return copy;
  }, [sortOption]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.key === sortOption)?.label ?? 'Sort';

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary">Gallery Oversight</label>
          <h2 className="text-5xl font-headline font-extrabold tracking-[-0.03em] text-on-surface">Manage Portfolio</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
            <input 
              type="text" 
              placeholder="Find project..." 
              className="bg-surface-container-low border-none focus:ring-1 focus:ring-tertiary/30 text-on-surface placeholder:text-outline-variant text-sm py-3 pl-12 pr-6 w-64 transition-all"
            />
          </div>
          
          <div className="relative" ref={sortMenuRef}>
            <button
              type="button"
              onClick={() => setSortOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={sortOpen}
              className="flex items-center gap-3 bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:ring-1 focus:ring-tertiary/30 text-on-surface text-sm py-3 pl-6 pr-4 cursor-pointer transition-all min-w-56 justify-between backdrop-blur-md"
            >
              <span>{activeSortLabel}</span>
              <ChevronDown className="w-4 h-4 text-outline" />
            </button>

            {sortOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-full bg-surface-container border border-outline-variant/30 shadow-2xl overflow-hidden z-50 backdrop-blur-md"
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
                    className={`w-full text-left px-6 py-3 text-sm transition-colors ${
                      sortOption === option.key
                        ? 'bg-surface-container-high text-on-surface'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {sortedProjects.map((project) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col glass-card border border-white/5 hover:border-tertiary/20 transition-all duration-700 shadow-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className={`
                  backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest font-bold
                  ${project.status === 'Published' ? 'bg-background/80 text-tertiary' : 'bg-background/80 text-outline-variant'}
                `}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface">{project.title}</h3>
                  <p className="text-sm text-outline tracking-wide mt-1">{project.subtitle}</p>
                </div>
                <div className="flex gap-3">
                  <button className="text-tertiary hover:scale-110 transition-transform">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button className="text-red-400/60 hover:text-red-400 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-outline">Visibility</span>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-[0.1em] font-bold ${project.visibility === 'Public' ? 'text-tertiary' : 'text-outline opacity-50'}`}>
                    {project.visibility}
                  </span>
                  <div className={`
                    w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors
                    ${project.visibility === 'Public' ? 'bg-tertiary/20' : 'bg-surface-container'}
                  `}>
                    <div className={`
                      w-3 h-3 rounded-full absolute top-1 transition-all
                      ${project.visibility === 'Public' ? 'bg-tertiary right-1 shadow-[0_0_10px_#CEC5B6]' : 'bg-outline left-1'}
                    `} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="group relative flex flex-col items-center justify-center border-2 border-dashed border-white/5 hover:border-tertiary/40 transition-all duration-500 cursor-pointer min-h-[400px]"
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
      </section>
    </div>
  );
}
