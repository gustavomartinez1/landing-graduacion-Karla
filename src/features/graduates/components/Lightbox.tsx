"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  name: string;
  photoUrl: string;
  note?: string;
  submittedBy?: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function Lightbox({ name, photoUrl, note, submittedBy, onClose, onNext, onPrev }: LightboxProps) {
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
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ background: "rgba(8,13,20,0.95)" }}>
        
        {/* Nav arrows */}
        {onPrev && <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#d4af37] text-3xl md:text-5xl z-20 transition-colors">‹</button>}
        {onNext && <button onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#d4af37] text-3xl md:text-5xl z-20 transition-colors">›</button>}

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-3xl z-20 transition-colors">✕</button>

        {/* Main content - Instagram style */}
        <motion.div className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row rounded-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{ background: "rgba(15,23,42,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(212,175,55,0.15)" }}>

          {/* Left: Photo */}
          <div className="md:w-[65%] flex items-center justify-center bg-black/40 p-2">
            <img src={photoUrl} alt={name}
              className="w-full h-auto max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg"
              style={{ aspectRatio: "3/4", objectFit: "cover" }} />
          </div>

          {/* Right: Info panel */}
          <div className="md:w-[35%] p-6 flex flex-col justify-start overflow-y-auto">
            {/* Name */}
            <h2 className="font-serif text-2xl md:text-3xl text-[#d4af37] mb-1">{name}</h2>
            
            {/* Submitted by */}
            {submittedBy && (
              <p className="text-gray-400 text-sm mb-4">
                Subido por <span className="text-white/80">{submittedBy}</span>
              </p>
            )}

            {/* Divider */}
            {note && (
              <>
                <div className="w-full h-px bg-[#d4af37]/20 mb-4" />
                {/* Note */}
                <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap italic">
                  "{note}"
                </p>
              </>
            )}

            {/* If no note */}
            {!note && (
              <p className="text-gray-500 text-sm mt-4 italic">Sin nota</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
