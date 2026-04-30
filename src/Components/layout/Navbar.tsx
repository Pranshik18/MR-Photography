"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export type Page = "PORTFOLIO" | "RECENT_WORK" | "ABOUT" | "FAQ" | "REVIEWS" | "PRICE" | "CONTACT" | "HOME";

interface NavbarProps {
  setPage?: (page: Page) => void;
}

const NAV_LINKS: { label: string; path: string; value: Page }[] = [
  { label: "Portfolios", path: "/portfolio", value: "PORTFOLIO" },
  { label: "Recent Work", path: "/recentwork", value: "RECENT_WORK" },
  { label: "About Us", path: "/about", value: "ABOUT" },
  { label: "FAQ", path: "/faq", value: "FAQ" },
  { label: "Reviews", path: "/review", value: "REVIEWS" },
  { label: "Pricing", path: "/price", value: "PRICE" },
  { label: "Contact", path: "/contact", value: "CONTACT" },
];

export const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const activePage = NAV_LINKS.find(link => 
    link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)
  )?.value || "HOME";

  const handleNavClick = (path: string, page: Page) => {
    if (setPage) setPage(page);
    router.push(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Navbar Card */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[80] pointer-events-none">
        <div 
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto cursor-pointer bg-white rounded-full md:rounded-[40px] px-2 py-3.5 md:px-2.5 md:py-5 flex flex-col items-center gap-2 md:gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 group"
        >
          <div className="transition-transform group-hover:scale-110">
            <img 
              src="/Images/image-round.png" 
              alt="MR Photography Logo" 
              className="w-8 h-8 md:w-11 md:h-11 object-contain"
            />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="w-4 md:w-6 h-[1.5px] md:h-[2px] bg-black/80 transition-all group-hover:w-6 md:group-hover:w-8 group-hover:bg-black rounded-full" />
            <div className="w-4 md:w-6 h-[1.5px] md:h-[2px] bg-black/80 transition-all group-hover:w-6 md:group-hover:w-8 group-hover:bg-black rounded-full" />
          </div>
        </div>
      </div>


    

      {/* Side Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-sm"
            />

            {/* Right Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[100] shadow-2xl flex flex-col p-12 overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-10 right-10 p-2 hover:rotate-90 transition-transform duration-300"
              >
                <X size={32} strokeWidth={1} />
              </button>

              {/* Logo Section */}
              <div 
                onClick={() => handleNavClick("/", "HOME")}
                className="flex flex-col items-center mt-6 mb-10 cursor-pointer group/logo"
              >
                <div className="w-32 h-auto mb-4 flex items-center justify-center transition-transform duration-500 group-hover/logo:scale-110">
                   <img 
                    src="/Images/image.png" 
                    alt="MR Photography Logo" 
                    className="w-full h-auto object-contain"
                  />
                </div>
                <h2 className="text-xl font-black tracking-[0.7em] uppercase text-center leading-none text-black transition-colors duration-300 group-hover/logo:text-gray-600">
                  MR PHOTOGRAPHY
                </h2>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-3 mb-auto">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.path, link.value)}
                    className={`text-[15px] uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:opacity-100 py-1
                      ${activePage === link.value ? 'text-black opacity-100 scale-110' : 'text-gray-500 opacity-80 hover:opacity-100 hover:text-black hover:scale-105'}`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Search Section */}
              <div className="mt-20 pt-10 border-t border-gray-300 border-opacity-30">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search our site..." 
                    className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 border-opacity-30 text-[15px] tracking-widest uppercase font-bold focus:outline-none focus:border-black transition-colors"
                  />
                  <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-black/50 group-hover:text-black transition-colors" />
                </div>
                <div className="flex flex-col items-center gap-6 mt-12">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">Social Networks</span>
                  <div className="flex justify-center gap-8">
                    <a 
                      href="https://www.instagram.com/mrphotography0001/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[12px] uppercase tracking-[0.2em] font-bold text-black hover:text-gray-500 transition-colors"
                    >
                      Instagram
                    </a>
                    <a 
                      href="https://www.facebook.com/Shivam.Sharma.4474/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[12px] uppercase tracking-[0.2em] font-bold text-black hover:text-gray-500 transition-colors"
                    >
                      Facebook
                    </a>
                    <a 
                      href="https://www.justdial.com/Palampur/M-R--Photography-Rajpur/9999P1892-1892-191231215810-N7I3_BZDET?via=scode" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[12px] uppercase tracking-[0.2em] font-bold text-black hover:text-gray-500 transition-colors"
                    >
                      Justdial
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};



