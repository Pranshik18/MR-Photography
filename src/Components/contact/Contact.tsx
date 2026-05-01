"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', location: '', category: 'Wedding', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple date validation
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Please select a future date for your event.");
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/user/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', date: '', location: '', category: 'Wedding', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Section */}
        <div>
          <header className="mb-10">
            <span className="text-[10px] uppercase tracking-widest text-gray-800 block mb-6">LET'S TALK</span>
            <h1 className={`text-4xl md:text-8xl mb-8 md:mb-12 italic text-black ${cormorant.className}`}>Inquire</h1>
          </header>
          
          <div className="flex flex-col gap-8 max-w-lg">
            <p className="text-gray-800 font-medium leading-relaxed">
              We take a limited number of commissions each year to ensure every story receives the care and attention it deserves. Please share a bit about yourself and your vision below.
            </p>
            
            <div className="pt-8 border-t border-gray-300 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-sky-400">
                    <path d="M12 21s-6-5.16-6-10a6 6 0 1 1 12 0c0 4.84-6 10-6 10Z" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                  <span className="text-[9px] uppercase tracking-widest text-gray-800 block">STUDIO ADDRESS</span>
                </div>
                <p className="text-1xl font-sans leading-relaxed text-gray-900">
                  Shop No 2114 Bindraban, Palampur, Himachal Pradesh 176061
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-sky-400">
                    <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.08 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 3.2 2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L7.2 8.52a16 16 0 0 0 6.28 6.28l1.06-1.07a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  <span className="text-[9px] uppercase tracking-widest text-gray-800 block">WHATSAPP NUMBER</span>
                </div>
                <a href="https://wa.me/918628092160" className="text-1xl font-sans text-gray-900 hover:opacity-80 transition-opacity">
                  86280 92160
                </a>
              </div>
              <div className="space-y-3 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-sky-400">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <span className="text-[9px] uppercase tracking-widest text-gray-800 block">HOURS</span>
                </div>
                <p className="text-1xl font-sans leading-relaxed text-gray-900">Open 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="rounded-3xl border border-stone-200 bg-stone-50/80 p-8 shadow-sm backdrop-blur-sm md:p-12 min-h-[600px] flex flex-col justify-center">
          {status === 'success' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center py-10">
              <h2 className={`text-5xl italic mb-6 text-black ${cormorant.className}`}>Thank You</h2>
              <p className="text-gray-600 font-medium leading-relaxed max-w-sm mb-12">
                Your inquiry has been successfully sent. We will review your details and be in touch shortly.
              </p>
              <button 
                onClick={() => setStatus('idle')} 
                className="text-[10px] uppercase tracking-widest border-b border-black pb-1 font-bold hover:opacity-50 transition-opacity"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.22em] font-semibold text-stone-700">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3.5 text-lg text-stone-900 placeholder:text-stone-400 transition-all duration-200 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 ${cormorant.className}`}
                  placeholder="Enter your full name..."
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.22em] font-semibold text-stone-700">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3.5 text-lg text-stone-900 placeholder:text-stone-400 transition-all duration-200 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 ${cormorant.className}`}
                  placeholder="Enter your email..."
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.22em] font-semibold text-stone-700">Phone</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3.5 text-lg text-stone-900 placeholder:text-stone-400 transition-all duration-200 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 ${cormorant.className}`}
                  placeholder="Enter your phone number..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-[0.22em] font-semibold text-stone-700">Event Date</label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className={`w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3.5 text-lg text-stone-900 transition-all duration-200 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 ${cormorant.className}`}
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-[0.22em] font-semibold text-stone-700">Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className={`w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3.5 text-lg text-stone-900 placeholder:text-stone-400 transition-all duration-200 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 ${cormorant.className}`}
                    placeholder="City, State, Country"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                 <label className="text-[10px] uppercase tracking-[0.22em] font-semibold text-stone-700">Category</label>
                 <select 
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className={`w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3.5 text-lg text-stone-900 transition-all duration-200 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 appearance-none ${cormorant.className}`}
                 >
                    <option>Wedding</option>
                    <option>Pre-Wedding</option>
                    <option>Parties</option>
                    <option>Traditions</option>
                    <option>Maternity</option>
                    <option>Boudoir</option>
                    <option>Commercial</option>
                    <option>Other</option>
                 </select>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.22em] font-semibold text-stone-700">Your Story</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className={`w-full rounded-xl border border-stone-300 bg-white/80 px-4 py-3.5 text-lg text-stone-900 placeholder:text-stone-400 transition-all duration-200 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300 resize-none ${cormorant.className}`}
                  placeholder="Tell us about your chapter..."
                  required
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-semibold">There was an error sending your message. Please try again.</p>
              )}

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="mt-4 rounded-xl border border-black bg-black py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
