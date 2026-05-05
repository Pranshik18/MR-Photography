"use client";

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Sidebar from './sidebar';
import { Menu, Search } from 'lucide-react';
import { AdminProvider, useAdmin } from './AdminContext';

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage = pathname === '/admin';

  useEffect(() => {
    if (!isMobileNavOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileNavOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileNavOpen]);

  return (
    <div className="min-h-screen film-grain admin-theme bg-surface text-on-surface">
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
          {isDashboardPage && (
            <>
              <form onSubmit={(e) => e.preventDefault()} className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search archives..."
                  className="bg-surface-container-lowest border-none text-xs px-12 py-2.5 w-48 lg:w-64 focus:ring-1 focus:ring-primary/40 text-on-surface placeholder:text-outline-variant rounded-full"
                />
              </form>

              <div className="md:hidden flex items-center">
                <form onSubmit={(e) => e.preventDefault()} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-outline pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="bg-surface-container-lowest border-none text-[10px] pl-9 pr-4 py-2 w-32 focus:ring-1 focus:ring-primary/40 text-on-surface placeholder:text-outline-variant rounded-full"
                  />
                </form>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="ml-0 md:ml-64 pt-16 md:pt-20 px-4 md:px-12">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <AdminProvider>
        {children}
      </AdminProvider>
    );
  }

  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
