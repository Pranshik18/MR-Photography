"use client"
import React, { useState } from "react";
import {motion} from 'motion/react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    console.log("Form submitted:", { name, email, message });
    setSubmitted(true);
    
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  }
  return (
    <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-surface text-on-surface">

      <div className="relative z-10 max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-16">
            <header className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display text-on-surface leading-[1.1]">
                Let&apos;s create something timeless.
              </h1>
              <p className="text-stone-400 text-sm sm:text-lg max-w-md leading-relaxed">
                Currently accepting select commissions for 2024. Available for global inquiries spanning editorial, architectural, and cinematic projects.
              </p>
            </header>

            <div className="space-y-12 pt-8">
              <div className="space-y-2">
                <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-primary/60">Direct Inquiry</p>
                <a 
                  className="text-2xl font-light hover:text-primary transition-colors duration-500" 
                  href="mailto:studio@alexrivera.com"
                >
                  studio@alexrivera.com
                </a>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <p className="label-md text-stone-500">NYC Studio</p>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-sans">
                    Chelsea Arts District<br />Manhattan, NY
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <p className="label-md text-stone-500">Paris Studio</p>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-sans">
                    Le Marais, 4th Arr.<br />Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-surface-low p-8 md:p-12 lg:p-16 rounded-lg relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-1000"></div>
            
            <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group">
                  <label className="block label-md text-stone-500 mb-2 group-focus-within:text-primary transition-colors">
                    Full Name
                  </label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:outline-none focus:border-b-primary transition-all duration-500 text-on-surface py-2 px-0 placeholder:text-stone-700" 
                    placeholder="JULIAN VANCE" 
                    type="text" onChange={e=>setName(e.target.value)} value={name}
                  />
                </div>
                <div className="relative group">
                  <label className="block label-md text-stone-500 mb-2 group-focus-within:text-primary transition-colors">
                    Email Address
                  </label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary outline-none transition-all duration-500 text-on-surface py-2 px-0 placeholder:text-stone-700" 
                    placeholder="HELLO@AGENCY.COM" 
                    type="email" onChange={e=>setEmail(e.target.value)} value={email}
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="block label-md text-stone-500 mb-2 group-focus-within:text-primary transition-colors">
                  Message
                </label>
                <textarea 
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all duration-500 text-on-surface py-2 px-0 placeholder:text-stone-700 resize-none outline-none" 
                  placeholder="DESCRIBE YOUR PROJECT VISION..." 
                  rows={4} onChange={e => setMessage(e.target.value)} value={message}
                ></textarea>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  disabled={submitted}
                  className={`group flex items-center gap-4 ${submitted ? 'bg-green-600' : 'bg-tertiary'} hover:opacity-90 text-on-tertiary px-10 py-5 rounded-lg font-bold tracking-widest uppercase text-xs transition-all duration-300 scale-100 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {submitted ? 'Inquiry Sent' : 'Send Inquiry'}
                  <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                    {submitted ? 'check_circle' : 'arrow_right_alt'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-32 w-full h-[512px] overflow-hidden rounded-lg group relative">
          <img 
            alt="Cinematic studio shot" 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM6tXlR87dszJ6jB6gDFEnGgu4nx9fzors1CxysHtCa1aYcKFOW3HzhUS8qUiNk4yG-Q9DgzkxikmfOsUpm99GzdJaAnpAhIHiGuFqneEwNXIQHaQgeouGZGbDwSOODtY25gQ99nnlgWgduYp8YHCAPNb1w0Dxq8faB3h4JzkY0GQnC53b40T0SxhAzYmwPj6qWI3CYY5B8LQewYjSz-GN0hTnGUFW7GCW_7rs2eOtMsfWFoaoyZBPlbdJLzRhFS-rwlZrQbVlkW45" 
          />
          <div className="absolute inset-0 flex items-center pointer-events-none z-20 overflow-hidden whitespace-nowrap">
            <motion.div className="flex animate-scroll" initial={{translateX:0}} animate={{translateX:"-50%"}} transition={{duration:10, ease:"linear",repeat:Infinity}}>
              <span className="text-[120px] font-black font-display uppercase tracking-tighter text-on-surface/90 outline-text">
                GET IN TOUCH — START A PROJECT — LET&apos;S COLLABORATE —&nbsp;
              </span>
              <span className="text-[120px] font-black font-display uppercase tracking-tighter text-on-surface/90 outline-text">
                GET IN TOUCH — START A PROJECT — LET&apos;S COLLABORATE —&nbsp;
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
