import Link from 'next/link';
import { Camera, MapPin } from 'lucide-react';

const exhibitions = [
  { name: "The Silence of Cities", location: "Lisbon, 2022" },
  { name: "Light & Brutalism", location: "Berlin, 2021" },
  { name: "Mono-No-Aware", location: "Tokyo, 2019" }
];

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-end pb-24 px-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKI-7rLCEl7oSjeDt7kgD7tUuDO5EkMpYk0u5eQxiYzaQSXyepOpaSETMmqYVOTNKOrgxp6lTruXuqOjE005AGmAbL7_sPd_ZdFqBViIwnV35qz23pZblYoXNAqQEeMxSDBz59kSKd1lP3Nq6AFWEsDbF2MVK5Gxx4i-VP98sFFWxzV8oVriXkR6esZciLiwvpDF_8FZCvdqUxNskgs-H_riZ5DtBBBkwXZr-xqj0MIfE8TGZH6_kNT9it2ZiVTTFw3UTZFHAyri5r" 
            alt="Shivam Sharma Portrait" 
            className="w-full h-full object-cover filter grayscale brightness-75 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block opacity-80">The Digital Curator</span>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface leading-none">
            SHIVAM <br/> SHARMA
          </h1>
          <p className="mt-8 font-body text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed">
            Capturing the silence between moments. A dedicated observer of light, shadow, and the human condition through a minimalist lens.
          </p>
        </div>
      </section>

      {/* Deep Storytelling Section */}
      <section className="py-32 px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            {/* Column Left: Large Narrative Title */}
            <div className="md:col-span-5 sticky top-32 h-fit">
              <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-on-surface leading-[1.1]">
                The Mind <br/> Behind <br/> <span className="text-primary italic">The Lens.</span>
              </h2>
              <div className="mt-12 h-px w-24 bg-primary/30"></div>
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <MapPin size={14} />
                  <span className="font-body text-[10px] tracking-widest uppercase">Based in Madrid, Spain</span>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <Camera size={14} />
                  <span className="font-body text-[10px] tracking-widest uppercase">Digital & Film Mediums</span>
                </div>
              </div>
            </div>

            {/* Column Right: Narrative Copy & Supporting Imagery */}
            <div className="md:col-span-7 flex flex-col gap-32">
              <div className="max-w-none">
                <p className="font-body text-xl md:text-2xl leading-relaxed text-on-surface/90 font-light">
                  <span className="text-5xl font-headline mr-3 float-left">P</span>
                  hotography is not merely a method of documentation; it is a philosophy of observation. To look is common, but to truly see requires a stillness that the modern world often rejects.
                </p>
                <p className="mt-8 font-body text-lg leading-relaxed text-on-surface-variant">
                  My journey began in the darkrooms of a forgotten street in Lisbon, where I learned that the absence of light is just as vital as its presence. Shadow provides the architecture; light provides the soul. I have spent the last decade chasing the &quot;blue hour&quot; and the way cityscapes transform into abstract paintings of steel and glass when the sun dips below the horizon.
                </p>
              </div>

              {/* Interspersed Photo 1: Textures */}
              <div className="grid grid-cols-10 items-center">
                <div className="col-span-10 md:col-span-8 bg-surface-container-low p-2">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq9GP7C4I0u3Xew88HGlhjPPekcxV7ZhplgkQZcN0EHeP1lZ_Q7dCSek60F1IJI6pSlu2HeoqP1oAqZy4coKpiT5C8XHYY0F1GXP1xjYM-g7BJyPSkEvH4SBBGFrRcXnTwT019qP6yQNtrb0CO1By51P4nVKU4af4RvBUYujEcZtx3eqlzoVf4s2xHrds-B_7eakOIo0Mao9y2XZKRdPA9ovl1pEtcjteDazq3n_vfmg2isPuHbWVcAMVSBDBgj_m4qspHCqH-RRJj" 
                    alt="Vintage Lens" 
                    className="w-full aspect-[4/5] object-cover filter grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden md:block col-span-2 -ml-12 z-10">
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-primary rotate-90 origin-left whitespace-nowrap opacity-50">Equipment Study No. 04</p>
                </div>
              </div>

              <div className="max-w-none">
                <h3 className="font-headline text-3xl font-bold mb-6 text-on-surface tracking-tight">The Intention</h3>
                <p className="font-body text-lg leading-relaxed text-on-surface-variant">
                  Every shutter click is an intentional choice. I don&apos;t believe in &quot;spraying and praying.&quot; I wait for the alignment—the geometric perfection of a shadow hitting a corner, the fleeting emotion in a stranger&apos;s eye, the way grain adds a tactile memory to a digital frame.
                </p>
                <p className="mt-6 font-body text-lg leading-relaxed text-on-surface-variant">
                  My work is deeply inspired by cinematic noir and brutalist architecture. I look for the structure within chaos. Whether I am shooting a high-fashion editorial or a quiet landscape, the goal remains the same: to curate an emotional atmosphere that lingers long after the viewer has moved on.
                </p>
              </div>

              {/* Interspersed Photo 2: BTS/Atmospheric */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUGiZwx6W9O0EGYy9DU8xZwv-vOUCyiBJlmPtRh7gsW_KEyr95Ww26ipWRrwWPH0bqbzh4qb4Ajwy8XKcTYwxgQ7YcXHNLkceFryygu0P3r-ueLWKAinTJfIZtcVY8c2Fmx1V-Kt-uFBUrg8qz72HVcWoyHJRdk_Dttw7kq4Xt_vyhvWhRaBp5dphZmlOBY10T53_3SkxuxaFKJuGJXOMVPb78KkjGNiKVzNuxSNPpMlGYHCz_sZPcBboZnCJePyZLlk9RNTE4ZJdZ" 
                    alt="Silhouette" 
                    className="w-full aspect-square object-cover filter grayscale brightness-50"
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-body text-xs italic text-on-surface-variant/60">&quot;The best stories are told in the dark.&quot;</p>
                </div>
                <div className="pt-12">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXmVmMTeXHAIU55_t-3EtYxnqErkmY6xkMYap7xeDplQhDX47Ei906SK9yMwfDCQN003jdEcLW1PksHgSLKN73HBALsebkz6OmPnwomG8pUyHAHtXfnuoWnnjtNrEYLPm0E3ebzi7c5MTl_rFZ6fTJWXMFesn9tzyTGDoPmYbhzkUZUR88spaZSOrJ8uCX9PPA5tl-rRnJ-GDGDEAs2WDX-g3wF7ah1HmTfGckVaAPyWIHXIMxQIxfShbTpmsotB6Hx9LmvJBEld9E" 
                    alt="Reflections" 
                    className="w-full aspect-[3/4] object-cover filter grayscale contrast-150"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="max-w-none pb-24">
                <p className="font-body text-lg leading-relaxed text-on-surface-variant">
                  For me, the portfolio is a living document. It is a dialogue between the viewer and the viewed. I am Shivam Sharma, and I invite you to see the world not as it is, but as it feels.
                </p>
                <div className="mt-12 flex items-center gap-6">
                  <Link href="/portfolio" className="bg-primary text-background px-8 py-4 font-body text-[10px] tracking-[0.2em] uppercase font-bold hover:scale-[1.02] transition-transform duration-500 rounded-lg">View Portfolio</Link>
                  <Link href="/contact" className="text-on-surface font-body text-[10px] tracking-[0.2em] uppercase border-b border-on-surface/20 pb-1 hover:border-primary transition-colors duration-300">Contact Me</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Exhibitions Bento Style */}
      <section className="py-32 px-12 bg-surface/50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-surface p-12 border border-white/5 flex flex-col justify-between aspect-square md:aspect-auto">
              <span className="font-headline text-4xl text-primary font-extralight tracking-tighter">12+</span>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">Years of Experience</p>
            </div>
            <div className="md:col-span-2 bg-surface p-12 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="font-headline text-2xl font-bold mb-4">Select Exhibitions</h4>
                <ul className="space-y-4">
                  {exhibitions.map((ex) => (
                    <li key={ex.name} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="font-body text-sm text-on-surface">{ex.name}</span>
                      <span className="font-body text-[9px] uppercase text-on-surface-variant">{ex.location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-primary/20 p-12 flex flex-col justify-center items-center text-center border border-primary/10">
              <Camera className="text-4xl mb-4 text-primary" size={32} />
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary">Book a Session</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
