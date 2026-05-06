"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', location: '', category: '', message: ''
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/user/category');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setCategories(data.data);
          setFormData(prev => ({ ...prev, category: data.data[0].title }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

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
        setFormData({ name: '', email: '', phone: '', date: '', location: '', category: categories[0]?.title || '', message: '' });
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
            
            <div className="pt-8 border-t border-gray-300 grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-sky-400">
                    <path d="M12 21s-6-5.16-6-10a6 6 0 1 1 12 0c0 4.84-6 10-6 10Z" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                  <span className="text-[9px] uppercase tracking-widest text-gray-800 block">STUDIO ADDRESS</span>
                </div>
                <p className="text-1xl font-sans leading-relaxed text-gray-900">
                  Shop No 2114 Bindraban, Palampur,<br />
                   Himachal Pradesh 176061
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-5 w-5 text-green-500">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.021-.967-.263-.099-.454-.148-.645.148-.19.298-.765.967-.938 1.164-.171.199-.344.224-.641.075-.297-.15-1.255-.463-2.39-1.405-.883-.733-1.48-1.639-1.653-1.937-.171-.299-.018-.46.13-.61.134-.135.298-.344.446-.516.149-.172.199-.297.298-.497.101-.2.05-.374-.025-.522-.075-.15-.645-1.554-.883-2.127-.232-.557-.468-.482-.641-.49-.171-.008-.368-.01-.564-.01-.196 0-.514.075-.783.373-.269.299-1.026 1.002-1.026 2.443 0 1.442 1.051 2.837 1.199 3.036.148.199 2.062 3.149 5.006 4.416.7.3 1.246.48 1.671.614.703.224 1.345.193 1.848.117.568-.086 1.758-.718 2.006-1.413.249-.695.249-1.29.174-1.414-.074-.124-.268-.198-.564-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-[9px] uppercase tracking-widest text-gray-800 block">WHATSAPP NUMBER</span>
                </div>
                <a href="https://wa.me/918628092160" className="text-1xl font-sans text-gray-900 hover:opacity-80 transition-opacity">
                  86280 92160
                </a>
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
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.title}>
                        {cat.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
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
