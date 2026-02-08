"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface QuestionScreenProps {
  onYes: () => void;
}

export function QuestionScreen({ onYes }: QuestionScreenProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hasStartedChasing, setHasStartedChasing] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Track mouse position and make button run away
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !hasStartedChasing) return;

      const button = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = button.left + button.width / 2;
      const buttonCenterY = button.top + button.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Distance from mouse to button center
      const distanceX = mouseX - buttonCenterX;
      const distanceY = mouseY - buttonCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // If mouse is within 150px of button, run away!
      const triggerDistance = 150;
      if (distance < triggerDistance) {
        // Calculate escape direction (opposite to mouse)
        const escapeX = -distanceX;
        const escapeY = -distanceY;

        // Normalize and scale escape vector
        const escapeDistance = 200;
        const magnitude = Math.sqrt(escapeX * escapeX + escapeY * escapeY);
        const normalizedX = (escapeX / magnitude) * escapeDistance;
        const normalizedY = (escapeY / magnitude) * escapeDistance;

        // Calculate new position
        let newX = noButtonPosition.x + normalizedX;
        let newY = noButtonPosition.y + normalizedY;

        // Keep button within screen bounds
        const maxX = window.innerWidth / 2 - 100;
        const maxY = window.innerHeight / 2 - 50;
        newX = Math.max(-maxX, Math.min(maxX, newX));
        newY = Math.max(-maxY, Math.min(maxY, newY));

        setNoButtonPosition({ x: newX, y: newY });
        setNoAttempts((prev) => {
          const newAttempts = prev + 1;
          if (newAttempts >= 5 && !showMessage) {
            setIsShaking(true);
            setShowMessage(true);
            setTimeout(() => setIsShaking(false), 500);
          }
          return newAttempts;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasStartedChasing, noButtonPosition, showMessage]);

  // Start chasing on first hover
  const startChasing = useCallback(() => {
    if (!hasStartedChasing) {
      setHasStartedChasing(true);
      // Initial escape
      const escapeX = Math.random() > 0.5 ? 200 : -200;
      const escapeY = Math.random() > 0.5 ? 150 : -150;
      setNoButtonPosition({ x: escapeX, y: escapeY });
      setNoAttempts(1);
    }
  }, [hasStartedChasing]);

  // Handle touch/click for mobile and desktop - plays audio on user gesture
  const handleNoButtonInteraction = useCallback(() => {
    // Try to play audio on user gesture (click/touch is valid)
    if (audioRef.current && noAttempts >= 4) {
      audioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }

    const escapeX = (Math.random() - 0.5) * 400;
    const escapeY = (Math.random() - 0.5) * 300;

    // Keep within bounds
    const maxX = window.innerWidth / 2 - 100;
    const maxY = window.innerHeight / 2 - 50;
    const newX = Math.max(-maxX, Math.min(maxX, escapeX));
    const newY = Math.max(-maxY, Math.min(maxY, escapeY));

    setNoButtonPosition({ x: newX, y: newY });
    setHasStartedChasing(true);
    setNoAttempts((prev) => {
      const newAttempts = prev + 1;
      if (newAttempts >= 5 && !showMessage) {
        setIsShaking(true);
        setShowMessage(true);
        setTimeout(() => setIsShaking(false), 500);
      }
      return newAttempts;
    });
  }, [showMessage, noAttempts]);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative z-10 ${isShaking ? "shake" : ""}`}
    >
      {/* Hidden audio element for background playback */}
      <audio
        ref={audioRef}
        src="/audio/please-message.mp3"
        className="hidden"
      />

      {/* Main Proposal Image */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-8"
      >
        <Image
          src="/images/proposal.png"
          alt="Be My Valentine?"
          width={500}
          height={500}
          className="rounded-2xl shadow-2xl max-w-[90vw] h-auto"
          priority
        />
      </motion.div>

      {/* Name */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-white mb-8 text-center drop-shadow-lg"
      >
        Nan Nan... 💕
      </motion.h2>

      {/* Plea message when trying to press No */}
      {showMessage && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg md:text-xl text-white mb-4 text-center bg-rose-500/80 px-6 py-3 rounded-full shadow-lg"
        >
          Please say yes, Nan Nan... 🥺💕
        </motion.p>
      )}

      {/* Buttons */}
      <div className="flex gap-6 items-center justify-center relative h-20">
        {/* YES Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xl md:text-2xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-rose-600 hover:to-pink-600"
        >
          💕 YES!
        </motion.button>

        {/* NO Button - Actively runs away from cursor */}
        <motion.button
          ref={buttonRef}
          animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onMouseEnter={startChasing}
          onClick={handleNoButtonInteraction}
          onTouchStart={handleNoButtonInteraction}
          className="px-8 md:px-12 py-3 md:py-4 bg-gray-400 text-white text-xl md:text-2xl font-bold rounded-full shadow-xl cursor-pointer select-none"
          style={{ position: hasStartedChasing ? "absolute" : "relative" }}
        >
          {noAttempts > 8
            ? "😭"
            : noAttempts > 5
              ? "😢"
              : noAttempts > 2
                ? "🥺"
                : "NO 💔"}
        </motion.button>
      </div>

      {/* Hint text */}
      {noAttempts > 3 && noAttempts <= 8 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-white/60 text-sm"
        >
          The NO button seems to be running away... 😏
        </motion.p>
      )}

      {noAttempts > 8 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-white/80 text-lg"
        >
          Just say YES already! 💕
        </motion.p>
      )}

      {/* Chinese love text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-2xl text-white/80 drop-shadow-md"
      >
        我爱你 💖
      </motion.p>
    </div>
  );
}
