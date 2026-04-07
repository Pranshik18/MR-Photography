"use client";

import { motion } from 'motion/react';
import { Heart, Briefcase, Frame, ArrowRight } from 'lucide-react';

const packages = [
  {
    title: 'Wedding',
    icon: <Heart size={24} className="text-tertiary" />,
    features: [
      'Full day coverage',
      'High-res images',
      'Premium album',
      'Online gallery access',
      'Engagement session',
    ],
    price: '$2500',
    cta: 'Enquire Now',
    color: 'tertiary',
    bg: 'bg-surface',
  },
  {
    title: 'Commercial',
    icon: <Briefcase size={24} className="text-primary" />,
    features: [
      'Product & Brand photography',
      'Licensing included',
      'Professional retouching',
      'Fast 48h delivery',
    ],
    price: '$1800',
    cta: 'Book Project',
    color: 'primary',
    bg: 'bg-surface-container-low',
  },
  {
    title: 'Fine Art Prints',
    icon: <Frame size={24} className="text-stone-500" />,
    features: [
      'Limited edition series',
      'Archival quality paper',
      'Certificate of authenticity',
      'Worldwide shipping',
    ],
    price: '$450',
    cta: 'Visit Shop',
    color: 'stone-500',
    bg: 'bg-surface',
  },
];

export default function Price() {
  return (
    <div className="pt-32 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <header className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-tertiary mb-6 block">Investment</span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Capturing light, <br/><span className="text-stone-500">Defining moments.</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-xl">
            Transparent pricing for bespoke photographic services. Each package is tailored to preserve the unique narrative of your vision with uncompromising quality.
          </p>
        </motion.div>
      </header>

      {/* Marquee */}
      <div className="relative overflow-hidden w-full h-32 md:h-48 -mb-16 md:-mb-24 z-0 pointer-events-none opacity-10 select-none whitespace-nowrap">
        <div className="animate-marquee">
          <span className="font-headline text-[8rem] md:text-[12rem] font-extrabold uppercase tracking-tighter text-on-surface whitespace-nowrap">
            INVEST IN YOUR STORY — ARTFUL DOCUMENTATION — TIMELESS IMAGES — INVEST IN YOUR STORY — ARTFUL DOCUMENTATION — TIMELESS IMAGES —
          </span>
        </div>
      </div>

      {/* Pricing Grid */}
      <section className="px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-outline-variant/10">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={pkg.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${pkg.bg} p-10 md:p-16 border-r border-outline-variant/10 flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <h2 className="font-headline text-3xl font-bold tracking-tight">{pkg.title}</h2>
                  {pkg.icon}
                </div>
                <ul className="space-y-6 mb-16">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 group">
                      <span className={`w-1.5 h-1.5 bg-stone-700 group-hover:bg-${pkg.color} transition-colors duration-500`}></span>
                      <span className="text-sm uppercase tracking-widest font-sans text-on-surface-variant">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={`font-headline text-sm text-${pkg.color} mb-2 uppercase tracking-widest`}>
                  {pkg.title === 'Commercial' ? 'Inquire for Quote' : 'Starting at'}
                </p>
                <p className="font-headline text-4xl font-extrabold mb-8">{pkg.price}</p>
                <button className={`w-full py-4 font-sans text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${
                  pkg.title === 'Fine Art Prints' 
                    ? 'border border-outline-variant/30 text-on-surface hover:bg-surface-container-high' 
                    : pkg.title === 'Wedding' 
                      ? 'bg-tertiary text-stone-900 hover:scale-[1.02]' 
                      : 'bg-primary-container text-on-primary-container hover:scale-[1.02]'
                }`}>
                  {pkg.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Immersive CTA */}
      <section className="mt-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="relative h-[600px] w-full overflow-hidden group rounded-sm">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic landscape" 
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent"></div>
          <div className="absolute bottom-16 left-8 md:left-16 max-w-xl">
            <h3 className="font-headline text-4xl font-bold mb-6">Looking for something unique?</h3>
            <p className="text-on-surface-variant mb-8">Custom photography projects often require a specific approach. Let's discuss your vision and create a bespoke package that fits your exact needs.</p>
            <a className="inline-flex items-center gap-4 group" href="#">
              <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase border-b border-tertiary pb-2 group-hover:border-primary transition-colors duration-500">Request Custom Quote</span>
              <ArrowRight size={18} className="text-tertiary group-hover:translate-x-2 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="mt-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { step: '01', title: 'Consultation', desc: 'We discuss your aesthetic goals and specific requirements for the shoot.' },
            { step: '02', title: 'Pre-Production', desc: 'Location scouting, mood boarding, and logistical planning to ensure seamless execution.' },
            { step: '03', title: 'Production', desc: 'The day of capture. Using professional grade equipment and creative expertise.' },
            { step: '04', title: 'Curation', desc: 'Detailed editing and selection of the final collection delivered digitally.' },
          ].map((item) => (
            <div key={item.step} className="space-y-4">
              <span className="font-sans text-[10px] text-tertiary tracking-[0.2em] uppercase">Step {item.step}</span>
              <h4 className="font-headline font-bold uppercase tracking-tight">{item.title}</h4>
              <p className="text-xs text-on-surface-variant leading-loose">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
