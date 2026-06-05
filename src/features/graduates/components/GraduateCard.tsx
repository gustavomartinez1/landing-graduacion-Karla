"use client";
import { motion } from "framer-motion";

interface GraduateCardProps { name: string; photoUrl: string; onClick: () => void; }

export default function GraduateCard({ name, photoUrl, onClick }: GraduateCardProps) {
  return (
    <motion.button onClick={onClick}
      className="group relative w-full aspect-[3/4] rounded-[50%_50%_0_0_/_30%_30%_0_0] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#0f172a]"
      whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-serif text-white text-lg text-center leading-tight drop-shadow-lg">{name}</h3>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-[#d4af37]/50 ring-inset" />
    </motion.button>
  );
}
