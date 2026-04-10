"use client";

import React, { useState, useEffect } from "react";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  featured: boolean;
  order: number;
}

export default function WebsiteLayoutPage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [resFeatured, resAll] = await Promise.all([
          fetch("/api/admin/feature").then((r) => r.json()),
          fetch("/api/user/project").then((r) => r.json()),
        ]);

        if (resFeatured.success) setFeaturedProjects(resFeatured.data);
        if (resAll.success) setAllProjects(resAll.data);
      } catch (error) {
        toast.error("Failed to load project database");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle reordering of featured projects
  const handleReorder = async (newOrder: Project[]) => {
    setFeaturedProjects(newOrder); // Optimistic update
    try {
      const projectIds = newOrder.map((p) => p._id);
      const res = await fetch("/api/admin/feature", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectIds }),
      });
      const data = await res.json();
      if (!data.success) toast.error(data.message);
    } catch (error) {
      toast.error("Cloud synchronization failed");
    }
  };

  // Remove project from being featured
  const handleRemove = async (id: string) => {
    try {
      const res = await fetch("/api/admin/feature/remove", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setFeaturedProjects((prev) => prev.filter((p) => p._id !== id));
        toast.success("Design updated: Project un-featured");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  // Add project to featured list
  const handleAdd = async (project: Project) => {
    if (featuredProjects.some((p) => p._id === project._id)) {
      toast.error("Project is already in the featured list");
      return;
    }

    try {
      const res = await fetch("/api/admin/feature/add", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project._id }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedFeatured = [
          ...featuredProjects,
          { ...project, featured: true, order: featuredProjects.length },
        ];
        setFeaturedProjects(updatedFeatured);
        setSearchQuery("");
        toast.success("Project featured successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update project status");
    }
  };

  const searchResults = allProjects.filter(
    (p) =>
      !featuredProjects.find((fp) => fp._id === p._id) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="p-12 max-w-7xl w-full mx-auto min-h-screen">
      <div className="mb-16">
        <p className="label-md text-tertiary mb-2">Editor</p>
        <h1 className="text-5xl font-bold tracking-tighter text-on-surface">
          Website Layout <span className="text-on-surface/20">— Home Page</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="space-y-12 lg:col-span-12 max-w-4xl mx-auto w-full">
          {/* Section 1: Featured Projects */}
          <section>
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-on-surface/60">
                Featured Projects ({featuredProjects.length})
              </h3>
              <p className="text-[0.65rem] text-on-surface/30 italic">
                {isLoading ? "Synchronizing database..." : "Drag to reorder elements on the live grid"}
              </p>
            </div>

            <Reorder.Group
              values={featuredProjects}
              onReorder={handleReorder}
              className="space-y-4"
            >
              <AnimatePresence initial={false}>
                {featuredProjects.map((project) => (
                  <Reorder.Item
                    key={project._id}
                    value={project}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group"
                  >
                    <div className="flex items-center gap-6 p-4 bg-surface-low rounded-lg border border-transparent hover:border-tertiary/20 hover:bg-surface transition-all duration-500 transform hover:scale-[1.01]">
                      <div className="cursor-grab active:cursor-grabbing text-on-surface/20 group-hover:text-tertiary/60 transition-colors">
                        <span className="material-symbols-outlined select-none">
                          drag_indicator
                        </span>
                      </div>

                      <div className="w-32 h-20 overflow-hidden rounded-sm flex-shrink-0 bg-surface-container-highest">
                        <img
                          alt={project.title}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                          src={project.heroImage}
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-[0.65rem] tracking-widest text-primary/60 uppercase mb-1">
                          {project.subtitle || "Portfolio"}
                        </p>
                        <h4 className="font-display font-bold text-lg tracking-tight">
                          {project.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => handleRemove(project._id)}
                        className="px-4 py-2 text-[0.65rem] tracking-[0.2em] font-bold uppercase text-tertiary hover:text-red-400 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>

              {featuredProjects.length === 0 && !isLoading && (
                <div className="border-2 border-dashed border-tertiary/10 rounded-lg p-12 flex items-center justify-center bg-surface-lowest/30">
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-on-surface/20">
                    No featured projects. Search below to add entries.
                  </span>
                </div>
              )}
            </Reorder.Group>
          </section>

          {/* Section 2: Add to Featured */}
          <section className="p-8 bg-surface-low/50 rounded-lg border border-outline-variant/10">
            <h3 className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-on-surface mb-6">
              Add to Featured
            </h3>
            <div className="space-y-4">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">
                  search
                </span>
                <input
                  className="w-full bg-surface-low border-none text-[0.75rem] tracking-[0.15em] pl-12 pr-4 py-4 focus:ring-1 focus:ring-tertiary uppercase font-medium outline-none placeholder:text-on-surface/20"
                  placeholder="SEARCH FOR A PROJECT TO FEATURE..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-2"
                  >
                    {searchResults.map((project) => (
                      <div
                        key={project._id}
                        className="flex items-center justify-between p-3 bg-surface hover:bg-surface-high transition-colors rounded border border-outline-variant/5 group"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={project.heroImage}
                            className="w-12 h-12 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all"
                            alt=""
                          />
                          <span className="text-[0.7rem] uppercase tracking-wider font-medium">
                            {project.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAdd(project)}
                          className="bg-tertiary text-on-tertiary px-4 py-2 text-[0.6rem] tracking-[0.15em] font-black uppercase hover:scale-[1.05] transition-transform active:scale-95"
                        >
                          Add to Featured
                        </button>
                      </div>
                    ))}
                    {searchResults.length === 0 && (
                      <p className="text-[0.6rem] uppercase tracking-widest text-on-surface/20 p-4 text-center">
                        No projects found matching your query
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}