export default function Footer() {
  return (
    <footer className="bg-black py-24 px-8 md:px-16 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex gap-12">
          <a href="#" className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-500 hover:text-cyan-200 transition-colors duration-500">Instagram</a>
          <a href="#" className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-500 hover:text-cyan-200 transition-colors duration-500">Vimeo</a>
          <a href="#" className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-500 hover:text-cyan-200 transition-colors duration-500">Mail</a>
        </div>
        <div className="text-stone-600 font-body text-[10px] tracking-[0.15em] uppercase">
          © 2024 SHIVAM SHARMA. CURATED WITH INTENTION.
        </div>
      </div>
    </footer>
  );
}
