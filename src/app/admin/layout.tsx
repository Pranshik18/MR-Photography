"use client";

import type { ReactNode } from 'react';
import { useEffect, useState, FormEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Sidebar from './sidebar';
import { Menu, Search } from 'lucide-react';
import { AdminProvider } from './AdminContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/manage-portfolio?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (!isMobileNavOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileNavOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileNavOpen]);

  if (isLoginPage) {
    return (
      <AdminProvider>
        {children}
      </AdminProvider>
    );
  }

  return (
    <AdminProvider>
      <div className="min-h-screen film-grain">
        <Sidebar variant="desktop" />

        {isMobileNavOpen ? (
        <div className="md:hidden fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64">
            <Sidebar variant="mobile" onNavigate={() => setIsMobileNavOpen(false)} />
          </div>
        </div>
      ) : null}

      <header className="fixed top-0 right-0 left-0 md:left-64 h-16 md:h-20 flex justify-between items-center px-4 md:px-12 z-40 bg-background/70 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button
            type="button"
            aria-label="Open navigation"
            className="md:hidden -ml-1 p-2 text-outline hover:text-primary transition-colors"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <span className="font-headline font-black text-on-surface tracking-tighter text-base md:text-lg truncate">
            Admin Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archives..."
              className="bg-surface-container-lowest border-none text-xs px-12 py-2.5 w-64 focus:ring-1 focus:ring-primary/40 text-on-surface placeholder:text-outline-variant"
            />
          </form>

          <div className="flex items-center gap-4 md:gap-6 text-outline">
            <button type="button" onClick={() => {
               // Mobile search button could just toggle a mobile search bar or redirect to manage portfolio page directly
               router.push('/admin/manage-portfolio');
            }} className="lg:hidden hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="ml-0 md:ml-64 pt-16 md:pt-20 px-4 md:px-12">{children}</main>
      </div>
    </AdminProvider>
  );
}


