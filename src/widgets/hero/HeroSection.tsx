"use client";
import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import confetti from "canvas-confetti";
import Particles from "@tsparticles/react";

interface HeroSectionProps { graduateCount: number; onUploadClick: () => void; }

const leftPhotos = [
  "https://images.unsplash.com/photo-1627556704302-624286467c65?w=400&q=80",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&q=80",
];

const rightPhotos = [
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80",
  "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
];

// Count-up hook
function useCountUp(target: number, duration = 1.5) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    count.set(0);
    const controls = { current: 0 };
    const animate = () => {
      const start = performance.now();
      const frame = (now: number) => {
        const elapsed = (now - start) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        count.set(progress * target);
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    animate();
  }, [target]);

  return rounded;
}

function CountUp({ n }: { n: number }) {
  const count = useCountUp(n);
  return <motion.span>{count}</motion.span>;
}

export default function HeroSection({ graduateCount, onUploadClick }: HeroSectionProps) {
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.4 }, colors: ["#d4af37", "#f0d060", "#ffffff"] });
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1920&q=80)" }}
      />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.6) 100%)"
      }} />

      {/* Particles */}
      <Particles id="hero-particles" className="absolute inset-0 pointer-events-none"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 20, density: { enable: true } },
            color: { value: "#d4af37" },
            shape: { type: "circle" },
            opacity: { value: { min: 0.05, max: 0.35 } },
            size: { value: { min: 1, max: 2 } },
            move: { enable: true, speed: 0.4, direction: "none", random: true, outModes: { default: "bounce" } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "attract" } },
            modes: { attract: { distance: 200, duration: 0.4, factor: 1 } },
          },
          detectRetina: true,
        }}
      />

      {/* Left photos column - scrolling UP */}
      <div className="hidden lg:block absolute left-4 top-0 h-full w-[180px] overflow-hidden pointer-events-none">
        <div className="flex flex-col gap-4" style={{ animation: "scrollUp 20s linear infinite" }}>
          {[...leftPhotos, ...leftPhotos].map((url, i) => (
            <div key={i} className="w-full aspect-[3/4] rounded-2xl overflow-hidden opacity-40 hover:opacity-70 transition-opacity duration-300"
              style={{ backgroundImage: "url(" + url + ")", backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="absolute inset-0 bg-[#d4af37]/10 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Right photos column - scrolling DOWN */}
      <div className="hidden lg:block absolute right-4 top-0 h-full w-[180px] overflow-hidden pointer-events-none">
        <div className="flex flex-col gap-4" style={{ animation: "scrollDown 20s linear infinite" }}>
          {[...rightPhotos, ...rightPhotos].map((url, i) => (
            <div key={i} className="w-full aspect-[3/4] rounded-2xl overflow-hidden opacity-40 hover:opacity-70 transition-opacity duration-300"
              style={{ backgroundImage: "url(" + url + ")", backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="absolute inset-0 bg-[#d4af37]/10 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <motion.p className="text-[#d4af37] text-xs md:text-sm tracking-[0.4em] uppercase mb-4"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          ✦ Clase ✦
        </motion.p>

        <motion.h1 className="font-serif text-6xl md:text-8xl text-[#d4af37] mb-6 leading-[1.1]"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          Generacion 2026
        </motion.h1>

        {/* Decorative line with dots */}
        <motion.div className="flex items-center justify-center gap-3 mb-6 text-[#d4af37]/60"
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }}>
          <span className="text-lg">✦</span>
          <span className="block w-16 h-px bg-[#d4af37]/40" />
          <span className="text-lg">✦</span>
          <span className="block w-16 h-px bg-[#d4af37]/40" />
          <span className="text-lg">✦</span>
        </motion.div>

        <motion.p className="text-white/80 text-lg md:text-xl font-light mb-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          Instituto de Estudios Superiores
        </motion.p>

        <motion.p className="text-[#f0d060] text-sm mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <CountUp n={graduateCount} /> Graduado{graduateCount !== 1 ? "s" : ""}
        </motion.p>

        {/* Button with shine effect */}
        <motion.div className="relative inline-block"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <button onClick={onUploadClick}
            className="relative overflow-hidden inline-flex items-center gap-2 px-10 py-4 bg-[#d4af37] text-[#0f172a] font-semibold text-lg rounded-xl hover:bg-[#f0d060] transition-all duration-300 shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 group">
            <span className="relative z-10">📸 Subir mi foto</span>
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                width: "100%",
              }} />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-[#d4af37]/40"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080d14] to-transparent" />

      {/* Keyframes for scroll animations */}
      <style>{String.raw`@keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }`}</style>
      <style>{String.raw`@keyframes scrollDown { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }`}</style>
    </section>
  );
}
