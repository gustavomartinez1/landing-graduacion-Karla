"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import GraduateCard from "./GraduateCard";
import Lightbox from "./Lightbox";
import { Graduate } from "../types";

interface GalleryGridProps {
  graduates: Graduate[];
  isLoading?: boolean;
  onUploadClick?: () => void;
}

function SkeletonCard() {
  return (
    <div className="w-full aspect-[3/4] overflow-hidden"
      style={{ borderRadius: "50% 50% 0 0 / 30% 30% 0 0", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.1)" }}>
      <div className="w-full h-full bg-gradient-to-b from-transparent via-[#1e293b]/30 to-[#1e293b] animate-pulse" />
    </div>
  );
}

function EmptyState({ onUploadClick }: { onUploadClick?: () => void }) {
  return (
    <motion.div className="text-center py-20"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.span className="text-7xl block mb-6"
        animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        🎓
      </motion.span>
      <p className="text-2xl font-serif text-[#d4af37] mb-3">Se el primero de tu generacion</p>
      <p className="text-gray-500 mb-8">Comparte tu foto y forma parte de la historia</p>
      {onUploadClick && (
        <button onClick={onUploadClick}
          className="px-8 py-3 bg-[#d4af37] text-[#0f172a] font-semibold rounded-xl hover:bg-[#f0d060] transition-all duration-300 shadow-lg shadow-[#d4af37]/20">
          Subir mi foto 📸
        </button>
      )}
    </motion.div>
  );
}

export default function GalleryGrid({ graduates, isLoading, onUploadClick }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const close = () => setLightboxIndex(null);
  const goNext = () => { if (lightboxIndex !== null && lightboxIndex < graduates.length - 1) setLightboxIndex(lightboxIndex + 1); };
  const goPrev = () => { if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1); };

  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="break-inside-avoid"><SkeletonCard /></div>
        ))}
      </div>
    );
  }

  if (graduates.length === 0) {
    return <EmptyState onUploadClick={onUploadClick} />;
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {graduates.map((g, i) => (
          <motion.div key={g.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 1) }}
            className="break-inside-avoid">
            <GraduateCard name={g.name} photoUrl={g.photo_url} number={i + 1} onClick={() => setLightboxIndex(i)} />
          </motion.div>
        ))}
      </div>
      {lightboxIndex !== null && graduates[lightboxIndex] && (
        <Lightbox name={graduates[lightboxIndex].name} photoUrl={graduates[lightboxIndex].photo_url}
          onClose={close} onNext={lightboxIndex < graduates.length - 1 ? goNext : undefined}
          onPrev={lightboxIndex > 0 ? goPrev : undefined} />
      )}
    </>
  );
}
