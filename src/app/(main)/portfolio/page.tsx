"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  category: string;
  heroImage: string;
}

const Page = () => {
  const router = useRouter();
  
  const [allProjects, setAllProjects] = useState<Project[]>([]); // Store all projects
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]); // Projects currently shown
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const limit = 6; 

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch('/api/user/project');
        
        if (!res.ok) throw new Error('Failed to fetch projects');

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setAllProjects(data.data);
          
          // Initially show only first 6 projects
          setDisplayedProjects(data.data.slice(0, limit));
        } else {
          setError(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        console.error(err);
        setError('Network error while loading projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  const loadMoreProjects = () => {
    const currentLength = displayedProjects.length;
    const nextProjects = allProjects.slice(currentLength, currentLength + limit);
    
    if (nextProjects.length > 0) {
      setDisplayedProjects(prev => [...prev, ...nextProjects]);
    }
  };

  const hasMore = displayedProjects.length < allProjects.length;

  return (
    <div className="min-h-screen bg-black text-white">

      <section className="mx-6 md:mx-10 mt-20 lg:mt-24">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12">
          <div className="lg:max-w-2xl">
            <p className="text-xs tracking-[3px] text-gray-400 font-medium mb-6">
              CURATED WORKS 2022—2026
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Visual narratives<br />carved in light.
            </h1>
          </div>
          <div className="lg:mt-auto lg:max-w-xs text-sm md:text-base text-gray-300 lg:text-right">
            Exploring the intersection of architectural silence and the fleeting human presence in modern landscapes.
          </div>
        </div>
      </section>

      <section className="mx-6 md:mx-10 mt-16">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center opacity-50">
            <Loader2 className="w-10 h-10 mb-4 animate-spin" />
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 animate-pulse">
              Loading Archives...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center">
            <p className="text-[12px] tracking-[0.2em] font-medium text-red-400 uppercase mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-[10px] tracking-widest uppercase border-b border-white pb-1 hover:text-gray-300 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : allProjects.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px] w-full text-center">
            <p className="text-[12px] tracking-[0.2em] uppercase text-gray-500">
              No projects available at this time.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
              {displayedProjects.map((item) => (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-xl aspect-[4/3] lg:aspect-auto lg:min-h-[420px] xl:min-h-[520px] cursor-pointer"
                  onClick={() => router.push(`/detail/${item._id}`)}
                >
                  <img
                    src={item.heroImage}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                    <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="text-primary text-sm font-medium tracking-widest uppercase">
                        {item.category}
                      </h3>
                      <h2 className="text-white text-2xl md:text-3xl font-semibold mt-3 leading-tight">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-16 mb-20">
                <button
                  onClick={loadMoreProjects}
                  className="group relative px-10 py-4 border border-white/50 hover:border-white text-white uppercase text-sm tracking-widest font-medium transition-all duration-300 hover:bg-white hover:text-black"
                >
                  SHOW MORE PROJECTS
                </button>
              </div>
            )}

            {!hasMore && allProjects.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm tracking-widest">
                  YOU'VE REACHED THE END OF THE ARCHIVE
                </p>
              </div>
            )}
          </>
        )}
      </section>

      <section className="bg-zinc-950 py-16 md:py-24 mt-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-6xl font-bold max-w-3xl leading-tight">
            Interested in working on a collection?
          </h2>
          <button onClick={()=>router.push('/contact')} className="mt-10 w-full sm:w-auto uppercase bg-white text-black px-10 py-4 text-sm font-medium tracking-widest hover:bg-gray-200 transition duration-300">
            Inquire for projects
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;