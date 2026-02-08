"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { itinerary, dayLabels } from "@/lib/itinerary";
import { getAssetPath } from "@/lib/utils";

export function ItineraryScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const currentItem = itinerary[currentIndex];

  const getDayProgress = () => {
    const friday = itinerary.filter((i) => i.day === "friday").length;
    const saturday = itinerary.filter((i) => i.day === "saturday").length;

    if (currentIndex < friday) return "friday";
    if (currentIndex < friday + saturday) return "saturday";
    return "sunday";
  };

  const goNext = () => {
    if (currentIndex < itinerary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentDay = getDayProgress();
  const hasCharacterImage =
    currentItem.characterImage && !imageError[`char-${currentItem.id}`];

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8 drop-shadow-lg"
      >
        🗺️ Our Valentine Adventure 🗺️
      </motion.h1>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-6 md:mb-8">
        <div className="flex justify-between items-center mb-2">
          {(["friday", "saturday", "sunday"] as const).map((day) => (
            <div
              key={day}
              className={`text-center px-2 md:px-4 py-1 md:py-2 rounded-full transition-all text-sm md:text-base ${
                currentDay === day
                  ? "bg-white text-rose-600 font-bold shadow-lg"
                  : "text-white/70"
              }`}
            >
              {dayLabels[day]}
            </div>
          ))}
        </div>

        {/* Progress line */}
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / itinerary.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-center text-white/80 mt-2 text-sm md:text-base">
          {currentIndex + 1} / {itinerary.length}
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col ${hasCharacterImage ? "lg:flex-row" : ""} gap-6 items-center`}
          >
            {/* Left Side - Character Image (Big) */}
            {hasCharacterImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full lg:w-1/2 flex justify-center"
              >
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
                  <Image
                    src={getAssetPath(currentItem.characterImage!)}
                    alt={currentItem.activity}
                    fill
                    className="object-cover"
                    onError={() =>
                      setImageError((prev) => ({
                        ...prev,
                        [`char-${currentItem.id}`]: true,
                      }))
                    }
                    priority
                  />
                </div>
              </motion.div>
            )}

            {/* Right Side - Activity Card */}
            <div
              className={`w-full ${hasCharacterImage ? "lg:w-1/2" : "max-w-2xl mx-auto"}`}
            >
              <div className="bg-white/95 backdrop-blur rounded-3xl p-4 md:p-8 shadow-2xl">
                {/* Day Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 md:px-4 py-1 bg-rose-100 text-rose-600 rounded-full text-xs md:text-sm font-medium">
                    {dayLabels[currentItem.day]}
                  </span>
                  <span className="text-rose-500 font-bold text-sm md:text-base">
                    {currentItem.time}
                  </span>
                </div>

                {/* Venue Image/Logo (smaller, inside card) */}
                {currentItem.image && !imageError[currentItem.id] && (
                  <div className="relative w-full h-32 md:h-40 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
                    <Image
                      src={getAssetPath(currentItem.image)}
                      alt={`${currentItem.activity} venue`}
                      fill
                      className="object-contain p-2"
                      onError={() =>
                        setImageError((prev) => ({
                          ...prev,
                          [currentItem.id]: true,
                        }))
                      }
                    />
                  </div>
                )}

                {/* Icon (if no character image and no venue image) */}
                {!hasCharacterImage &&
                  (!currentItem.image || imageError[currentItem.id]) && (
                    <div className="text-center mb-4">
                      <motion.span
                        className="text-6xl md:text-7xl block"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {currentItem.icon}
                      </motion.span>
                    </div>
                  )}

                {/* Activity Name */}
                <div className="text-center mb-4">
                  <h2 className="text-xl md:text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    <span>{currentItem.icon}</span>
                    {currentItem.activity}
                  </h2>
                </div>

                {/* Caption */}
                <p className="text-center text-base md:text-lg text-gray-600 mb-4 italic">
                  &quot;{currentItem.caption}&quot;
                </p>

                {/* Location */}
                {currentItem.location && (
                  <div className="text-center mb-4">
                    <p className="text-gray-500 text-sm md:text-base">
                      📍 {currentItem.location}
                    </p>
                    {currentItem.address && (
                      <p className="text-xs md:text-sm text-gray-400">
                        {currentItem.address}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {currentItem.mapUrl && (
                    <a
                      href={currentItem.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors text-sm"
                    >
                      🗺️ Directions
                    </a>
                  )}
                  {currentItem.websiteUrl && (
                    <a
                      href={currentItem.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors text-sm"
                    >
                      🌐 Website
                    </a>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all text-sm md:text-base ${
                      currentIndex === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-rose-100 text-rose-600 hover:bg-rose-200"
                    }`}
                  >
                    ← Prev
                  </button>

                  <div className="hidden md:flex gap-1">
                    {itinerary.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentIndex ? "bg-rose-500 w-4" : "bg-rose-200"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={goNext}
                    disabled={currentIndex === itinerary.length - 1}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all text-sm md:text-base ${
                      currentIndex === itinerary.length - 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-rose-500 text-white hover:bg-rose-600"
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
