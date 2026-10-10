import React, { useState } from 'react';
import { Microscope, FileCheck, Layers, ExternalLink, BookMarked, Sparkles } from 'lucide-react';
import { RESEARCH_PROJECTS, ERBOLAT_PROFILE } from '../data/portfolioData';

const CAMPUS_IMAGE = '/src/assets/images/zkmu_campus_modern_1791658167574.jpg';
const LAB_HERO_IMAGE = '/src/assets/images/med_glass_hero_1791658026357.jpg';

export const ResearchSection: React.FC = () => {
  const [activeResearchIdx, setActiveResearchIdx] = useState<number>(0);
  const currentProject = RESEARCH_PROJECTS[activeResearchIdx];

  return (
    <section id="research" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="pb-6 border-b border-white/10">
          <div className="text-xs sm:text-sm font-medium text-cyan-400 uppercase tracking-wider">
            Научно-исследовательская лаборатория
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Научные проекты & Публикации
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Исследования Студенческого Научного Общества (СНО) ЗКМУ в области клинической анатомии сердца и гемодинамики.
          </p>
        </div>

        {/* Big Liquid Glass Visual Banner & Campus Spotlight */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-8 rounded-3xl overflow-hidden relative liquid-glass-card border border-white/15 h-64 sm:h-80 group">
            <img
              src={LAB_HERO_IMAGE}
              alt="Анатомические исследования и медицинская лаборатория ЗКМУ"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-xs text-cyan-300 font-mono">Биомедицинские инновации ЗКМУ</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Архитектоника проводящей системы сердца & Вариантная анатомия
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl line-clamp-2">
                Анализ топографических маркеров для предотвращения ятрогенных осложнений при кардиохирургических вмешательствах.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-3xl overflow-hidden relative liquid-glass-card border border-white/15 h-64 sm:h-80 group">
            <img
              src={CAMPUS_IMAGE}
              alt="Университетский кампус ЗКМУ им. М. Оспанова в Актобе"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-xs text-cyan-300 font-mono">Университетская база</div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                ЗКМУ им. М. Оспанова
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                г. Актобе · Главный корпус и симуляционный центр
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed Interactive Scientific Dossier */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Projects Selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Исследовательские работы
            </div>

            {RESEARCH_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveResearchIdx(idx)}
                className={`w-full text-left p-4 rounded-2xl liquid-glass-card border transition-all cursor-pointer ${
                  activeResearchIdx === idx
                    ? 'border-cyan-400/50 bg-white/[0.08] shadow-[0_0_24px_rgba(6,182,212,0.18)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-cyan-300 font-medium mb-1">
                  <span>{proj.status}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{proj.date}</span>
                </div>

                <div className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                  {proj.title}
                </div>

                <div className="text-xs text-slate-400 mt-1.5 truncate">
                  {proj.role}
                </div>
              </button>
            ))}
          </div>

          {/* Deep Abstract & Findings Display */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl liquid-glass-card border border-white/15">
            {/* Clean Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-300 font-medium mb-3">
              <span>{currentProject.role}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-300">{currentProject.status}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{currentProject.department}</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-bold text-white leading-snug">
              {currentProject.title}
            </h3>

            <div className="mt-2 text-xs sm:text-sm text-cyan-200/80 font-mono">
              {currentProject.journalOrConference}
            </div>

            {/* Abstract */}
            <div className="mt-5 pt-5 border-t border-white/10">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Аннотация исследования
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentProject.abstract}
              </p>
            </div>

            {/* Key Clinical & Scientific Findings */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Ключевые научные результаты:
              </h4>
              <div className="space-y-2.5">
                {currentProject.keyFindings.map((finding, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {finding}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Keywords */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Ключевые слова:</span>
              {currentProject.tags.map((tag, i) => (
                <span key={i} className="text-slate-300">
                  {tag}{i < currentProject.tags.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
