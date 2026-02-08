"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

const confettiEmojis = [
  "🌹",
  "❤️",
  "💕",
  "💗",
  "💖",
  "🌸",
  "💝",
  "🩷",
  "🎉",
  "✨",
];

export function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 100; i++) {
        newPieces.push({
          id: i,
          emoji:
            confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
          x: Math.random() * 100,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 2,
          rotation: Math.random() * 720 - 360,
          size: Math.random() * 1.5 + 1,
        });
      }
      setPieces(newPieces);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              initial={{
                y: -100,
                x: `${piece.x}vw`,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: "110vh",
                rotate: piece.rotation,
                opacity: 0,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "linear",
              }}
              className="absolute"
              style={{
                fontSize: `${piece.size}rem`,
                left: 0,
              }}
            >
              {piece.emoji}
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
