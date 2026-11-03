import { useState, useEffect } from 'react';
import { BookOpen, Type, Sparkles } from 'lucide-react';
import { GAME_METADATA } from '../data/handbookData';
import { RIKAWA_METADATA } from '../data/rikawaData';

interface NavbarProps {
  fontSize: 'normal' | 'large';
  setFontSize: (val: 'normal' | 'large') => void;
  activeSection: string;
  setActiveSection: (val: string) => void;
  currentScenario: 'rikawa' | '7th_december';
  setCurrentScenario: (scenario: 'rikawa' | '7th_december') => void;
  timerCompactDisplay?: React.ReactNode;
}

export const Navbar = ({
  fontSize,
  setFontSize,
  activeSection,
  setActiveSection,
  currentScenario,
  setCurrentScenario,
  timerCompactDisplay,
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dec7NavLinks = [
    { id: 'overview', label: 'หน้าแรก' },
    { id: 'easy', label: '⚡ Easy Handbook' },
    { id: 'checklist', label: 'อุปกรณ์' },
    { id: 'blueprint', label: 'ผัง 10 ขั้น' },
    { id: 'walkthrough', label: 'บทรายฉาก' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-black/95 backdrop-blur-xl border-zinc-800 shadow-2xl'
          : 'bg-black border-zinc-900'
      }`}
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div
          onClick={() => {
            if (currentScenario === '7th_december') {
              setActiveSection('overview');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-black font-bold shadow-md transition-transform group-hover:scale-105 ${
              currentScenario === 'rikawa'
                ? 'bg-gradient-to-tr from-teal-400 to-cyan-500 shadow-teal-500/20'
                : 'bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-sky-500/20'
            }`}
          >
            {currentScenario === 'rikawa' ? <Sparkles size={16} /> : <BookOpen size={16} />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm tracking-tight text-white truncate max-w-[130px] sm:max-w-[200px]">
                {currentScenario === 'rikawa' ? RIKAWA_METADATA.title : GAME_METADATA.title}
              </span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold shrink-0 ${
                  currentScenario === 'rikawa'
                    ? 'bg-teal-950 text-teal-400 border border-teal-800/60'
                    : 'bg-sky-950 text-sky-400 border border-sky-800/60'
                }`}
              >
                {currentScenario === 'rikawa' ? 'EASY' : 'DM'}
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 tracking-wide hidden sm:block truncate">
              {currentScenario === 'rikawa'
                ? 'แม่น้ำริคาวะ • คู่มือฉบับกระชับ 7 ฉาก'
                : GAME_METADATA.subtitle}
            </div>
          </div>
        </div>

        {/* Scenario Switcher Pill - Always visible for instant game change */}
        <div className="flex items-center p-0.5 sm:p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] sm:text-xs">
          <button
            onClick={() => {
              setCurrentScenario('rikawa');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-2 sm:px-3 py-1 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1 ${
              currentScenario === 'rikawa'
                ? 'bg-teal-500 text-black shadow-md shadow-teal-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>🌊 ริคาวะ</span>
            <span className="hidden sm:inline">(Easy)</span>
          </button>
          <button
            onClick={() => {
              setCurrentScenario('7th_december');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-2 sm:px-3 py-1 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1 ${
              currentScenario === '7th_december'
                ? 'bg-sky-500 text-black shadow-md shadow-sky-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>🕯️ 7 ธ.ค.</span>
          </button>
        </div>

        {/* Desktop Nav Tabs (Only when in 7th_december scenario) */}
        {currentScenario === '7th_december' && (
          <nav className="hidden lg:flex items-center gap-1">
            {dec7NavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-zinc-800 text-sky-400 font-bold border border-zinc-700'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Compact Timer in Navbar */}
          {timerCompactDisplay && (
            <div className="flex items-center">
              {timerCompactDisplay}
            </div>
          )}

          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className={`h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl text-xs border flex items-center gap-1 transition-all active:scale-95 ${
              fontSize === 'large'
                ? 'border-teal-500 text-teal-300 bg-teal-950/80 font-bold'
                : 'border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900/60'
            }`}
            title="ปรับขนาดตัวอักษรสำหรับอ่านหน้าโต๊ะ"
          >
            <Type size={13} />
            <span className="font-mono text-[11px]">
              {fontSize === 'large' ? 'A+' : 'A'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
