"use client";

import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, ChevronDown } from 'lucide-react';

const projects = [
  {
    title: "The Concrete Monolith",
    category: "Studio Archive",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-ms9RMa9Oml3XktnymXMmd9MmlXDziyp9gfVJhMBsM6cd1UZ0JoFHH6sDdozBK2br4XrC45godbnkbfv_etWAA3IisdR6QOTqKtCjPMpITtR6Jw8S8RazNk2uz9VVGq5Hacs07aLQ3JArsZAZgWbJgm_ZXrS0FBWTiFie7Ki8VRDyly5Zqd-fqPgJenvcr_Z5yJaQtFAryiqLoQpur7Qc6JU22VDOoa9tNSFNqlKG-rtWKUH1bXkTaCAB92lykNheKrfoQk5SXzN8",
    className: "md:col-span-7 aspect-[16/10]"
  },
  {
    title: "Shadow & Light",
    category: "Portraiture",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP7ZOYXdNDHTYSPrRpybiPp7x9-w-aQOsoMtorToRKB8TCDGrWSkWGn3Bk96GB-FnWQZj8Zo04FRGa4yUVslmSsjVjIPvL7_rbnxinD82KjuB4T8Ws8MGzX-IJ2Ev2uHlSVijROT3EvyJTjeaLU4ndMBDTUO2a6mD_D2JTvXmXzsDR4x9WAzeF2oickvhfMAO0-4vcpHEjDoVXsRZzvIi_N3ZoYD1kPp0lqrrdrzVSkGcTKjJqvY9wloh1sGIqWsGeosp6POjBGQKo",
    className: "md:col-span-5 aspect-[4/5] md:-mt-24"
  },
  {
    title: "Ethereal Woodlands",
    category: "Series: Roots",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD79hRwYFt3UM8s4bOeLPoOd2579-io_2G2TDgQRwmpCmeLbsD3gNBA-D2Qvbyw4Cgfe5mt1Qc7pXFDVftjWgqgCsbtVgPoqIvzBb44grVZt2xp9cYb67jdA4KG70NFfsHJefWcx6virMsX-kEcjo17LE5acY8eGqd84dRb4WpT96KiFxWUhIvl1nqVJZgg9jKsOblamKOufij_C3p7lQDanSRlY-zVURCI-sGA7AlZv82quGEByESmQoXwogvaE0_lXtg1275hHZPf",
    className: "md:col-span-4 aspect-square"
  },
  {
    title: "Nocturnal Rhythm",
    category: "Urban Night",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNfPI8mbplwHrEK5UW2YgqOnk_D2XezDrxqR5xWG1_EGlDvujgucNqtcNsfeL-773W2XFokXjPjMQ2i20zAR0dbKQbOgtQ-Tpn2F_wZFaKFZWrkI2lpQzkMo_JfCaw3UhZ9TP3BBCH_GiPMZKiBynmx2bSjxSThOVmuiJFtdlFiJn4LATX6MutZ-LTFfq7yWeiuqOb-O39BXeqhGYOZ2yG5Zx1MMuq_pABzVWR7xoJDsyqYaQ2eSUP91OopWedyFwIVmInkxD7sFJo",
    className: "md:col-span-8 aspect-[21/9]"
  }
];

