"use client";

import React, { useState, useEffect, use } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

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
  date?: string;
  category?: string;
  location?: string;
}

export default function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
          setError(data.message || "Failed to load project details");
        }
      } catch (err) {
        setError("Network error while loading project");
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
        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-500 animate-pulse">
          Loading Curated Exhibit...
        </p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-[12px] tracking-[0.2em] font-medium text-red-400 uppercase mb-4">
          {error || "Project not found"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-[10px] tracking-widest text-on-surface uppercase border-b border-white pb-1 hover:text-gray-300"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-body selection:bg-gray-100 selection:text-black">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img
            alt={project.title}
            className="w-full h-full object-cover"
            src={project.heroImage}
          />
          {/* Removed effect overlay */}
        </div>

        <div className="relative z-10 text-center px-6">
          <span className="label-md block mb-6 text-white tracking-[0.3em] font-medium uppercase text-[10px] drop-shadow-md">
            {project.category || project.subtitle || `PROJECT: ${project.year}`}
          </span>
          <h1 className="font-headline text-4xl md:text-9xl font-extrabold tracking-tighter text-white drop-shadow-2xl mb-4 px-4">
            {project.title}
          </h1>
          <div className="w-12 h-[1px] bg-white mx-auto mt-8 opacity-40 shadow-sm"></div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="lg:col-span-12">
            <div className="max-w-3xl mx-auto text-center relative">
              <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900 mb-6 leading-tight tracking-tight">
                The Story Behind the Lens
              </h2>
              <p className="text-gray-600 text-lg md:text-2xl leading-relaxed font-light whitespace-pre-wrap tracking-wide font-serif italic">
                {project.description}
              </p>
              <div className="w-16 h-[1px] bg-black/10 mx-auto mt-12" />
            </div>
          </div>
        </div>
      </section>

      {project.images && project.images.length > 0 && (
        <section className="bg-white pb-20">
          <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-12 space-y-6 md:space-y-12">
              {project.images.map((image, index) => (
                <div key={index} className="break-inside-avoid group">
                  <div className="overflow-hidden bg-gray-50 rounded-lg">
                    <img
                      alt={image.caption || `Plate ${index + 1}`}
                      className="w-full h-auto"
                      src={image.url}
                    />
                  </div>
                  {image.caption && (
                    <p className="mt-6 font-label text-[10px] tracking-[0.2em] text-gray-400 uppercase text-center">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="py-20 border-t border-gray-100 text-center">
        <Link
          href="/portfolio"
          className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-900 hover:opacity-50 transition-opacity"
        >
          Back to Portfolio
        </Link>
      </footer>
    </div>
  );
}
