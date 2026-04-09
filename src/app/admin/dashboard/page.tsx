'use client';

import { motion } from 'motion/react';
import { Plus, Edit2, ArrowRight } from 'lucide-react';

const recentProjects = [
  {
    id: 1,
    title: 'Obsidian Peaks: Volume IV',
    subtitle: 'Uploaded 2 days ago • 24 Photographs',
    status: 'Published',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANa-xRKLbM3Y3rAvK-i7jU2U_t0g1E5u4eSeTdXhZs6vjLMxsBRTwdANpA0AXyyswXM_nirPVjr9e8u5iSBDCNbSq2I0G9vxlXRRiaPuaxZdOK-Igkb_EQlrVd5JpCbUfCJ2e7S_K4-kp34rB-YN8ngeREf0z23G0OXGoxCnlRXwJvwQJ094fasIkKhA2hxRanZRZ3BrrnZP0LkTo2HWZeb9Timv6OQUm_mO2mf_6Z04E6TyS1yegT2mJLq5EyvVrtbZREbNERGARg',
    large: true
  },
  {
    id: 2,
    title: 'Urban Geometry',
    subtitle: 'Edited 4 hours ago',
    status: 'Draft',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzedEMUVFqMwetPsDUQkB9OxKIsUVEtvcnkDs6iBVw9UvWT-9t8XflLbVSJfpam8PgdkiQzTiBckXiqE502dDd4wksWEqm148L7PDZ-YyKa-5h5NrRj-2_IzPVfA94Bc8QQtRagiy3Xkd3CNySS2Xh15TZK8Pu2jmU4lss1YYpHJ1sJQTyM7XkjhfPyv6zpQj8-EVxGB8WpSv3L6CZC7s7mBh0-YE7kOHvR9djYh0gyF--FcJxXxowZR7b0EGXMtn4x8NzNZ3EwER1',
    large: false
  },
  {
    id: 3,
    title: 'Celestial Dialogue',
    subtitle: 'Published last week',
    status: 'Published',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHaDF3iDv-5pynJK6JR0w39yxqNC6_dHZqgWePPukv2sB-2zBf6dB_qSqGpuGPjr3elP0XXmtywJlUeuukT-mGz-Kcyit7R61vzCowtqktFMXdik_sTmgVLVPjlJorsD3m6Wbwv89oXXH_tCDTDY9C6bxcjDmIWusjgUhAbygKjIrytIp_hOUwRE-ultO-jlrXUdru8gyAswdIqc-wiGHuACFDxy002k0vHf1WvMoWvc1jKHO7pQV1bQ35zMsHSCqZ7vEgzlOhgY5I',
    large: false
  }
];

export default function Dashboard() {
  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-16 flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-tertiary mb-4 block">Overview / Alex Rivera</span>
          <h2 className="text-5xl font-headline font-extrabold tracking-tight text-on-surface">Welcome Back, Alex</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-tertiary text-[#353025] px-6 py-3 rounded-lg font-headline font-bold text-sm tracking-tight flex items-center gap-2 shadow-[0_0_20px_rgba(206,197,182,0.15)]"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </motion.button>
      </header>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-headline font-bold text-on-surface tracking-tight">Recent Projects</h3>
          <button className="text-[10px] uppercase tracking-[0.15em] text-tertiary hover:text-on-surface transition-colors">View All Archive</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Large Project */}
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img 
                src={recentProjects[0].image} 
                alt={recentProjects[0].title}
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-between items-end">
                <div>
                  <span className="bg-tertiary text-[#353025] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2 inline-block">
                    {recentProjects[0].status}
                  </span>
                  <h4 className="text-2xl font-headline font-bold text-white tracking-tight">{recentProjects[0].title}</h4>
                  <p className="text-xs text-neutral-400 mt-1">{recentProjects[0].subtitle}</p>
                </div>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-colors">
                  <Edit2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Side Projects */}
          <div className="md:col-span-4 flex flex-col gap-8">
            {recentProjects.slice(1).map((project) => (
              <div key={project.id} className="group relative overflow-hidden">
                <div className="aspect-[4/3] w-full overflow-hidden bg-surface-container-lowest">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`
                    text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded backdrop-blur-md
                    ${project.status === 'Published' ? 'bg-tertiary text-[#353025]' : 'bg-surface-container-highest/80 text-white'}
                  `}>
                    {project.status}
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-headline font-bold text-on-surface tracking-tight">{project.title}</h4>
                  <p className="text-xs text-neutral-500 mt-1">{project.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="bg-surface-container-lowest p-12 border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-headline font-extrabold text-on-surface tracking-tighter mb-2 italic">Ready to curate the next collection?</h3>
              <p className="text-neutral-500 max-w-lg">Drag and drop your high-resolution files to start a new journey. The Nocturnal Gallery platform optimizes for depth and contrast automatically.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-surface-container-highest text-on-surface font-headline font-bold text-xs uppercase tracking-[0.2em] hover:bg-surface-bright transition-colors">Manage All</button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-tertiary text-[#353025] font-headline font-bold text-xs uppercase tracking-[0.2em] shadow-[0_10px_40px_-10px_rgba(206,197,182,0.4)]"
              >
                Upload Files
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
