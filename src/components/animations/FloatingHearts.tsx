"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const heartEmojis = [
  "❤️",
  "💕",
  "💗",
  "💖",
  "💝",
  "♥️",
  "🩷",
  "💘",
  "💓",
  "💞",
];

export function FloatingHearts({ count = 30 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generatedHearts: Heart[] = [];
    for (let i = 0; i < count; i++) {
      generatedHearts.push({
        id: i,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        left: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    setHearts(generatedHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}rem`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
