"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  // { name: 'Journal', href: '/journal' },
  { name: 'Price', href: '/price' },
  { name: 'Contact', href: '/contact' },
];

type ClassNameValue = string | false | null | undefined;

function cn(...classes: ClassNameValue[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 py-4 md:py-8",
      isScrolled || isMenuOpen
        ? "bg-neutral-950/80 backdrop-blur-xl py-3 md:py-6"
        : "bg-transparent"
    )}>
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-16 w-full max-w-screen-2xl mx-auto">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3 text-2xl font-bold tracking-tighter text-neutral-100 uppercase"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-black flex items-center justify-center">
            <img 
              src="/Images/image.png" 
              alt="MR Photography Logo" 
              className="w-full h-full object-contain transform scale-[1.2]" 
            />
          </div>
          MR Photography
        </Link>
        
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-headline tracking-tight text-sm uppercase transition-colors duration-500",
                pathname === link.href 
                  ? "text-cyan-200 border-b border-cyan-200 pb-1 font-semibold" 
                  : "font-light text-neutral-400 hover:text-neutral-100"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="md:hidden text-white/70 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {isMenuOpen ? (
        <div className="md:hidden px-4 sm:px-6 md:px-16 w-full max-w-screen-2xl mx-auto">
          <div className="border-t border-white/10 pt-6 pb-4 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "font-headline tracking-tight text-sm uppercase transition-colors duration-500",
                  pathname === link.href
                    ? "text-cyan-200 font-semibold"
                    : "font-light text-neutral-400 hover:text-neutral-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
