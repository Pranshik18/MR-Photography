"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';

export const PORTFOLIO_ITEMS = [
  {
    id: '1',
    category: 'WEDDINGS',
    title: 'INDIAN WEDDINGS',
    subtitle: 'A CELEBRATION OF LOVE',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=2000',
    type: 'main'
  },
  {
    id: '2',
    category: 'WEDDINGS',
    title: 'DESTINATION WEDDINGS',
    subtitle: 'CAPACITY FOR BEAUTY',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000',
    type: 'main'
  },
  {
    id: '3',
    category: 'TRADITIONS',
    title: 'HALDI & MEHENDI',
    subtitle: 'VIBRANT COLORS',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=2000',
    type: 'main'
  },
  {
    id: '4',
    category: 'PRE-WEDDING',
    title: 'PRE-WEDDING',
    subtitle: 'CINEMATIC MOMENTS',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=2000',
    type: 'sub'
  },
  {
    id: '5',
    category: 'PARTIES',
    title: 'SANGEET NIGHT',
    subtitle: 'RHYTHM & JOY',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000',
    type: 'sub'
  },
  {
    id: '6',
    category: 'MATERNITY',
    title: 'MATERNITY',
    subtitle: 'THE QUIET BEAUTY',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=2000',
    type: 'sub'
  },
  {
    id: '7',
    category: 'BOUDOIR',
    title: 'BOUDOIR',
    subtitle: 'ELEGANCE & ART',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2000',
    type: 'sub'
  },
  {
    id: '8',
    category: 'COMMERCIAL',
    title: 'COMMERCIAL',
    subtitle: 'EDITORIAL VISION',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000',
    type: 'sub'
  }
];

const CATEGORIES = ['WEDDINGS', 'PRE-WEDDING', 'PARTIES', 'TRADITIONS', 'MATERNITY', 'BOUDOIR', 'COMMERCIAL'];

export default function Portfolios() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  React.useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/user/project');
        const data = await res.json();
        if (data.success) {
          setStories(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch stories', err);
      }
    };
    fetchStories();
  }, []);

  const filteredStories = stories.filter((item) => item.category === activeCategory);
  
  // Combine predefined categories with any new categories from the admin's stories
  const allCategories = Array.from(new Set([
    ...CATEGORIES,
    ...stories.map((item) => item.category)
  ])).filter(Boolean);

  const categoryCards = allCategories.map((category) => {
    const firstStory = stories.find((item) => item.category === category);
    const hardcodedInfo = PORTFOLIO_ITEMS.find((item) => item.category === category);
    
    return {
      category,
      imageUrl: firstStory?.heroImage ?? hardcodedInfo?.imageUrl ?? 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200',
      subtitle: hardcodedInfo?.subtitle ?? 'DISCOVER MORE',
    };
  });

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header Section */}
        <header className="text-center mb-14 max-w-5xl mx-auto relative px-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full pointer-events-none overflow-hidden">
            <span className="text-[5rem] md:text-[18rem] font-serif italic text-black/[0.02] select-none leading-none whitespace-nowrap inline-block translate-y-4">
              Portfolios
            </span>
          </div>
          <h1 className="text-5xl md:text-9xl font-serif mb-8 flex justify-center items-baseline italic tracking-tight relative z-10 text-[#1a1a1a]">
            <span className="text-6xl md:text-[10rem] not-italic mr-[-0.12em] text-black">P</span>
            ortfolios
          </h1>
          <p className="text-[13px] md:text-[15px] leading-[1.8] text-gray-500 uppercase tracking-[0.25em] font-medium mb-12 max-w-4xl mx-auto">
            Explore our curated <span className="text-zinc-800 font-bold">portfolios</span> - a timeless collection of stories we've had the honor of telling over the years. 
            Our creative vision extends to the soulful artistry of maternity, boudoir and traditions. 
          </p>

        </header>

        <AnimatePresence mode="wait">
          {!activeCategory ? (
            <motion.div 
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-gray-100"
            >
              {categoryCards.map((cat) => (
                <motion.div
                  layout
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className="group relative cursor-pointer col-span-1"
                >
                  <div className="overflow-hidden rounded-[20px] shadow-lg relative aspect-[4/5]">
                    <img 
                      src={cat.imageUrl} 
                      alt={cat.category} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      <h2 className="text-3xl md:text-4xl font-sans tracking-[0.2em] font-light mb-4 uppercase text-center">
                        {cat.category}
                      </h2>
                      <div className="w-12 h-[1px] bg-white/60 mb-4" />
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-90 text-center">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Recent Work Card */}
              <motion.div
                layout
                onClick={() => router.push('/recentwork')}
                className="group relative cursor-pointer col-span-1"
              >
                <div className="overflow-hidden rounded-[20px] shadow-lg relative aspect-[4/5]">
              
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                    <h2 className="text-3xl md:text-4xl font-sans tracking-[0.2em] font-light mb-4 uppercase text-center">
                      Recent Work
                    </h2>
                    <div className="w-12 h-[1px] bg-white/60 mb-4" />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-90 text-center">
                      LATEST STORIES
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between border-t border-gray-100 pt-8 gap-4">
                <h2 className="text-3xl md:text-4xl font-serif italic text-black">{activeCategory}</h2>
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-black transition-colors self-start md:self-auto flex items-center gap-2"
                >
                  <span>←</span> BACK TO CATEGORIES
                </button>
              </div>
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode='popLayout'>
                  {filteredStories.map((item) => (
                    <motion.div
                      layout
                      key={item._id}
                      onClick={() => router.push(`/detail/${item._id}`)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="group relative cursor-pointer col-span-1"
                    >
                      <div className="overflow-hidden rounded-[20px] shadow-lg relative aspect-[4/5]">
                        <img 
                          src={item.heroImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <h2 className="text-3xl md:text-4xl font-sans tracking-[0.2em] font-light mb-4 uppercase text-center">
                            {item.title}
                          </h2>
                          {item.date && (
                            <>
                              <div className="w-12 h-[1px] bg-white/60 mb-4" />
                              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-90 text-center">
                                {item.date}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Always Visible Category Tag */}
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] uppercase tracking-widest font-bold text-white">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
