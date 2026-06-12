"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GraduateCard from "./GraduateCard";
import Lightbox from "./Lightbox";
import { Graduate } from "../types";

interface GalleryGridProps { graduates: Graduate[]; isLoading?: boolean; onUploadClick?: () => void; }

function SkeletonCard() {
  return (
    <div className="w-full aspect-[3/4] overflow-hidden"
      style={{ borderRadius: "50% 50% 0 0 / 30% 30% 0 0", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.08)" }}>
      <div className="w-full h-full bg-gradient-to-b from-transparent via-[#1e293b]/20 to-[#1e293b] animate-pulse" />
    </div>
  );
}

function EmptyState({ onUploadClick }: { onUploadClick?: () => void }) {
  return (
    <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.span className="text-8xl block mb-8"
        animate={{ y: [0, -10, 0], rotate: [0, -3, 3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🎓</motion.span>
      <h3 className="text-3xl font-serif text-[#d4af37] mb-3">Se el primero de tu generacion</h3>
      <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">Tu foto merece estar aqui. Compartela con todos y se parte de este momento historico.</p>
      {onUploadClick && (
        <motion.button onClick={onUploadClick}
          className="px-10 py-4 bg-gradient-to-r from-[#d4af37] to-[#f0d060] text-[#0f172a] font-bold rounded-xl shadow-lg shadow-[#d4af37]/25 hover:shadow-[#d4af37]/50 hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>📸 Subir mi foto</motion.button>
      )}
    </motion.div>
  );
}

function getFirstLetters(graduates: Graduate[]): string[] {
  const letters = new Set<string>();
  graduates.forEach(g => { const first = g.name.charAt(0).toUpperCase(); if (/[A-Z]/.test(first)) letters.add(first); });
  return [...letters].sort().slice(0, 8);
}

export default function GalleryGrid({ graduates, isLoading, onUploadClick }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filterLetter, setFilterLetter] = useState<string | null>(null);
  const close = () => setLightboxIndex(null);
  const goNext = () => { if (lightboxIndex !== null && lightboxIndex < graduates.length - 1) setLightboxIndex(lightboxIndex + 1); };
  const goPrev = () => { if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1); };
  const letters = useMemo(() => getFirstLetters(graduates), [graduates]);

  const filtered = useMemo(() => {
    if (!filterLetter) return graduates;
    return graduates.filter(g => g.name.charAt(0).toUpperCase() === filterLetter);
  }, [graduates, filterLetter]);

  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="break-inside-avoid"><SkeletonCard /></div>
        ))}
      </div>
    );
  }

  if (graduates.length === 0) return <EmptyState onUploadClick={onUploadClick} />;

  return (
    <>
      {letters.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => setFilterLetter(null)}
            className={"px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 " + (!filterLetter ? "bg-[#d4af37] text-[#0f172a]" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white")}>Todos</button>
          {letters.map(l => (
            <button key={l} onClick={() => setFilterLetter(l)}
              className={"w-9 h-9 rounded-full text-xs font-bold transition-all duration-200 " + (filterLetter === l ? "bg-[#d4af37] text-[#0f172a] scale-110 shadow-lg shadow-[#d4af37]/30" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white")}>{l}</button>
          ))}
        </div>
      )}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Ningun graduado empieza con {filterLetter}</p>
      ) : (
        <p className="text-center text-gray-600 text-xs mb-6">{filtered.length} graduado{filtered.length !== 1 ? "s" : ""}</p>
      )}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        <AnimatePresence>
          {filtered.map((g, i) => (
            <motion.div key={g.id} layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.35 }} className="break-inside-avoid">
              <GraduateCard name={g.name} photoUrl={g.photo_url} number={i + 1} onClick={() => setLightboxIndex(i)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {lightboxIndex !== null && graduates[lightboxIndex] && (
        <Lightbox name={graduates[lightboxIndex].name} photoUrl={graduates[lightboxIndex].photo_url}
          note={graduates[lightboxIndex].note} submittedBy={graduates[lightboxIndex].submitted_by}
          onClose={close} onNext={lightboxIndex < graduates.length - 1 ? goNext : undefined}
          onPrev={lightboxIndex > 0 ? goPrev : undefined} />
      )}
    </>
  );
}
