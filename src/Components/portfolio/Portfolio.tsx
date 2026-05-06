"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Portfolios() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  const categoryTitle = searchParams.get('title');

  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(categoryId);
  const [activeCategoryTitle, setActiveCategoryTitle] = useState<string | null>(categoryTitle);
  const [categoryImages, setCategoryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      setActiveCategoryId(categoryId);
    }
    if (categoryTitle) {
      setActiveCategoryTitle(categoryTitle);
    }
  }, [categoryId, categoryTitle]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/user/home/category');
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryImages = async () => {
      if (!activeCategoryId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/user/home/category/${activeCategoryId}`);
        const data = await res.json();
        if (data.success) {
          setCategoryImages(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryImages();
  }, [activeCategoryId]);

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        
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
          {!activeCategoryId ? (
            <motion.div 
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-gray-100"
            >
              {categories.map((cat) => (
                <motion.div
                  layout
                  key={cat.id}
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    setActiveCategoryTitle(cat.title);
                  }}
                  className="group relative cursor-pointer col-span-1"
                >
                  <div className="overflow-hidden rounded-[20px] shadow-lg relative aspect-[4/5]">
                    <img 
                      src={cat.imageUrl} 
                      alt={cat.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      <h2 className="text-3xl md:text-4xl font-sans tracking-[0.2em] font-light mb-4 uppercase text-center">
                        {cat.title}
                      </h2>
                      <div className="w-12 h-[1px] bg-white/60 mb-4" />
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-90 text-center">
                        DISCOVER MORE
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                layout
                onClick={() => router.push('/recentwork')}
                className="group relative cursor-pointer col-span-1"
              >
                <div className="overflow-hidden rounded-[20px] shadow-lg relative aspect-[4/5]">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                  
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
              key="category-photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between border-t border-gray-100 pt-8 gap-4">
                <h2 className="text-3xl md:text-4xl font-serif italic text-black">{activeCategoryTitle || "Category"}</h2>
                <button 
                  onClick={() => {
                    setActiveCategoryId(null);
                    setActiveCategoryTitle(null);
                    router.push('/portfolio');
                  }}
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-black transition-colors self-start md:self-auto flex items-center gap-2"
                >
                  <span>←</span> BACK TO CATEGORIES
                </button>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode='popLayout'>
                    {categoryImages.map((item, idx) => (
                      <motion.div
                        layout
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="group relative cursor-pointer col-span-1"
                      >
                        <div className="overflow-hidden rounded-[20px] shadow-lg relative aspect-[4/5]">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                          
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h2 className="text-2xl md:text-3xl font-sans tracking-[0.1em] font-light uppercase text-center">
                              {item.title}
                            </h2>
                            <div className="w-12 h-[1px] bg-white/60 mt-4" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
