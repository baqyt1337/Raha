import React, { useState } from 'react';
import { BookOpen, Calculator, CheckCircle2, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { DISCIPLINES_DATA, CLINICAL_SKILLS, ERBOLAT_PROFILE } from '../data/portfolioData';

export const DisciplinesSection: React.FC = () => {
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>(DISCIPLINES_DATA[0].id);
  const [targetExamScore, setTargetExamScore] = useState<number>(98);

  const activeDiscipline = DISCIPLINES_DATA.find((d) => d.id === selectedDisciplineId) || DISCIPLINES_DATA[0];

  // Interactive GPA simulation calculation
  const totalBaseCredits = DISCIPLINES_DATA.reduce((acc, curr) => acc + curr.credits, 0);
  const calculatedAverage = (
    DISCIPLINES_DATA.reduce((acc, curr) => {
      const scoreToUse = curr.id === selectedDisciplineId ? targetExamScore : curr.score;
      return acc + scoreToUse * curr.credits;
    }, 0) / totalBaseCredits
  ).toFixed(1);

  // Convert 100-point scale to 4.0 GPA approximation in Kazakhstan grading system
  const simulatedGpa = (Math.min(4.0, (Number(calculatedAverage) / 100) * 4.0 + 0.05)).toFixed(2);

  return (
    <section id="disciplines" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="pb-6 border-b border-white/10">
          <div className="text-xs sm:text-sm font-medium text-cyan-400 uppercase tracking-wider">
            Учебный процесс и фундаментальные науки
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Академическая успеваемость & GPA
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Дисциплины 2 курса ЗКМУ им. М. Оспанова. Средний балл по курсу — 97.1%, совокупный GPA — {ERBOLAT_PROFILE.gpa} из 4.00.
          </p>
        </div>

        {/* 2-Column: Subjects list + Deep Dive & Interactive GPA Sandbox */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Disciplines Grid */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Дисциплины 1–4 семестров
            </div>

            {DISCIPLINES_DATA.map((disc) => {
              const isSelected = disc.id === selectedDisciplineId;
              return (
                <div
                  key={disc.id}
                  onClick={() => {
                    setSelectedDisciplineId(disc.id);
                    setTargetExamScore(disc.score);
                  }}
                  className={`p-4 rounded-2xl liquid-glass-card border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-cyan-400/50 bg-white/[0.08] shadow-[0_0_24px_rgba(6,182,212,0.18)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 shrink-0 font-mono font-bold text-sm">
                      {disc.grade}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                        {disc.name}
                      </h3>
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{disc.department}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="font-mono">{disc.credits} ECTS</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base sm:text-lg font-bold text-cyan-300 font-mono tabular-nums">
                      {disc.score}%
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Отлично
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Topic Card & Interactive GPA Simulator */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Discipline Syllabus Topics */}
            <div className="p-6 rounded-2xl liquid-glass-card border border-white/15">
              <div className="text-xs text-cyan-400 font-medium uppercase tracking-wider">
                Модульная программа
              </div>
              <h3 className="mt-1 text-lg font-bold text-white">
                {activeDiscipline.name}
              </h3>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                Семестр: {activeDiscipline.semester} · {activeDiscipline.credits} кредитов
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs font-semibold text-slate-300 mb-2.5">
                  Освоенные ключевые модули:
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeDiscipline.keyTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive GPA Sandbox Simulator */}
            <div className="p-6 rounded-2xl liquid-glass-card border border-cyan-400/25 bg-gradient-to-b from-cyan-950/20 to-slate-900/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>Интерактивный симулятор GPA</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Шкала ЗКМУ</span>
              </div>

              <p className="mt-2 text-xs text-slate-300">
                Проверьте устойчивость академического рейтинга: измените прогнозируемый балл по предмету «{activeDiscipline.name}».
              </p>

              {/* Slider Input */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Балл экзамена:</span>
                  <span className="font-mono text-cyan-300 font-bold">{targetExamScore}%</span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="100"
                  value={targetExamScore}
                  onChange={(e) => setTargetExamScore(Number(e.target.value))}
                  aria-label="Балл экзамена"
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>75% (C+)</span>
                  <span>90% (A-)</span>
                  <span>100% (A+)</span>
                </div>
              </div>

              {/* Computed Simulation Output */}
              <div className="mt-5 p-3 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">Прогнозный средний балл</div>
                  <div className="text-xl font-bold text-white font-mono tabular-nums">
                    {calculatedAverage}%
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Расчетный кумулятивный GPA</div>
                  <div className="text-xl font-bold text-cyan-300 font-mono tabular-nums">
                    {simulatedGpa} / 4.00
                  </div>
                </div>
              </div>
            </div>

            {/* Practical & Clinical Skills Radar */}
            <div className="p-6 rounded-2xl liquid-glass-card border border-white/15">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium uppercase tracking-wider mb-4">
                <Activity className="w-4 h-4" />
                <span>Практические медицинские навыки</span>
              </div>

              <div className="space-y-3">
                {CLINICAL_SKILLS.slice(0, 4).map((sk, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>{sk.name}</span>
                      <span className="font-mono text-cyan-300 font-medium tabular-nums">{sk.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" 
                        style={{ width: `${sk.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
