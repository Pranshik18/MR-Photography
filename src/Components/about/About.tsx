"use client";

import React from "react";
import Link from 'next/link';
import { Camera, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const disciplines = [
  { name: "Cinematic Portraits", description: "Studio & Location" },
  { name: "Architectural & Spatial", description: "Form & Light" },
  { name: "Editorial & Fashion", description: "Brand Narratives" }
];

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative h-[92vh] md:h-screen w-full overflow-hidden flex items-end pb-16 md:pb-24 px-4 sm:px-6 md:px-12">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.15, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="/Images/profile.jpg" 
            alt="Shivam Sharma Portrait" 
            className="w-full h-full object-cover object-top filter grayscale brightness-75 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90"></div>
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-background/90 via-background/40 to-transparent pointer-events-none"></div>
        </motion.div>
        <div className="relative z-10 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block"
          >
            The Digital Curator
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface leading-none"
          >
            SHIVAM <br/> SHARMA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="mt-8 font-body text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed"
          >
            Capturing the silence between moments. A dedicated observer of light, shadow, and the human condition through a minimalist lens.
          </motion.p>
        </div>
      </section>

      {/* Deep Storytelling Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            {/* Column Left: Large Narrative Title */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="md:col-span-5 h-fit mb-12 md:mb-0 md:sticky md:top-32"
            >
              <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-on-surface leading-[1.1]">
                The Mind <br/> Behind <br/> <span className="text-primary italic">The Lens.</span>
              </h2>
              <div className="mt-12 h-px w-24 bg-primary/30"></div>
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <MapPin size={14} />
                  <span className="font-body text-[10px] tracking-widest uppercase">Based in Palampur, Himachal Pradesh</span>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <Camera size={14} />
                  <span className="font-body text-[10px] tracking-widest uppercase">Digital & Film Mediums</span>
                </div>
              </div>
            </motion.div>

            {/* Column Right: Narrative Copy & Supporting Imagery */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="md:col-span-7 flex flex-col gap-20 md:gap-32"
            >
              <div className="max-w-none">
                <p className="font-body text-xl md:text-2xl leading-relaxed text-on-surface/90 font-light">
                  <span className="text-5xl font-headline mr-3 float-left">P</span>
                  hotography is not merely a method of documentation; it is a philosophy of observation. To look is common, but to truly see requires a stillness that the modern world often rejects.
                </p>
                <p className="mt-8 font-body text-sm sm:text-lg leading-relaxed text-on-surface-variant">
                  My journey began in the darkrooms of a forgotten street in Lisbon, where I learned that the absence of light is just as vital as its presence. Shadow provides the architecture; light provides the soul. I have spent the last decade chasing the &quot;blue hour&quot; and the way cityscapes transform into abstract paintings of steel and glass when the sun dips below the horizon.
                </p>
              </div>

              {/* Interspersed Photo 1: Textures */}
              <div className="grid grid-cols-10 items-center">
                <div className="col-span-10 md:col-span-8 bg-surface-container-low p-2">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq9GP7C4I0u3Xew88HGlhjPPekcxV7ZhplgkQZcN0EHeP1lZ_Q7dCSek60F1IJI6pSlu2HeoqP1oAqZy4coKpiT5C8XHYY0F1GXP1xjYM-g7BJyPSkEvH4SBBGFrRcXnTwT019qP6yQNtrb0CO1By51P4nVKU4af4RvBUYujEcZtx3eqlzoVf4s2xHrds-B_7eakOIo0Mao9y2XZKRdPA9ovl1pEtcjteDazq3n_vfmg2isPuHbWVcAMVSBDBgj_m4qspHCqH-RRJj" 
                    alt="Vintage Lens" 
                    className="w-full aspect-[4/5] object-cover filter grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden md:block col-span-2 -ml-12 z-10">
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-primary rotate-90 origin-left whitespace-nowrap opacity-50">Equipment Study No. 04</p>
                </div>
              </div>

              <div className="max-w-none">
                <h3 className="font-headline text-3xl font-bold mb-6 text-on-surface tracking-tight">The Intention</h3>
                <p className="font-body text-sm sm:text-lg leading-relaxed text-on-surface-variant">
                  Every shutter click is an intentional choice. I don&apos;t believe in &quot;spraying and praying.&quot; I wait for the alignment—the geometric perfection of a shadow hitting a corner, the fleeting emotion in a stranger&apos;s eye, the way grain adds a tactile memory to a digital frame.
                </p>
                <p className="mt-6 font-body text-sm sm:text-lg leading-relaxed text-on-surface-variant">
                  My work is deeply inspired by cinematic noir and brutalist architecture. I look for the structure within chaos. Whether I am shooting a high-fashion editorial or a quiet landscape, the goal remains the same: to curate an emotional atmosphere that lingers long after the viewer has moved on.
                </p>
              </div>

              {/* Interspersed Photo 2: BTS/Atmospheric */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUGiZwx6W9O0EGYy9DU8xZwv-vOUCyiBJlmPtRh7gsW_KEyr95Ww26ipWRrwWPH0bqbzh4qb4Ajwy8XKcTYwxgQ7YcXHNLkceFryygu0P3r-ueLWKAinTJfIZtcVY8c2Fmx1V-Kt-uFBUrg8qz72HVcWoyHJRdk_Dttw7kq4Xt_vyhvWhRaBp5dphZmlOBY10T53_3SkxuxaFKJuGJXOMVPb78KkjGNiKVzNuxSNPpMlGYHCz_sZPcBboZnCJePyZLlk9RNTE4ZJdZ" 
                    alt="Silhouette" 
                    className="w-full aspect-square object-cover filter grayscale brightness-50"
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-body text-xs italic text-on-surface-variant/60">&quot;The best stories are told in the dark.&quot;</p>
                </div>
                <div className="pt-12">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXmVmMTeXHAIU55_t-3EtYxnqErkmY6xkMYap7xeDplQhDX47Ei906SK9yMwfDCQN003jdEcLW1PksHgSLKN73HBALsebkz6OmPnwomG8pUyHAHtXfnuoWnnjtNrEYLPm0E3ebzi7c5MTl_rFZ6fTJWXMFesn9tzyTGDoPmYbhzkUZUR88spaZSOrJ8uCX9PPA5tl-rRnJ-GDGDEAs2WDX-g3wF7ah1HmTfGckVaAPyWIHXIMxQIxfShbTpmsotB6Hx9LmvJBEld9E" 
                    alt="Reflections" 
                    className="w-full aspect-[3/4] object-cover filter grayscale contrast-150"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="max-w-none pb-16 md:pb-24">
                <p className="font-body text-sm sm:text-lg leading-relaxed text-on-surface-variant">
                  For me, the portfolio is a living document. It is a dialogue between the viewer and the viewed. I am Shivam Sharma, and I invite you to see the world not as it is, but as it feels.
                </p>
                <div className="mt-12 flex items-center gap-6">
                  <Link href="/portfolio" className="group relative inline-flex items-center justify-center bg-transparent text-primary hover:text-black border border-primary px-8 py-4 font-body text-[10px] tracking-[0.2em] uppercase font-bold overflow-hidden rounded-lg transition-colors duration-500">
                    <span className="absolute inset-0 w-full h-full bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></span>
                    <span className="relative z-10 w-full text-center group-hover:text-black transition-colors duration-500">View Portfolio</span>
                  </Link>
                  <Link href="/contact" className="text-on-surface font-body text-[10px] tracking-[0.2em] uppercase border-b border-on-surface/20 pb-1 hover:border-primary transition-colors duration-300">Contact Me</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Exhibitions Bento Style */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-surface/50 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Experience Box */}
            <div className="bg-surface p-10 md:p-14 border border-white/5 flex flex-col justify-between min-h-[320px] rounded-2xl hover:border-primary/30 transition-colors duration-500">
              <span className="font-headline text-7xl md:text-8xl text-primary font-light tracking-tighter">12<span className="text-4xl">+</span></span>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-on-surface-variant font-bold mt-auto pt-8">Years of Experience</p>
            </div>
            
            {/* Disciplines Box */}
            <div className="md:col-span-2 bg-surface p-10 md:p-14 border border-white/5 flex flex-col justify-between min-h-[320px] rounded-2xl hover:border-white/10 transition-colors duration-500">
              <div className="flex flex-col h-full justify-between">
                <h4 className="font-headline text-3xl font-bold mb-10 text-white tracking-tight">Core Disciplines</h4>
                <ul className="space-y-6">
                  {disciplines.map((discipline) => (
                    <li key={discipline.name} className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/10 pb-4 group">
                      <span className="font-headline text-lg sm:text-xl text-white/80 group-hover:text-primary transition-colors">{discipline.name}</span>
                      <span className="font-body text-[10px] tracking-widest uppercase text-on-surface-variant mt-2 sm:mt-0">{discipline.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* CTA Box */}
            <Link href="/contact" className="group bg-primary/5 hover:bg-primary/20 p-10 md:p-14 flex flex-col justify-center items-center text-center border border-primary/20 hover:border-primary/50 min-h-[320px] rounded-2xl transition-all duration-500 cursor-pointer">
              <div className="bg-primary/10 group-hover:bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-500">
                <Camera className="text-primary group-hover:scale-110 transition-transform duration-500" size={32} />
              </div>
              <h4 className="font-headline text-2xl text-white group-hover:text-primary transition-colors mb-2">Book a Session</h4>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-on-surface-variant group-hover:text-white/70 transition-colors">Let's create together</p>
            </Link>

          </div>
        </div>
      </section>
    </motion.div>
  );
}
