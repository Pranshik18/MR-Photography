"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchAvatar() {
      try {
        const res = await fetch("/api/user/profile");
        const json = await res.json();
        if (json.success && json.data?.avatar) {
          setAvatarUrl(json.data.avatar);
        }
      } catch (error) {
        console.error("Error loading user profile avatar:", error);
      }
    }
    fetchAvatar();
  }, []);

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Asymmetrical Editorial Image */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl bg-stone-100 group">
              {/* Subtle warm overlay to give cinematic tone */}
              <div className="absolute inset-0 bg-amber-500/5 mix-blend-multiply z-[2] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent z-[2] pointer-events-none" />
              <img
                src={avatarUrl || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1600"}
                alt="Photographer Portrait Avatar"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105 filter brightness-[0.98] contrast-[1.02]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Right Column: Spacious Storytelling Content */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center"
          >
            <span className="font-montserrat text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 mb-4 block">
              ABOUT OUR PHOTOGRAPHY
            </span>
            
            <h1 className="font-signature font-normal text-6xl md:text-8xl text-stone-800 mb-2 select-none leading-none">
              Hello!
            </h1>
            
            <h2 className="font-serif italic text-stone-700 text-2xl md:text-4xl mb-8 leading-snug">
              We photograph stories with <span className="italic text-stone-800">emotion, elegance,</span> and intention.
            </h2>

            <div className="space-y-6 text-stone-600 font-montserrat font-light text-sm md:text-base leading-relaxed max-w-xl">
              <p>
                We believe that the absolute best photographs are born from honest, uninterrupted human connection. Our approach rejects typical "cookie-cutter" formulas in favor of something far more meaningful—your actual, unscripted story. We want to know your jokes, your dynamic, and what truly makes you two tick so that your gallery feels authentic to who you are.
              </p>
              <p>
                During your celebration, our goal is to fit effortlessly into the natural flow of your day. We capture the grand, breath-catching milestones alongside the quietest, most vulnerable in-between details—without taking over the room or orchestrating forced poses. We are humans first, photographers second, committed to giving you a calm, stress-free experience.
              </p>
              <p>
                Combining a refined documentary eye with a warm, cinematic editorial finish, we deliver timeless collections that prioritize real emotions and true-to-life colors. When you look back at your gallery decades from now, we want you to not just see how beautiful everything was, but to viscerally remember exactly how it felt.
              </p>
            </div>
          </motion.div>

        </section>

        <section className="mt-16">
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-10">Our Speciality</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-stone-200 p-7 bg-stone-50/70">
              <h3 className="text-2xl font-serif text-black mb-4">Weddings</h3>
              <p className="text-gray-700 leading-relaxed">
                Full-day wedding coverage focused on emotion, details, and candid moments from preparation to celebration.
              </p>
            </article>
            <article className="rounded-2xl border border-stone-200 p-7 bg-stone-50/70">
              <h3 className="text-2xl font-serif text-black mb-4">Pre-Wedding & Portraits</h3>
              <p className="text-gray-700 leading-relaxed">
                Intentional portrait sessions with gentle direction so your personalities shine without feeling posed.
              </p>
            </article>
            <article className="rounded-2xl border border-stone-200 p-7 bg-stone-50/70">
              <h3 className="text-2xl font-serif text-black mb-4">Destination Stories</h3>
              <p className="text-gray-700 leading-relaxed">
                Travel-ready storytelling with planning support for intimate celebrations and destination weddings.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="pr-4 lg:pr-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-700 block mb-4">OUR APPROACH</span>
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-8 leading-tight">What Makes Us <span className="italic">Unique</span></h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We believe that the best photographs are born from genuine connection. Our approach blends documentary authenticity with an editorial eye, ensuring your memories are both truthful and beautifully composed.
            </p>
            <ul className="space-y-6 text-gray-700 leading-relaxed border-l-2 border-stone-200 pl-6">
              <li>
                <span className="font-serif text-xl text-black block mb-1">Story First</span> 
                We prioritize real interactions and unfolding narratives over forced poses.
              </li>
              <li>
                <span className="font-serif text-xl text-black block mb-1">Editorial Finish</span> 
                Every gallery is meticulously polished with consistent, timeless color grading.
              </li>
              <li>
                <span className="font-serif text-xl text-black block mb-1">Calm Direction</span> 
                We guide you naturally, creating a relaxed atmosphere where you can truly be yourselves.
              </li>
              <li>
                <span className="font-serif text-xl text-black block mb-1">Detail Obsessed</span> 
                From the grand architecture to the quietest glances, we capture the nuances you might miss.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/Images/about_img.png"
              alt="Bride standing with vei"
              className="w-full h-full object-cover aspect-[4/5]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-10">Our Photography Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">01</p>
              <h3 className="text-xl font-serif text-black mb-2">Consultation</h3>
              <p className="text-gray-700 leading-relaxed">We learn your vision, priorities, and event flow.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">02</p>
              <h3 className="text-xl font-serif text-black mb-2">Planning</h3>
              <p className="text-gray-700 leading-relaxed">We build a thoughtful timeline for smooth coverage.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">03</p>
              <h3 className="text-xl font-serif text-black mb-2">Capture</h3>
              <p className="text-gray-700 leading-relaxed">We document your day with calm direction and a documentary eye.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">04</p>
              <h3 className="text-xl font-serif text-black mb-2">Delivery</h3>
              <p className="text-gray-700 leading-relaxed">You receive a curated gallery made to be revisited for years.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-stone-200 bg-stone-50 p-8 md:p-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-600 block mb-5">Let&apos;s Create Together</span>
          <h2 className="text-4xl md:text-6xl font-serif text-black mb-6">Ready to tell your story?</h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
            If you value emotional storytelling, refined portraits, and a seamless photography experience, we would love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-black px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-white hover:bg-zinc-800 transition-colors"
          >
            Inquire Now
          </Link>
        </section>
      </div>
    </div>
  );
};
