"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memories } from "@/lib/memories";
import { getAssetPath } from "@/lib/utils";

// Parse date string to Date object for sorting
function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

// Different frame styles for variety
type FrameStyle = "gold" | "wood" | "white" | "baroque" | "modern";

function getFrameStyle(index: number): FrameStyle {
  const styles: FrameStyle[] = ["gold", "wood", "white", "baroque", "modern"];
  return styles[index % styles.length];
}

interface FrameProps {
  style: FrameStyle;
  children: React.ReactNode;
  date: string;
}

function PictureFrame({ style, children, date }: FrameProps) {
  const frameStyles = {
    gold: {
      outer:
        "bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 p-3 md:p-4 rounded-sm",
      inner: "border-2 border-yellow-300/60",
      corner: "border-yellow-200/80",
      plaque:
        "bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-amber-100",
      shadow: "shadow-[0_8px_30px_rgba(180,130,50,0.4)]",
    },
    wood: {
      outer:
        "bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 p-3 md:p-4 rounded-sm",
      inner: "border-2 border-amber-700/40",
      corner: "border-amber-600/50",
      plaque:
        "bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 text-stone-200",
      shadow: "shadow-[0_8px_30px_rgba(80,50,30,0.5)]",
    },
    white: {
      outer: "bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 md:p-5",
      inner: "border border-gray-300/50",
      corner: "border-gray-400/40",
      plaque:
        "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 text-gray-700",
      shadow: "shadow-[0_8px_30px_rgba(0,0,0,0.15)]",
    },
    baroque: {
      outer:
        "bg-gradient-to-br from-yellow-700 via-amber-500 to-yellow-800 p-4 md:p-5 rounded-lg",
      inner: "border-4 border-double border-yellow-300/50",
      corner: "border-yellow-200/70",
      plaque:
        "bg-gradient-to-r from-yellow-900 via-amber-800 to-yellow-900 text-yellow-100",
      shadow: "shadow-[0_10px_40px_rgba(180,140,50,0.5)]",
    },
    modern: {
      outer:
        "bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 p-2 md:p-3",
      inner: "border border-zinc-600/30",
      corner: "border-zinc-500/40",
      plaque:
        "bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 text-zinc-300",
      shadow: "shadow-[0_8px_25px_rgba(0,0,0,0.4)]",
    },
  };

  const s = frameStyles[style];

  return (
    <div className={`relative ${s.outer} ${s.shadow}`}>
      {/* Inner border */}
      <div
        className={`absolute inset-2 md:inset-3 ${s.inner} pointer-events-none`}
      />

      {/* Ornate corners */}
      <div
        className={`absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 ${s.corner}`}
      />
      <div
        className={`absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 ${s.corner}`}
      />
      <div
        className={`absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 ${s.corner}`}
      />
      <div
        className={`absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 ${s.corner}`}
      />

      {/* Baroque style gets extra decorative elements */}
      {style === "baroque" && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-gradient-to-b from-yellow-300/40 to-transparent rounded-b-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-gradient-to-t from-yellow-300/40 to-transparent rounded-t-full" />
        </>
      )}

      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-stone-900">
        {children}
      </div>

      {/* Date plaque */}
      <div className={`mt-2 ${s.plaque} py-1 px-2 rounded-sm`}>
        <p className="text-xs md:text-sm text-center font-serif italic">
          {date}
        </p>
      </div>
    </div>
  );
}

export function MemoriesScreen() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Sort memories by date (oldest to newest)
  const sortedMemories = useMemo(() => {
    return [...memories].sort(
      (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
    );
  }, []);

  // Scroll lightbox to top when image changes
  useEffect(() => {
    if (selectedImage && lightboxRef.current) {
      // Use setTimeout to ensure DOM has updated after animation
      setTimeout(() => {
        if (lightboxRef.current) {
          lightboxRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [selectedImage]);

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
        {sortedMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
            onClick={() => setSelectedImage(memory.id)}
            className="cursor-pointer"
          >
            <PictureFrame style={getFrameStyle(index)} date={memory.date}>
              <Image
                src={getAssetPath(memory.image)}
                alt={`Memory from ${memory.date}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </PictureFrame>
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
            className="fixed inset-0 bg-black/90 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div
              ref={lightboxRef}
              className="w-full h-full overflow-y-auto flex items-start md:items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full my-4 md:my-0"
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
                        sortedMemories.find((m) => m.id === selectedImage)
                          ?.image || "",
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
                      {sortedMemories.find((m) => m.id === selectedImage)?.date}
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
                      const currentIndex = sortedMemories.findIndex(
                        (m) => m.id === selectedImage,
                      );
                      if (currentIndex > 0) {
                        setSelectedImage(sortedMemories[currentIndex - 1].id);
                      }
                    }}
                    className="pointer-events-auto w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = sortedMemories.findIndex(
                        (m) => m.id === selectedImage,
                      );
                      if (currentIndex < sortedMemories.length - 1) {
                        setSelectedImage(sortedMemories[currentIndex + 1].id);
                      }
                    }}
                    className="pointer-events-auto w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
                  >
                    →
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
