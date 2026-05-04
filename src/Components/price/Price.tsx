"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface PricingPackage {
  _id: string;
  title: string;
  features: string[];
  currency: 'INR' | 'USD';
  price: number;
  isActive: boolean;
  isRecommended: boolean;
}

export const Pricing: React.FC = () => {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('/api/user/price');
        const data = await res.json();
        if (data.success && data.data) {
          // Filter only active packages for the public facing UI
          setPackages(data.data.filter((p: PricingPackage) => p.isActive));
        }
      } catch (error) {
        console.error('Failed to fetch pricing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

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

        {!loading && packages.length > 0 && (
          <section className="mt-20">
            <h2 className="text-4xl font-serif italic text-center text-black mb-12">Curated Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div 
                  key={pkg._id} 
                  className={`bg-white rounded-xl p-8 flex flex-col items-center justify-between border ${pkg.isRecommended ? 'border-[#2f4c6c] shadow-lg relative' : 'border-gray-200'}`}
                >
                  {pkg.isRecommended && (
                    <span className="absolute -top-3 bg-[#2f4c6c] text-white text-[10px] uppercase tracking-widest px-4 py-1 rounded-full font-semibold">
                      RECOMMENDED
                    </span>
                  )}
                  <h3 className="text-2xl font-serif mb-2 text-center text-gray-900">{pkg.title}</h3>
                  <p className="text-3xl font-bold text-[#4a5568] mb-6">
                    {pkg.currency === 'INR' ? '₹' : '$'}{pkg.price.toLocaleString()}
                  </p>
                  
                  <ul className="text-[14px] text-gray-600 mb-8 space-y-3 w-full">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#2f4c6c] mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full text-center rounded-full bg-gray-100 border border-gray-300 px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    Inquire Now
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10">
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


