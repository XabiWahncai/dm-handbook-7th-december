import { useState } from 'react';
import {
  RIKAWA_METADATA,
  RIKAWA_CHARACTERS,
  RIKAWA_AUDIO_CUES,
  RIKAWA_SCENES,
  RIKAWA_EASTER_EGGS,
  RIKAWA_FAQS,
  RIKAWA_PROPS,
} from '../data/rikawaData';
import {
  Zap,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Volume2,
  Music,
  Users,
  Eye,
  EyeOff,
  Skull,
  HelpCircle,
  Sparkles,
  Package,
  Compass
} from 'lucide-react';

export const RikawaEasyHandbook = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rikawa_easy_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSpoilers, setShowSpoilers] = useState<boolean>(false);
  const [expandedScenes, setExpandedScenes] = useState<{ [key: number]: boolean }>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('rikawa_easy_steps', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleScene = (num: number) => {
    setExpandedScenes((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const stepsList = [
    { id: 'rikawa_s1', label: 'ฉาก 1: เปิดเสียง 1, วน BGM 1, แนะนำตัว & สอบพยานรอบ 1-2' },
    { id: 'rikawa_s2', label: 'ฉาก 2: พยานรอบ 3 (15 ชิ้น), ตรวจโลงโปร่งแสง & เข้าค่ายกล' },
    { id: 'rikawa_s3', label: 'ฉาก 3: เปิดเสียง 2 (เปลี่ยนฉาก) ชายชรากล่าว' },
    { id: 'rikawa_s4', label: 'ฉาก 4: วน BGM 2, แจกเนื้อเรื่องแม่น้ำริคาวะ & สารบัญปีศาจ' },
    { id: 'rikawa_s5', label: 'ฉาก 5: ยูกิฮิเมะ/มัทสีโอะพ้นมลทิน & โหวตฆาตกรทั้ง 2 คดี' },
    { id: 'rikawa_s6', label: 'ฉาก 6: มุกจันทร์ราตรี, เสียง 3-4, วน BGM 3, ทุกคนสิ้นใจ, เสียง 5' },
    { id: 'rikawa_s7', label: 'ฉาก 7: ยูกิฮิเมะเลือกทางแยก (เสียสละ: เสียง 6 / ไม่ช่วย: บรรยาย)' },
  ];

  const progressPercent = Math.round((completedSteps.length / stepsList.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header Banner - Mystical Water Theme */}
      <div className="rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-950/40 via-zinc-950 to-black p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-teal-500 text-black font-bold">
              <Zap size={18} />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
              DM Quick Cheat Sheet • คุมโต๊ะเร็ว
            </span>
          </div>

          {/* Spoiler Shield Toggle */}
          <button
            onClick={() => setShowSpoilers(!showSpoilers)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              showSpoilers
                ? 'bg-rose-950/80 border-rose-600/70 text-rose-300 shadow-lg shadow-rose-950/40'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {showSpoilers ? <Eye size={14} className="text-rose-400" /> : <EyeOff size={14} />}
            <span>{showSpoilers ? 'โหมดเผยเฉลย (Spoiler On)' : 'ซ่อนเฉลย (กันคนแอบมอง)'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>{RIKAWA_METADATA.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
          คู่มือสรุปย่อพิเศษสำหรับผู้ดำเนินเกม: ลำดับฉาก 1-7, บทพูด DM, คิวเสียงและเพลง, ตัวตนปีศาจทั้ง 7, เฉลยห้องปิดตาย และบทสรุป 2 ทางเลือก
        </p>

        {/* Live Progress Bar */}
        <div className="mt-5 pt-3.5 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-zinc-400 font-medium">
              ความคืบหน้าการดำเนินเกม: {completedSteps.length} / {stepsList.length} ขั้นตอน
            </span>
            <span className="font-mono font-bold text-teal-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Fast Facts Card (Spoiler Shielded) */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0a0c0f] p-4 sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
          <Skull size={15} className="text-rose-400" />
          <span>ข้อมูลลับสำคัญที่สุดสำหรับ DM (Fast Facts)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800/80">
            <div className="text-[11px] text-zinc-400 mb-0.5">เหยื่อผู้เคราะห์ร้าย</div>
            <div className="text-white font-semibold">ไทระ โนะ มาสะคาโดะ</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">
              ศพถูกตัด 6 ส่วนในโลงโปร่งแสง ใบหน้าถูกทำลายเพราะชิงดวงตา
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-rose-950/60 relative overflow-hidden">
            <div className="text-[11px] text-rose-400 font-semibold mb-0.5">ฆาตกรคดีที่ 1 (แดนนิรันดร)</div>
            {showSpoilers ? (
              <div className="text-rose-200 font-bold text-sm">
                นากะ (Naka)
                <span className="block text-[10px] text-zinc-400 font-normal mt-0.5">
                  ปีศาจร่างมนุษย์สวมหน้ากาก ขโมยวิชาสลับดวงตา
                </span>
              </div>
            ) : (
              <div
                onClick={() => setShowSpoilers(true)}
                className="text-zinc-500 font-mono text-[11px] cursor-pointer hover:text-zinc-300 py-1"
              >
                [ แตะเพื่อปลดล็อกเฉลย ]
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-rose-950/60 relative overflow-hidden">
            <div className="text-[11px] text-rose-400 font-semibold mb-0.5">ฆาตกรคดีที่ 2 (แม่น้ำริคาวะ)</div>
            {showSpoilers ? (
              <div className="text-rose-200 font-bold text-sm">
                โฮชิโนะ โทโกะ (Hoshino Toko)
                <span className="block text-[10px] text-zinc-400 font-normal mt-0.5">
                  สตรีชุดฟ้า / นักบวชรุ่นก่อนตระกูลโฮชิโนะ
                </span>
              </div>
            ) : (
              <div
                onClick={() => setShowSpoilers(true)}
                className="text-zinc-500 font-mono text-[11px] cursor-pointer hover:text-zinc-300 py-1"
              >
                [ แตะเพื่อปลดล็อกเฉลย ]
              </div>
            )}
          </div>
        </div>

        {/* Closed Room Trick Quick Explanation */}
        <div className="mt-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs">
          <div className="text-teal-400 font-semibold mb-1 flex items-center gap-1.5">
            <Sparkles size={14} />
            <span>ทริกห้องปิดตาย 2 ชั้น (Double Locked Room Trick):</span>
          </div>
          <ul className="text-zinc-300 space-y-1 list-disc pl-4 text-[11px]">
            <li>
              <strong>ชั้น 1 (หอมายาหมุนได้):</strong> หอมายาเป็นห้องสี่เหลี่ยมจัตุรัสที่หมุนได้เหมือนลูกบาศก์ใน 'ทางธรรม' เมื่อปีศาจเข้าไปจะหมุนดิ่งลงด้านล่าง ทำให้ตำแหน่งห้องเปลี่ยนไป
            </li>
            <li>
              <strong>ชั้น 2 (โลงศพโปร่งแสง):</strong> โลงศพเปิดด้วยดวงตาของผู้ตาย คนร้ายควักดวงตาตัวเองข้างหนึ่งสลับกับดวงตาผู้ตาย เพื่อนำดวงตาผู้ตายออกมาเป็นกุญแจเปิดปิดโลง
            </li>
            <li>
              <strong>จุดหักมุมฉาก 5:</strong> ตอนแรกทุกคนจะสงสัย มัทสีโอะ อิจิโร่ แต่เขาพ้นมลทินเพราะมีตาข้างเดียวมาแต่ไหนแต่ไรแล้ว (เคยถูกปีศาจต้นท้อควักตาไป) ฆาตกรตัวจริงคือ นากะ!
            </li>
          </ul>
        </div>
      </div>

      {/* Audio Cues Fast Grid */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0f12] p-4 sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
          <Volume2 size={16} />
          <span>กระดานคิวเสียงและดนตรี (Audio Cue Sheet)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {RIKAWA_AUDIO_CUES.map((cue) => (
            <div
              key={cue.id}
              className="p-2.5 rounded-xl bg-black/50 border border-zinc-800/80 flex items-start gap-2.5"
            >
              <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60 shrink-0 mt-0.5">
                {cue.id.startsWith('bgm') ? <Music size={14} /> : <Volume2 size={14} />}
              </span>
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">{cue.title}</div>
                <div className="text-[10px] text-teal-400 font-mono">{cue.scene}</div>
                <div className="text-[11px] text-zinc-400 mt-0.5 leading-tight">{cue.timing}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7 Characters Roster & Demon Identities */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0a0c0f] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Users size={16} />
            <span>สารบัญ 7 ตัวละคร & ตัวตนปีศาจที่แท้จริง</span>
          </h3>
          <span className="text-[10px] font-mono text-zinc-500">7 ผู้เล่น</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RIKAWA_CHARACTERS.map((char) => {
            const isSelected = selectedCharacter === char.id;
            return (
              <div
                key={char.id}
                onClick={() => setSelectedCharacter(isSelected ? null : char.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500/70 bg-amber-950/20 shadow-lg shadow-amber-950/20'
                    : 'border-zinc-800/80 bg-black/60 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono">
                      {char.appearance}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{char.realName}</h4>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-400 px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-800/60">
                    {char.demon}
                  </span>
                </div>

                <div className="mt-2.5 text-xs text-zinc-400 space-y-1">
                  <div>
                    <strong className="text-zinc-300">วิชา/ไอเทม:</strong> {char.powerOrItem}
                  </div>
                  <div>
                    <strong className="text-zinc-300">เบาะแสรอบ 1:</strong> {char.clueRound1}
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-800 text-[11px] text-amber-200/90 leading-relaxed bg-zinc-900/60 p-2 rounded-xl">
                    <strong>💡 DM Note:</strong> {char.roleNotes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DM Master Step Walkthrough (Scenes 1 - 7) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-white">
            <Compass size={18} className="text-teal-400" />
            <span>ขั้นตอนดำเนินเกมรายฉาก (Scene 1 - Scene 7 Walkthrough)</span>
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                const allOpen = Object.values(expandedScenes).every(Boolean);
                const newState: { [k: number]: boolean } = {};
                for (let i = 1; i <= 7; i++) newState[i] = !allOpen;
                setExpandedScenes(newState);
              }}
              className="text-xs text-teal-400 hover:underline px-2 py-1"
            >
              {Object.values(expandedScenes).every(Boolean) ? 'ยุบทั้งหมด' : 'ขยายทั้งหมด'}
            </button>
          </div>
        </div>

        {RIKAWA_SCENES.map((scene) => {
          const isExpanded = !!expandedScenes[scene.number];
          const stepKey = `rikawa_s${scene.number}`;
          const isCompleted = completedSteps.includes(stepKey);

          return (
            <div
              key={scene.number}
              className={`rounded-2xl border transition-all ${
                isCompleted
                  ? 'border-emerald-600/40 bg-zinc-950/80'
                  : 'border-zinc-800 bg-[#0a0c0f]'
              }`}
            >
              {/* Scene Card Header */}
              <div
                onClick={() => toggleScene(scene.number)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(stepKey);
                    }}
                    className="p-1 rounded-lg text-zinc-400 hover:text-emerald-400 transition-colors shrink-0"
                    title={isCompleted ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={20} className="text-emerald-400" />
                    ) : (
                      <Circle size={20} className="text-zinc-600" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-teal-300 border border-zinc-700">
                        ฉากที่ {scene.number}
                      </span>
                      {scene.duration && (
                        <span className="text-[11px] text-zinc-500 font-mono">
                          ⏱️ {scene.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-1 truncate">
                      {scene.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </div>
              </div>

              {/* Collapsible Scene Body */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-5 space-y-4 pt-1 border-t border-zinc-800/80">
                  {/* Audio Cues in this Scene */}
                  {scene.bgmAudio && scene.bgmAudio.length > 0 && (
                    <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-800/40 text-xs space-y-1.5">
                      <div className="font-semibold text-teal-300 flex items-center gap-1.5">
                        <Volume2 size={14} />
                        <span>คิวเสียงและเพลงที่ต้องเล่นในฉากนี้:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        {scene.bgmAudio.map((a, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-black/60 border border-teal-900/40 flex items-center justify-between"
                          >
                            <span className="font-semibold text-white">{a.name}</span>
                            <span className="text-[10px] text-zinc-400 font-mono">{a.action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DM Action Checklist */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      สิ่งที่ DM ต้องทำ (Action Checklist)
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {scene.dmActions.map((act, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-teal-400 font-bold shrink-0">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DM Spoken Script with Copy Button */}
                  {scene.dmScript && scene.dmScript.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles size={13} />
                        <span>บทพูดของผู้ดำเนินเกม (DM Spoken Script)</span>
                      </h4>
                      <div className="space-y-2">
                        {scene.dmScript.map((script, sIdx) => {
                          const scriptId = `script_s${scene.number}_${sIdx}`;
                          const isCopied = copiedId === scriptId;
                          return (
                            <div
                              key={sIdx}
                              className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 relative group leading-relaxed"
                            >
                              <p className="italic pr-10">"{script}"</p>
                              <button
                                onClick={() => copyText(scriptId, script)}
                                className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg border transition-all active:scale-95 ${
                                  isCopied
                                    ? 'bg-emerald-600 border-emerald-500 text-white'
                                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                                }`}
                                title="คัดลอกบทพูด"
                              >
                                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Investigation Clues */}
                  {scene.investigationClues && (
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
                      <div className="font-semibold text-cyan-300 mb-1">
                        🔍 {scene.investigationClues.round} ({scene.investigationClues.count})
                      </div>
                      <div className="text-zinc-300 text-[11px] leading-relaxed">
                        {scene.investigationClues.details}
                      </div>
                    </div>
                  )}

                  {/* Truth / Spoilers Box */}
                  {scene.truthOrSpoilers && scene.truthOrSpoilers.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs space-y-1.5">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5">
                        <Skull size={14} />
                        <span>ความจริง / เฉลยที่ DM ต้องคุม:</span>
                      </div>
                      <ul className="space-y-1 list-disc pl-4 text-zinc-300 text-[11px]">
                        {scene.truthOrSpoilers.map((t, tIdx) => (
                          <li key={tIdx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* DM Tip */}
                  {scene.tips && (
                    <div className="text-[11px] text-amber-300/80 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30">
                      <strong>💡 คำแนะนำคุมโต๊ะ:</strong> {scene.tips}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Easter Eggs & FAQs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Easter Eggs */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0a0c0f] p-4 sm:p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
            <Sparkles size={16} />
            <span>ไข่อีสเตอร์ (Easter Eggs จากหน้า 45)</span>
          </h3>
          <div className="space-y-3">
            {RIKAWA_EASTER_EGGS.map((egg, eIdx) => (
              <div key={eIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs">
                <div className="font-bold text-zinc-200 mb-1">
                  ({eIdx + 1}) {egg.q}
                </div>
                <div className="text-zinc-400 text-[11px] leading-relaxed">
                  {egg.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Q&A */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0a0c0f] p-4 sm:p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-2">
            <HelpCircle size={16} />
            <span>คำถามที่พบบ่อย (Q&A จากหน้า 46)</span>
          </h3>
          <div className="space-y-3">
            {RIKAWA_FAQS.map((faq, fIdx) => (
              <div key={fIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs">
                <div className="font-bold text-zinc-200 mb-1">
                  ({fIdx + 1}) {faq.q}
                </div>
                <div className="text-zinc-400 text-[11px] leading-relaxed">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Props Summary */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0a0c0f] p-4 sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
          <Package size={15} />
          <span>อุปกรณ์และบริบทที่ต้องแจกในเกม (Props Checklist)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
          {RIKAWA_PROPS.map((p, pIdx) => (
            <div key={pIdx} className="p-2.5 rounded-xl bg-black/60 border border-zinc-800/70">
              <div className="flex items-center justify-between text-white font-semibold">
                <span>{p.item}</span>
                <span className="font-mono text-teal-400 text-[11px]">{p.count}</span>
              </div>
              <div className="text-[10px] text-zinc-500 mt-0.5">{p.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
