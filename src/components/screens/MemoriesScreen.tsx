"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memories } from "@/lib/memories";
import { getAssetPath } from "@/lib/utils";

export function MemoriesScreen() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
          🖼️ Our Memory Museum 🖼️
        </h1>
        <p className="text-white/80 text-lg">
          A gallery of our beautiful moments together
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
            onClick={() => {
              setSelectedImage(memory.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer"
          >
            {/* Painting Frame */}
            <div className="relative bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 p-3 md:p-4 rounded-sm shadow-2xl">
              {/* Inner gold border */}
              <div className="absolute inset-2 md:inset-3 border-2 border-amber-500/50 pointer-events-none" />

              {/* Ornate corners */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-amber-400/70" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-400/70" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-400/70" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-400/70" />

              {/* Image container */}
              <div className="relative aspect-square overflow-hidden bg-stone-900">
                <Image
                  src={getAssetPath(memory.image)}
                  alt={`Memory from ${memory.date}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* Date plaque */}
              <div className="mt-2 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 py-1 px-2 rounded-sm">
                <p className="text-amber-200/90 text-xs md:text-sm text-center font-serif italic">
                  {memory.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Large painting frame */}
              <div className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 p-6 md:p-8 rounded-sm shadow-2xl">
                {/* Inner gold border */}
                <div className="absolute inset-4 md:inset-6 border-4 border-amber-500/50 pointer-events-none" />

                {/* Ornate corners */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-amber-400/70" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-amber-400/70" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-amber-400/70" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-amber-400/70" />

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                  <Image
                    src={getAssetPath(
                      memories.find((m) => m.id === selectedImage)?.image || "",
                    )}
                    alt="Memory"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>

                {/* Date plaque */}
                <div className="mt-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 py-2 px-4 rounded-sm">
                  <p className="text-amber-200 text-lg md:text-xl text-center font-serif italic">
                    {memories.find((m) => m.id === selectedImage)?.date}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>

              {/* Navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = memories.findIndex(
                      (m) => m.id === selectedImage,
                    );
                    if (currentIndex > 0) {
                      setSelectedImage(memories[currentIndex - 1].id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="pointer-events-auto w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = memories.findIndex(
                      (m) => m.id === selectedImage,
                    );
                    if (currentIndex < memories.length - 1) {
                      setSelectedImage(memories[currentIndex + 1].id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="pointer-events-auto w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
                >
                  →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
