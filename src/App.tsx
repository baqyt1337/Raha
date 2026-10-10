/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LiquidGlassBackground } from './components/LiquidGlassBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AchievementsSection } from './components/AchievementsSection';
import { DisciplinesSection } from './components/DisciplinesSection';
import { ResearchSection } from './components/ResearchSection';
import { Footer } from './components/Footer';
import { MobileQuickDock } from './components/MobileQuickDock';
import { QuickContactModal } from './components/QuickContactModal';

export default function App() {
  const [quickContactOpen, setQuickContactOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient interactive liquid glass background blobs */}
      <LiquidGlassBackground />

      {/* Top Bar Header conforming to 3-zone contract */}
      <Header onOpenQuickCard={() => setQuickContactOpen(true)} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section with restored portrait & interactive face completion */}
        <HeroSection onOpenQuickCard={() => setQuickContactOpen(true)} />

        {/* Academic Achievements Section */}
        <AchievementsSection />

        {/* Curriculum, GPA Simulator & Clinical Skills */}
        <DisciplinesSection />

        {/* Scientific Research, Case Studies & ZKMU Campus */}
        <ResearchSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Mobile-first bottom quick dock for on-the-go viewing */}
      <MobileQuickDock onOpenQuickCard={() => setQuickContactOpen(true)} />

      {/* On-the-go quick digital business card & contact modal */}
      <QuickContactModal
        isOpen={quickContactOpen}
        onClose={() => setQuickContactOpen(false)}
      />
    </div>
  );
}
