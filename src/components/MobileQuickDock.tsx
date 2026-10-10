import React from 'react';
import { Home, Award, GraduationCap, Microscope, Sparkles } from 'lucide-react';

interface MobileQuickDockProps {
  onOpenQuickCard: () => void;
}

export const MobileQuickDock: React.FC<MobileQuickDockProps> = ({ onOpenQuickCard }) => {
  return (
    <aside aria-label="Быстрая навигация" className="fixed bottom-3 inset-x-3 z-40 md:hidden">
      <nav aria-label="Мобильная навигация" className="liquid-glass-dock rounded-2xl p-1.5 flex items-center justify-around shadow-[0_12px_36px_rgba(0,0,0,0.6)] border border-white/20">
        <a
          href="#top"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-cyan-300 transition-colors"
          title="Начало"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Вверх</span>
        </a>

        <a
          href="#achievements"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-cyan-300 transition-colors"
          title="Достижения"
        >
          <Award className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Награды</span>
        </a>

        <a
          href="#disciplines"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-cyan-300 transition-colors"
          title="Успеваемость"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">GPA 3.92</span>
        </a>

        <a
          href="#research"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-cyan-300 transition-colors"
          title="Научные проекты"
        >
          <Microscope className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Наука</span>
        </a>

        <button
          onClick={onOpenQuickCard}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 transition-colors cursor-pointer"
          title="Экспресс-визитка"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-bold mt-0.5">Визитка</span>
        </button>
      </nav>
    </aside>
  );
};
