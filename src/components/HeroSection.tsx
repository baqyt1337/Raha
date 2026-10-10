import React, { useState, useRef } from 'react';
import { 
  GraduationCap, 
  Award, 
  FileText, 
  ChevronRight, 
  Stethoscope, 
  SlidersHorizontal,
  Sparkles,
  MapPin,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { ERBOLAT_PROFILE } from '../data/portfolioData';

// Image paths from batch generation
const PORTRAIT_RESTORED = '/src/assets/images/portrait_erbolat_restored_1791658147899.jpg';
const PORTRAIT_DOCTOR = '/src/assets/images/portrait_erbolat_doctor_1791658157988.jpg';

interface HeroSectionProps {
  onOpenQuickCard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuickCard }) => {
  const [activePhotoTab, setActivePhotoTab] = useState<'restored' | 'doctor' | 'split'>('restored');
  const [splitPosition, setSplitPosition] = useState<number>(50);
  const [isCopiedTelegram, setIsCopiedTelegram] = useState(false);
  
  // Interactive glass tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt angles (max +/- 8 deg)
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;
    
    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText(ERBOLAT_PROFILE.contacts.telegram);
    setIsCopiedTelegram(true);
    setTimeout(() => setIsCopiedTelegram(false), 2000);
  };

  return (
    <section id="about" className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Kicker - Clean unboxed text with typographic separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-cyan-300/90 font-medium mb-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            ЗКМУ им. Марата Оспанова
          </span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>Факультет «Общая медицина»</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span className="text-slate-400">г. Актобе</span>
        </div>

        {/* 2-Column Split: Typographic Column + Liquid Glass Portrait Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Ерболат Рахметолла
            </h1>
            
            <p className="mt-3 text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
              Студент 2 курса · Исследователь фундаментальной кардиоморфологии
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Сочетаю академическое лидерство с углубленным изучением топографической анатомии проводящей системы сердца, анатомическим препарированием и доказательной биостатистикой. Победитель республиканских медицинских олимпиад и стипендиат ректора ЗКМУ.
            </p>

            {/* University & Department Affiliation Card in Liquid Glass */}
            <div className="mt-6 p-4 rounded-2xl liquid-glass-card border border-white/10 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <div className="text-white font-medium flex items-center gap-1.5">
                  <span>Западно-Казахстанский Медицинский Университет</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-slate-400 mt-0.5">
                  Кафедра нормальной и топографической анатомии · Резидент СНО
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#achievements"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-[0_0_24px_rgba(6,182,212,0.4)] hover:shadow-[0_0_32px_rgba(6,182,212,0.6)] hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Академические достижения</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenQuickCard}
                className="px-4 py-3 rounded-xl liquid-glass-button text-cyan-200 font-medium text-sm flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Экспресс-профиль на ходу</span>
              </button>

              <button
                onClick={handleCopyTelegram}
                className="p-3 rounded-xl liquid-glass-button text-slate-300 hover:text-white text-sm flex items-center gap-1.5 cursor-pointer"
                title="Скопировать Telegram"
              >
                {isCopiedTelegram ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="text-xs font-mono">@erbolat_rahmetolla</span>
              </button>
            </div>
          </div>

          {/* Right Column: Liquid Glass Portrait & Interactive Face Completion Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Interactive Mode Tabs for Photo */}
            <div className="w-full flex items-center justify-between p-1 mb-3 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActivePhotoTab('restored')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activePhotoTab === 'restored' 
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Восстановленное фото
              </button>
              <button
                onClick={() => setActivePhotoTab('doctor')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activePhotoTab === 'doctor' 
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Клинический халат
              </button>
              <button
                onClick={() => setActivePhotoTab('split')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activePhotoTab === 'split' 
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Сравнение (Сплит)
              </button>
            </div>

            {/* Main Liquid Glass Portrait Container with Dynamic Light Glare */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="relative w-full max-w-[360px] aspect-[3/4] rounded-3xl overflow-hidden p-2.5 liquid-glass-card border border-white/20 shadow-[0_24px_50px_rgba(0,0,0,0.6)] group"
            >
              {/* Dynamic specular glare overlay */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-3xl opacity-40 group-hover:opacity-75 transition-opacity"
                style={{
                  background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35), transparent 70%)`
                }}
              />

              {/* Photo View Mode 1: Restored Full Face Portrait */}
              {activePhotoTab === 'restored' && (
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={PORTRAIT_RESTORED}
                    alt="Ерболат Рахметолла — полное восстановленное студийное фото"
                    className="w-full h-full object-cover filter contrast-[1.04]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle glass vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  {/* Bottom glass information badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/75 backdrop-blur-md border border-white/15">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">Портрет Ерболата Рахметолла</span>
                      <span className="text-[11px] text-cyan-300 font-mono">100% лицо</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Полная реконструкция черт лица, кудрей и взгляда
                    </div>
                  </div>
                </div>
              )}

              {/* Photo View Mode 2: Clinical Doctor Coat */}
              {activePhotoTab === 'doctor' && (
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={PORTRAIT_DOCTOR}
                    alt="Ерболат Рахметолла — будущий врач, клиническая практика ЗКМУ"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/75 backdrop-blur-md border border-white/15">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">Клинический обход ЗКМУ</span>
                      <span className="text-[11px] text-cyan-300 font-mono">Практика</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Медицинский халат, стетоскоп и дежурства
                    </div>
                  </div>
                </div>
              )}

              {/* Photo View Mode 3: Interactive Split Slider (Half vs Completed) */}
              {activePhotoTab === 'split' && (
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 select-none">
                  {/* Completed Face (Full Base) */}
                  <img
                    src={PORTRAIT_RESTORED}
                    alt="Восстановленная правая половина лица"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Cropped Half Original Overlay */}
                  <div 
                    className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                    style={{ width: `${splitPosition}%` }}
                  >
                    <img
                      src={PORTRAIT_RESTORED}
                      alt="Исходный ракурс"
                      className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
                      style={{
                        width: cardRef.current ? `${cardRef.current.offsetWidth - 20}px` : '340px',
                        maxWidth: 'none'
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-cyan-300 font-mono backdrop-blur-sm">
                      Исходный срез (50%)
                    </div>
                  </div>

                  <div 
                    className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-emerald-300 font-mono backdrop-blur-sm"
                  >
                    Дорисованная часть (100%)
                  </div>

                  {/* Interactive Slider Controller Handle */}
                  <div 
                    className="absolute inset-y-0 w-1 flex items-center justify-center pointer-events-none"
                    style={{ left: `${splitPosition}%` }}
                  >
                    <div className="w-8 h-8 -ml-3.5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg pointer-events-auto cursor-ew-resize">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Range input for accessible touch / mouse slider */}
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={splitPosition}
                    onChange={(e) => setSplitPosition(Number(e.target.value))}
                    aria-label="Слайдер сравнения дорисованного лица"
                    className="absolute inset-x-0 bottom-2 opacity-0 h-10 cursor-ew-resize z-20"
                  />

                  <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-center">
                    <span className="text-[11px] text-slate-200">
                      Потяните ползунок влево/вправо для сравнения
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick status under portrait */}
            <div className="mt-3 text-center">
              <span className="text-xs text-slate-400">
                Западно-Казахстанский Медуниверситет им. М. Оспанова · Актобе
              </span>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI Strip Below Hero (Rule 2.B / Rule 13) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl liquid-glass-card border border-white/10 flex flex-col justify-between">
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Академический рейтинг
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {ERBOLAT_PROFILE.gpa}
              </span>
              <span className="text-xs text-cyan-300 font-mono">/ 4.00</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Высший балл A+ по ключевым дисциплинам
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl liquid-glass-card border border-white/10 flex flex-col justify-between">
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Олимпиадные награды
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono tabular-nums">
                I место
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Республиканская олимпиада по анатомии
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl liquid-glass-card border border-white/10 flex flex-col justify-between">
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Научная деятельность
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                2 статьи
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Журнал ВАК РК и материалы конференций
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl liquid-glass-card border border-white/10 flex flex-col justify-between">
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Студенческий статус
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-white">
                Совет СНО
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Стипендиат ректора ЗКМУ 2024–2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
