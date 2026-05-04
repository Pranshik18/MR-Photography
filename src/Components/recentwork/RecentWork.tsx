"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { Search, ChevronDown } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const featured = stories.find((s) => s.featured) || stories[0];
  const gridStories = stories.filter((s) => {
    if (s.featured) return false;
    const matchesCategory =
      activeCategory === "ALL" ||
      (s.category && s.category.toUpperCase() === activeCategory);
    const names = s.client || s.title || "";
    const matchesSearch = names
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Extract dynamic categories and merge with default ones
  const fetchedCategories = Array.from(
    new Set(stories.map((s) => s.category?.toUpperCase()).filter(Boolean)),
  ) as string[];
  const baseCategories = [
    "WEDDINGS",
    "PRE-WEDDING",
    "PARTIES",
    "TRADITIONS",
    "MATERNITY",
    "BOUDOIR",
    "COMMERCIAL",
  ];
  const CATEGORIES = [
    "ALL",
    ...Array.from(new Set([...baseCategories, ...fetchedCategories])),
  ];

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
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Featured Image */}
          <div
            onClick={() => router.push(`/detail/${featured._id}`)}
            className="hidden lg:flex lg:w-1/2 relative rounded-xl overflow-hidden group cursor-pointer h-[400px]"
          >
            <img
              src={featured.heroImage}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white text-center">
              <span className="text-sm font-semibold tracking-widest uppercase mb-1">
                LATEST POST
              </span>
              <h2 className="text-5xl font-serif italic mb-1">
                {featured.title}
              </h2>
              <span className="text-xs tracking-[0.2em] font-medium">
                {featured.date || "RECENT"}
              </span>
            </div>
          </div>

          {/* Right Info & Search */}
          <div className="flex-1 lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-serif italic text-gray-800 mb-6">
              Recent Work
            </h1>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-md">
              Welcome to our visual diary - a curated collection of our most
              recent love stories, timeless moments, and unforgettable
              celebrations. Feel free to explore our latest galleries or search
              for something specific below.
            </p>
            <div className="flex flex-col gap-4 w-full max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="SEARCH OUR SITE"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 text-xs tracking-widest uppercase font-medium placeholder-gray-400 transition-colors"
                />
              </div>
              <div className="relative w-full" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between pl-6 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 text-xs tracking-widest uppercase font-medium text-gray-500 bg-white hover:bg-gray-50 transition-colors"
                >
                  <span>
                    {activeCategory === "ALL"
                      ? "BROWSE CATEGORY"
                      : activeCategory}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden py-2"
                    style={{ zIndex: 50 }}
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-6 py-2.5 text-xs tracking-widest uppercase font-medium transition-colors ${activeCategory === cat ? "bg-gray-50 text-[#a8b845]" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {gridStories.map((story) => (
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
