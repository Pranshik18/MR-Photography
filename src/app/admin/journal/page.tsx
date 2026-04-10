import React from 'react';
import { 
  Camera, 
  Bold, 
  Italic, 
  Quote, 
  Link, 
  List, 
  MapPin, 
  Calendar, 
  X, 
  Plus, 
  Send 
} from 'lucide-react';

export default function AddJournalPostPage() {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[1px] w-12 bg-tertiary/30"></span>
          <span className="text-[0.75rem] font-body uppercase tracking-[0.3em] text-tertiary">Editorial Module</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface leading-tight">
          Add New Journal Post
        </h1>
      </header>

      <section>
        <form className="glass-panel rounded-lg p-6 sm:p-10 md:p-16 space-y-10 md:space-y-12">
          {/* Featured Image Upload */}
          <div className="space-y-4">
            <label className="text-[0.7rem] font-body uppercase tracking-[0.2em] text-on-surface/50">Header Visualization</label>
            <div className="relative group cursor-pointer border-2 border-dashed border-white/5 hover:border-tertiary/40 transition-all duration-500 rounded-lg overflow-hidden bg-neutral-900/50 h-64 sm:h-80 md:h-[400px] flex flex-col items-center justify-center">
              <img 
                alt="placeholder" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-30 group-hover:grayscale-0" 
                src="https://picsum.photos/seed/journal-header/1200/600"
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                  <Camera className="w-8 h-8 text-tertiary" />
                </div>
                <span className="text-[0.8rem] font-body uppercase tracking-[0.15em] text-on-surface">Upload Featured Image</span>
                <span className="text-[0.65rem] text-on-surface/40 mt-2">Recommended: 2400 x 1200px (RAW or High-Quality JPEG)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Post Title */}
            <div className="space-y-4">
              <label className="text-[0.7rem] font-body uppercase tracking-[0.2em] text-on-surface/50">Post Title</label>
              <input 
                className="w-full bg-transparent border-b border-white/10 p-0 py-4 text-3xl font-headline font-bold text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-white/10" 
                placeholder="Enter a cinematic title..." 
                type="text"
              />
            </div>
            {/* Subtitle */}
            <div className="space-y-4">
              <label className="text-[0.7rem] font-body uppercase tracking-[0.2em] text-on-surface/50">Subtitle</label>
              <input 
                className="w-full bg-transparent border-b border-white/10 p-0 py-4 text-xl font-body text-on-surface/80 focus:outline-none focus:border-tertiary transition-all placeholder:text-white/10" 
                placeholder="A brief atmospheric sentence..." 
                type="text"
              />
            </div>
          </div>

          {/* Description / Rich Text */}
          <div className="space-y-4">
            <label className="text-[0.7rem] font-body uppercase tracking-[0.2em] text-on-surface/50">The Narrative</label>
            <div className="bg-neutral-900/40 rounded-lg border border-white/5 overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
                <button type="button" className="text-on-surface/40 hover:text-tertiary transition-colors"><Bold className="w-4 h-4" /></button>
                <button type="button" className="text-on-surface/40 hover:text-tertiary transition-colors"><Italic className="w-4 h-4" /></button>
                <button type="button" className="text-on-surface/40 hover:text-tertiary transition-colors"><Quote className="w-4 h-4" /></button>
                <button type="button" className="text-on-surface/40 hover:text-tertiary transition-colors"><Link className="w-4 h-4" /></button>
                <span className="w-px h-6 bg-white/5"></span>
                <button type="button" className="text-on-surface/40 hover:text-tertiary transition-colors"><List className="w-4 h-4" /></button>
              </div>
              <textarea 
                className="w-full bg-transparent border-none p-8 text-lg leading-relaxed font-body text-on-surface/70 focus:ring-0 transition-all placeholder:text-white/10 resize-none" 
                placeholder="Begin your story here. Describe the light, the mood, and the moment..." 
                rows={12}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Location / Tags */}
            <div className="space-y-4">
              <label className="text-[0.7rem] font-body uppercase tracking-[0.2em] text-on-surface/50">Location / Tags</label>
              <div className="flex items-center gap-3 bg-neutral-900/40 border border-white/5 px-4 rounded-lg">
                <MapPin className="text-tertiary w-4 h-4" />
                <input 
                  className="w-full bg-transparent border-none py-4 font-body text-on-surface/80 focus:ring-0 placeholder:text-white/10" 
                  placeholder="Icelandic Highlands, Dusk, 35mm" 
                  type="text"
                />
              </div>
            </div>
            {/* Publish Date */}
            <div className="space-y-4">
              <label className="text-[0.7rem] font-body uppercase tracking-[0.2em] text-on-surface/50">Publish Date</label>
              <div className="flex items-center gap-3 bg-neutral-900/40 border border-white/5 px-4 rounded-lg">
                <Calendar className="text-tertiary w-4 h-4" />
                <input 
                  className="w-full bg-transparent border-none py-4 font-body text-on-surface/80 focus:ring-0 [color-scheme:dark]" 
                  type="date"
                />
              </div>
            </div>
          </div>

          {/* Gallery Upload Section */}
          <div className="space-y-6 pt-6">
            <div className="flex items-end justify-between">
              <label className="text-[0.7rem] font-body uppercase tracking-[0.2em] text-on-surface/50">Supporting Gallery</label>
              <span className="text-[10px] uppercase tracking-widest text-on-surface/30">3 items selected</span>
            </div>
            {/* Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group relative aspect-square rounded overflow-hidden">
                  <img 
                    alt={`Preview ${i}`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    src={`https://picsum.photos/seed/gallery-${i}/300/300`}
                  />
                  <button className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300" type="button">
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {/* Drop Zone */}
              <div className="aspect-square border-2 border-dashed border-white/5 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group">
                <Plus className="text-on-surface/20 group-hover:text-tertiary transition-colors duration-500 w-6 h-6" />
                <span className="text-[10px] uppercase tracking-tighter text-on-surface/20 mt-2">Add More</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-12 flex justify-end">
            <button 
              className="group relative px-12 py-5 bg-tertiary text-on-tertiary font-body uppercase tracking-[0.2em] text-[0.8rem] font-bold rounded-lg overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(206,197,182,0.3)]" 
              type="submit"
            >
              <span className="relative z-10 flex items-center gap-3">
                Publish Post
                <Send className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </button>
          </div>
        </form>
      </section>

      <footer className="mt-24 flex justify-between items-center opacity-30">
        <div className="text-[10px] font-body uppercase tracking-[0.3em]">© The Nocturnal Gallery 2026</div>
        <div className="flex gap-8 text-[10px] font-body uppercase tracking-[0.3em]">
          <button className="hover:text-tertiary transition-colors">Autosave: On</button>
          <button className="hover:text-tertiary transition-colors">Revision History</button>
        </div>
      </footer>
    </div>
  );
}
