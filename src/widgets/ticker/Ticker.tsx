"use client";
import { useGraduates } from "@/features/graduates/hooks/useGraduates";

export default function Ticker() {
  const { graduates } = useGraduates();

  const names = graduates.length > 0
    ? graduates.map(g => g.name)
    : ["Unete a la generacion 2026"];

  const items = [...names, ...names, ...names];

  return (
    <div className="w-full bg-[#0a0a0a] border-y border-[#d4af37]/10 overflow-hidden py-3">
      <div className="flex" style={{ animation: "tickerScroll 40s linear infinite", width: "max-content" }}>
        {items.map((name, i) => (
          <span key={i} className="text-[#d4af37]/80 text-sm font-medium whitespace-nowrap mx-8 tracking-wide uppercase">
            {name}
            <span className="ml-6 text-[#d4af37]/40">✦</span>
          </span>
        ))}
      </div>
      <style>{String.raw`@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}
