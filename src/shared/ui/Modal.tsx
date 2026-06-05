"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface ModalProps { isOpen: boolean; onClose: () => void; children: React.ReactNode; }
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) { document.addEventListener("keydown", h); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [isOpen, onClose]);
  return (
    <AnimatePresence>
      {isOpen && <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.div className="relative z-10 w-full max-w-lg bg-[#0f172a] rounded-2xl border border-gray-800 shadow-2xl"
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: "spring", duration: 0.4 }}>
          {children}
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}
