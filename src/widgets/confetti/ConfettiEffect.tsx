"use client";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps { trigger?: boolean; }

export default function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (trigger && !hasFired.current) {
      hasFired.current = true;
      const end = Date.now() + 3000;
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ["#d4af37", "#f0d060", "#ffffff"] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ["#d4af37", "#f0d060", "#ffffff"] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [trigger]);

  useEffect(() => {
    const handler = () => {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#d4af37", "#f0d060", "#ffffff", "#0f172a"] });
    };
    window.addEventListener("upload-success", handler);
    return () => window.removeEventListener("upload-success", handler);
  }, []);

  return null;
}
