import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  Mail, 
  Send as TelegramIcon, 
  Download, 
  Copy, 
  Check, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  QrCode
} from 'lucide-react';
import { ERBOLAT_PROFILE } from '../data/portfolioData';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PORTRAIT_RESTORED = '/src/assets/images/portrait_erbolat_restored_1791658147899.jpg';

export const QuickContactModal: React.FC<QuickContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Generate and download vCard for on-the-go smartphone import
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${ERBOLAT_PROFILE.fullNameEn}
N:Rahmetolla;Erbolat;;;
ORG:${ERBOLAT_PROFILE.university}
TITLE:Medical Student (2nd Year)
TEL;TYPE=CELL:${ERBOLAT_PROFILE.contacts.phone}
EMAIL;TYPE=PREF,INTERNET:${ERBOLAT_PROFILE.contacts.email}
X-SOCIALPROFILE;TYPE=telegram:https://t.me/erbolat_rahmetolla
NOTE:GPA 3.92/4.00 - West Kazakhstan Marat Ospanov Medical University
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Erbolat_Rahmetolla_ZKMU.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderContact) return;
    setFormSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative w-full max-w-xl rounded-3xl liquid-glass-modal border border-white/20 p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Закрыть окно визитки"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Student Avatar Badge */}
        <div className="flex items-center gap-4 pb-5 border-b border-white/10">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-400/30 shrink-0">
            <img
              src={PORTRAIT_RESTORED}
              alt="Ерболат Рахметолла"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium">
              <span>{ERBOLAT_PROFILE.universityShort}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <h2 id="contact-modal-title" className="text-xl font-bold text-white leading-snug">
              {ERBOLAT_PROFILE.fullName}
            </h2>
            <div className="text-xs text-slate-300 mt-0.5">
              Студент 2 курса · GPA {ERBOLAT_PROFILE.gpa} / 4.00
            </div>
          </div>
        </div>

        {/* Quick action buttons for on-the-go smartphones */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadVCard}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/30 text-cyan-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>Скачать контакт (.vcf)</span>
          </button>

          <a
            href={`https://t.me/${ERBOLAT_PROFILE.contacts.telegram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <TelegramIcon className="w-4 h-4 text-sky-300" />
            <span>Написать в Telegram</span>
          </a>
        </div>

        {/* Direct Contacts List with 1-Tap Copy */}
        <div className="mt-5 space-y-2 text-xs">
          {/* Telegram */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <TelegramIcon className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[11px] text-slate-400">Telegram</div>
                <div className="text-white font-medium font-mono">{ERBOLAT_PROFILE.contacts.telegram}</div>
              </div>
            </div>
            <button
              onClick={() => handleCopy(ERBOLAT_PROFILE.contacts.telegram, 'telegram')}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Скопировать"
            >
              {copiedField === 'telegram' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Academic Email */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[11px] text-slate-400">Университетская почта (ЗКМУ)</div>
                <div className="text-white font-medium font-mono">{ERBOLAT_PROFILE.contacts.email}</div>
              </div>
            </div>
            <button
              onClick={() => handleCopy(ERBOLAT_PROFILE.contacts.email, 'email')}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Скопировать"
            >
              {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone / WhatsApp */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[11px] text-slate-400">Телефон & WhatsApp</div>
                <div className="text-white font-medium font-mono">{ERBOLAT_PROFILE.contacts.phone}</div>
              </div>
            </div>
            <button
              onClick={() => handleCopy(ERBOLAT_PROFILE.contacts.phone, 'phone')}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Скопировать"
            >
              {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Send Message Form */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Быстрое сообщение для Ерболата
          </div>

          {formSent ? (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-xs text-center">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
              Спасибо! Ваше обращение зафиксировано и отправлено студенту.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ваше имя / Должность"
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-900/60 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="text"
                  required
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder="Email или телефон для ответа"
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-900/60 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <textarea
                rows={2}
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                placeholder="Текст сообщения (научное предложение, стажировка, вопрос по олимпиаде)..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900/60 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Отправить обращение</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
