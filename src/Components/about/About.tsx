"use client";

import React from 'react';
import Link from 'next/link';

export const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1600"
              alt="Couple portrait photographed outdoors"
              className="w-full h-full object-cover aspect-[4/5]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-700 block mb-6">About Our Photography</span>
            <h1 className="text-5xl md:text-7xl leading-[0.95] font-serif text-black mb-8">
              We photograph stories with <span className="italic">emotion, elegance,</span> and intention.
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              We specialize in wedding and portrait photography that feels natural, editorial, and deeply personal.
              Our work is built around honest moments, beautiful light, and timeless storytelling.
            </p>
          </div>
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
