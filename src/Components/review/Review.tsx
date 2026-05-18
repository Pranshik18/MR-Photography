"use client";

import React, { useState, useEffect } from 'react';

interface ReviewItem {
  _id: string;
  clientName: string;
  description: string;
}

export const Reviews: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ReviewItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/user/review');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setTestimonials(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
  }, [activeIndex]);

  const limitWords = (text: string, limit: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const isLongReview = (text: string) => {
    return text.trim().split(/\s+/).length > 50;
  };

  const activeReview = testimonials[activeIndex];

  const goToPrev = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (loading) return null;

  if (testimonials.length === 0) {
    return (
      <div className="bg-white min-h-[50vh] flex flex-col items-center justify-center pt-24 pb-14">
        <h1 className="text-4xl md:text-5xl italic font-serif text-black mb-4">Reviews</h1>
        <p className="text-gray-500">No reviews present yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="px-6 md:px-12 pt-18 pb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-sm order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200"
              alt="Bride with bridesmaids"
              className="w-full h-full object-cover aspect-[16/9]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-center order-1 lg:order-2">
            <h1 className="text-5xl md:text-6xl italic font-serif text-black">Reviews</h1>
            <p className="mt-4 text-[17px] md:text-[1.15rem] text-gray-600 leading-relaxed max-w-md mx-auto">
              Every celebration we photograph leaves us with stories we carry for years. Here are a few words
              from couples and families who trusted us with their most meaningful moments.
            </p>
           
          </div>
        </div>
      </section>

      <section className="relative min-h-[70vh] md:min-h-[78vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1800"
          alt="Couple portrait in nature"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/45" />

        <button
          onClick={goToPrev}
          className="absolute left-4 md:left-10 z-10 h-10 w-10 rounded-full border border-white/70 text-white text-2xl leading-none hover:bg-white/20 transition-colors"
          aria-label="Previous review"
        >
          ‹
        </button>

        <div className="relative z-10 max-w-3xl px-8 md:px-14 py-12 md:py-20 text-center text-white">
          <p className="text-xl md:text-3xl leading-relaxed font-light">
            "{isExpanded ? activeReview.description : limitWords(activeReview.description, 50)}"
            {isLongReview(activeReview.description) && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-yellow-400 hover:text-yellow-300 font-semibold text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer focus:outline-none transition-colors"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
          <p className="mt-8 text-2xl md:text-3xl font-serif italic">{activeReview.clientName}</p>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-4 md:right-10 z-10 h-10 w-10 rounded-full border border-white/70 text-white text-2xl leading-none hover:bg-white/20 transition-colors"
          aria-label="Next review"
        >
          ›
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {testimonials.map((item, idx) => (
            <button
              key={item._id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${idx === activeIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