const testimonials = [
  {
    quote: "Shivam's ability to capture the soul of concrete and steel is unmatched. He doesn't just take photos; he archives atmosphere.",
    author: "Marcus Thorne",
    role: "Architectural Archive"
  },
  {
    quote: "A masterclass in restraint and minimalism. The editorial spread Shivam curated for our winter collection exceeded every expectation.",
    author: "Elena Vance",
    role: "Editorial Shoot"
  },
  {
    quote: "Working with Shivam is an exercise in vision. He sees the geometry in the mundane and brings a cinematic weight to every frame.",
    author: "Julian Grey",
    role: "Brand Identity"
  },
  {
    quote: "The shadows in his portraits tell more of a story than most full-light setups. Pure, unadulterated visual poetry.",
    author: "Sofia Rossi",
    role: "Portrait Series"
  }
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <header className="relative h-[95vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEUIz1Zg4ogdCB-uYou7xCH5ttChl1zc4RBN9etRzRqnE8tqnU7ClTcEIa2oXO8OBpmgl-C54ZhZZkOp9XE_YK_aLpJndxl1ZyTHGaBW9nexFoJIDjQZmg6k2conXYu8RFMR5lDoQ_EnUn06jO5udaL92no7lu8AXDErlpvKFAVYU5yN0VnznYFURmojNSsogcbmsshnhqF9wz-SjyCkmijI1OprOxzTPMqw6KQtayN6xQwPhiERsvYitu3NuGia0rNLkIWKbiNydy" 
            alt="Hero Landscape" 
            className="w-full h-full object-cover opacity-50 contrast-125 brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-headline text-6xl md:text-[120px] font-extrabold kerning-tight leading-[0.9] text-white mb-8"
          >
            Shivam Sharma
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-body text-[10px] md:text-xs font-medium kerning-loose text-on-surface-variant uppercase mb-16"
          >
            Digital Curator & Lens-Based Artist
          </motion.p>
          <motion.a 
            href="#featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="group inline-flex items-center gap-6 px-12 py-5 border border-white/20 hover:border-primary/50 text-white font-body text-[10px] kerning-loose uppercase font-bold transition-all duration-700 bg-transparent hover:bg-white/5"
          >
            Explore
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              <ArrowRight size={14} />
            </span>
          </motion.a>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </header>

      {/* Featured Projects Section */}
      <section id="featured" className="py-48 px-8 md:px-16 max-w-screen-2xl mx-auto relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <span className="font-body text-[10px] kerning-loose text-primary uppercase mb-6 block font-bold">Volume 01</span>
            <h2 className="font-headline text-4xl md:text-6xl font-light leading-tight text-white">
              Featured <span className="font-extrabold italic opacity-90">Projects</span>
            </h2>
          </div>
          <div className="font-body text-[10px] kerning-loose text-on-surface-variant/50 uppercase border-b border-white/10 pb-2">
            Selected Works — 2024 Edition
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`group relative overflow-hidden bg-surface ${project.className}`}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover cinematic-zoom opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-12">
                <span className="font-body text-[9px] kerning-loose text-primary uppercase mb-3 font-bold">{project.category}</span>
                <h3 className="font-headline text-2xl font-bold tracking-tight text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-48 max-w-4xl mx-auto text-center">
          <p className="font-headline text-2xl md:text-4xl leading-[1.6] text-white/90 font-light italic">
            &quot;Art is not what you see, but what you make others see through the deliberate{" "}
            <span className="font-extrabold text-primary not-italic">absence of light</span>.&quot;
          </p>
          <div className="mt-12 flex justify-center">
            <div className="w-24 h-px bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-48 px-8 md:px-16 max-w-screen-2xl mx-auto relative overflow-hidden">
        <div className="flex flex-col mb-24">
          <span className="font-body text-[10px] kerning-loose text-primary uppercase mb-6 block font-bold">Perspectives</span>
          <h2 className="font-headline text-4xl md:text-6xl font-light leading-tight text-white mb-4">
            What Clients <span className="font-extrabold italic opacity-90">Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black border border-white/5 p-10 flex flex-col justify-between group hover:border-primary/30 transition-all duration-700 shadow-2xl relative overflow-hidden"
            >
              <p className="font-body text-on-surface-variant/80 text-[13px] leading-[1.8] italic mb-10 relative z-10">
                &quot;{t.quote}&quot;
              </p>
              <div>
                <h4 className="font-headline text-white text-[11px] font-bold kerning-loose uppercase mb-1">{t.author}</h4>
                <span className="font-body text-primary/60 text-[9px] kerning-loose uppercase font-medium">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-surface/30 py-48 px-8 md:px-16 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white mb-10 leading-tight">
              Let&apos;s curate a <br/>vision together.
            </h2>
            <p className="font-body text-on-surface-variant/70 text-base leading-relaxed mb-16 max-w-md">
              Available for worldwide editorial assignments, brand partnerships, and selected private commissions.
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <span className="block font-body text-[8px] kerning-loose uppercase text-on-surface-variant/40 mb-1">Inquiries</span>
                  <span className="font-body text-[10px] kerning-loose uppercase text-white hover:text-primary transition-colors">studio@alexrivera.com</span>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <span className="block font-body text-[8px] kerning-loose uppercase text-on-surface-variant/40 mb-1">Residence</span>
                  <span className="font-body text-[10px] kerning-loose uppercase text-white">NYC / Paris</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-background p-12 md:p-20 border border-white/5 shadow-2xl">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input type="text" id="name" placeholder=" " className="w-full bg-transparent border-0 border-b border-white/10 py-4 focus:ring-0 focus:border-primary peer text-white transition-all text-sm" />
                  <label htmlFor="name" className="absolute left-0 top-4 font-body text-[9px] kerning-loose uppercase text-on-surface-variant/40 transition-all peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4">Full Name</label>
                </div>
                <div className="relative group">
                  <input type="email" id="email" placeholder=" " className="w-full bg-transparent border-0 border-b border-white/10 py-4 focus:ring-0 focus:border-primary peer text-white transition-all text-sm" />
                  <label htmlFor="email" className="absolute left-0 top-4 font-body text-[9px] kerning-loose uppercase text-on-surface-variant/40 transition-all peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4">Email Address</label>
                </div>
              </div>
              <div className="relative group">
                <textarea id="message" rows={4} placeholder=" " className="w-full bg-transparent border-0 border-b border-white/10 py-4 focus:ring-0 focus:border-primary peer text-white transition-all resize-none text-sm"></textarea>
                <label htmlFor="message" className="absolute left-0 top-4 font-body text-[9px] kerning-loose uppercase text-on-surface-variant/40 transition-all peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4">Your Message</label>
              </div>
              <button type="submit" className="group flex items-center gap-6 px-0 text-white font-body text-[10px] kerning-loose uppercase font-bold hover:text-primary transition-all duration-700">
                Send Inquiry
                <ArrowRight size={16} className="transition-transform duration-700 group-hover:translate-x-3" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}


