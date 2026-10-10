import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenQuickCard: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuickCard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full liquid-glass-nav transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no sub-pills or extraneous badges) */}
        <a 
          href="#top" 
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
          <span>Ерболат Рахметолла</span>
          <span className="hidden sm:inline text-xs font-normal text-cyan-200/60 font-mono tracking-normal">· ЗКМУ 2 курс</span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            О студенте
          </a>
          <a href="#achievements" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Достижения
          </a>
          <a href="#disciplines" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Успеваемость & GPA
          </a>
          <a href="#research" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Научные проекты
          </a>
          <a href="#contact" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Контакты
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenQuickCard}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-cyan-100 liquid-glass-button rounded-xl flex items-center gap-1.5 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Визитка на ходу</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Переключить мобильное меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drop-down drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 liquid-glass-modal border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-200 pt-2">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-colors flex items-center justify-between"
            >
              <span>О студенте</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#achievements"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-colors flex items-center justify-between"
            >
              <span>Академические достижения</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#disciplines"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-colors flex items-center justify-between"
            >
              <span>Успеваемость & Симулятор GPA</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#research"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-colors flex items-center justify-between"
            >
              <span>Научные исследования</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-colors flex items-center justify-between"
            >
              <span>Контакты & Обратная связь</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
