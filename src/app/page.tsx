"use client";
import { useState, useMemo } from "react";
import HeroSection from "@/widgets/hero/HeroSection";
import ConfettiEffect from "@/widgets/confetti/ConfettiEffect";
import GalleryGrid from "@/features/graduates/components/GalleryGrid";
import UploadModal from "@/features/graduates/components/UploadModal";
import { useGraduates } from "@/features/graduates/hooks/useGraduates";

export default function Home() {
  const { graduates, mutate } = useGraduates();
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
      <section className="max-w-6xl mx-auto px-4 pb-20 -mt-8 relative z-10">
        <div className="mb-8">
          <input type="text" placeholder="Buscar por nombre..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all" />
        </div>
        <GalleryGrid graduates={filtered} />
      </section>
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800">
        <p>Generacion 2026 — Todos los derechos reservados</p>
      </footer>
      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} onSuccess={() => { mutate(); }} />
    </main>
  );
}
