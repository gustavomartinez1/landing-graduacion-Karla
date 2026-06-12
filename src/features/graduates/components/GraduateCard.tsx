"use client";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

interface GraduateCardProps { name: string; photoUrl: string; number: number; onClick: () => void; }

export default function GraduateCard({ name, photoUrl, number, onClick }: GraduateCardProps) {
  return (
    <Tilt glareEnable glareMaxOpacity={0.2} glareColor="#d4af37" glarePosition="all"
      tiltMaxAngleX={7} tiltMaxAngleY={7} scale={1.03} transitionSpeed={350} className="w-full cursor-pointer">
      <motion.div onClick={onClick}
        className="group relative w-full aspect-[3/4] overflow-hidden gold-shine focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        style={{
          borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(212,175,55,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 40px rgba(212,175,55,0.25), 0 12px 40px rgba(0,0,0,0.6)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}>
        {/* Gold border on hover */}
        <div className="absolute inset-0 rounded-[50%_50%_0_0_/_30%_30%_0_0] transition-all duration-500 opacity-0 group-hover:opacity-100 z-10 pointer-events-none"
          style={{ border: "2px solid rgba(212,175,55,0.6)", boxShadow: "inset 0 0 30px rgba(212,175,55,0.1)" }} />
        {/* Badge with gradient */}
        <div className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d060] flex items-center justify-center shadow-lg shadow-[#d4af37]/30">
          <span className="text-[10px] font-bold text-[#0f172a]">#{String(number).padStart(3, "0")}</span>
        </div>
        {/* Photo - zooms on hover */}
        <div className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: "url(" + photoUrl + ")" }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/5" />
        {/* Name + CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-all duration-300 group-hover:pb-6">
          <h3 className="font-serif text-white text-lg text-center leading-tight drop-shadow-lg transition-all duration-300 group-hover:text-xl group-hover:text-[#d4af37]">{name}</h3>
          <p className="text-[#d4af37]/0 text-xs text-center mt-1 transition-all duration-300 group-hover:text-[#d4af37]/70">View photo →</p>
        </div>
      </motion.div>
    </Tilt>
  );
}
