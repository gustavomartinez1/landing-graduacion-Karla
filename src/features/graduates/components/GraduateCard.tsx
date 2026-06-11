"use client";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

interface GraduateCardProps {
  name: string;
  photoUrl: string;
  number: number;
  onClick: () => void;
  isPlaceholder?: boolean;
}

export default function GraduateCard({ name, photoUrl, number, onClick, isPlaceholder }: GraduateCardProps) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.25}
      glareColor="#d4af37"
      glarePosition="all"
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      scale={1.02}
      transitionSpeed={400}
      className="w-full"
    >
      <motion.button
        onClick={onClick}
        className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(212,175,55,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Animated golden border on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: "conic-gradient(from 0deg, transparent, #d4af37, transparent, #d4af37, transparent)",
            animation: "rotateBorder 2s linear infinite",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "2px",
            borderRadius: "16px",
          }}
        />

        {/* Badge numerico */}
        <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#d4af37]/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
          <span className="text-[10px] font-bold text-[#0f172a]">#{String(number).padStart(3, "0")}</span>
        </div>

        {/* Foto */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${photoUrl})`, filter: isPlaceholder ? "grayscale(0.5)" : "none" }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Nombre */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className="font-serif text-white text-lg text-center leading-tight drop-shadow-lg">{name}</h3>
        </div>

        {/* Gold ring on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-[#d4af37]/60 ring-inset rounded-2xl z-10" />
      </motion.button>

      <style>{String.raw`@keyframes rotateBorder { to { transform: rotate(360deg); } }`}</style>
    </Tilt>
  );
}
