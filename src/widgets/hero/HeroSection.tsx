"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface HeroSectionProps { graduateCount: number; onUploadClick: () => void; }

export default function HeroSection({ graduateCount, onUploadClick }: HeroSectionProps) {
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.4 }, colors: ["#d4af37", "#f0d060", "#ffffff"] });
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#0f172a] to-[#1e293b]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 bg-[#d4af37]/30 rounded-full"
            style={{ left: Math.random() * 100 + "%", top: Math.random() * 100 + "%" }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
        ))}
      </div>
      <motion.div className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <h1 className="font-serif text-5xl md:text-7xl text-[#d4af37] mb-4 leading-tight">Generacion 2026</h1>
        <p className="text-gray-300 text-lg md:text-xl mb-2">Instituto de Estudios Superiores</p>
        <motion.p key={graduateCount} className="text-[#f0d060] text-sm mt-2 mb-8"
          initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          {graduateCount} Graduado{graduateCount !== 1 ? "s" : ""}
        </motion.p>
        <motion.button onClick={onUploadClick}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] text-[#0f172a] font-semibold text-lg rounded-xl hover:bg-[#f0d060] transition-all duration-300 shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          📸 Subir mi foto
        </motion.button>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1e293b] to-transparent" />
    </section>
  );
}
