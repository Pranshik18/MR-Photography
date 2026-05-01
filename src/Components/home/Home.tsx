"use client";
// Trigger re-build


import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2600",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2600",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2600",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=2600",
  "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&q=80&w=2600",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=2600",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=2600"
];

import { Page } from "../layout/Navbar";
import { PORTFOLIO_ITEMS } from "../portfolio/Portfolio";
import { useRouter } from "next/navigation";
import { FAQ } from "../faq/FAQ";
import { Reviews } from "../review/Review";

interface HomeProps {
  setPage?: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ setPage }) => {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (path: string, page: Page) => {
    if (setPage) setPage(page);
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[currentImageIndex]}
              alt="Hero Showcase"
              className="w-full h-full object-cover brightness-[0.5] contrast-110 blur-[6px] scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-6">
            <div className="relative mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="flex flex-col items-center text-white drop-shadow-2xl relative z-10"
              >
                <div className="relative">
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "115%", opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
                    className="absolute bottom-[15%] -left-[7.5%] h-[25%] bg-yellow-400/30 skew-x-[-15deg] blur-md z-0"
                  />
                  <span className="relative text-7xl md:text-[14rem] font-sans font-black italic tracking-tighter leading-none mb-2 drop-shadow-[0_12px_12px_rgba(0,0,0,0.6)] text-white">
                    MR
                  </span>
                </div>
                <span className="relative text-lg md:text-3xl font-sans font-bold uppercase tracking-[1em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-white/90">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute inset-x-0 -bottom-2 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
                  />
                  PHOTOGRAPHY
                </span>
              </motion.div>
            </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <button
              className="flex flex-col items-center gap-4 text-white text-[12px] uppercase tracking-[0.2em] font-extrabold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] hover:text-gray-300 transition-colors group"
            >
              <span>Explore Portfolio</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>
      {/* Portfolio Grid (Minimal Cards) */}
      <section className="py-16 md:py-20 px-6 md:px-12 max-w-[1600px] mx-auto relative overflow-hidden">
        {/* Impressive Header */}
        <div className="text-center mb-16 md:mb-20 relative">
          <h2 className="text-[4rem] md:text-[14rem] font-serif italic text-gray-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none select-none drop-shadow-sm opacity-50 md:opacity-100">
            Portfolios
          </h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 block mb-4">Discover Our Work</span>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Curated <span className="italic text-gray-500">Collections</span></h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {["WEDDINGS", "MATERNITY", "BOUDOIR", "COMMERCIAL"].map(
            (cat, idx) => {
              const item = PORTFOLIO_ITEMS.find((p) => p.category === cat) || PORTFOLIO_ITEMS[idx];
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/5]"
                  onClick={() => handleNavClick("/portfolio", "PORTFOLIO")}
                >
                  <img
                    src={item?.imageUrl}
                    alt={cat}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h4 className="text-2xl md:text-3xl font-sans tracking-[0.2em] font-light uppercase text-center mb-4">
                      {cat}
                    </h4>
                    <div className="w-8 h-[1px] bg-white/60 mb-4" />
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold">
                      View Gallery
                    </span>
                  </div>
                  
                  {/* Default visible title at the bottom */}
                  <div className="absolute bottom-6 left-0 w-full text-center group-hover:opacity-0 transition-opacity duration-500">
                    <h4 className="text-white text-sm md:text-base font-sans tracking-[0.2em] font-bold uppercase drop-shadow-md">
                      {cat}
                    </h4>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </section>

      {/* Featured Stories */}
      <section className="bg-[#fafaf9] py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24 relative">
            <h2 className="text-[4.5rem] md:text-[14rem] font-serif italic text-gray-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none select-none drop-shadow-sm opacity-50 md:opacity-100">
              Journal
            </h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-4">
                ON THE BLOG
              </span>
              <h3 className="text-4xl md:text-6xl font-serif text-gray-900">Recent <span className="italic text-gray-600">Stories</span></h3>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {stories.slice(0, 4).map((story) => (
              <div
                key={story._id}
                className="group cursor-pointer"
                onClick={() => handleNavClick("/recentwork", "RECENT_WORK")}
              >
                <div className="aspect-[16/10] overflow-hidden mb-10">
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] uppercase tracking-widest text-gray-600">
                      {story.category}
                    </span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-[9px] uppercase tracking-widest text-gray-600">
                      {story.date || 'RECENT'}
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-serif mb-4">
                    {story.client || story.title}
                  </h4>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed mb-6 line-clamp-2">
                    {story.description}
                  </p>
                  <span className="text-[10px] uppercase tracking-widest border-b border-black pb-1">
                    View Story
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button
              onClick={() => handleNavClick("/recentwork", "RECENT_WORK")}
              className="text-[11px] uppercase tracking-[0.2em] border border-black px-12 py-5 hover:bg-black hover:text-white transition-colors duration-500 font-bold"
            >
              View All Works
            </button>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <FAQ />

      <Reviews />

      {/* Philosophy */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="hidden md:block order-2 md:order-1">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000"
                alt="Majestic mountain lake landscape"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-600 block mb-4">
              PHILOSOPHY
            </span>
            <h3 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">
              The beauty of <span className="italic">imperfection</span>
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              We believe photography is profoundly more than orchestrating the perfect pose. It's about preserving the fleeting, in-between moments—the sharp intake of breath before the first look, the subtle, comforting touch of hands, and the way golden-hour light dances across a room. Our philosophy is rooted in observation rather than direction, allowing the genuine narrative of your day to unfold naturally.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              In an era of endless digital noise, we strive to create images that feel tactile, emotive, and intimately personal. We look for the cinematic quality in the ordinary and the poetic resonance in the chaos. When you look back at your gallery, we want you to not just see what happened, but to viscerally remember exactly how it felt.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed mb-12">
              Our deepest invitation to you is simply to be present. Slow down, breathe in the significance of the people surrounding you, and trust us to meticulously document the art of your life. Every celebration is a unique legacy, and we treat it with the reverence it deserves.
            </p>
            <button
              onClick={() => handleNavClick("/about", "ABOUT")}
              className="text-[11px] uppercase tracking-widest border border-black px-10 py-4 hover:bg-black hover:text-white transition-all duration-300"
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=2600"
            alt="Studio"
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 mb-8 block">
            Connect With Us
          </span>
          <h2 className="text-4xl md:text-8xl font-serif text-white mb-12 md:mb-16 leading-tight">
            Ready to tell <br />
            <span className="italic">your story?</span>
          </h2>
          <button
            onClick={() => handleNavClick("/contact", "CONTACT")}
            className="group relative px-10 py-5 bg-white text-black uppercase tracking-[0.2em] text-[11px] font-bold overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative z-10">Inquire Now</span>
          </button>
        </div>
      </section>
    </div>
  );
};
