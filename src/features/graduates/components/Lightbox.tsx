"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps { name: string; photoUrl: string; onClose: () => void; onNext?: () => void; onPrev?: () => void; }

export default function Lightbox({ name, photoUrl, onClose, onNext, onPrev }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080d14]/95 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        {onPrev && <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#d4af37] text-4xl z-10 transition-colors">‹</button>}
        {onNext && <button onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#d4af37] text-4xl z-10 transition-colors">›</button>}
        <motion.div className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}>
          <img src={photoUrl} alt={name} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl" />
          <p className="mt-4 text-[#d4af37] font-serif text-xl">{name}</p>
        </motion.div>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10 transition-colors">✕</button>
      </motion.div>
    </AnimatePresence>
  );
}
