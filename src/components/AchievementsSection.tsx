import React, { useState } from 'react';
import { Award, Search, ChevronRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ACHIEVEMENTS_DATA, Achievement } from '../data/portfolioData';
import { AchievementModal } from './AchievementModal';

export const AchievementsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalAchievement, setActiveModalAchievement] = useState<Achievement | null>(null);

  const categories = [
    { id: 'all', label: 'Все достижения' },
    { id: 'olympiad', label: 'Олимпиады' },
    { id: 'science', label: 'Наука и публикации' },
    { id: 'conference', label: 'Конференции' },
    { id: 'clinical', label: 'Клинические навыки' },
    { id: 'grant', label: 'Стипендии и гранты' }
  ];

  const filteredAchievements = ACHIEVEMENTS_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.department && item.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="achievements" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs sm:text-sm font-medium text-cyan-400 uppercase tracking-wider">
              Академическое превосходство
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Достижения в академической деятельности
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Победы в республиканских анатомических олимпиадах, фундаментальные доклады на научных конференциях и практические сертификаты 2024–2025 гг.
            </p>
          </div>

          {/* Quick Search Input in Liquid Glass */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию, кафедре..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl liquid-glass-card border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Interactive Filter Controls (Allowed functional button tabs) */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-[0_0_16px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Achievements Grid - Responsive 2-column or 3-column Bento cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalAchievement(item)}
              className="liquid-glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 cursor-pointer group glass-sheen"
            >
              <div>
                {/* Clean Unboxed Metadata (Rule 1.A: No static pill enclosures) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="text-cyan-300 font-medium">{item.categoryLabel}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{item.year}</span>
                  {item.place && (
                    <>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-emerald-300 font-medium">{item.place}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="mt-2.5 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Bottom footer: Mentorship & Detail trigger */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate max-w-[200px]">
                  {item.department || item.organization}
                </span>

                <span className="flex items-center gap-1 text-cyan-300 group-hover:translate-x-0.5 transition-transform font-medium">
                  <span>Подробнее</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="p-8 text-center rounded-2xl liquid-glass-card border border-white/10 mt-6">
            <p className="text-sm text-slate-300">
              По вашему запросу «{searchQuery}» достижений не найдено.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-cyan-300 underline cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <AchievementModal
        achievement={activeModalAchievement}
        onClose={() => setActiveModalAchievement(null)}
      />
    </section>
  );
};
