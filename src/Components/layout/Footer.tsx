"use client";

import React from 'react';
import { Page } from './Navbar';
import { useRouter } from 'next/navigation';

interface FooterProps {
  setPage?: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const router = useRouter();

  const handleNavClick = (path: string, page: Page) => {
    if (setPage) setPage(page);
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIcons = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/918628092160',
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/mrphotography0001/',
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/Shivam.Sharma.4474/',
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    },
    {
      name: 'Justdial',
      href: 'https://www.justdial.com/Palampur/M-R--Photography-Rajpur/9999P1892-1892-191231215810-N7I3_BZDET?via=scode',
      svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
    }
  ];

  return (
    <footer className="bg-white border-t border-black/5 px-6 py-20 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-8">
        
        {/* Center Column (Top on mobile) */}
        <div className="flex flex-col items-center text-center order-1 md:order-2">
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-black tracking-[0.7em] uppercase text-black mb-3 leading-tight">
              MR PHOTOGRAPHY
            </h2>
            <div className="w-16 h-[1px] bg-black/10" />
          </div>
          
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 max-w-[280px] leading-relaxed">
            International Editorial & Wedding Photography
          </p>
          
          <div className="space-y-2 mb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-600">
              Himachal & Delhi, India
            </p>
            <p className="text-[11px] uppercase tracking-[0.15em] font-medium text-gray-500">
              +91 86280 92160
            </p>
          </div>

          <div className="flex gap-4">
            {socialIcons.map((social) => (
              <a 
                key={social.name}
                href={social.href} 
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all border border-gray-100"
                title={social.name}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Separator Line for Mobile */}
        <div className="w-full h-[1px] bg-gray-100 md:hidden order-2 my-2" />

        {/* Navigation Links Container (Side-by-side on mobile) */}
        <div className="w-full md:w-auto flex justify-between md:contents order-3 px-4 md:px-0">
          {/* Left Column */}
          <div className="flex flex-col gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-gray-400 items-start md:items-start md:order-1">
            <button className="hover:text-black transition-colors" onClick={() => handleNavClick('/portfolio', 'PORTFOLIO')}>Portfolios</button>
            <button className="hover:text-black transition-colors" onClick={() => handleNavClick('/recentwork', 'RECENT_WORK')}>Recent Posts</button>
            <button className="hover:text-black transition-colors" onClick={() => handleNavClick('/portfolio', 'PORTFOLIO')}>Commercial</button>
            <button className="hover:text-black transition-colors" onClick={() => handleNavClick('/faq', 'FAQ')}>FAQ</button>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-gray-400 items-end md:items-end md:order-3">
            <button className="hover:text-black transition-colors" onClick={() => handleNavClick('/about', 'ABOUT')}>About Us</button>
            <button className="hover:text-black transition-colors" onClick={() => handleNavClick('/contact', 'CONTACT')}>Contact</button>
            <button className="hover:text-black transition-colors" onClick={() => handleNavClick('/price', 'PRICE')}>Pricing</button>
            <button className="hover:text-black transition-colors" onClick={() => handleNavClick('/review', 'REVIEWS')}>Reviews</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
