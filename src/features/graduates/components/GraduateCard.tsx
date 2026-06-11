"use client";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

interface GraduateCardProps {
  name: string;
  photoUrl: string;
  number: number;
  onClick: () => void;
}

export default function GraduateCard({ name, photoUrl, number, onClick }: GraduateCardProps) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.2}
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
        className="group relative w-full aspect-[3/4] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        style={{
          borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(212,175,55,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)",
        }}
        whileHover={{
          scale: 1.04,
          boxShadow: "0 0 30px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Gold border on hover */}
        <div className="absolute inset-0 rounded-[50%_50%_0_0_/_30%_30%_0_0] transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 pointer-events-none"
          style={{ border: "2px solid rgba(212,175,55,0.6)", boxShadow: "inset 0 0 20px rgba(212,175,55,0.15)" }} />

        {/* Badge */}
        <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg">
          <span className="text-[10px] font-bold text-[#0f172a]">#{String(number).padStart(3, "0")}</span>
        </div>

        {/* Photo */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(" + photoUrl + ")" }} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className="font-serif text-white text-lg text-center leading-tight drop-shadow-lg">{name}</h3>
        </div>
      </motion.button>
    </Tilt>
  );
}
