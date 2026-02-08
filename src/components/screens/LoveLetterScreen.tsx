"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function LoveLetterScreen() {
  const [isOpen, setIsOpen] = useState(false);

  const loveLetterContent = `My Dearest Nan Nan, My Baby Dragon, My Labubu 🐉💕

It feels like just yesterday when our story began...

✨ OUR MILESTONES ✨

💕 June 2024 — We started dating, and my life changed forever
💍 September 12, 2024 — We made it official, the best decision I ever made
👨‍👩‍👧 Met your parents THREE times — and they still like me! (I think 😅)
✈️ Vancouver Trip — Absolutely fabulous! Every moment with you is an adventure
📅 5 Months Together — And counting... forever more to come

My sweet Nan Nan,

You take care of me in ways I never knew I needed. Your love surrounds me like the warmest embrace. The way you look at me, the way you laugh at my silly jokes, the way you're always hungry and already thinking about the next meal — my little Jiana (foodie) 🥟 — it all just melts my heart. I love every single thing about you.

I can't wait to grow together with you. To ski down more mountains, to eat at a hundred more restaurants (I know you're excited about that part 🦛), to love each other through every season, and yes... to keep BOMBOCLATING through life together! 🎉

Every day with you is the best day. Whether we're doing something fancy or just being lazy together, you make everything better.

Thank you for being my person, my partner, my everything.

I love you more than words can say... but I'll spend the rest of my life trying anyway.

Forever & Always Yours,
Your Jo-Yo 💕

P.S. I love you more than you love food... and that's saying A LOT! 😂❤️
P.P.S. 我爱你，我的南南 💖`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-lg"
      >
        💌 A Letter For My Lovey 💌
      </motion.h1>

      {!isOpen ? (
        // Envelope
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        >
          <div className="relative w-80 h-56 bg-gradient-to-br from-rose-100 to-pink-200 rounded-lg shadow-2xl overflow-hidden">
            {/* Envelope flap */}
            <div
              className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-rose-200 to-pink-300 origin-bottom"
              style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
            />

            {/* Heart seal */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center shadow-lg z-10">
              <span className="text-3xl">💕</span>
            </div>

            {/* Text */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-rose-600 font-medium">Click to open</p>
              <p className="text-rose-400 text-sm">For Nan Nan 💕</p>
            </div>
          </div>
        </motion.div>
      ) : (
        // Letter
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-4xl opacity-20">🌹</div>
            <div className="absolute top-4 right-4 text-4xl opacity-20">🌸</div>
            <div className="absolute bottom-4 left-4 text-4xl opacity-20">
              💕
            </div>
            <div className="absolute bottom-4 right-4 text-4xl opacity-20">
              🌹
            </div>

            {/* Letter content */}
            <div className="relative z-10">
              <div className="text-center mb-8">
                <span className="text-6xl">💌</span>
              </div>

              <div className="prose prose-lg max-w-none">
                <pre className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed text-lg bg-transparent border-0 p-0">
                  {loveLetterContent}
                </pre>
              </div>

              {/* Hearts decoration */}
              <div className="flex justify-center gap-4 mt-8 text-3xl">
                {["🌹", "❤️", "💕", "🌸", "💗", "🌹"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      delay: i * 0.1,
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              {/* Close button */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
                >
                  Close envelope 💌
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chinese text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-2xl text-white/80 drop-shadow-md"
      >
        我永远爱你，南南 💖
      </motion.p>
    </div>
  );
}
