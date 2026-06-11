"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Particles from "@tsparticles/react";

interface HeroSectionProps { graduateCount: number; onUploadClick: () => void; }

const titleText = "Generacion 2026";
const letters = titleText.split("");

export default function HeroSection({ graduateCount, onUploadClick }: HeroSectionProps) {
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.4 }, colors: ["#d4af37", "#f0d060", "#ffffff"] });
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background image with navy overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1920&q=80)" }}
      />
      <div className="absolute inset-0 bg-[#0f172a]/65" />

      {/* Particles */}
      <Particles id="hero-particles" className="absolute inset-0 pointer-events-none"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 25, density: { enable: true } },
            color: { value: "#d4af37" },
            shape: { type: "circle" },
            opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 0.5 } },
            size: { value: { min: 1, max: 3 }, animation: { enable: true, speed: 1 } },
            move: { enable: true, speed: 0.5, direction: "none", random: true, outModes: { default: "bounce" } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "attract" }, resize: { enable: true } },
            modes: { attract: { distance: 200, duration: 0.4, factor: 1 } },
          },
          detectRetina: true,
        }}
      />

      {/* Title with letter-by-letter animation */}
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="font-serif text-5xl md:text-7xl text-[#d4af37] mb-4 leading-tight inline-flex flex-wrap justify-center gap-x-2">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: "easeOut" }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          ))}
        </h1>

        <motion.p className="text-gray-300 text-lg md:text-xl mb-2"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          Instituto de Estudios Superiores
        </motion.p>

        <motion.p key={graduateCount} className="text-[#f0d060] text-sm mt-2 mb-8"
          initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          {graduateCount} Graduado{graduateCount !== 1 ? "s" : ""}
        </motion.p>

        <motion.button onClick={onUploadClick}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] text-[#0f172a] font-semibold text-lg rounded-xl hover:bg-[#f0d060] transition-all duration-300 shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          📸 Subir mi foto
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-[#d4af37]/60"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent" />
    </section>
  );
}
