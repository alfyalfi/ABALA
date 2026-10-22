import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ActiveQuestion } from '../types';
import { audioService } from '../services/audioService';

interface QuestionCardProps {
  question: ActiveQuestion;
  dayIcon: string;
  feedbackToast: {
    show: boolean;
    text: string;
    type: 'correct' | 'wrong' | 'timeout';
  };
  seqStep?: number;
  seqCompletedIds?: string[];
  isAudioPlaying?: boolean;
  builtLetters?: string[];
  countedItems?: number[];
  onTapCountItem?: (index: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  dayIcon,
  feedbackToast,
  seqStep = 1,
  seqCompletedIds = [],
  isAudioPlaying = false,
  builtLetters = [],
  countedItems = [],
  onTapCountItem
}) => {
  const [isManualPlaying, setIsManualPlaying] = useState(false);

  const handlePlayAuthenticSound = async () => {
    if (!question.soundFile) return;
    setIsManualPlaying(true);
    await audioService.playSoundFile(question.soundFile);
    setIsManualPlaying(false);
  };

  const isSoundPlaying = isAudioPlaying || isManualPlaying;

  return (
    <main className="bg-white rounded-3xl border-2 sm:border-3 border-hero-border shadow-hero-md flex flex-col items-center justify-between p-3.5 sm:p-5 text-center relative w-full h-full overflow-hidden">
      {/* Toast Notification Top */}
      <div
        className={`absolute top-2.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white font-black text-sm shadow-xl transition-all duration-200 pointer-events-none z-30 whitespace-nowrap ${
          feedbackToast.show
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-90'
        } ${
          feedbackToast.type === 'correct'
            ? 'bg-hero-success'
            : feedbackToast.type === 'timeout'
            ? 'bg-hero-gold'
            : 'bg-hero-danger'
        }`}
      >
        {feedbackToast.text}
      </div>

      {/* Topic Badge */}
      <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-black uppercase tracking-wider text-hero-red bg-red-50 border border-red-100 px-3 py-1 rounded-full shadow-xs">
        <span>{dayIcon}</span>
        <span>{question.topic}</span>
      </div>

      {/* Main Prompt */}
      <h2 className="text-sm sm:text-base md:text-lg font-black text-hero-black leading-snug max-w-md my-1 line-clamp-2">
        {question.prompt}
      </h2>

      {/* ======================================================== */}
      {/* CENTER STAGE ACCORDING TO PEDAGOGICAL QUESTION TYPE */}
      {/* ======================================================== */}
      <div className="flex-1 w-full flex flex-col items-center justify-center my-1 relative min-h-0 overflow-y-auto">
        
        {/* CASE 1: TOUCH COUNTING QUESTIONS (Papan Sentuh Hitung Benda) */}
        {(question.type === 'touch_count' || question.type === 'counting') && question.countItems ? (
          <div className="bg-slate-50/90 border-2 border-slate-200 rounded-2xl p-2.5 sm:p-3 w-full max-w-sm shadow-inner flex flex-col items-center justify-center">
            <div className="text-[0.68rem] font-black text-slate-400 mb-1.5 uppercase tracking-wider">
              👆 Sentuh Benda untuk Menghitung:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-h-[140px] overflow-y-auto p-1">
              {question.countItems.map((itemIco, idx) => {
                const isCounted = countedItems.includes(idx);
                const countBadgeNum = countedItems.indexOf(idx) + 1;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onTapCountItem && onTapCountItem(idx)}
                    className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-all duration-150 active:scale-90 border-2 min-w-[46px] min-h-[46px] sm:min-w-[52px] sm:min-h-[52px] ${
                      isCounted
                        ? 'bg-emerald-50 border-emerald-400 shadow-sm ring-2 ring-emerald-200 scale-105'
                        : 'bg-white border-slate-200 shadow-xs hover:border-hero-red'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl leading-none">{itemIco}</span>
                    <span
                      className={`text-[0.65rem] font-black mt-0.5 rounded-full px-1.5 ${
                        isCounted ? 'bg-emerald-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      {isCounted ? countBadgeNum : idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : question.type === 'word_builder' && question.targetWord ? (
          /* CASE 2: WORD / NAME BUILDER SLOTS (R-E-Z-A / B-O-L-A) */
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 w-full max-w-sm shadow-inner flex flex-col items-center justify-center">
            <div className="text-[0.7rem] font-black text-hero-black mb-2 uppercase tracking-wider">
              {question.wordLabel || 'Susun Kata'}
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {question.targetWord.map((ltr, lIdx) => {
                const isFilled = builtLetters.length > lIdx;
                const char = isFilled ? builtLetters[lIdx] : '';
                const isCurrentSlot = builtLetters.length === lIdx;

                return (
                  <div
                    key={lIdx}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black transition-all shadow-sm ${
                      isFilled
                        ? 'bg-emerald-500 text-white border-2 border-emerald-600 scale-105'
                        : isCurrentSlot
                        ? 'bg-amber-50 border-2 border-hero-red text-hero-red ring-2 ring-red-200 animate-pulse'
                        : 'bg-white border-2 border-dashed border-slate-300 text-slate-300'
                    }`}
                  >
                    {isFilled ? char : isCurrentSlot ? '?' : ''}
                  </div>
                );
              })}
            </div>
          </div>
        ) : question.type === 'sound' && question.soundFile ? (
          /* CASE 3: REAL SOUND IDENTIFICATION (Menyimak Suara Asli) */
          <div className="bg-gradient-to-b from-red-50 to-white border-2 border-hero-red/30 rounded-2xl p-3 sm:p-4 w-full max-w-xs shadow-sm flex flex-col items-center justify-center">
            <button
              onClick={handlePlayAuthenticSound}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-hero-red text-white flex items-center justify-center shadow-hero-red transition-all duration-200 active:scale-90 ${
                isSoundPlaying ? 'ring-8 ring-red-200 animate-pulse scale-105' : 'hover:scale-105'
              }`}
              title="Dengarkan Suara Asli"
            >
              <Volume2 size={36} className={isSoundPlaying ? 'animate-bounce text-hero-gold' : ''} />
            </button>

            <span className="text-xs font-black text-hero-red mt-2.5 flex items-center gap-1">
              <span>{isSoundPlaying ? 'Sedang Memutar Suara Asli...' : 'Ketuk untuk Putar Suara Asli'}</span>
            </span>

            <span className="text-[0.68rem] font-bold text-slate-400 mt-0.5">
              Dengarkan baik-baik, lalu tebak di bawah!
            </span>
          </div>
        ) : question.type === 'sequence_2' ? (
          /* CASE 4: SEQUENCE 2-STEP INTERACTIVE MEMORY MISSION */
          <div className="w-full max-w-sm flex flex-col items-center justify-center p-3 bg-gradient-to-b from-red-50/70 to-white border-2 border-hero-red/30 rounded-2xl shadow-xs">
            <div className="text-[0.72rem] font-black uppercase tracking-wider text-hero-red mb-2">
              🎯 Misi Ingatan 2 Langkah
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
              {/* Badge Step 1 */}
              <div
                className={`flex-1 py-2 px-3 rounded-xl border-2 flex items-center justify-center gap-1.5 transition-all text-xs font-black ${
                  seqCompletedIds.includes(question.step1Target || '')
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : seqStep === 1
                    ? 'bg-white border-hero-red text-hero-red ring-2 ring-red-200 animate-pulse'
                    : 'bg-white border-hero-border text-hero-black'
                }`}
              >
                <span>{seqCompletedIds.includes(question.step1Target || '') ? '✅' : '1️⃣'}</span>
                <span className="truncate">{question.step1Label || 'Langkah 1'}</span>
              </div>

              <span className="text-slate-400 font-black text-sm">➔</span>

              {/* Badge Step 2 */}
              <div
                className={`flex-1 py-2 px-3 rounded-xl border-2 flex items-center justify-center gap-1.5 transition-all text-xs font-black ${
                  seqCompletedIds.includes(question.step2Target || '')
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : seqStep === 2
                    ? 'bg-white border-hero-red text-hero-red ring-2 ring-red-200 animate-pulse'
                    : 'bg-slate-50 border-dashed border-slate-300 text-slate-400'
                }`}
              >
                <span>{seqCompletedIds.includes(question.step2Target || '') ? '✅' : '2️⃣'}</span>
                <span className="truncate">{question.step2Label || 'Langkah 2'}</span>
              </div>
            </div>
            <div className="text-[0.7rem] font-bold text-slate-400 mt-2">
              {seqStep === 1
                ? `👆 Sentuh benda PERTAMA di bawah: ${question.step1Label}`
                : `👆 Sekarang sentuh benda KEDUA: ${question.step2Label}`}
            </div>
          </div>
        ) : question.type === 'pattern' || question.type === 'sequence' ? (
          /* CASE 5: SEQUENCE / PATTERN MISSING NUMBER */
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 sm:p-4 w-full max-w-sm shadow-inner flex items-center justify-center">
            <div className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-black text-hero-black">
              {question.visual?.split('➔').map((chunk, cIdx) => (
                <React.Fragment key={cIdx}>
                  {cIdx > 0 && <span className="text-slate-300 text-base sm:text-lg">➔</span>}
                  {chunk.includes('?') ? (
                    <span className="bg-red-100 text-hero-red px-3 py-1 rounded-xl border-2 border-dashed border-hero-red animate-pulse">
                      ?
                    </span>
                  ) : (
                    <span className="bg-white px-3 py-1 rounded-xl shadow-xs border border-slate-200">
                      {chunk.trim()}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : question.type === 'number_match' ? (
          /* CASE 6: NUMBER MATCHING */
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-hero-black border-4 border-hero-red flex items-center justify-center text-3xl sm:text-4xl font-black text-hero-gold shadow-hero-md">
              {question.targetCount || question.visual?.replace(/[^0-9]/g, '') || question.prompt.match(/[0-9]/)?.[0] || '1'}
            </div>
            <span className="text-xs font-black text-slate-400 mt-2">Cari kotak yang jumlahnya cocok!</span>
          </div>
        ) : (
          /* CASE 7: GENERAL VISUAL (Clean Subject) */
          <div className="flex flex-col items-center justify-center p-2">
            <div
              className="text-4xl sm:text-5xl font-black text-hero-black drop-shadow-sm flex items-center justify-center p-2"
              dangerouslySetInnerHTML={{ __html: question.visual || '⭐' }}
            />
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="w-full flex items-center justify-center gap-1 text-[0.72rem] font-bold text-slate-400">
        <Sparkles size={12} className="text-hero-gold" />
        <span>
          {question.type === 'sequence_2'
            ? 'Sentuh benda berurutan di bawah ya Kak Reza!'
            : question.type === 'word_builder'
            ? 'Ketuk huruf satu-satu untuk menyusun kata!'
            : 'Pilih jawaban yang benar di bawah ya Kak Reza!'}
        </span>
      </div>
    </main>
  );
};
