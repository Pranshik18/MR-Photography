"use client";

import { motion, AnimatePresence } from 'motion/react';
import { Heart, Briefcase, Frame, ArrowRight, ChevronLeft, ChevronRight, Loader2, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

const accentDotHoverClassByColor = {
  tertiary: 'group-hover:bg-tertiary',
  primary: 'group-hover:bg-primary',
  'stone-500': 'group-hover:bg-stone-500',
} as const;

const accentTextClassByColor = {
  tertiary: 'text-tertiary',
  primary: 'text-primary',
  'stone-500': 'text-stone-500',
} as const;

type ThemeColor = keyof typeof accentDotHoverClassByColor;

interface PricingPackage {
  _id: string;
  title: string;
  features: string[];
  currency: 'INR' | 'USD';
  price: number;
  isActive: boolean;
  isRecommended: boolean;
  order: number;
  // Derived for UI
  icon?: ReactNode;
  color?: ThemeColor;
  bg?: string;
  cta?: string;
}

export default function Price() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/user/price');
        const data = await res.json();
        
        if (data.success) {

          const mapped = data.data
            .filter((p: any) => p.isActive)
            .map((p: any) => ({
              ...p,
              icon: p.title.toLowerCase().includes('wedding') ? <Heart size={24} className="text-tertiary" /> :
                    p.title.toLowerCase().includes('commercial') ? <Briefcase size={24} className="text-primary" /> :
                    <Frame size={24} className="text-stone-500" />,
              color: p.isRecommended ? 'tertiary' : 
                     p.title.toLowerCase().includes('commercial') ? 'primary' : 'stone-500',
              cta: p.title.toLowerCase().includes('prints') ? 'Visit Shop' : 
                   p.title.toLowerCase().includes('commercial') ? 'Book Project' : 'Enquire Now'
            }));
          setPackages(mapped);
        } else {
          setError('Failed to sync pricing archives');
        }
      } catch (err) {
        setError('Network interruption while fetching tiers');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const updateItemsToShow = useCallback(() => {
    if (window.innerWidth < 768) setItemsToShow(1);
    else if (window.innerWidth < 1280) setItemsToShow(2);
    else setItemsToShow(3);
  }, []);

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, [updateItemsToShow]);

  const handlePrev = useCallback(() => {
    if (packages.length <= itemsToShow) return;
    const maxIndex = Math.max(0, packages.length - itemsToShow);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [packages.length, itemsToShow]);

  const handleNext = useCallback(() => {
    if (packages.length <= itemsToShow) return;
    const maxIndex = Math.max(0, packages.length - itemsToShow);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [packages.length, itemsToShow]);


  useEffect(() => {
    if (isHovered || packages.length <= itemsToShow || isLoading) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [isHovered, packages.length, itemsToShow, handleNext, isLoading]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-tertiary animate-spin opacity-20" />
        <p className="font-headline text-[10px] tracking-[0.3em] uppercase text-stone-500 animate-pulse">Synchronizing Tiers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-24 text-center">
        <p className="text-stone-500 font-headline uppercase tracking-widest text-xs">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-tertiary text-[10px] uppercase font-bold tracking-widest border-b border-tertiary/20 pb-1 hover:border-tertiary transition-colors">Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 overflow-x-hidden">

      <header className="px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto mb-16 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-tertiary mb-6 block">Investment</span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Capturing light, <br/><span className="text-stone-500">Defining moments.</span>
          </h1>
          <p className="text-on-surface-variant text-sm sm:text-lg font-light leading-relaxed max-w-xl">
            Transparent pricing for bespoke photographic services. Each package is tailored to preserve the unique narrative of your vision with uncompromising quality.
          </p>
        </motion.div>
      </header>

      <div className="relative overflow-hidden w-full h-32 md:h-48 -mb-16 md:-mb-24 z-0 pointer-events-none opacity-5 select-none whitespace-nowrap">
        <div className="animate-marquee">
          <span className="font-headline text-[8rem] md:text-[12rem] font-extrabold uppercase tracking-tighter text-on-surface whitespace-nowrap">
            INVEST IN YOUR STORY — ARTFUL DOCUMENTATION — TIMELESS IMAGES — INVEST IN YOUR STORY — ARTFUL DOCUMENTATION — TIMELESS IMAGES —
          </span>
        </div>
      </div>


      <section 
        className="px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {packages.length > itemsToShow && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between pointer-events-none px-4 sm:px-8">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-surface-lowest/80 backdrop-blur-md border border-outline-variant/10 flex items-center justify-center text-on-surface hover:bg-tertiary hover:text-stone-900 transition-all duration-500 pointer-events-auto shadow-2xl"
              aria-label="Previous Package"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-surface-lowest/80 backdrop-blur-md border border-outline-variant/10 flex items-center justify-center text-on-surface hover:bg-tertiary hover:text-stone-900 transition-all duration-500 pointer-events-auto shadow-2xl"
              aria-label="Next Package"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div className="overflow-hidden relative px-2 py-8 -my-8" ref={containerRef}>
          <motion.div 
            className="flex w-full"
            animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {packages.map((pkg, idx) => (
              <div 
                key={pkg._id} 
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div 
                  className={`
                    p-8 md:p-10 flex flex-col justify-between h-full min-h-[460px] relative group/card
                    rounded-2xl transition-all duration-500 ease-out border
                    ${pkg.isRecommended 
                      ? 'bg-gradient-to-b from-[#1c1a17] to-[#121212] border-tertiary/20 shadow-[0_0_40px_rgba(206,197,182,0.05)]' 
                      : 'bg-[#151515] border-white/5'}
                    hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]
                    hover:border-tertiary/30 hover:bg-[#1a1a1a]
                  `}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  
                  {pkg.isRecommended && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-1.5 bg-tertiary text-stone-900 text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 z-10 rounded-full shadow-[0_0_20px_rgba(206,197,182,0.4)]">
                      <Star size={10} fill="currentColor" />
                      Recommended
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className={`flex justify-between items-start mb-8 ${pkg.isRecommended ? 'mt-4' : ''}`}>
                      <h2 className="font-headline text-2xl font-bold tracking-tight text-white group-hover/card:text-tertiary transition-colors duration-500">{pkg.title}</h2>
                      <div className="p-3 rounded-full bg-white/5 flex items-center justify-center group-hover/card:scale-110 group-hover/card:bg-white/10 transition-all duration-500">
                        {pkg.icon}
                      </div>
                    </div>
                    <ul className="space-y-4 mb-10">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-4 group">
                          <span
                            className={`w-1.5 h-1.5 bg-stone-700 ${accentDotHoverClassByColor[pkg.color || 'stone-500']} transition-colors duration-500`}
                          ></span>
                          <span className="text-[13px] uppercase tracking-widest font-sans text-on-surface-variant line-clamp-2">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative z-10">
                    <p className={`font-headline text-xs ${accentTextClassByColor[pkg.color || 'stone-500']} mb-3 uppercase tracking-[0.2em] font-medium`}>
                      {pkg.title.toLowerCase().includes('comm') ? 'Inquire for Quote' : 'Starting at'}
                    </p>
                    <p className="font-headline text-4xl font-extrabold mb-8 text-white tracking-tighter">
                      <span className="text-xl font-normal text-white/50 align-top mr-1">{pkg.currency === 'INR' ? '₹' : '$'}</span>
                      {pkg.price.toLocaleString()}
                    </p>
                    <Link 
                      href="/contact"
                      className={`w-full py-3.5 rounded-sm font-sans text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden relative group/btn ${
                       pkg.isRecommended
                          ? 'bg-tertiary text-stone-900 shadow-[0_0_20px_rgba(206,197,182,0.15)]' 
                          : 'bg-white/5 text-white border border-white/10'
                    }`}>
                      <span className="relative z-10 flex items-center gap-2">
                        {pkg.cta || 'Enquire Now'}
                        <ArrowRight size={12} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                      </span>
                      <div className={`absolute inset-0 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out ${
                        pkg.isRecommended ? 'bg-white' : 'bg-tertiary'
                      }`}></div>
                      <span className={`absolute z-10 opacity-0 group-hover/btn:opacity-100 flex items-center gap-2 transition-opacity duration-500 delay-100 ${
                        pkg.isRecommended ? 'text-black' : 'text-stone-900'
                      }`}>
                        {pkg.cta || 'Enquire Now'}
                        <ArrowRight size={12} className="translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mt-24 md:mt-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="relative h-[600px] w-full overflow-hidden group rounded-sm shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic landscape" 
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent"></div>
          <div className="absolute bottom-10 md:bottom-16 left-4 sm:left-6 md:left-16 max-w-xl">
            <h3 className="font-headline text-4xl font-bold mb-6">Looking for something unique?</h3>
            <p className="text-on-surface-variant mb-8">Custom photography projects often require a specific approach. Let&apos;s discuss your vision and create a bespoke package that fits your exact needs.</p>
            <a className="inline-flex items-center gap-4 group" href="#">
              <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase border-b border-tertiary pb-2 group-hover:border-primary transition-colors duration-500">Request Custom Quote</span>
              <ArrowRight size={18} className="text-tertiary group-hover:translate-x-2 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </section>

      <section className="mt-24 md:mt-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { step: '01', title: 'Consultation', desc: 'We discuss your aesthetic goals and specific requirements for the shoot.' },
            { step: '02', title: 'Pre-Production', desc: 'Location scouting, mood boarding, and logistical planning to ensure seamless execution.' },
            { step: '03', title: 'Production', desc: 'The day of capture. Using professional grade equipment and creative expertise.' },
            { step: '04', title: 'Curation', desc: 'Detailed editing and selection of the final collection delivered digitally.' },
          ].map((item) => (
            <div key={item.step} className="space-y-4">
              <span className="font-sans text-[10px] text-tertiary tracking-[0.2em] uppercase">Step {item.step}</span>
              <h4 className="font-headline font-bold uppercase tracking-tight">{item.title}</h4>
              <p className="text-xs text-on-surface-variant leading-loose">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
