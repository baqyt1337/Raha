import React from 'react';
import { X, Award, CheckCircle2, User, Building, Copy, Check, ExternalLink } from 'lucide-react';
import { Achievement } from '../data/portfolioData';

interface AchievementModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const AWARD_IMAGE = '/src/assets/images/achievement_zkmu_award_1791658040024.jpg';

export const AchievementModal: React.FC<AchievementModalProps> = ({ achievement, onClose }) => {
  const [copiedDoc, setCopiedDoc] = React.useState(false);

  if (!achievement) return null;

  const handleCopyDoc = () => {
    if (achievement.docNumber) {
      navigator.clipboard.writeText(achievement.docNumber);
      setCopiedDoc(true);
      setTimeout(() => setCopiedDoc(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Backdrop tap to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card in Liquid Glass style */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-2xl rounded-3xl liquid-glass-modal border border-white/20 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Закрыть окно"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clean Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-300 font-medium mb-3">
          <span>{achievement.categoryLabel}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>{achievement.year} год</span>
          {achievement.place && (
            <>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-emerald-300 font-semibold">{achievement.place}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white leading-snug">
          {achievement.title}
        </h2>

        {/* Organization & Verification */}
        <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
          <Building className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{achievement.organization}</span>
          {achievement.verified && (
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium ml-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Верифицировано
            </span>
          )}
        </div>

        {/* Visual Award Showcase if relevant */}
        <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 relative h-48 sm:h-56 bg-slate-900">
          <img
            src={AWARD_IMAGE}
            alt="Наградной диплом и медаль ЗКМУ"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
            <span className="text-slate-200 font-medium">Академический реестр ЗКМУ им. М. Оспанова</span>
            <span className="text-cyan-300 font-mono text-[11px]">{achievement.docNumber}</span>
          </div>
        </div>

        {/* Summary & Deep Details */}
        <div className="mt-6 space-y-4 text-sm text-slate-300 leading-relaxed">
          <p className="text-base text-slate-200 font-medium">
            {achievement.summary}
          </p>
          <p>
            {achievement.details}
          </p>
        </div>

        {/* Mentor and Department Info */}
        {(achievement.mentor || achievement.department) && (
          <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-3 justify-between">
            {achievement.mentor && (
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="text-slate-400">Научный руководитель / Куратор</div>
                  <div className="text-white font-medium mt-0.5">{achievement.mentor}</div>
                </div>
              </div>
            )}
            {achievement.department && (
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="text-slate-400">Кафедра / Подразделение</div>
                  <div className="text-white font-medium mt-0.5">{achievement.department}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quantitative Impact Metrics */}
        {achievement.impactMetrics.length > 0 && (
          <div className="mt-6">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
              Ключевые метрики достижения
            </div>
            <div className="grid grid-cols-3 gap-3">
              {achievement.impactMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-center">
                  <div className="text-base sm:text-lg font-bold text-white font-mono tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          {achievement.docNumber && (
            <button
              onClick={handleCopyDoc}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedDoc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>№ приказа/диплома: <strong className="text-slate-200 font-mono">{achievement.docNumber}</strong></span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 text-xs font-semibold ml-auto transition-all cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
