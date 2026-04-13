"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from 'motion/react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setName('');
          setEmail('');
          setMessage('');
          setSubmitted(false);
        }, 5000);
      } else {
        console.error('Failed to send message:', data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-surface text-on-surface"
    >

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-16"
          >
            <header className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold tracking-tight font-display text-on-surface leading-[1.1]"
              >
                Let&apos;s create something timeless.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="text-stone-400 text-sm sm:text-lg max-w-md leading-relaxed"
              >
                Currently accepting select commissions for 2024. Available for global inquiries spanning editorial, architectural, and cinematic projects.
              </motion.p>
            </header>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.6 }
                }
              }}
              className="space-y-12 pt-8"
            >

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <p className="label-md text-stone-500">Studio Address</p>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-sans">
                    Shop No 2114 Bindraban,<br />Palampur, Himachal Pradesh 176061
                  </p>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">call</span>
                    <p className="label-md text-stone-500">WhatsApp Number</p>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-sans">
                    <a href="https://wa.me/8628092160" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">86280 92160</a>
                  </p>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <p className="label-md text-stone-500">Hours</p>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-sans">
                    Open 24 hours
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-7 bg-surface-low p-8 md:p-12 lg:p-16 rounded-lg relative overflow-hidden group min-h-[520px] flex flex-col justify-center"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-1000"></div>
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="space-y-10 relative z-10 w-full" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <label className="block label-md text-stone-500 mb-2 group-focus-within:text-primary transition-colors">
                        Full Name
                      </label>
                      <input 
                        required
                        className="w-full bg-transparent border-0 border-b border-outline-variant focus:outline-none focus:border-b-primary transition-all duration-500 text-on-surface py-2 px-0 placeholder:text-stone-700" 
                        placeholder="JULIAN VANCE" 
                        type="text" onChange={e=>setName(e.target.value)} value={name}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="relative group">
                      <label className="block label-md text-stone-500 mb-2 group-focus-within:text-primary transition-colors">
                        Email Address
                      </label>
                      <input 
                        required
                        className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary outline-none transition-all duration-500 text-on-surface py-2 px-0 placeholder:text-stone-700" 
                        placeholder="HELLO@AGENCY.COM" 
                        type="email" onChange={e=>setEmail(e.target.value)} value={email}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="block label-md text-stone-500 mb-2 group-focus-within:text-primary transition-colors">
                      Message
                    </label>
                    <textarea 
                      required
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-all duration-500 text-on-surface py-2 px-0 placeholder:text-stone-700 resize-none outline-none" 
                      placeholder="DESCRIBE YOUR PROJECT VISION..." 
                      rows={4} onChange={e => setMessage(e.target.value)} value={message}
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center gap-4 bg-tertiary hover:opacity-90 text-on-tertiary px-10 py-5 rounded-lg font-bold tracking-widest uppercase text-xs transition-all duration-300 scale-100 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                      <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                        {isSubmitting ? 'schedule' : 'arrow_right_alt'}
                      </span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 w-full py-12"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                    className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4"
                  >
                    <span className="material-symbols-outlined text-5xl">check</span>
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-on-surface tracking-tight">Message Received</h3>
                  <p className="text-stone-400 font-sans max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. We've received your inquiry and will get back to you shortly to discuss your vision.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-32 w-full h-[512px] overflow-hidden rounded-lg group relative"
        >
          <img 
            alt="Cinematic studio shot" 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM6tXlR87dszJ6jB6gDFEnGgu4nx9fzors1CxysHtCa1aYcKFOW3HzhUS8qUiNk4yG-Q9DgzkxikmfOsUpm99GzdJaAnpAhIHiGuFqneEwNXIQHaQgeouGZGbDwSOODtY25gQ99nnlgWgduYp8YHCAPNb1w0Dxq8faB3h4JzkY0GQnC53b40T0SxhAzYmwPj6qWI3CYY5B8LQewYjSz-GN0hTnGUFW7GCW_7rs2eOtMsfWFoaoyZBPlbdJLzRhFS-rwlZrQbVlkW45" 
          />
          <div className="absolute inset-0 flex items-center pointer-events-none z-20 overflow-hidden whitespace-nowrap">
            <motion.div className="flex animate-scroll" initial={{translateX:0}} animate={{translateX:"-50%"}} transition={{duration:10, ease:"linear",repeat:Infinity}}>
              <span className="text-5xl sm:text-6xl md:text-[120px] font-black font-display uppercase tracking-tighter text-on-surface/90 outline-text">
                GET IN TOUCH — START A PROJECT — LET&apos;S COLLABORATE —&nbsp;
              </span>
              <span className="text-5xl sm:text-6xl md:text-[120px] font-black font-display uppercase tracking-tighter text-on-surface/90 outline-text">
                GET IN TOUCH — START A PROJECT — LET&apos;S COLLABORATE —&nbsp;
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
