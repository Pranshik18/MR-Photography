"use client";

import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, ChevronDown, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';


const LAYOUT_CLASSES = [
  "md:col-span-7 aspect-[16/10]",
  "md:col-span-5 aspect-[4/5] md:-mt-24",
  "md:col-span-4 aspect-square",
  "md:col-span-8 aspect-[21/9]"
];

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewData, setReviewData] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitStatus, setReviewSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/user/project');
        const data = await response.json();
        if (data.success) {
          // Filter only public projects
          const publicProjects = data.data.filter((p: any) => p.isPublic);
          setProjects(publicProjects.slice(0, 4)); // Get first 4 to match original design
        }
      } catch (error) {
        console.error('Failed to load projects', error);
      }
    };
    
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/user/review');
        const data = await response.json();
        if (data.success) {
          setReviews(data.data);
        }
      } catch (error) {
        console.error('Failed to load reviews', error);
      }
    };
    
    fetchProjects();
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    setReviewSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/user/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (data.success) {
        setReviewSubmitStatus({ type: 'success', message: 'Review submitted successfully. It will be visible after approval.' });
        setReviewData({ name: '', rating: 5, comment: '' });
      } else {
        setReviewSubmitStatus({ type: 'error', message: data.message || 'Failed to submit review.' });
      }
    } catch (error) {
      setReviewSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: 'Inquiry sent successfully. We will get back to you soon.' });
        setContactData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send inquiry.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('featured');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <header className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-black z-10">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "easeOut" }}
        >
          <img 
            src="/Images/image.png" 
            alt="Cinematic Camera Hero" 
            className="w-full h-full object-contain object-top pt-24 pb-12 opacity-90 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          onClick={scrollToFeatured}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 animate-bounce cursor-pointer hover:text-white transition-colors"
        >
          <ChevronDown size={24} />
        </motion.div>
      </header>

      {/* Featured Projects Section */}
      <section id="featured" className="py-24 md:py-48 px-4 sm:px-6 md:px-16 max-w-screen-2xl mx-auto relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8">
          <div className="max-w-xl">
            <span className="font-body text-[10px] tracking-[0.3em] text-primary uppercase mb-6 block font-bold">Volume 01</span>
            <h2 className="font-headline text-4xl md:text-6xl font-light leading-tight text-white">
              Featured <span className="font-extrabold italic opacity-90">Projects</span>
            </h2>
          </div>
          <div className="font-body text-[10px] tracking-[0.3em] font-medium text-on-surface-variant/50 uppercase border-b border-white/10 pb-2">
            Selected Works
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id || project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`group relative overflow-hidden bg-surface ${LAYOUT_CLASSES[index % 4]} cursor-pointer`}
            >
              <Link href={`/detail/${project._id}`} className="block w-full h-full">
                <img 
                  src={project.heroImage || project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-transform duration-[1.5s] ease-in-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6 md:p-12 z-20">
                  <motion.span 
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="font-body text-[9px] tracking-[0.3em] text-primary uppercase mb-3 font-bold"
                  >
                    {project.subtitle || "Selected Work"}
                  </motion.span>
                  <motion.h3 
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="font-headline text-2xl font-bold tracking-tight text-white"
                  >
                    {project.title}
                  </motion.h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 md:mt-48 max-w-4xl mx-auto text-center">
          <p className="font-headline text-2xl md:text-4xl leading-[1.6] text-white/90 font-light italic">
            &quot;Art is not what you see, but what you make others see through the deliberate{" "}
            <span className="font-extrabold text-primary not-italic">absence of light</span>.&quot;
          </p>
          <div className="mt-12 flex justify-center">
            <div className="w-24 h-px bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="py-24 md:py-32 px-4 sm:px-6 md:px-16 max-w-screen-xl mx-auto relative border-t border-white/5">
          <div className="text-center mb-16 md:mb-24">
            <span className="font-body text-[10px] tracking-[0.3em] font-bold text-primary uppercase mb-6 block">Client Words</span>
            <h2 className="font-headline text-4xl md:text-5xl font-light leading-tight text-white mb-6">
              What <span className="font-extrabold italic opacity-90">Clients Say</span>
            </h2>
            <div className="w-12 h-px bg-white/20 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review, index) => (
              <motion.div
                key={review._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-surface/30 border border-white/5 p-8 md:p-10 flex flex-col justify-between hover:bg-surface/50 transition-colors duration-500"
              >
                <div>
                  <div className="flex text-primary mb-6">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="currentColor" />
                    ))}
                  </div>
                  <p className="font-body text-sm leading-relaxed text-white/80 mb-8 italic">
                    &quot;{review.description}&quot;
                  </p>
                </div>
                <div>
                  <p className="font-headline text-lg font-bold text-white mb-1 uppercase tracking-wider">{review.clientName}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {reviews.length > 3 && (
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="mt-16 text-center"
            >
              <button 
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="inline-flex items-center gap-4 px-8 py-4 border border-white/20 text-white font-body text-[10px] tracking-[0.2em] uppercase hover:bg-white/5 transition-colors"
              >
                {showAllReviews ? "Show Less" : "Read More Reviews"}
              </button>
            </motion.div>
          )}
        </section>
      )}
     
    </div>
  );
}


