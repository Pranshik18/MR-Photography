 'use client';

import { motion } from 'motion/react';
import { Camera, Bold, Italic, List, Link as LinkIcon, Plus, X } from 'lucide-react';

const galleryPhotos = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBfd2tx-oLRWneMn0F8CLiBHc413WE2vgQeGOJG7l2zIpzWFXjQWd7C9aDrlvH-x6Johijji0DoHPznKYkzxxNih1Q4jncnJBrCiHmGN66uX1OU_ceeUCRPFYWOTh3obEs_D1j6rv3OUMzqa4m9M3AE6aktaLFPM7RrNJ2ZaryrYo9XroX243b1tcwaewZS_Gbqm_GTgtjGg0-wtuOqXNzW8FR32UsAqHlMKl_VDbyDXGefkp3bWQsBWtze3aQEw-FHIAYLpIUNAl9h',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC8f_YquV5iLxAKIPlZWkj5dx8RiLTZqRQqkEdiX8h21OuEBF-YV2XbTfBO42ZEt1PRTvqF2h8qT-INriWcfGYzQkKJiCy1RrFADfXnC7iutf1mxFoLinNqjnGnGyIuY6HKJQpP6QZJYsvBnYbrUEYhR_1n0DGpfp-Eff4NXda98BVc4xHAcml9VQDjZKVXJJ_uXq-ps6TFRBXe7bsXqUwLPE911-KXd_NAKb0_KfQODAc3dP-371jRs-3U9g6ZCq5Q6qd2OikoJTLP',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDc9Pbvf37A-Orx62T1aOZTHIgTeHB0OHbyJfd-uOHxqvI9Wc_jLB1Dd7bG8mPwGEyGbDDtQFh84MW6815bD3oVFrqNW3-bQI5-vdBYmRrGabbfmLuMlyidsO-DuU3QwjebMZf3GkVggGHTzpZAnIxCDzM9ZKjEdremuMSjdqwfcjZeG7TUGU_pQOE5JZJlu6FAJdKY2Ov0BDawIBHcHyZ4rZdBoOp3o7tMzb4s5UN7y1AUbQHYU5BtCsz1baqQ0WR9nRdcQ0SzKfg7',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCSA02f6biB0MTxvjckJjdTVc78Y8255CP67xU3IiR1uw0DNEQgm8yk1301DnwnMn19fJNt7b5lYRmqnwgDJZhkg-SbqVktkPk_D_fy7GqFX5Rx-OUC2nBRey-_QG6_v-1FZJ702Fq3aTACuTGoTxJCNBiMF8pVeVGbxtiC9HMh2O-QiQ40Vjph55PawJIhAOA9dItFCZvKi94BgfimLiLxYOWcIqzPQpgao-Fr3fRpXlM1RqHWF_lb5Ovw1683F5HL9rzKetEevhgK'
];

export default function AddProject() {
  return (
    <div className="p-12 max-w-5xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-[1px] w-12 bg-tertiary"></div>
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-tertiary">Curator Workspace</span>
        </div>
        <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-on-surface">Add New Project</h2>
      </header>

      <section className="glass-card p-10 lg:p-16 border border-outline-variant/10 shadow-2xl space-y-12">
        {/* Hero Image Upload */}
        <div className="space-y-4">
          <label className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant block">Hero Image</label>
          <div className="group relative w-full aspect-[21/9] bg-surface-container-lowest border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all duration-700 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlfbaw28vvYvNZnMxQRA5fA6b3b2moQGRmsS_pJQB-TG27KZpGmz4j4o1W6xr9t92Ifcg6HoQ0NS4Uu7hi6drAYCbzpzJOluwB1zo42OAHOY6rl504piqC4Nq14lQlRfngYh18_VIwag945BAEvqIRZrQmYRNF5LSn4TOBCdugpjM94uLcPvDnS4nlwLn_hJdbFvstOSHkhKgkYyJDWkyaW8v0WtZjvCKfjveI-Xev-glymtucIUMXxWsjtz9hWWJ41osHhs5EQ7eF" 
                alt="Hero Preview" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <Camera className="w-12 h-12 text-outline-variant group-hover:text-primary transition-colors duration-500 mb-4" />
              <p className="font-body text-sm text-outline">Drag and drop cinematic centerpiece or click to browse</p>
              <p className="font-label text-[9px] text-neutral-600 mt-2 tracking-widest uppercase">RAW, TIFF, or JPEG (Max 50MB)</p>
            </div>
          </div>
        </div>

        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Project Title</label>
            <input 
              type="text" 
              placeholder="e.g. Obsidian Dreams"
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface font-headline text-xl font-light tracking-tight transition-all"
            />
          </div>
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Subtitle</label>
            <input 
              type="text" 
              placeholder="A study in tonal silence"
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface-variant font-body text-base transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block">Description</label>
          <div className="border border-outline-variant/20 bg-surface-container-lowest/50">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-outline-variant/10 bg-surface-container-low">
              <Bold className="w-4 h-4 cursor-pointer hover:text-primary" />
              <Italic className="w-4 h-4 cursor-pointer hover:text-primary" />
              <List className="w-4 h-4 cursor-pointer hover:text-primary" />
              <LinkIcon className="w-4 h-4 cursor-pointer hover:text-primary" />
            </div>
            <textarea 
              placeholder="Compose the narrative of this collection..."
              className="w-full h-48 bg-transparent border-none p-6 focus:ring-0 text-on-surface font-body leading-relaxed text-sm resize-none"
            />
          </div>
        </div>

        {/* Client & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Client</label>
            <input 
              type="text" 
              placeholder="Private Commission"
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface-variant font-body text-base transition-all"
            />
          </div>
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Role</label>
            <input 
              type="text" 
              placeholder="Photographer"
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface-variant font-body text-base transition-all"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-6 pt-4">
          <div className="flex justify-between items-end">
            <label className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">Gallery Photos</label>
            <span className="font-body text-[10px] text-primary/60">4 of 12 uploaded</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Upload Slot */}
            <div className="aspect-square bg-surface-container-lowest border border-dashed border-outline-variant/40 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors group">
              <Plus className="w-6 h-6 text-outline-variant group-hover:text-primary transition-colors" />
              <span className="font-label text-[8px] uppercase tracking-widest mt-2 text-outline-variant">Add Frame</span>
            </div>
            {/* Preview Items */}
            {galleryPhotos.map((photo, i) => (
              <div key={i} className="aspect-square relative group overflow-hidden bg-surface-container-high">
                <img 
                  src={photo} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-red-950/80 p-2 rounded-full text-red-300 hover:bg-red-800 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Action */}
        <div className="pt-10 flex justify-end">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group bg-tertiary text-[#353025] px-12 py-5 font-headline font-bold text-sm tracking-widest uppercase overflow-hidden"
          >
            <span className="relative z-10">Create Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-tertiary to-tertiary-fixed-dim opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.button>
        </div>
      </section>
    </div>
  );
}
