"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

type Section = "itinerary" | "memories" | "card";

interface SidebarProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

const menuItems: {
  id: Section;
  label: string;
  icon: string;
  chinese: string;
}[] = [
  { id: "itinerary", label: "Our Adventure", icon: "📅", chinese: "旅程" },
  { id: "memories", label: "Memories of Us", icon: "📸", chinese: "回忆" },
  { id: "card", label: "Love Letter", icon: "💌", chinese: "情书" },
];

export function Sidebar({ currentSection, onSectionChange }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden md:flex w-64 min-h-screen bg-gradient-to-b from-rose-900/90 to-pink-900/90 backdrop-blur-sm p-6 flex-col border-r border-pink-500/30 fixed left-0 top-0 z-40"
      >
        {/* Avatar Heart */}
        <div className="flex flex-col items-center mb-8">
          {/* Heart shape with avatars */}
          <div className="relative w-32 h-32 mb-4">
            {/* Heart background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl pulse-heart">💕</span>
            </div>

            {/* Jo-Yo Avatar */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg z-10">
              <Image
                src={getAssetPath("/images/avatars/jo-yo.png")}
                alt="Jo-Yo"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Nancy Avatar Placeholder */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg z-10 bg-pink-300 flex items-center justify-center">
              <span className="text-2xl">👸</span>
            </div>
          </div>

          <h2 className="text-white font-bold text-lg text-center">
            Jo-Yo & Nan Nan
          </h2>
          <p className="text-pink-200 text-sm">Valentine&apos;s 2025 💕</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-6" />

        {/* Navigation */}
        <nav className="flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-all duration-300 flex items-center gap-3 ${
                currentSection === item.id
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-pink-100 hover:bg-white/10"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <span className="font-medium block">{item.label}</span>
                <span className="text-xs text-pink-300">{item.chinese}</span>
              </div>
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent my-6" />

        {/* Footer */}
        <div className="text-center">
          <p className="text-pink-200 text-lg">🌸 我爱你 🌸</p>
          <p className="text-pink-300 text-xs mt-2">Made with 💕 by Jo-Yo</p>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-rose-900/95 to-pink-900/95 backdrop-blur-sm p-4 border-b border-pink-500/30">
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl pulse-heart">💕</span>
          <div className="text-center">
            <h2 className="text-white font-bold">Jo-Yo & Nan Nan</h2>
            <p className="text-pink-200 text-xs">Valentine&apos;s 2025</p>
          </div>
          <span className="text-3xl pulse-heart">💕</span>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-rose-900/95 to-pink-900/95 backdrop-blur-sm border-t border-pink-500/30">
        <div className="flex justify-around py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
                currentSection === item.id
                  ? "text-white bg-white/20"
                  : "text-pink-200"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
