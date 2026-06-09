"use client";
import { useState, useMemo } from "react";
import HeroSection from "@/widgets/hero/HeroSection";
import ConfettiEffect from "@/widgets/confetti/ConfettiEffect";
import GalleryGrid from "@/features/graduates/components/GalleryGrid";
import UploadModal from "@/features/graduates/components/UploadModal";
import { useGraduates } from "@/features/graduates/hooks/useGraduates";

export default function Home() {
  const { graduates, isLoading, mutate } = useGraduates();
  const [showUpload, setShowUpload] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return graduates;
    const q = search.toLowerCase();
    return graduates.filter((g) => g.name.toLowerCase().includes(q));
  }, [graduates, search]);

  return (
    <main className="min-h-screen bg-[#1e293b]">
      <ConfettiEffect trigger={true} />
      <HeroSection graduateCount={graduates.length} onUploadClick={() => setShowUpload(true)} />

      {/* SVG Wave Divider */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path
            d="M0,40 C360,100 1080,-20 1440,40 L1440,0 L0,0 Z"
            fill="#1e293b"
            opacity="0.3"
          />
          <path
            d="M0,50 C360,10 1080,90 1440,50 L1440,0 L0,0 Z"
            fill="#fefce8"
          />
        </svg>
      </div>

      <section className="bg-[#fefce8] px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pt-8">
            <input type="text" placeholder="Buscar por nombre..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md mx-auto block px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all" />
          </div>
          <GalleryGrid graduates={filtered} isLoading={isLoading} />
        </div>
      </section>

      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800 bg-[#1e293b]">
        <p>Generacion 2026 — Todos los derechos reservados</p>
      </footer>

      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} onSuccess={() => { mutate(); }} />
    </main>
  );
}
