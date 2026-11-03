import { useState } from 'react';
import {
  Zap,
  KeyRound,
  Skull,
  Music,
  Flame,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  HelpCircle,
  Mail
} from 'lucide-react';

export const EasyHandbook = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dm_easy_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    step0: true,
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('dm_easy_steps', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const stepsList = [
    { id: 's0', label: 'ก่อนฉาก 1: แจกบท ตฤณ/แพม' },
    { id: 's1', label: 'ฉาก 1: ไขคดี 7/12 (เดชาคือฆาตกร)' },
    { id: 's2', label: 'ฉาก 2: ปิดไฟ ใช้เทียนหา 13 ไดอารี่' },
    { id: 's3', label: 'ฉาก 3: แยก 2 กอง & ตอบ 4 คำถาม' },
    { id: 's4', label: 'ฉาก 4: ถอดรหัส 945 & อ่านความทรงจำ' },
    { id: 's5', label: 'ฉาก 5: เขียนโปสการ์ด & ดับไฟเปิดเสียงจบ' },
  ];

  const progressPercent = Math.round((completedSteps.length / stepsList.length) * 100);

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-zinc-900 to-black p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-xl bg-amber-500 text-black font-bold">
            <Zap size={18} />
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            DM Cheat Sheet • ฉบับคุมโต๊ะเร็ว
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Easy Handbook (คู่มือฉบับกระชับ)
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
          สรุปเฉพาะสิ่งที่ DM ต้องทำ ต้องพูด และคำตอบที่ต้องรู้ในแต่ละฉาก ย่อให้กระชับที่สุดเพื่อการคุมโต๊ะที่คล่องตัว
        </p>

        {/* Live Progress Bar */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 font-medium">
              ความคืบหน้าการดำเนินเกม: {completedSteps.length} / {stepsList.length} ฉาก
            </span>
            <span className="font-mono font-bold text-amber-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-sky-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 1. Fast Facts Card (สรุปข้อมูลด่วนใน 10 วินาที) */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0f12] p-4 sm:p-5 shadow-2xl">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800">
          <Sparkles size={16} className="text-amber-400" />
          <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
            สรุปข้อมูลสำคัญใน 10 วินาที (Fast Facts)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-xl border border-sky-900/40 bg-sky-950/20">
            <div className="text-[10px] text-sky-400 font-bold uppercase">ตัวละครชาย</div>
            <div className="text-sm font-bold text-white mt-0.5">ตฤณ (18 ปี)</div>
            <div className="text-[11px] text-zinc-400 mt-1">
              ชุดนักเรียน • ลืมชื่อตัวเองในฉาก 1 • ผู้ตายในคดี 7/12
            </div>
          </div>

          <div className="p-3 rounded-xl border border-rose-900/40 bg-rose-950/20">
            <div className="text-[10px] text-rose-400 font-bold uppercase">ตัวละครหญิง</div>
            <div className="text-sm font-bold text-white mt-0.5">แพม (20 ปี)</div>
            <div className="text-[11px] text-zinc-400 mt-1">
              ชุดนอน • รู้ชื่อตัวเอง • คิดว่ายังอยู่บนโลกมนุษย์
            </div>
          </div>

          <div className="p-3 rounded-xl border border-amber-900/40 bg-amber-950/20 col-span-2 sm:col-span-1">
            <div className="text-[10px] text-amber-400 font-bold uppercase">รหัสกล่องล็อก 3 หลัก</div>
            <div className="text-xl font-mono font-bold text-amber-300 mt-0.5 tracking-widest">
              [ 9 ] [ 4 ] [ 5 ]
            </div>
            <div className="text-[11px] text-zinc-400 mt-1">
              7+2=9 | ฟ้าใส=4 | 8-3=5
            </div>
          </div>

          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 col-span-2 sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
            <div className="flex items-center gap-2">
              <Skull size={15} className="text-rose-400 shrink-0" />
              <span><strong>ฆาตกรคดี 7/12:</strong> เดชา (เพื่อนบ้านค้ามนุษย์)</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyRound size={15} className="text-amber-400 shrink-0" />
              <span><strong>ทริกห้องปิดตาย:</strong> เข็มขัดคล้องล็อกหน้าต่างดึงผ่านรูกระจกแตก</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Step-by-Step Cue Cards (ฉากต่อฉาก) */}
      <div className="space-y-3">
        {/* Step 0: ก่อนฉาก 1 */}
        <div
          className={`rounded-2xl border transition-all ${
            completedSteps.includes('s0')
              ? 'border-emerald-900/50 bg-[#0a130e]'
              : 'border-zinc-800 bg-[#0d0f12]'
          }`}
        >
          <div
            onClick={() => toggleSection('step0')}
            className="p-4 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep('s0');
                }}
                className="text-emerald-400 shrink-0 active:scale-95"
              >
                {completedSteps.includes('s0') ? (
                  <CheckCircle2 size={20} className="text-emerald-400" />
                ) : (
                  <Circle size={20} className="text-zinc-600" />
                )}
              </button>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold uppercase">
                  ก่อนฉาก 1
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                  แจกบทตัวละคร & เกริ่นนำ
                </h3>
              </div>
            </div>
            {expandedSections.step0 ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
          </div>

          {expandedSections.step0 && (
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800/80 space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-300">
                <span className="font-bold text-sky-400">🎯 สิ่งที่ต้องทำ:</span> แจกสคริปต์ตัวละครให้ตรงเพศ (ตฤณ = ชาย, แพม = หญิง) กำชับว่า{' '}
                <span className="text-amber-400 underline font-semibold">“อ่านจนถึงหน้าที่เขียนว่า ห้ามเปิดหน้าถัดไป”</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/50 text-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-amber-400">🗣️ บทที่ต้องพูด:</span>
                  <button
                    onClick={() =>
                      copyText(
                        'b0',
                        'มากันอีกแล้วสินะ ว่ากันว่ามนุษย์มีสิทธิตัดสินใจในเรื่องต่าง ๆ อยู่เสมอ ไม่ว่าจะเป็นการตัดสินใจที่ดีหรือร้ายก็จงรับผลของการกระทํา แน่นอนว่าก่อนหน้านี้พวกคุณก็เคยตัดสินใจเรื่องบางอย่างไปแล้ว และวันนี้คงมีเรื่องให้ตัดสินใจเช่นกัน จงตัดสินใจตามที่สมควรเถิด ว่าแต่พวกคุณคือใครกัน?'
                      )
                    }
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white"
                  >
                    {copiedId === 'b0' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedId === 'b0' ? 'ก๊อปแล้ว' : 'คัดลอก'}</span>
                  </button>
                </div>
                <p className="font-serif italic leading-relaxed text-zinc-200">
                  “มากันอีกแล้วสินะ ว่ากันว่ามนุษย์มีสิทธิตัดสินใจในเรื่องต่าง ๆ อยู่เสมอ... ว่าแต่พวกคุณคือใครกัน?”
                </p>
                <div className="text-[11px] text-zinc-400 mt-1">
                  (พูดให้เป็นธรรมชาติที่สุด อย่าให้รู้ว่าอยู่ในปรโลก)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 1: ฉาก 1 */}
        <div
          className={`rounded-2xl border transition-all ${
            completedSteps.includes('s1')
              ? 'border-emerald-900/50 bg-[#0a130e]'
              : 'border-zinc-800 bg-[#0d0f12]'
          }`}
        >
          <div
            onClick={() => toggleSection('step1')}
            className="p-4 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep('s1');
                }}
                className="text-emerald-400 shrink-0 active:scale-95"
              >
                {completedSteps.includes('s1') ? (
                  <CheckCircle2 size={20} className="text-emerald-400" />
                ) : (
                  <Circle size={20} className="text-zinc-600" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold uppercase">
                    ฉาก 1
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock size={11} /> 30 นาที
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                  คดีเหตุการณ์ 7/12 (ฆาตกรรมตฤณ)
                </h3>
              </div>
            </div>
            {expandedSections.step1 ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
          </div>

          {expandedSections.step1 && (
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800/80 space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-300">
                <span className="font-bold text-sky-400">🎯 สิ่งที่ต้องทำ:</span> ให้แนะนำตัว (แพมรู้ชื่อตัว, ตฤณยังไม่รู้) จากนั้นหยิบ <strong>กล่องใหญ่</strong> ออกมา แล้วส่งเอกสาร 5 แผ่นให้ผู้เล่น
              </div>

              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/50 text-zinc-200">
                <div className="font-bold text-rose-400 mb-1 flex items-center gap-1">
                  <Skull size={13} />
                  <span>เฉลยที่ผู้เล่นต้องตอบใน 30 นาที:</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-zinc-300">
                  <li><strong>คนตรงหน้า:</strong> คือ ‘ตฤณ’ (ผู้ตายในคดีนี้)</li>
                  <li><strong>ฆาตกร:</strong> ‘เดชา’ (เพื่อนบ้านที่พัวพันค้ามนุษย์)</li>
                  <li><strong>วิธีฆ่า:</strong> เดชาฟาดหัวตฤณสลบ → ไปโรงแรมทำ Alibi → หินยิงกระจกห้องตฤณแตก → เดชากลับมาลากตฤณเข้าห้อง ช็อตไฟฟ้า → ใช้เข็มขัดพ่อเลี้ยงดึงล็อกหน้าต่างจากนอกห้อง อำพรางเป็นห้องปิดตาย</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/50 text-amber-200">
                <span className="font-bold text-amber-400">🗣️ เมื่อตอบถูกให้อ่าน:</span> “ตอนนี้คงรู้แล้วสินะว่าผู้ชายคนนี้คือใคร... ขอให้ทั้งคู่อ่านหน้าต่อไปได้เลย”
              </div>
            </div>
          )}
        </div>

        {/* Step 2: ฉาก 2 */}
        <div
          className={`rounded-2xl border transition-all ${
            completedSteps.includes('s2')
              ? 'border-emerald-900/50 bg-[#0a130e]'
              : 'border-zinc-800 bg-[#0d0f12]'
          }`}
        >
          <div
            onClick={() => toggleSection('step2')}
            className="p-4 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep('s2');
                }}
                className="text-emerald-400 shrink-0 active:scale-95"
              >
                {completedSteps.includes('s2') ? (
                  <CheckCircle2 size={20} className="text-emerald-400" />
                ) : (
                  <Circle size={20} className="text-zinc-600" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold uppercase">
                    ฉาก 2
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock size={11} /> 20 นาที
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                  ค้นหาไดอารี่ 13 แผ่นในความมืด
                </h3>
              </div>
            </div>
            {expandedSections.step2 ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
          </div>

          {expandedSections.step2 && (
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800/80 space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/50 text-amber-200">
                <span className="font-bold text-amber-400 flex items-center gap-1 mb-1">
                  <Flame size={13} />
                  <span>เซ็ตติ้งห้อง:</span>
                </span>
                นำการ์ดไดอารี่ 13 แผ่นวางกระจายทั่วห้อง → <strong>ปิดไฟ/หรี่ไฟให้มืด</strong> → มอบเทียนไขไฟฟ้าให้ผู้เล่นเดินหา 20 นาที
              </div>

              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200">
                <div className="font-bold text-rose-400 mb-0.5">🛑 กฎเหล็ก DM (สำคัญมาก):</div>
                ไดอารี่ 13 แผ่นมีของตฤณและแพมปะปนกัน หากผู้เล่นสังเกตเห็น ให้ DM เพียงรับรู้ แต่ <strong className="underline text-white font-bold">ห้ามให้คัดแยกในตอนนี้เด็ดขาด!</strong> ปล่อยให้เรียงรวมกันไปก่อน
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-300">
                <span className="font-bold text-amber-400">🗣️ เมื่อเรียงเสร็จให้อ่าน:</span> “สังเกตแล้วสินะว่ามีเรื่องบางอย่างแปลก ๆ... ขอให้ทั้งคู่อ่านหน้าต่อไปได้เลย”
              </div>
            </div>
          )}
        </div>

        {/* Step 3: ฉาก 3 */}
        <div
          className={`rounded-2xl border transition-all ${
            completedSteps.includes('s3')
              ? 'border-emerald-900/50 bg-[#0a130e]'
              : 'border-zinc-800 bg-[#0d0f12]'
          }`}
        >
          <div
            onClick={() => toggleSection('step3')}
            className="p-4 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep('s3');
                }}
                className="text-emerald-400 shrink-0 active:scale-95"
              >
                {completedSteps.includes('s3') ? (
                  <CheckCircle2 size={20} className="text-emerald-400" />
                ) : (
                  <Circle size={20} className="text-zinc-600" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold uppercase">
                    ฉาก 3
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock size={11} /> 20 นาที
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                  คัดแยกไดอารี่ 2 กอง & ตอบ 4 ปริศนา
                </h3>
              </div>
            </div>
            {expandedSections.step3 ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
          </div>

          {expandedSections.step3 && (
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800/80 space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-300">
                <span className="font-bold text-sky-400">🎯 สิ่งที่ต้องทำ:</span> ให้เวลา 20 นาที สั่งให้ผู้เล่นแยกไดอารี่เป็น 2 กอง (กองของตฤณ และ กองของแพม)
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/50 space-y-2 text-zinc-200">
                <div className="font-bold text-indigo-400 flex items-center gap-1">
                  <HelpCircle size={14} />
                  <span>4 คำถาม & เฉลยเร็วสำหรับ DM:</span>
                </div>
                <div className="space-y-1.5 pl-2 text-[11px]">
                  <div>1. <em>“ฉันคือปาฏิหาริย์ที่เดินเข้ามา...”</em> ใครพูด? ➔ <strong className="text-emerald-400">แพม</strong></div>
                  <div>2. <em>แมวตาสีฟ้าเป็นของใคร?</em> ➔ <strong className="text-emerald-400">ทั้งคู่สลับกันตามลูป</strong> (ใครตายอีกคนได้แมว)</div>
                  <div>3. <em>ศพในถุงขยะดำคือใคร?</em> ➔ <strong className="text-emerald-400">แพม</strong> (ชี้ให้เห็นว่าทั้งคู่ผลัดกันสละชีวิตให้อีกฝ่ายรอด)</div>
                  <div>4. <em>ความปรารถนาที่ไม่เป็นจริง?</em> ➔ <strong className="text-emerald-400">“ขอให้อยู่ด้วยกันตลอดไป”</strong> (เพราะกฎคือต้องมีคนตายเสมอ)</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/50 text-amber-200">
                <span className="font-bold text-amber-400">🗣️ เมื่อตอบครบให้อ่าน:</span> “ตอนนี้พวกคุณคงได้คำตอบมากขึ้นแล้ว แต่ยังไม่พอ... ขอให้อ่านหน้าต่อไปได้เลย”
              </div>
            </div>
          )}
        </div>

        {/* Step 4: ฉาก 4 */}
        <div
          className={`rounded-2xl border transition-all ${
            completedSteps.includes('s4')
              ? 'border-emerald-900/50 bg-[#0a130e]'
              : 'border-zinc-800 bg-[#0d0f12]'
          }`}
        >
          <div
            onClick={() => toggleSection('step4')}
            className="p-4 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep('s4');
                }}
                className="text-emerald-400 shrink-0 active:scale-95"
              >
                {completedSteps.includes('s4') ? (
                  <CheckCircle2 size={20} className="text-emerald-400" />
                ) : (
                  <Circle size={20} className="text-zinc-600" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold uppercase">
                    ฉาก 4
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock size={11} /> 10 นาที
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                  จิ๊กซอว์ 5 ชิ้น & ถอดรหัส 945
                </h3>
              </div>
            </div>
            {expandedSections.step4 ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
          </div>

          {expandedSections.step4 && (
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800/80 space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-300">
                <span className="font-bold text-sky-400">🎯 สิ่งที่ต้องทำ:</span> ยื่นกล่องจิ๊กซอว์ 5 ชิ้น + เปิดไฟ Black Light ที่มุมห้อง + วางกล่องล็อกรหัส
              </div>

              {/* Code Decoding */}
              <div className="p-3.5 rounded-xl border border-amber-500/40 bg-black text-zinc-200">
                <div className="font-bold text-amber-400 mb-1 flex items-center justify-between">
                  <span>🔑 รหัสปลดล็อกกล่อง: [ 9 ] [ 4 ] [ 5 ]</span>
                  <span className="font-mono text-[10px] bg-amber-950 px-2 py-0.5 rounded text-amber-300">945</span>
                </div>
                <div className="space-y-1 text-[11px] text-zinc-400">
                  <div>• หลัก 1: สหสถานศึกษา = วัดไทรทอง (7) + ออร์คิด (2) = <strong className="text-white">9</strong></div>
                  <div>• หลัก 2: เมฆออกจากท้องนภา = สำนักพิมพ์ฟ้าใส = <strong className="text-white">4</strong></div>
                  <div>• หลัก 3: เก้าชีวาตัดแดทรวง = แมว (8) - ใจ (3) = <strong className="text-white">5</strong></div>
                </div>
              </div>

              {/* Music Cues */}
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/50 text-purple-200">
                <div className="font-bold text-purple-400 mb-1 flex items-center gap-1">
                  <Music size={13} />
                  <span>คิวเพลง ‘โลกที่ไม่มีเธอ’ (สำคัญ):</span>
                </div>
                <ol className="list-decimal pl-4 space-y-0.5 text-zinc-300 text-[11px]">
                  <li>เริ่มอ่านสคริปต์ความทรงจำ ➔ เปิด <strong>Piano version</strong></li>
                  <li>อ่านใกล้ถึงท้ายเล่ม ➔ สลับเปิด <strong>INK WARUNTORN version</strong></li>
                  <li>เพลงจบ ➔ สลับกลับมาเปิด <strong>Piano version</strong> คลอต่อ</li>
                </ol>
              </div>

              {/* DM Monologue Summary */}
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-300">
                <span className="font-bold text-amber-400">📖 สรุปเรื่องเล่าของเทพผู้สร้าง:</span> เทพเคยมีคนรัก คนรักตายไปเกิดเป็นตฤณและรักแพม เทพสร้างไดอารี่วิเศษให้เพื่อเสกพรให้ตฤณย้อนเวลากลับไปหาแพม แต่เมื่อทั้งคู่ขอพรขัดกัน (แพมขออยู่ด้วยกันตลอดไป vs ตฤณขอย้อนไม่ให้เจอกัน) ทั้งหมดจึงถูกดึงมาที่ ‘ปรโลก’
              </div>
            </div>
          )}
        </div>

        {/* Step 5: ฉาก 5 */}
        <div
          className={`rounded-2xl border transition-all ${
            completedSteps.includes('s5')
              ? 'border-emerald-900/50 bg-[#0a130e]'
              : 'border-zinc-800 bg-[#0d0f12]'
          }`}
        >
          <div
            onClick={() => toggleSection('step5')}
            className="p-4 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep('s5');
                }}
                className="text-emerald-400 shrink-0 active:scale-95"
              >
                {completedSteps.includes('s5') ? (
                  <CheckCircle2 size={20} className="text-emerald-400" />
                ) : (
                  <Circle size={20} className="text-zinc-600" />
                )}
              </button>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 font-bold uppercase">
                  ฉาก 5 • ฉากจบ
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                  เลือกฉากจบ & พิธีกรรมโปสการ์ด
                </h3>
              </div>
            </div>
            {expandedSections.step5 ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
          </div>

          {expandedSections.step5 && (
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800/80 space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/50 text-amber-200">
                <span className="font-bold text-amber-400">🗣️ บทพูดชี้ชะตา:</span> “ร่างของตฤณกำลังจะเลือนหายไป... ผมให้โอกาสอธิษฐานต่อไดอารี่ได้อีกครั้ง แต่สามารถอธิษฐานได้แค่คนเดียวเท่านั้นนะ... แล้วทางไหนคือทางออกของพวกคุณ”
              </div>

              {/* 3 Ending Audio Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
                  <div className="text-[10px] text-zinc-400">ทางเลือก 1</div>
                  <div className="font-bold text-white text-xs mt-0.5">ตฤณอธิษฐาน</div>
                  <div className="text-[10px] font-mono text-sky-400 mt-1">🔊 ไฟล์เสียงจบ 1</div>
                </div>
                <div className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
                  <div className="text-[10px] text-zinc-400">ทางเลือก 2</div>
                  <div className="font-bold text-white text-xs mt-0.5">แพมอธิษฐาน</div>
                  <div className="text-[10px] font-mono text-rose-400 mt-1">🔊 ไฟล์เสียงจบ 2</div>
                </div>
                <div className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
                  <div className="text-[10px] text-zinc-400">ทางเลือก 3</div>
                  <div className="font-bold text-white text-xs mt-0.5">ไม่ขอพรเลย</div>
                  <div className="text-[10px] font-mono text-amber-400 mt-1">🔊 ไฟล์เสียงจบ 3</div>
                </div>
              </div>

              {/* Final Ritual Steps */}
              <div className="p-3.5 rounded-xl border border-rose-900/60 bg-black text-zinc-300">
                <div className="font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                  <Mail size={13} />
                  <span>ลำดับพิธีกรรมปิดเกม (ห้ามพลาด):</span>
                </div>
                <ol className="list-decimal pl-4 space-y-1 text-zinc-400 text-[11px]">
                  <li>ให้ทั้งคู่เขียนโปสการ์ดของแทนใจ</li>
                  <li>แลกกันอ่านออกเสียง (แพมก่อน ➔ แล้วตามด้วยตฤณ)</li>
                  <li>แยกคนที่จะเป็นผู้อธิษฐานออกมา 1 คน ส่ง <strong>การ์ดความปรารถนาสุดท้าย</strong> ให้เขียนเงียบๆ (ไม่อ่านออกเสียง)</li>
                  <li>ปิดไดอารี่แล้วโยนลงกล่อง</li>
                  <li><strong className="text-white underline">ปิดไฟทุกดวงให้ห้องมืดสนิท</strong></li>
                  <li>เปิดไฟล์เสียงฉากจบที่เลือก ➔ จบเกมอย่างสมบูรณ์แบบ!</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
