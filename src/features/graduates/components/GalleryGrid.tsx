"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import GraduateCard from "./GraduateCard";
import Lightbox from "./Lightbox";
import { Graduate } from "../types";

interface GalleryGridProps { graduates: Graduate[]; isLoading?: boolean; }

function SkeletonCard() {
  return (
    <div className="w-full aspect-[3/4] rounded-[50%_50%_0_0_/_30%_30%_0_0] overflow-hidden bg-[#1e293b] animate-pulse">
      <div className="w-full h-full bg-gradient-to-b from-transparent via-[#334155]/50 to-[#334155] animate-pulse" />
    </div>
  );
}

export default function GalleryGrid({ graduates, isLoading }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const close = () => setLightboxIndex(null);
  const goNext = () => { if (lightboxIndex !== null && lightboxIndex < graduates.length - 1) setLightboxIndex(lightboxIndex + 1); };
  const goPrev = () => { if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1); };

  // Skeleton mientras carga
  if (isLoading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="break-inside-avoid">
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  if (graduates.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl font-serif text-[#d4af37] mb-2">Aun no hay fotos</p>
        <p>Se el primero en compartir tu foto de graduacion</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
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
