"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Confetti } from "../animations/Confetti";
import Image from "next/image";

interface CelebrationScreenProps {
  onContinue: () => void;
}

export function CelebrationScreen({ onContinue }: CelebrationScreenProps) {
  const [showCastle, setShowCastle] = useState(false);
  const [walkingPath, setWalkingPath] = useState(false);
  const [enteringGate, setEnteringGate] = useState(false);

  const handleContinue = () => {
    setShowCastle(true);
    // Start walking animation after castle appears
    setTimeout(() => setWalkingPath(true), 1000);
    // Enter the gate
    setTimeout(() => setEnteringGate(true), 2500);
    // Navigate to dashboard
    setTimeout(() => onContinue(), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 overflow-hidden">
      <Confetti active={!showCastle} />

      <AnimatePresence mode="wait">
        {!showCastle ? (
          // Celebration content
          <motion.div
            key="celebration"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-center"
          >
            {/* Big YES */}
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-9xl font-bold text-white drop-shadow-2xl mb-8"
            >
              ✨ YES! ✨
            </motion.h1>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-4xl text-white drop-shadow-lg mb-4"
            >
              I knew you&apos;d say yes, Baby Dragon! 🐉💕
            </motion.p>

            {/* Chinese text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-2xl md:text-5xl text-white/90 drop-shadow-lg mb-12"
            >
              我爱你 我的南南 💖
            </motion.p>

            {/* Hearts row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center gap-4 text-4xl md:text-6xl mb-12"
            >
              {["🌹", "❤️", "💕", "🌸", "💗", "🌹"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            {/* Continue Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="px-8 md:px-10 py-4 bg-white text-rose-600 text-lg md:text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              🏰 Enter Our Castle 💝
            </motion.button>
          </motion.div>
        ) : (
          // Castle entrance animation with path walking
          <motion.div
            key="castle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center"
            style={{ overflow: "hidden" }}
          >
            {/* Castle background with zoom effect */}
            <motion.div
              initial={{ scale: 1, y: 0 }}
              animate={{
                scale: enteringGate ? 1.8 : walkingPath ? 1.3 : 1,
                y: enteringGate ? "-5%" : walkingPath ? "-2%" : 0,
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0 z-0"
              style={{
                width: "100%",
                height: "100%",
                transformOrigin: "center center",
              }}
            >
              <Image
                src="/images/castle.png"
                alt="Our Valentine Castle"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </motion.div>

            {/* Overlay that fades in as we enter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: enteringGate ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-transparent to-pink-900/50 z-10"
            />

            {/* Welcome text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: walkingPath ? 1 : 0,
                y: walkingPath ? 0 : 50,
                scale: enteringGate ? 1.2 : 1,
              }}
              transition={{ duration: 0.8 }}
              className="absolute z-20 text-center"
            >
              <motion.h2
                className="text-3xl md:text-6xl font-bold text-white drop-shadow-2xl mb-4"
                style={{ textShadow: "0 0 20px rgba(0,0,0,0.5)" }}
              >
                Welcome to Our Kingdom
              </motion.h2>
              <motion.p
                className="text-xl md:text-3xl text-white drop-shadow-lg mb-6"
                style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}
              >
                My Princess Nan Nan 👸💕
              </motion.p>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-5xl md:text-7xl"
              >
                💖
              </motion.div>
            </motion.div>

            {/* Rose petals falling */}
            {walkingPath && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      opacity: 0,
                      x: `${Math.random() * 100}%`,
                      y: -20,
                      rotate: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: "110vh",
                      rotate: Math.random() * 360,
                      x: `${Math.random() * 100}%`,
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute text-2xl md:text-3xl"
                  >
                    {["🌹", "🩷", "💗", "🌸", "❤️"][i % 5]}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Sparkles */}
            {walkingPath && (
              <div className="absolute inset-0 pointer-events-none z-30">
                {[...Array(15)].map((_, i) => (
                  <motion.span
                    key={`sparkle-${i}`}
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: `${20 + Math.random() * 60}%`,
                      y: `${20 + Math.random() * 60}%`,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                    className="absolute text-xl md:text-2xl"
                  >
                    ✨
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
