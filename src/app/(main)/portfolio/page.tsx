"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

type ContentFormat = {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
};

const Page = () => {
  const router = useRouter(); // Fixed: renamed 'route' to 'router' for clarity

  const assets: ContentFormat[] = [
    {
      id: 1,
      title: "test1",
      subtitle: "test2",
      image_url: "/Images/test1.jpg",
    },
    {
      id: 2,
      title: "test1",
      subtitle: "test2",
      image_url: "/Images/test1.jpg",
    },
    {
      id: 3,
      title: "Urban Silence",
      subtitle: "Architecture",
      image_url: "/Images/test1.jpg",
    },
    {
      id: 4,
      title: "Fleeting Light",
      subtitle: "Landscape",
      image_url: "/Images/test1.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
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

      {/* First Grid Section */}
      <section className="mx-6 md:mx-10 mt-16 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
          {assets.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] lg:aspect-auto lg:min-h-[420px] xl:min-h-[520px] cursor-pointer"
              onClick={() => router.push(`/detail/${item.id}`)}
            >
              <img
                src={item.image_url}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={item.title}
              />
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-primary text-sm font-medium tracking-widest uppercase">
                    {item.subtitle}
                  </h3>
                  <h2 className="text-white text-2xl md:text-3xl font-semibold mt-3 leading-tight">
                    {item.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-950 py-16 md:py-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-6xl font-bold max-w-3xl leading-tight">
            Interested in working on a collection?
          </h2>
          <button className="mt-10 w-full sm:w-auto uppercase bg-white text-black px-10 py-4 text-sm font-medium tracking-widest hover:bg-gray-200 transition duration-300">
            Inquire for projects
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;