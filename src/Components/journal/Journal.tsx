"use client";

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    category: 'STREET',
    readTime: '12 MIN READ',
    title: 'Street Photography in the Rain',
    description: 'There is a specific kind of alchemy that happens when light meets water on asphalt. In this entry, I explore the technical challenges and emotional rewards of chasing the storm.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000',
    featured: true,
  },
  {
    id: 2,
    category: 'ESSAY',
    readTime: '08 MIN READ',
    title: 'The Power of Light',
    description: 'Photography is not about the subject, it\'s about what the light does to the subject. Reflections on the minimalism of the golden hour.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    category: 'TRAVEL',
    readTime: '15 MIN READ',
    title: 'Chasing Silence in Iceland',
    description: 'Documenting the isolating beauty of the Highlands. A visual diary of a week spent in total solitude among the volcanic dust.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 4,
    category: 'ARCHITECTURE',
    readTime: '05 MIN READ',
    title: 'Geometry of the City',
    description: 'Finding perfect symmetry in the chaotic urban sprawl of Tokyo.',
    image: 'https://images.unsplash.com/photo-1449156059431-787c5d7139b8?auto=format&fit=crop&q=80&w=1000',
  }
];

export default function Journal() {
  return (
    <div className="pt-32 pb-24">
      {/* Header Section */}
      <header className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 max-w-3xl"
        >
          <span className="text-[0.75rem] tracking-[0.15em] uppercase text-tertiary font-medium">Notes & Observations</span>
          <h1 className="text-[3.5rem] leading-[1.1] font-headline font-extrabold tracking-tight text-on-surface">
            Journal
          </h1>
          <p className="text-on-surface-variant text-sm sm:text-lg max-w-xl mt-4">
            A collection of thoughts on light, shadow, and the transient moments captured through the lens. Curated explorations into the art of seeing.
          </p>
        </motion.div>
      </header>

      {/* Journal Content */}
      <section className="px-6 md:px-12 max-w-screen-2xl mx-auto space-y-32">
        {/* Featured Article */}
        {articles.filter(a => a.featured).map(article => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
          >
            <div className="md:col-span-8 overflow-hidden rounded-sm luma-fade">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:col-span-4 space-y-6">
              <span className="text-[10px] tracking-[0.15em] uppercase text-tertiary font-bold">
                {article.category} • {article.readTime}
              </span>
              <h2 className="text-3xl font-headline font-bold leading-tight">{article.title}</h2>
              <p className="text-on-surface-variant leading-relaxed">
                {article.description}
              </p>
              <a className="inline-flex items-center gap-2 group/link" href="#">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-on-surface">Read Entry</span>
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </motion.article>
        ))}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {articles.filter(a => !a.featured && a.id < 4).map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`space-y-8 ${idx === 1 ? 'md:mt-24' : ''}`}
            >
              <div className="overflow-hidden rounded-sm luma-fade aspect-[4/5]">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.15em] uppercase text-tertiary font-bold">
                  {article.category} • {article.readTime}
                </span>
                <h3 className="text-2xl font-headline font-bold">{article.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-md">
                  {article.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Technical Info Section */}
        <div className="bg-surface-container-low rounded-lg p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.15em] uppercase text-primary font-bold">Current Kit</span>
              <h4 className="font-headline font-bold text-xl">The Leica M Series</h4>
              <p className="text-on-surface-variant text-sm">Why the rangefinder remains the ultimate tool for street observation in the 21st century.</p>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.15em] uppercase text-primary font-bold">Philosophy</span>
              <h4 className="font-headline font-bold text-xl">Negative Space</h4>
              <p className="text-on-surface-variant text-sm">Learning to appreciate what we leave out of the frame as much as what we keep in.</p>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.15em] uppercase text-primary font-bold">Upcoming</span>
              <h4 className="font-headline font-bold text-xl">Analog Revival</h4>
              <p className="text-on-surface-variant text-sm">A return to the darkroom. The slow process of developing film in a fast-paced world.</p>
            </div>
          </div>
        </div>

        {/* More Posts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-12">
          <div className="md:col-span-5 md:col-start-2">
            {articles.filter(a => a.id === 4).map(article => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="overflow-hidden rounded-sm luma-fade aspect-square">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-tertiary font-bold">
                    {article.category} • {article.readTime}
                  </span>
                  <h3 className="text-2xl font-headline font-bold">{article.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{article.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="md:col-span-4 md:col-start-8 self-center">
            <div className="border-l border-outline-variant/20 pl-12 py-12 space-y-12">
              <div className="group cursor-pointer">
                <span className="text-[10px] tracking-[0.15em] uppercase text-stone-500">Archive 01</span>
                <h4 className="text-lg font-headline font-bold group-hover:text-primary transition-colors">Portraits of Stranger</h4>
              </div>
              <div className="group cursor-pointer">
                <span className="text-[10px] tracking-[0.15em] uppercase text-stone-500">Archive 02</span>
                <h4 className="text-lg font-headline font-bold group-hover:text-primary transition-colors">The Grain of Film</h4>
              </div>
              <div className="group cursor-pointer">
                <span className="text-[10px] tracking-[0.15em] uppercase text-stone-500">Archive 03</span>
                <h4 className="text-lg font-headline font-bold group-hover:text-primary transition-colors">Night Vision</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="mt-32 flex justify-center">
        <button className="bg-tertiary text-stone-900 px-12 py-4 rounded-lg font-headline font-bold text-[10px] tracking-[0.2em] uppercase transition-transform hover:scale-105 active:scale-95">
          Load Older Entries
        </button>
      </div>
    </div>
  );
}
