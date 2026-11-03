import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroOverview } from './components/HeroOverview';
import { PropsChecklist } from './components/PropsChecklist';
import { FlowBlueprint } from './components/FlowBlueprint';
import { SceneWalkthrough } from './components/SceneWalkthrough';
import { DMTimer } from './components/DMTimer';
import { DMNotes } from './components/DMNotes';
import { BGMController } from './components/BGMController';
import { EasyHandbook } from './components/EasyHandbook';
import { RikawaEasyHandbook } from './components/RikawaEasyHandbook';
import { GAME_METADATA } from './data/handbookData';
import { RIKAWA_METADATA } from './data/rikawaData';
import {
  Compass,
  Package,
  Layers,
  BookOpen,
  Timer as TimerIcon,
  Wrench,
  ChevronUp,
  X,
  Zap
} from 'lucide-react';

export function App() {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [currentScenario, setCurrentScenario] = useState<'rikawa' | '7th_december'>(() => {
    try {
      const saved = localStorage.getItem('dm_active_scenario');
      return saved === '7th_december' ? '7th_december' : 'rikawa';
    } catch {
      return 'rikawa';
    }
  });

  const [activeSection, setActiveSection] = useState<string>('easy');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [mobileToolsModalOpen, setMobileToolsModalOpen] = useState<boolean>(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(30 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('dm_active_scenario', currentScenario);
    } catch {
      // ignore
    }
  }, [currentScenario]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const timerMins = Math.floor(timerSecondsLeft / 60);
  const timerSecs = timerSecondsLeft % 60;

  return (
    <div
      className={`min-h-screen bg-black text-zinc-100 flex flex-col transition-all duration-300 ${
        fontSize === 'large' ? 'text-[17px]' : 'text-[15px]'
      }`}
    >
      {/* Sticky Top Bar with scenario switcher & compact timer */}
      <Navbar
        fontSize={fontSize}
        setFontSize={setFontSize}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentScenario={currentScenario}
        setCurrentScenario={(scen) => {
          setCurrentScenario(scen);
          if (scen === '7th_december' && activeSection === 'easy') {
            setActiveSection('overview');
          }
        }}
        timerCompactDisplay={
          <button
            onClick={() => setMobileToolsModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-teal-500/50 active:scale-95 transition-all"
            title="เปิดเครื่องมือจับเวลา DM"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isTimerRunning ? 'bg-teal-400 animate-ping' : 'bg-zinc-600'
              }`}
            />
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              {String(timerMins).padStart(2, '0')}:{String(timerSecs).padStart(2, '0')}
            </span>
          </button>
        }
      />

      {/* Main Container - with pb-28 on mobile so bottom bar doesn't obscure content */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8 flex-1 w-full pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {/* Scenario 1: เรื่องเล่าพิศวงแห่งแม่น้ำริคาวะ (River Rikawa) */}
            {currentScenario === 'rikawa' && (
              <RikawaEasyHandbook />
            )}

            {/* Scenario 2: ความลับของวันที่ 7 ธันวาคม (7th December) */}
            {currentScenario === '7th_december' && (
              <>
                {activeSection === 'overview' && (
                  <HeroOverview
                    onNavigate={(sec) => {
                      setActiveSection(sec);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}

                {activeSection === 'easy' && (
                  <EasyHandbook />
                )}

                {activeSection === 'checklist' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-white">
                        <Package size={18} className="text-sky-400" />
                        <span>เตรียมอุปกรณ์และการเซ็ตติ้ง (7 ธ.ค.)</span>
                      </h2>
                      <button
                        onClick={() => {
                          setActiveSection('blueprint');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs text-sky-400 hover:underline"
                      >
                        ดูผัง 10 ขั้นถัดไป →
                      </button>
                    </div>
                    <PropsChecklist />
                  </div>
                )}

                {activeSection === 'blueprint' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-white">
                        <Layers size={18} className="text-sky-400" />
                        <span>ผังขั้นตอนการดำเนินเกม 10 ขั้นตอน (7 ธ.ค.)</span>
                      </h2>
                      <button
                        onClick={() => {
                          setActiveSection('walkthrough');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs text-sky-400 hover:underline"
                      >
                        เปิดบทรายฉาก →
                      </button>
                    </div>
                    <FlowBlueprint
                      onSelectScene={() => {
                        setActiveSection('walkthrough');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>
                )}

                {activeSection === 'walkthrough' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-white">
                        <BookOpen size={18} className="text-sky-400" />
                        <span>คู่มือดำเนินเกมรายฉาก 7 ธ.ค. (Walkthrough)</span>
                      </h2>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        ฉาก 1 - 5 + เฉลย
                      </span>
                    </div>
                    <SceneWalkthrough />
                  </div>
                )}
              </>
            )}

            {/* Mobile DM Tools view */}
            {activeSection === 'tools' && (
              <div className="space-y-5 lg:hidden">
                <div className="pb-2 border-b border-zinc-800">
                  <h2 className="text-base font-bold flex items-center gap-2 text-white">
                    <Wrench size={18} className="text-teal-400" />
                    <span>เครื่องมือผู้ดำเนินเกม (DM Toolkit)</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    ตัวจับเวลา BGM และสมุดจดบันทึก
                  </p>
                </div>
                <DMTimer
                  onTimeUpdate={(sec, running) => {
                    setTimerSecondsLeft(sec);
                    setIsTimerRunning(running);
                  }}
                />
                <BGMController />
                <DMNotes />
              </div>
            )}
          </div>

          {/* Desktop Right Sidebar (Persistent DM Companion on large screens) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-5">
            <DMTimer
              onTimeUpdate={(sec, running) => {
                setTimerSecondsLeft(sec);
                setIsTimerRunning(running);
              }}
            />
            <DMNotes />

            {/* Quick Shortcuts depending on scenario */}
            <div className="p-4 rounded-2xl border border-zinc-800 bg-[#0d0f12]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <Compass size={13} />
                <span>
                  {currentScenario === 'rikawa' ? 'ทางลัดแม่น้ำริคาวะ' : 'ทางลัด 7 ธันวาคม'}
                </span>
              </h4>

              {currentScenario === 'rikawa' ? (
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      scrollToTop();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-teal-300 font-semibold bg-teal-950/40 border border-teal-800/40 hover:bg-teal-900/40 transition-all flex items-center gap-1.5"
                  >
                    <Zap size={13} />
                    <span>⚡ Easy Handbook (7 ฉาก)</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentScenario('7th_december');
                      setActiveSection('overview');
                      scrollToTop();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all flex items-center gap-1.5"
                  >
                    <span>🕯️ สลับไปเรื่อง 7 ธันวาคม →</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  {[
                    { id: 'overview', label: 'หน้าแรก & ตัวละคร' },
                    { id: 'easy', label: '⚡ Easy Handbook 7/12' },
                    { id: 'checklist', label: 'เช็คอุปกรณ์ (16 ชิ้น)' },
                    { id: 'blueprint', label: 'ผัง 10 ขั้นตอน' },
                    { id: 'walkthrough', label: 'บทพูด & คดีรายฉาก' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                        activeSection === item.id
                          ? 'bg-sky-950 text-sky-300 font-bold border border-sky-800/60'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      • {item.label}
                    </button>
                  ))}
                  <div className="pt-2 border-t border-zinc-800/80 mt-2">
                    <button
                      onClick={() => {
                        setCurrentScenario('rikawa');
                        scrollToTop();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-teal-400 hover:bg-teal-950/40 transition-all flex items-center gap-1.5"
                    >
                      <span>🌊 สลับไปแม่น้ำริคาวะ (Easy) →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Scroll To Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-30 p-2.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white shadow-xl active:scale-95 transition-all"
          title="เลื่อนขึ้นบนสุด"
        >
          <ChevronUp size={16} />
        </button>
      )}

      {/* Mobile Tools Modal / Drawer (when clicking timer badge) */}
      {mobileToolsModalOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-md p-3 animate-in fade-in duration-200">
          <div className="w-full max-h-[85vh] overflow-y-auto rounded-3xl p-4 sm:p-5 border border-zinc-800 bg-[#0d0f12] text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-teal-950 text-teal-400">
                  <TimerIcon size={16} />
                </span>
                <h3 className="font-bold text-sm text-white">DM Toolkit</h3>
              </div>
              <button
                onClick={() => setMobileToolsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <DMTimer
              onTimeUpdate={(sec, running) => {
                setTimerSecondsLeft(sec);
                setIsTimerRunning(running);
              }}
            />
            <DMNotes />

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setMobileToolsModalOpen(false)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-teal-500 text-black hover:bg-teal-400"
              >
                เสร็จสิ้น
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile App Bottom Bar (Fixed iOS/Android App Style) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-zinc-800/90 pb-safe">
        {currentScenario === 'rikawa' ? (
          <div className="grid grid-cols-3 h-16 items-center px-2">
            <button
              onClick={() => {
                scrollToTop();
              }}
              className="flex flex-col items-center justify-center gap-1 h-full py-1 text-teal-400 font-bold active:scale-95 transition-all"
            >
              <div className="p-1 rounded-xl bg-teal-950/80 text-teal-400">
                <Zap size={18} />
              </div>
              <span className="text-[10px] tracking-tight">ริคาวะ Easy</span>
            </button>

            <button
              onClick={() => setMobileToolsModalOpen(true)}
              className="flex flex-col items-center justify-center gap-1 h-full py-1 text-zinc-400 hover:text-white active:scale-95 transition-all"
            >
              <div className="p-1 rounded-xl">
                <TimerIcon size={18} />
              </div>
              <span className="text-[10px] tracking-tight">จับเวลา & โน้ต</span>
            </button>

            <button
              onClick={() => {
                setCurrentScenario('7th_december');
                setActiveSection('overview');
                scrollToTop();
              }}
              className="flex flex-col items-center justify-center gap-1 h-full py-1 text-zinc-500 hover:text-sky-300 active:scale-95 transition-all"
            >
              <div className="p-1 rounded-xl">
                <BookOpen size={18} />
              </div>
              <span className="text-[10px] tracking-tight">สลับไป 7 ธ.ค.</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-5 h-16 items-center px-1">
            {[
              { id: 'overview', label: 'หน้าแรก', icon: Compass },
              { id: 'easy', label: 'Easy', icon: Zap },
              { id: 'blueprint', label: 'ผัง 10 ขั้น', icon: Layers },
              { id: 'walkthrough', label: 'บทรายฉาก', icon: BookOpen },
              { id: 'tools', label: 'เครื่องมือ', icon: Wrench },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex flex-col items-center justify-center gap-1 h-full py-1 transition-all active:scale-95 ${
                    isActive
                      ? 'text-sky-400 font-bold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <div
                    className={`p-1 rounded-xl transition-all ${
                      isActive ? 'bg-sky-950/80 text-sky-400' : ''
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Minimal Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-black py-6 text-center text-xs text-zinc-600 no-print">
        <div className="max-w-5xl mx-auto px-4">
          <p className="font-medium text-zinc-400">
            {currentScenario === 'rikawa'
              ? `${RIKAWA_METADATA.title} — ${RIKAWA_METADATA.englishTitle}`
              : `${GAME_METADATA.title} — ${GAME_METADATA.subtitle}`}
          </p>
          <p className="text-[10px] text-zinc-600 mt-0.5">
            Minimal OLED Black Edition • Mobile-First Responsive DM Handbook
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
