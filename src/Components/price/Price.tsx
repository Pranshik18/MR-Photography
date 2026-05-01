"use client";

import React from 'react';
import Link from 'next/link';

export const Pricing: React.FC = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="rounded-xl overflow-hidden shadow-sm order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200"
              alt="Wedding couple portrait"
              className="w-full h-full object-cover aspect-[4/7]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-center lg:pt-10 order-1 lg:order-2">
            <h1 className="text-[2.6rem] md:text-6xl font-serif italic text-black mb-4">Pricing</h1>
            <p className="text-[15px] md:text-[1.05rem] text-gray-600 leading-relaxed max-w-md mx-auto">
              Our wedding collections are intentionally crafted to keep the experience effortless and refined. Every collection includes:
            </p>
            <ul className="mt-6 space-y-1.5 text-[15px] md:text-[1.05rem] text-gray-600">
              <li>- Up to 8 Hours of Story-Driven Coverage</li>
              <li>- Private Online Gallery for Easy Sharing</li>
              <li>- High-Resolution Edited Images</li>
              <li>- Pre-Wedding Timeline Planning Call</li>
              <li>- Sneak Peek Delivery Within 72 Hours</li>
              <li>- Full Gallery Delivery in 3-4 Weeks</li>
            </ul>
            <div className="mt-6 space-y-3 text-[15px] md:text-[1.05rem] text-gray-700">
              <p>
                Additional offerings include handcrafted albums, engagement sessions, bridal portraits, and event add-ons.
              </p>
              <p>
                Whether you are planning a destination celebration or an intimate ceremony, we can tailor a custom proposal for your day.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block mt-8 rounded-full bg-[#4a5568] px-7 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white hover:bg-[#2d3748] transition-colors"
            >
              Request More Info
            </Link>
          </div>
        </section>

        <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10">
          <article className="text-center">
            <h2 className="text-6xl font-serif italic text-[#2f4c6c] mb-8">Travel</h2>
            <p className="text-[15px] md:text-[1.05rem] text-gray-600 leading-relaxed max-w-md mx-auto">
              We are available for weddings and sessions across India and worldwide. From mountain vows to coastal celebrations, we travel light, plan thoroughly, and document every location with the same care as home.
            </p>
            <div className="mt-7 rounded-xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1000"
                alt="Destination cliffside travel"
                className="w-full h-56 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </article>

          <article className="text-center">
            <h2 className="text-6xl font-serif italic text-[#2f4c6c] mb-8">Impact</h2>
            <p className="text-[15px] md:text-[1.05rem] text-gray-600 leading-relaxed max-w-md mx-auto">
              A portion of every booking supports community-focused causes, including local education and family wellness initiatives. Your story helps us create meaningful impact beyond the photographs.
            </p>
            <div className="mt-7 rounded-xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000"
                alt="Teacher writing on classroom board"
                className="w-full h-56 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};


