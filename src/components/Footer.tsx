import React from 'react';
import { ArrowUp, MapPin, Mail, Send } from 'lucide-react';
import { ERBOLAT_PROFILE } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-12 border-t border-white/10 relative pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Bio & Institution */}
          <div className="md:col-span-5">
            <div className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span>Ерболат Рахметолла</span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Студент 2 курса Западно-Казахстанского Медицинского университета имени Марата Оспанова. Специализация — фундаментальная кардиоморфология и общая медицина.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>г. Актобе, ул. Маресьева, 68</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Разделы портфолио
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">О студенте & Портрет</a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-cyan-300 transition-colors">Академические достижения</a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-cyan-300 transition-colors">Учебный прогресс & GPA</a>
              </li>
              <li>
                <a href="#research" className="hover:text-cyan-300 transition-colors">Научные публикации СНО</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Прямая связь
            </div>
            <div className="space-y-2 text-xs text-slate-400 md:text-right">
              <div>
                <a href={`mailto:${ERBOLAT_PROFILE.contacts.email}`} className="text-cyan-300 hover:underline font-mono">
                  {ERBOLAT_PROFILE.contacts.email}
                </a>
              </div>
              <div>
                <a 
                  href={`https://t.me/${ERBOLAT_PROFILE.contacts.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Telegram: {ERBOLAT_PROFILE.contacts.telegram}
                </a>
              </div>
              <div className="font-mono text-slate-400">
                Телефон: {ERBOLAT_PROFILE.contacts.phone}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-5 p-2 rounded-xl liquid-glass-button text-slate-300 hover:text-white flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Наверх</span>
            </button>
          </div>
        </div>

        {/* Bottom line: Clean editorial copyright without mechanical clutter */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 Ерболат Рахметолла · Все академические данные верифицированы ЗКМУ им. М. Оспанова
          </div>
          <div className="flex items-center gap-3">
            <span>Актобе, Казахстан</span>
            <span aria-hidden="true">·</span>
            <span>Liquid Glass Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
