import Link from 'next/link';
import { ArrowRight, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 mt-auto relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50"></div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-16 relative z-10">


        {/* Middle Section: Links */}
        <div className="py-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Navigation */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 mb-6">Navigation</h3>
            <ul className="flex flex-wrap gap-8">
              <li><Link href="/" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="/about" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">About</Link></li>
              <li><Link href="/portfolio" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">Portfolio</Link></li>
              <li><Link href="/price" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">Price</Link></li>
              <li><Link href="/contact" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:text-right">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600 mb-6 relative">Social media</h3>
            <ul className="flex flex-wrap md:justify-end gap-8">
              <li><a href="https://wa.me/8628092160" target="_blank" rel="noreferrer" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/mrphotography0001/" target="_blank" rel="noreferrer" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">Instagram</a></li>
              <li><a href="https://www.facebook.com/Shivam.Sharma.4474/" target="_blank" rel="noreferrer" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">Facebook</a></li>
              <li><a href="https://jsdl.in/DT-99WMBUQ2U5H" target="_blank" rel="noreferrer" className="text-xs tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors duration-300">Just Dial</a></li>

            </ul>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-700 font-body text-[9px] tracking-[0.15em] uppercase">
          <div>© {new Date().getFullYear()} MR PHOTOGRAPHY. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-stone-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-stone-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
