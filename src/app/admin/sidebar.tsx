"use client";

import { LayoutGrid, Camera, Images, BookOpen, LayoutTemplate, Settings, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useAdmin } from './AdminContext';

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', path: '/admin' },
  { icon: Camera, label: 'Add New Project', path: '/admin/add-project' },
  { icon: Images, label: 'Manage Portfolio', path: '/admin/manage-portfolio' },
  { icon: BookOpen, label: 'Journal', path: '/admin/journal' },
  { icon: LayoutTemplate, label: 'Website Layout', path: '/admin/website-layout' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

type SidebarProps = {
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
};

export default function Sidebar({ variant = 'desktop', onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { profile } = useAdmin();
  const isDesktop = variant === 'desktop';
  const asideClassName = isDesktop
    ? 'fixed left-0 top-0 h-screen w-64 bg-[#1B1B1B] border-r border-white/5 hidden md:flex flex-col py-8 z-30'
    : 'fixed left-0 top-0 h-screen w-64 bg-[#1B1B1B] border-r border-white/5 flex flex-col py-8 z-50';

  return (
    <aside className={asideClassName}>
      <div className="px-8 mb-12">
        <h1 className="text-xl font-headline font-extrabold tracking-tight text-tertiary uppercase">The Curator</h1>
        <p className="text-[10px] text-on-surface-variant tracking-[0.2em] uppercase mt-1 opacity-60">Gallery Administrator</p>
      </div>

      <nav className="flex-1 flex flex-col gap-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/admin' && pathname?.startsWith(item.path));
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={onNavigate}
              className={`
                group flex items-center gap-x-4 py-3.5 px-8 transition-all duration-300 relative
                ${isActive
                  ? 'text-[#00D8A1] bg-[#00D8A1]/[0.03]'
                  : 'text-on-surface-variant/50 hover:bg-[#00D8A1]/[0.02] hover:text-[#00D8A1]/80'}
              `}
            >
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#00D8A1]" />
              )}
              <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] uppercase tracking-[0.15em] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-8 mt-auto pt-6 flex flex-col gap-4">
        
        
        <div className="flex flex-col gap-6 pb-4">
          <Link href="/admin/settings" onClick={onNavigate} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black flex-shrink-0 transition-transform group-hover:scale-105">
              <img src={profile.avatar} alt="Admin" className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-headline font-bold uppercase tracking-[0.15em] text-on-surface group-hover:text-primary transition-colors line-clamp-1">{profile.name}</span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-on-surface-variant/60 mt-0.5 line-clamp-1">Chief Curator</span>
            </div>
          </Link>
          
          <button className="flex items-center gap-x-4 text-on-surface-variant/50 hover:text-on-surface transition-colors group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}


