"use client";

import React, { useState, useEffect, use } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ProjectImage {
  url: string;
  caption?: string;
}

interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  client?: string;
  role?: string;
  heroImage: string;
  images: ProjectImage[];
  year: number;
  location?: string;
}

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user/project/${id}`);
        const data = await res.json();
        
        if (data.success) {
          setProject(data.data);
        } else {
          setError(data.message || 'Failed to load project details');
        }
      } catch (err) {
        setError('Network error while loading project');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchProject();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-tertiary animate-spin opacity-50 mb-4" />
        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-500 animate-pulse">Loading Curated Exhibit...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-[12px] tracking-[0.2em] font-medium text-red-400 uppercase mb-4">{error || 'Project not found'}</p>
        <button onClick={() => window.location.reload()} className="text-[10px] tracking-widest text-on-surface uppercase border-b border-white pb-1 hover:text-gray-300">Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            alt={project.title} 
            className="w-full h-full object-cover grayscale brightness-50" 
            src={project.heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-background"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <span className="label-md block mb-6 text-tertiary-fixed tracking-[0.3em] font-medium uppercase text-[10px]">
            {project.subtitle || `PROJECT: ${project.year}`}
          </span>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-4">
            {project.title}
          </h1>
          <div className="w-12 h-[1px] bg-tertiary mx-auto mt-8"></div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-4 grid grid-cols-2 gap-y-12">
              {project.client && (
                <div>
                  <span className="block font-label text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Client</span>
                  <span className="block text-on-surface font-medium">{project.client}</span>
                </div>
              )}
              {project.role && (
                <div>
                  <span className="block font-label text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Role</span>
                  <span className="block text-on-surface font-medium">{project.role}</span>
                </div>
              )}
              {project.year && (
                <div>
                  <span className="block font-label text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Year</span>
                  <span className="block text-on-surface font-medium">{project.year}</span>
                </div>
              )}
              {project.location && (
                <div>
                  <span className="block font-label text-[10px] tracking-[0.15em] uppercase text-stone-500 mb-2">Location</span>
                  <span className="block text-on-surface font-medium">{project.location}</span>
                </div>
              )}
            </div>

            <div className="lg:col-span-8">
              <h2 className="font-headline text-2xl md:text-4xl font-bold leading-tight mb-8 text-on-surface-variant">
                Exploring the intersection of architectural silence and precise human presence.
              </h2>
              <div className="max-w-2xl">
                <p className="text-stone-400 text-lg leading-relaxed font-light whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {project.images && project.images.length > 0 && (
        <section className="bg-surface-container-low pb-32">
          <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">

              {project.images[0] && (
                <div className="md:col-span-7 group">
                  <div className="overflow-hidden bg-surface-container">
                    <img 
                      alt={project.images[0].caption || 'Plate 01'} 
                      className="w-full h-auto grayscale transition-transform duration-[800ms] group-hover:scale-105 opacity-85 group-hover:opacity-100" 
                      src={project.images[0].url} 
                    />
                  </div>
                  <p className="mt-4 font-label text-[9px] tracking-[0.1em] text-stone-600 uppercase">
                    {project.images[0].caption || 'Plate 01 — Detail View'}
                  </p>
                </div>
              )}

              {project.images[1] && (
                <div className="md:col-span-5 pb-12 group">
                  <div className="overflow-hidden bg-surface-container">
                    <img 
                      alt={project.images[1].caption || 'Plate 02'} 
                      className="w-full h-auto grayscale transition-transform duration-[800ms] group-hover:scale-105 opacity-85 group-hover:opacity-100" 
                      src={project.images[1].url} 
                    />
                  </div>
                  <p className="mt-4 font-label text-[9px] tracking-[0.1em] text-stone-600 uppercase">
                     {project.images[1].caption || 'Plate 02 — Secondary Focus'}
                  </p>
                </div>
              )}

              {project.images[2] && (
                <div className="md:col-span-12 py-12 group">
                  <div className="overflow-hidden bg-surface-container h-[400px] md:h-[700px]">
                    <img 
                      alt={project.images[2].caption || 'Plate 03'} 
                      className="w-full h-full object-cover grayscale transition-transform duration-[1200ms] group-hover:scale-105 opacity-85 group-hover:opacity-100" 
                      src={project.images[2].url} 
                    />
                  </div>
                  <p className="mt-4 font-label text-[9px] tracking-[0.1em] text-stone-600 uppercase">
                    {project.images[2].caption || 'Plate 03 — Wide Perspective'}
                  </p>
                </div>
              )}

              {project.images[3] && (
                <div className="md:col-span-4 group">
                  <div className="overflow-hidden bg-surface-container">
                    <img 
                      alt={project.images[3].caption || 'Plate 04'} 
                      className="w-full h-auto grayscale transition-transform duration-[800ms] group-hover:scale-105 opacity-85 group-hover:opacity-100" 
                      src={project.images[3].url} 
                    />
                  </div>
                  <p className="mt-4 font-label text-[9px] tracking-[0.1em] text-stone-600 uppercase">
                    {project.images[3].caption || 'Plate 04 — Abstract Tone'}
                  </p>
                </div>
              )}

              {project.images[4] && (
                <div className="md:col-span-8 group">
                  <div className="overflow-hidden bg-surface-container">
                    <img 
                      alt={project.images[4].caption || 'Plate 05'} 
                      className="w-full h-auto grayscale transition-transform duration-[800ms] group-hover:scale-105 opacity-85 group-hover:opacity-100" 
                      src={project.images[4].url} 
                    />
                  </div>
                  <p className="mt-4 font-label text-[9px] tracking-[0.1em] text-stone-600 uppercase">
                    {project.images[4].caption || 'Plate 05 — Resolution'}
                  </p>
                </div>
              )}
              
            </div>
          </div>
        </section>
      )}

      <section className="bg-surface py-32 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="flex flex-col items-center gap-6">
            <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>camera</span>
            <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Technical Curation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 w-full max-w-3xl">
              <div className="text-center">
                <span className="block font-label text-[10px] tracking-[0.2em] text-stone-600 uppercase mb-2">Medium</span>
                <span className="text-sm font-medium">Digital Monochromatic</span>
              </div>
              <div className="text-center">
                <span className="block font-label text-[10px] tracking-[0.2em] text-stone-600 uppercase mb-2">Optics</span>
                <span className="text-sm font-medium">35mm Prime / f/1.4</span>
              </div>
              <div className="text-center">
                <span className="block font-label text-[10px] tracking-[0.2em] text-stone-600 uppercase mb-2">Tone</span>
                <span className="text-sm font-medium">Inky Blacks / Grain Texture</span>
              </div>
            </div>
            
            <Link 
              className="mt-16 inline-flex items-center gap-4 px-10 py-5 bg-tertiary text-on-tertiary rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300" 
              href="/portfolio"
            >
              View Entire Portfolio
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}