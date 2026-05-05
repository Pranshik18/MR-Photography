"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export interface Story {
  _id: string;
  title: string;
  client?: string;
  date?: string;
  category?: string;
  heroImage: string;
  featured: boolean;
}

const RecentWorkInner: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") || "ALL";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/user/project");
        const data = await res.json();
        if (data.success) {
          setStories(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory("ALL");
    }
  }, [searchParams]);

  const displayStories = stories.filter((s) => {
    return activeCategory === "ALL" || (s.category && s.category.toUpperCase() === activeCategory);
  });

  if (loading) {
    return (
      <div className="pt-32 pb-40 min-h-screen bg-white flex items-center justify-center font-serif text-2xl italic">
        Loading...
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="pt-32 pb-40 min-h-screen bg-white flex items-center justify-center font-serif text-2xl italic">
        No recent work available.
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-serif italic text-gray-800 mb-6">
            Recent Work
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Welcome to our visual diary - a curated collection of our most
            recent love stories, timeless moments, and unforgettable
            celebrations. Browse through our latest galleries below.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {displayStories.map((story) => (
            <div
              key={story._id}
              onClick={() => router.push(`/detail/${story._id}`)}
              className="relative rounded-xl overflow-hidden group cursor-pointer aspect-[3/2]"
            >
              <img
                src={story.heroImage}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-center">
                <h3 className="text-3xl font-serif italic mb-1 drop-shadow-md">
                  {story.title}
                </h3>
                <span className="text-[10px] tracking-[0.2em] font-medium uppercase drop-shadow-md">
                  {story.date || "RECENT"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RecentWork: React.FC = () => {
  return (
    <Suspense
      fallback={<div className="pt-32 pb-40 bg-white min-h-screen"></div>}
    >
      <RecentWorkInner />
    </Suspense>
  );
};
