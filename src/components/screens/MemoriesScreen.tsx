"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Memory {
  id: number;
  image: string;
  caption: string;
  date?: string;
}

// Placeholder memories - Josef will add real photos
const memories: Memory[] = [
  {
    id: 1,
    image: "/images/photos/placeholder-1.jpg",
    caption: "Our first adventure together 💕",
    date: "2024",
  },
  {
    id: 2,
    image: "/images/photos/placeholder-2.jpg",
    caption: "Snack Queen in her natural habitat 👑🍕",
    date: "2024",
  },
  {
    id: 3,
    image: "/images/photos/placeholder-3.jpg",
    caption: "My Labubu being adorable as always 🥰",
    date: "2024",
  },
  {
    id: 4,
    image: "/images/photos/placeholder-4.jpg",
    caption: "This is DEFINITELY her favorite food (again) 😂",
    date: "2024",
  },
  {
    id: 5,
    image: "/images/photos/placeholder-5.jpg",
    caption: "Baby Dragon and her Jo-Yo 🐉❤️",
    date: "2024",
  },
];

export function MemoriesScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasPhotos] = useState(false); // Set to true when photos are added

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  if (!hasPhotos) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/90 backdrop-blur rounded-3xl p-12 shadow-2xl max-w-lg"
        >
          <span className="text-8xl block mb-6">📸</span>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Our Memories Together
          </h1>
          <p className="text-gray-600 mb-6">
            This section will be filled with our beautiful moments together, Nan
            Nan! 💕
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-4xl">
            {["❤️", "🥰", "💕", "📷", "🌹", "💖"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-6">Photos coming soon... 🌸</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-lg"
      >
        📸 Our Moments Together 📸
      </motion.h1>

      {/* Photo Gallery */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-2xl"
          >
            {/* Polaroid Style Frame */}
            <div className="bg-white p-4 rounded-xl shadow-inner">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={memories[currentIndex].image}
                  alt={memories[currentIndex].caption}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Caption */}
              <p className="text-center text-gray-800 font-medium text-lg">
                {memories[currentIndex].caption}
              </p>
              {memories[currentIndex].date && (
                <p className="text-center text-gray-400 text-sm mt-1">
                  {memories[currentIndex].date}
                </p>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={goPrev}
                className="px-6 py-3 bg-rose-100 text-rose-600 rounded-full font-medium hover:bg-rose-200 transition-colors"
              >
                ← Previous
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {memories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentIndex ? "bg-rose-500 w-6" : "bg-rose-200"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="px-6 py-3 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-colors"
              >
                Next →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Photo counter */}
        <p className="text-center text-white/80 mt-4">
          {currentIndex + 1} / {memories.length}
        </p>
      </div>
    </div>
  );
}
