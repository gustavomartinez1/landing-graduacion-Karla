"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/widgets/hero/HeroSection";
import ConfettiEffect from "@/widgets/confetti/ConfettiEffect";
import GalleryGrid from "@/features/graduates/components/GalleryGrid";
import UploadModal from "@/features/graduates/components/UploadModal";
import { useGraduates } from "@/features/graduates/hooks/useGraduates";

export default function Home() {
  const { graduates, isLoading, mutate } = useGraduates();
  const [showUpload, setShowUpload] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const searched = useMemo(() => {
    if (!search.trim()) return graduates;
    const q = search.toLowerCase();
    return graduates.filter((g) => g.name.toLowerCase().includes(q));
  }, [graduates, search]);

  const displayGraduates = search.trim() ? searched : graduates;

  return (
    <main className="min-h-screen bg-[#080d14] text-white bg-grid">
      <ConfettiEffect trigger={true} />

      {/* Navbar */}
      <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-500 " + (scrolled ? "bg-[#0f172a]/85 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-[#d4af37]/10" : "bg-transparent")}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="font-serif text-[#d4af37] text-lg tracking-wide hover:text-[#f0d060] transition-colors">✦ Grad 2026</a>
          <button onClick={() => setShowUpload(true)}
            className="text-sm text-[#d4af37] hover:text-[#f0d060] transition-colors font-medium">Subir foto</button>
        </div>
      </nav>

      <HeroSection graduateCount={graduates.length} onUploadClick={() => setShowUpload(true)} />

      {/* Wave */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-20 md:h-28">
          <path d="M0,40 C360,100 1080,-20 1440,40 L1440,0 L0,0 Z" fill="#0f172a" opacity="0.5" />
          <path d="M0,50 C360,10 1080,90 1440,50 L1440,0 L0,0 Z" fill="#080d14" />
        </svg>
      </div>

      {/* Stats */}
      <section className="bg-[#080d14] px-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-3 gap-4 py-8 px-6 rounded-2xl border border-[#d4af37]/10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)" }}>
            <div className="text-center">
              <p className="text-3xl font-serif text-[#d4af37]">{graduates.length}</p>
              <p className="text-gray-500 text-xs mt-1 tracking-wide">GRADUADOS</p>
            </div>
            <div className="text-center border-x border-[#d4af37]/10">
              <p className="text-3xl font-serif text-[#d4af37]">2026</p>
              <p className="text-gray-500 text-xs mt-1 tracking-wide">GENERACION</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif text-[#d4af37]">{graduates.filter(g => g.note).length}</p>
              <p className="text-gray-500 text-xs mt-1 tracking-wide">CON NOTAS</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-[#080d14] px-4 pb-20 pt-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-serif text-4xl md:text-5xl text-[#d4af37] mb-6 leading-tight">Nuestros Graduados</h2>
            <div className="flex items-center justify-center gap-3 text-[#d4af37]/40">
              <span className="text-lg">✦</span><span className="block w-16 h-px bg-[#d4af37]/25" />
              <span className="text-lg">✦</span><span className="block w-16 h-px bg-[#d4af37]/25" />
              <span className="text-lg">✦</span>
            </div>
            <p className="text-white/50 text-sm mt-4 tracking-wide">Comparte tu foto y se parte de la historia</p>
          </motion.div>

          {/* Search */}
          <div className="mb-10 max-w-[600px] mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]/50 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Busca a tu companero..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)", border: "1px solid rgba(212,175,55,0.25)" }}
              onFocus={(e) => { e.target.style.borderColor = "rgba(212,175,55,0.7)"; e.target.style.boxShadow = "0 0 20px rgba(212,175,55,0.15)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(212,175,55,0.25)"; e.target.style.boxShadow = "none"; }} />
          </div>

          <GalleryGrid graduates={displayGraduates} isLoading={isLoading} onUploadClick={() => setShowUpload(true)} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0e14] border-t border-[#d4af37]/10 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-serif text-[#d4af37]/50 text-lg mb-2">✦ Grad 2026 ✦</p>
          <p className="text-gray-600 text-sm">Instituto de Estudios Superiores</p>
          <p className="text-gray-700 text-xs mt-1">Generacion que dejo huella</p>
        </div>
      </footer>

      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} onSuccess={() => { mutate(); }} />

      {/* Mobile FAB */}
      <motion.button onClick={() => setShowUpload(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d060] text-[#0f172a] shadow-lg shadow-[#d4af37]/30 flex items-center justify-center text-2xl sm:hidden"
        whileTap={{ scale: 0.9 }} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>📸</motion.button>
    </main>
  );
}
