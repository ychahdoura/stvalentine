"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FloatingHearts } from "@/components/animations/FloatingHearts";
import { QuestionScreen } from "@/components/screens/QuestionScreen";
import { CelebrationScreen } from "@/components/screens/CelebrationScreen";
import { Sidebar } from "@/components/ui/Sidebar";
import { ItineraryScreen } from "@/components/screens/ItineraryScreen";
import { MemoriesScreen } from "@/components/screens/MemoriesScreen";
import { LoveLetterScreen } from "@/components/screens/LoveLetterScreen";

type AppState = "question" | "celebration" | "dashboard";
type Section = "itinerary" | "memories" | "card";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("question");
  const [currentSection, setCurrentSection] = useState<Section>("itinerary");

  const handleYes = () => {
    setAppState("celebration");
  };

  const handleContinue = () => {
    setAppState("dashboard");
  };

  const renderSection = () => {
    switch (currentSection) {
      case "itinerary":
        return <ItineraryScreen />;
      case "memories":
        return <MemoriesScreen />;
      case "card":
        return <LoveLetterScreen />;
      default:
        return <ItineraryScreen />;
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Floating Hearts Background - Always visible */}
      <FloatingHearts count={50} />

      <AnimatePresence mode="wait">
        {appState === "question" && (
          <QuestionScreen key="question" onYes={handleYes} />
        )}

        {appState === "celebration" && (
          <CelebrationScreen key="celebration" onContinue={handleContinue} />
        )}

        {appState === "dashboard" && (
          <div key="dashboard" className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
            />

            {/* Main Content */}
            <div className="flex-1 md:ml-64 relative z-10 pt-20 pb-24 md:pt-0 md:pb-0">
              <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
