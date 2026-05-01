"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export const FAQ_ITEMS = [
  {
    id: '1',
    question: "What's Different About You?",
    answer: "Our approach goes beyond simply taking beautiful photographs. We focus on authentic storytelling, weaving together editorial elegance with the raw, unfiltered emotions of your celebration. Rather than interrupting your day with endless posing, we blend seamlessly into your environment to document the quiet, intimate moments and grand celebrations exactly as they naturally unfold, leaving you with a gallery that feels as genuine as your memories."
  },
  {
    id: '2',
    question: "Can I Meet With My Actual Photographer?",
    answer: "Yes, absolutely! We believe that the foundation of incredible photography is a strong, trusting connection between you and your photographer. Because we will be by your side for the most intimate moments of your day, we always arrange a comprehensive video consultation or an in-person coffee chat before you book. This ensures our personalities mesh and that we fully understand your vision before you commit."
  },
  {
    id: '3',
    question: "Do You Travel?",
    answer: "Yes, we consider ourselves destination specialists and routinely capture stories worldwide. Whether you're exchanging vows in a historic European villa or celebrating on a remote coastal beach, we will be there. We handle all of our own travel logistics and accommodations to keep the process completely seamless and stress-free for you. Custom travel collections are prepared based on your exact destination."
  },
  {
    id: '4',
    question: "What is Your Shooting Style?",
    answer: "Our signature style is a refined blend of photojournalistic documentary and high-end editorial artistry. This means we approach your day as observers, capturing candid, raw emotions as they happen, while also applying a cinematic and artistic eye to light, composition, and styling. The result is a timeless, romantic collection of images that look like they belong in a magazine but feel profoundly personal."
  },
  {
    id: '5',
    question: "Can I See a Full Wedding Gallery?",
    answer: "We highly encourage it! Viewing a few curated highlights on Instagram is very different from seeing how a photographer handles a complete 10-hour day with changing lighting scenarios, varying weather, and different venues. During our initial consultation, we are more than happy to walk you through several full, real-world wedding galleries so you can see the consistent quality and narrative flow from the very first frame to the last dance."
  },
  {
    id: '6',
    question: "When Will I See My Photos?",
    answer: "We know how excited you are to relive your memories, so we always provide a carefully curated preview gallery of 30-50 high-resolution images within 48-72 hours of your event. For full wedding collections, our meticulous culling, color grading, and editing process takes about 8 to 10 weeks to ensure absolute perfection. Portrait and engagement sessions are typically delivered within a 3-week timeframe."
  },
  {
    id: '7',
    question: "How Do We Book?",
    answer: "The booking process is designed to be simple and straightforward. It begins by reaching out through our contact form to check our availability for your date. Once we've had our consultation and you decide we are the perfect fit, we will send over a digital proposal. To officially secure your date on our calendar, we require a signed digital agreement along with a non-refundable retainer fee. Everything is handled securely online."
  }
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="py-16 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-14 text-center max-w-4xl mx-auto">
          <h1 className="text-[1.1rem] md:text-[2.6rem] text-black mb-6 flex flex-col md:flex-row justify-center items-center md:items-end tracking-[0.1em] uppercase font-medium gap-2 md:gap-0">
            <div className="flex items-end">
              <span className="font-serif italic text-[2.8rem] md:text-[5.4rem] normal-case mr-1 text-black">F</span>REQUENTLY
            </div>
            <div className="flex items-end md:ml-6">
              <span className="font-serif italic text-[2.8rem] md:text-[5.4rem] normal-case mr-1 text-black">A</span>SKED
            </div>
            <div className="flex items-end md:ml-6">
              <span className="font-serif italic text-[2.8rem] md:text-[5.4rem] normal-case mr-1 text-black">Q</span>UESTIONS
            </div>
          </h1>
          <p className="text-gray-400 text-[15px] md:text-[1.05rem] leading-relaxed text-center font-medium max-w-3xl mx-auto px-4 mt-8">
            Here's a few answers to questions that our couples are often curious about. If you have more questions, please reach out! We're happy to answer or to cover them during a consultation.
          </p>
        </header>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start pl-0 lg:pl-8">
          {/* Left Image */}
          <div className="w-[300px] md:w-[350px] shrink-0 relative rounded-3xl overflow-hidden aspect-[4/7] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=900"
              alt="Bride and groom portrait session"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <Link
                href="/contact"
                className="bg-white text-gray-500 px-6 py-3 rounded-full text-[10px] font-bold tracking-widest shadow-xl hover:scale-105 transition-transform mt-24 uppercase"
              >
                Ask a Question
              </Link>
            </div>
          </div>

          {/* Right Accordion */}
          <div className="flex-1 flex flex-col w-full max-w-2xl py-4 lg:py-12">
            {FAQ_ITEMS.map((item) => (
              <div key={item.id} className="border-b border-gray-100 last:border-0 transition-all">
                <button 
                  onClick={() => setOpenId(openId === item.id ? null : item.id)} 
                  className="w-full flex justify-start items-center text-left py-6 group"
                >
                  <h3 className={`text-[1.3rem] md:text-[1.45rem] transition-colors duration-300 font-light tracking-wide ${openId === item.id ? 'text-gray-800' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {item.question}
                  </h3>
                </button>
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden">
                      <p className="pb-8 text-gray-500 text-[1.02rem] leading-relaxed font-medium">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
