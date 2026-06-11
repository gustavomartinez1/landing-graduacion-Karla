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

  const filtered = useMemo(() => {
    if (!search.trim()) return graduates;
    const q = search.toLowerCase();
    return graduates.filter((g) => g.name.toLowerCase().includes(q));
  }, [graduates, search]);

  return (
    <main className="min-h-screen bg-[#080d14] text-white">
      <ConfettiEffect trigger={true} />

      {/* Navbar */}
      <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 " + (scrolled ? "bg-[#0f172a]/80 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent")}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-serif text-[#d4af37] text-lg tracking-wide">✦ Grad 2026</span>
          <button onClick={() => setShowUpload(true)}
            className="text-sm text-[#d4af37] hover:text-[#f0d060] transition-colors font-medium">
            Subir foto
          </button>
        </div>
      </nav>

      <HeroSection graduateCount={graduates.length} onUploadClick={() => setShowUpload(true)} />

      {/* Wave Divider SVG - navy to #080d14 */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-20 md:h-28">
          <path d="M0,40 C360,100 1080,-20 1440,40 L1440,0 L0,0 Z" fill="#0f172a" opacity="0.5" />
          <path d="M0,50 C360,10 1080,90 1440,50 L1440,0 L0,0 Z" fill="#080d14" />
        </svg>
      </div>

      {/* Gallery section */}
      <section className="bg-[#080d14] px-4 pb-20 pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="font-serif text-4xl md:text-5xl text-[#d4af37] mb-6 leading-tight">
              Nuestros Graduados
            </h2>
            <div className="flex items-center justify-center gap-3 text-[#d4af37]/50">
              <span className="text-lg">✦</span>
              <span className="block w-16 h-px bg-[#d4af37]/30" />
              <span className="text-lg">✦</span>
              <span className="block w-16 h-px bg-[#d4af37]/30" />
              <span className="text-lg">✦</span>
            </div>
            <p className="text-white/60 text-sm mt-4 tracking-wide">
              Comparte tu foto y se parte de la historia
            </p>
          </motion.div>

          {/* Search bar */}
          <div className="mb-10 max-w-[600px] mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]/60 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Busca a tu companero..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(212,175,55,0.25)",
              }}
              onFocus={(e) => { e.target.style.borderColor = "rgba(212,175,55,0.7)"; e.target.style.boxShadow = "0 0 20px rgba(212,175,55,0.15)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(212,175,55,0.25)"; e.target.style.boxShadow = "none"; }} />
          </div>

          <GalleryGrid graduates={filtered} isLoading={isLoading} onUploadClick={() => setShowUpload(true)} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0e14] border-t border-[#d4af37]/10 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-serif text-[#d4af37]/60 text-lg mb-2">✦ Grad 2026 ✦</p>
          <p className="text-gray-500 text-sm">
            Hecho con <span className="text-red-400">&#9829;</span> por Veltrux
          </p>
          <p className="text-gray-600 text-xs mt-1">Todos los derechos reservados</p>
        </div>
      </footer>

      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} onSuccess={() => { mutate(); }} />
    </main>
  );
}
